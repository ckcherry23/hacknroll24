"use client";
import { api } from "@/trpc/react";
import { useState } from "react";
import { type Persona, personas } from "@/lib/persona";

export default function AiTest() {
  const textMutation = api.openAI.hello.useMutation({
    onSuccess: (data) => {
      const newMessages = JSON.parse(data.message).comments;
      setMessages((messages) => [...messages, newMessages]);
    },
  });
  const [input, setInput] = useState("How can I succeed as an SWE?");
  const [messages, setMessages] = useState<string[]>([]);
  const [persona, setPersona] = useState<Persona>(personas[0]);

  const onClick = async () => {
    textMutation.mutate({
      message: input,
      persona,
    });
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-2">
      <button
        onClick={onClick}
        className="mb-6 rounded-xl border border-white px-4  py-2 transition-all hover:scale-110"
      >
        Call OpenAI
      </button>

      <div className="flex gap-4">
        {personas.map((p) => {
          if (p === persona) {
            return (
              <button
                className="rounded-sm bg-white px-4 py-2 text-black"
                key={p}
                onClick={() => setPersona(p)}
              >
                {p}
              </button>
            );
          }

          return (
            <button
              className="rounded-sm border border-white px-4 py-2"
              key={p}
              onClick={() => setPersona(p)}
            >
              {p}
            </button>
          );
        })}
      </div>

      <div>Fill in your message:</div>
      <input
        className="w-96 border border-black px-4 py-2 text-black"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="flex w-96 flex-col gap-4">
        {messages.map((message) => (
          <div
            key={message.substring(0, 50)}
            className="border border-white px-4 py-2"
          >
            {message}
          </div>
        ))}
      </div>
    </div>
  );
}
