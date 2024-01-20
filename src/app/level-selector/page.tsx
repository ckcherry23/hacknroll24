'use client';

import { levels } from "@/levels";
import LevelPreview from "./level-preview";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function LevelSelector() {

  const resetProgress = () => {
    window.localStorage.removeItem('completedLevels');
    window.location.reload();
  }

  return (
    <main className="flex min-h-screen flex-col items-start justify-center bg-[url('/bg.jpeg')] bg-contain">
      <div className="flex items-start justify-start">
        <div className="hide-scroll-bar py-24 px-40">
          <div className="flex space-x-[600px] ">
            {levels.map((level, index) => {
              return (<div key={index}><Image src={`/level-${level.levelNo}.png`} alt={level.name} width={200} height={200} /></div>);
            })}
          </div>
          <div className="h-[10px] w-[3000px] rounded-t-xl bg-lime-900 opacity-100"></div>
          <div className="h-[80px] w-[3000px] rounded-b-xl bg-stone-900 to-stone-900 opacity-100"></div>
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
