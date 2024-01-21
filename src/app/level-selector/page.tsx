"use client";

import { levels } from "@/levels";
import LevelPreview from "./level-preview";
import { Button } from "@/components/ui/button";
import Image from 'next/image'
import { useEffect } from "react";

export default function LevelSelector() {
  const resetProgress = () => {
    window.localStorage.removeItem("completedLevels");
    window.location.reload();
  };

  useEffect(() => {
    window.addEventListener("DOMContentLoaded", event => {
      const audio = document.querySelector("audio");
      if (audio) {
        audio.volume = 0.2;
      }
      audio?.play();
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-start justify-center bg-[url('/bg.jpeg')] bg-contain">
      <audio src="/lobby.mp3" autoPlay={true} aria-disabled={true} ></audio>
      <div className="flex items-start justify-start">
        <div className="hide-scroll-bar py-24 px-40">
          <div className="flex space-x-[650px] ">
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
