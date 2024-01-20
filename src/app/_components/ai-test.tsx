"use client";
import { api } from "@/trpc/react";

export default function AiTest() {
  const textMutation = api.openAI.hello.useMutation();
  const onClick = async () => {
    textMutation.mutate({
      text: "What's the tallest building in the world?",
    });
  };

  return (
    <div>
      <button onClick={onClick}>Call OpenAI</button>
      <div>{textMutation.data?.greeting ?? ""}</div>
    </div>
  );
}
