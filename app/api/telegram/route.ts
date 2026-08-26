import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json({ ok: false, error: "Telegram is not configured" }, { status: 503 });
  }

  const body = (await request.json()) as {
    kind?: string;
    payload?: Record<string, unknown>;
    status?: string;
  };

  const message = [
    "Nieuwe binnenkomst op Finkje",
    `Type: ${body.kind ?? "onbekend"}`,
    `Status: ${body.status ?? "submitted"}`,
    body.payload ? `Gegevens:\n${JSON.stringify(body.payload, null, 2)}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: message }),
  });

  if (!response.ok) {
    console.error("[v0] Telegram notification failed", { status: response.status });
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
