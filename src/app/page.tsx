import { unstable_noStore as noStore } from "next/cache";
import ChatBox from "./_components/bot/chatbox";
import Stage from "./_components/stage";
import { api } from "@/trpc/server";
import levels from "@/levels.json"
import { type LevelType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const level: LevelType = levels.levels[0]!;

export default async function Home() {
  noStore();

  const tts = await api.tts.convert.query({
    text: "The quick brown fox jumps over the lazy dog",
    emotion_name: "Default",
    person_voice: "Elon Musk",
  });

  return (
    <main className="flex min-h-screen flex-col">
      <h1>
        Making you tougher for the working world
      </h1>
      <Link href={`level-selector`}><Button>Start</Button></Link>
    </main>
  );
}

