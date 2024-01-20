'use client';

import { levels } from "@/levels";
import LevelPreview from "./level-preview";
import { Button } from "@/components/ui/button";

export default function LevelSelector() {

  const resetProgress = () => {
    window.localStorage.removeItem('completedLevels');
    window.location.reload();
  }

  return (
    <main className="flex min-h-screen flex-col items-start justify-center bg-[url('/bg.jpeg')] bg-contain">
      <div className="flex items-start justify-start">
        <div className="hide-scroll-bar p-40">
          <div className="h-[80px] w-[3000px] bg-gradient-to-b from-stone-900 to-neutral-950 opacity-100"></div>
          <div className="flex items-center justify-center gap-8 overflow-hidden">
            {levels.map((level, index) => {
              return <LevelPreview key={index} level={level} />;
            })}
            <div className="p-4 text-2xl">More levels coming soon!</div>
            <Button onClick={() => resetProgress()}>Reset Progress</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
