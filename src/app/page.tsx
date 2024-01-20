import { unstable_noStore as noStore } from "next/cache";
import ChatInterface from "./_components/bot/bot";
import Stage from "./_components/stage";
import { api } from "@/trpc/server";
import { levels } from "@/levels";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { type LevelType } from "@/lib/types";

const level: LevelType = levels[0]!;

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
      <div className="flex flex-row">
        <div className="h-screen border-r-2 px-4 py-4 w-[350px] flex flex-col">
          <ChatInterface/>
        </div>
        <div className="flex w-full">

        <Stage level={level} />
        </div>

        <audio controls style={{display: 'none'}}>
          <source src={tts.oss_url} type="audio/wav" />
      </audio>
      </div>
    </main>
  );
}

