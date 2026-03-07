// types/chat.ts
export type Role = "user" | "ai"; // add "ai"

export interface Message {
  role: Role;
  content: string;
}