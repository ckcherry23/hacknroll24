"use client";
import { api } from "@/trpc/react";
import { useState } from "react";

export default function AiTest() {
  const textMutation = api.openAI.hello.useMutation({
    onSuccess: (data) => {
      const message = data.message;
      setMessages((messages) => [...messages, message]);
    },
  });
  const [input, setInput] = useState("How can I succeed as an SWE?");
  const [messages, setMessages] = useState<string[]>([]);

  const onClick = async () => {
    textMutation.mutate({
      message: input,
      persona: "Angry Man",
    });
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-2">
      <button
        onClick={onClick}
        className="rounded-xl bg-black px-4 py-2 text-white"
      >
        Call OpenAI
      </button>
      <div>Fill in your message:</div>
      <input
        className="w-96 border border-black px-4 py-2"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {/* <div>{textMutation.data?.message ?? ""}</div> */}
      {messages.map((message) => (
        <div key={message.substring(0, 50)}>{message}</div>
      ))}
    </div>
  );
}
