export function localBotReply(message: string) {
  const lower = message.toLowerCase();

  // Simple rule-based responses
  if (lower.includes("hello") || lower.includes("hi")) {
    return "Hello! I’m your Ember assistant. How can I help you today?";
  }

  if (lower.includes("how are you")) {
    return "I’m glowing like an ember 🔥. How about you?";
  }

  if (lower.includes("time")) {
    return `Current time is ${new Date().toLocaleTimeString()}`;
  }

  if (lower.includes("date")) {
    return `Today is ${new Date().toLocaleDateString()}`;
  }

  // Fallback
  return "I’m Ember, your voice assistant. Tell me more so I can respond!";
}