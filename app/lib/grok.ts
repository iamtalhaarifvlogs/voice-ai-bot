export async function askGrok(message: string) {
  const res = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROK_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "grok-2",
      messages: [
        {
          role: "system",
          content:
            "You are a futuristic AI assistant designed to respond intelligently and clearly.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    }),
  });

  if (!res.ok) {
    throw new Error("Grok API failed");
  }

  const data = await res.json();

  return data.choices?.[0]?.message?.content ?? "No response.";
}