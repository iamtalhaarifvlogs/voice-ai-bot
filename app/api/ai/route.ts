import { NextResponse } from "next/server";
import { askGrok } from "@/app/lib/grok";
import { localBotReply } from "@/app/lib/localBot"; // <-- our own bot

export async function POST(req: Request) {
  try {
    const { message, mode } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    let reply: string;

    if (mode === "grok") {
      // Use Grok API
      reply = await askGrok(message);
    } else {
      // Use our local bot
      reply = localBotReply(message);
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "AI request failed" }, { status: 500 });
  }
}