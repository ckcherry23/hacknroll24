import { Button } from "@/components/ui/button";
import Stage from "./_components/stage";
import ChatInterface from "./_components/bot/bot";
import levels from "@/levels.json"
import { type LevelType } from "@/lib/types";

const level: LevelType = levels.levels[0]!;

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-row">
        <div className="h-screen border-r-2 px-4 py-4 w-[350px] flex flex-col">
          <ChatInterface/>
        </div>
        <div className="flex w-full">

        <Stage level={level} />
        </div>
      </div>
    </main>
  );
}
