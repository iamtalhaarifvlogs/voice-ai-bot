export default function ChatPage() {
  return (
    <main className="flex flex-col h-screen w-full bg-black text-white">

      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
        <h1 className="text-lg font-semibold">Ember AI</h1>
      </header>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {/* Messages go here */}
      </div>

      {/* Input */}
      <div className="border-t border-zinc-800 p-3">
        <div className="flex gap-2">

          <input
            className="flex-1 bg-zinc-900 rounded-lg px-4 py-3 text-sm outline-none"
            placeholder="Type a message..."
          />

          <button className="px-4 py-3 bg-purple-600 rounded-lg">
            Send
          </button>

        </div>
      </div>

    </main>
  );
}