"use client";

import { useState } from "react";
import { api } from "@/trpc/react";

export default function AiTest() {
  const [text, setText] = useState<string>("");
  const res = api.openAI.hello.useQuery({
    text,
  });

  const data = res.data?.greeting;

  const onClick = () => {
    setText("world");
  };

  return (
    <div>
      <button onClick={onClick}>Call OpenAI</button>
      <div>{data}</div>
    </div>
  );
}
