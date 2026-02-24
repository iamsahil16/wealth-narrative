"use client"

import { useState } from "react"

interface IMessage {
  role: "user" | "assistant"
  content: string
}

export default function ChatPage() {
  const [question, setQuestion] = useState("")
  const [messages, setMessages] = useState<IMessage[]>([])
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!question.trim() || loading) return

    const userMessage: IMessage = { role: "user", content: question }

    setMessages((prev) => [...prev, userMessage])
    setQuestion("")
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      })

      const data = await res.json()

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ])
    } catch (err) {
      console.log("Error:", err)
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong" },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#022C22] text-[#ECFDF5] flex flex-col">
      
      <div className="border-b border-[#065F46] bg-[#022C22]/80 backdrop-blur px-6 py-4">
        <h1 className="font-semibold text-lg text-[#A7F3D0]">
          Wealth Narrative
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 flex justify-center">
        <div className="w-full max-w-3xl flex flex-col gap-4">

          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`
                  px-4 py-3 rounded-2xl text-sm leading-relaxed max-w-[75%]
                  shadow-sm
                  ${
                    m.role === "user"
                      ? "bg-[#16A34A] text-white"
                      : "bg-[#064E3B] border border-[#065F46] text-[#ECFDF5]"
                  }
                `}
              >
                {m.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="text-sm text-[#6EE7B7] px-2">
              Thinking...
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-[#065F46] bg-[#022C22]/80 backdrop-blur p-4">
        <div className="max-w-3xl mx-auto flex gap-3 items-center">

          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask something about your documents..."
            className="flex-1 border border-[#065F46] rounded-xl px-4 py-3 bg-[#022C22] text-[#ECFDF5] focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="px-5 py-3 rounded-xl bg-[#16A34A] text-white disabled:opacity-50 hover:bg-[#15803D] transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}