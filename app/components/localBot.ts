import knowledge from "@/local-knowledge.json";

// Define TypeScript types
interface Intent {
  triggers: string[];
  responses: (string | (() => string))[];
}

// 1️⃣ Predefined intents
const intents: Intent[] = [
  {
    triggers: ["hello", "hi", "hey"],
    responses: [
      "Hi! I'm Ember, your AI assistant.",
      "Hello there! Ready to chat?",
      () => "Hey! Ember is online 🔥",
    ],
  },
  {
    triggers: ["time", "what time is it", "current time"],
    responses: [() => `The current time is ${new Date().toLocaleTimeString()}`],
  },
  {
    triggers: ["your name", "who are you", "what is your name"],
    responses: ["I'm Ember, your futuristic AI assistant 😎"],
  },
  {
    triggers: ["how are you", "how's it going", "how do you feel"],
    responses: [
      "I’m glowing with circuits of happiness 😌",
      "Feeling electric ⚡ and ready to chat!",
    ],
  },
];

// 2️⃣ Fallback response
const fallback = "Hmm, I’m not sure about that yet. Can you teach me?";

// 3️⃣ Function to get a random response from an intent
function getRandomResponse(responses: (string | (() => string))[]): string {
  const randomResp = responses[Math.floor(Math.random() * responses.length)];
  return typeof randomResp === "function" ? randomResp() : randomResp;
}

// 4️⃣ Function to check intents
function checkIntents(message: string): string | null {
  const msg = message.toLowerCase();
  for (const intent of intents) {
    if (intent.triggers.some((t) => msg.includes(t))) {
      return getRandomResponse(intent.responses);
    }
  }
  return null;
}

// 5️⃣ Function to check knowledge base JSON
function checkKnowledgeBase(message: string): string | null {
  const msg = message.toLowerCase();
  const knowledgeResp = knowledge.find((k) => msg.includes(k.question.toLowerCase()));
  return knowledgeResp?.answer || null;
}

// 6️⃣ Main function called by ChatUI
export function getLocalBotResponse(message: string): string {
  // 1️⃣ Check intents
  const intentReply = checkIntents(message);
  if (intentReply) return intentReply;

  // 2️⃣ Check knowledge base
  const knowledgeReply = checkKnowledgeBase(message);
  if (knowledgeReply) return knowledgeReply;

  // 3️⃣ Fallback
  return fallback;
}

// 7️⃣ Convenience wrapper for ChatUI
export function getBotReply(message: string): string {
  return getLocalBotResponse(message);
}