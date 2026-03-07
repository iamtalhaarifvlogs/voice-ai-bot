import { Message } from "@/app/types/chat";

export default function MessageBubble({ role, content }: Message) {
  const isUser = role === "user";
  return (
    <div
      className={`p-3 rounded-lg max-w-xl ${
        isUser
          ? "bg-blue-500 text-white self-end"
          : "bg-gray-200 text-black self-start"
      }`}
    >
      {content}
    </div>
  );
}