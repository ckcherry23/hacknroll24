import { unstable_noStore as noStore } from "next/cache";
import ChatBox from "@/app/_components/bot/chatbox";
import Stage from "@/app/_components/stage";
import { api } from "@/trpc/react";
import { levels } from "@/levels"
import { type LevelType } from "@/lib/types";
import { useActiveCode } from '@codesandbox/sandpack-react'
import Level from "@/app/_components/level";



export default async function LevelPage({ params }: { params: { id: string } }) {

  // noStore();
  // const tts = await api.tts.convert.query({
  //   text: "The quick brown fox jumps over the lazy dog",
  //   emotion_name: "Default",
  //   person_voice: "Elon Musk",
  // });
  const level: LevelType = levels[parseInt(params.id)-1]!;
  return (
    <Level level={level} />
  )
}
