import { unstable_noStore as noStore } from "next/cache";
import ChatInterface from "@/app/_components/bot/bot";
import Stage from "@/app/_components/stage";
import { api } from "@/trpc/server";
import { levels } from "@/levels"
import { type LevelType } from "@/lib/types";

const level: LevelType = levels[0]!;

export default async function Level({ params }: { params: { id: string } }) {

  noStore();
  const tts = await api.tts.convert.query({
    text: "The quick brown fox jumps over the lazy dog",
    emotion_name: "Default",
    person_voice: "Elon Musk",
  });
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-row">
        <div className="h-screen border-r-2 px-4 py-4 w-[350px] flex flex-col">
          <ChatInterface level={level} />
        </div>
        <div className="flex w-full">

          <Stage level={level} />
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white"></p>
        </div>

        <audio
          src={tts.oss_url}
          preload="auto"
          style={{ display: "none" }}
          autoPlay
        ></audio>
      </div>
    </main>
  );
}
