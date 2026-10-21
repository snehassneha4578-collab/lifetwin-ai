import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

function quotaError(error: unknown) {
  const text = error instanceof Error ? error.message : String(error);
  const status =
    typeof error === "object" && error !== null && "status" in error
      ? Number(error.status)
      : 0;
  return status === 429 || /\b429\b|RESOURCE_EXHAUSTED|quota/i.test(text);
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Gemini is not configured. Check GEMINI_API_KEY in .env.local." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON request." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || !("message" in body) ||
      typeof body.message !== "string") {
    return NextResponse.json({ error: "A message is required." }, { status: 400 });
  }

  const message = body.message.trim();
  if (!message || message.length > 2000) {
    return NextResponse.json(
      { error: "Message must contain 1â€“2000 characters." },
      { status: 400 }
    );
  }

  const encoder = new TextEncoder();
  const send = (controller: ReadableStreamDefaultController, data: unknown) =>
    controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const result = await ai.models.generateContentStream({
          model: "gemini-3.1-flash-lite",
          config: {
            maxOutputTokens: 180,
            temperature: 0.4,
          },
          contents: [
            "You are LifeTwin AI. Answer directly and concisely, usually in 3-6 sentences or a few bullets. Help users compare options, risks, assumptions, and next steps. Never claim to predict the future. The human makes the final decision.",
            `User message:\n${message}`,
          ].join("\n\n"),
        });

        let hasText = false;
        for await (const chunk of result) {
          const text = chunk.text;
          if (text) {
            hasText = true;
            send(controller, { text });
          }
        }

        if (!hasText) send(controller, { error: "AI returned an empty response." });
        else send(controller, { done: true });
      } catch (error) {
        console.error("LifeTwin streaming chat failed:", error);
        send(controller, {
          error: quotaError(error)
            ? "Gemini's current API quota is exhausted. Please try again later or configure a project with available quota."
            : "AI request failed. Check the development server log and try again.",
        });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}


