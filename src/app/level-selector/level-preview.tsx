"use client";

import { Button } from "@/components/ui/button";
import { LevelType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useLocalStorage } from "usehooks-ts";

type LevelPreviewProps = {
  level: LevelType;
};

export default function LevelPreview({ level }: LevelPreviewProps) {
  const [completedLevels] = useLocalStorage<Array<string>>("completedLevels", [
    "0",
  ]);
  const ref = useRef<HTMLDivElement>(null);

  const isUnlocked =
    completedLevels.includes(level.levelNo) ||
    parseInt(level.levelNo) ==
      Math.max(...completedLevels.map((x) => parseInt(x))) + 1;

  useEffect(() => {
    if (ref.current && isUnlocked) {
      ref.current.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  }, [ref]);

  return (
    <div
      className="relative h-[350px] border-r-[20px] border-stone-900"
      ref={ref}
    >
      <div>
      {!isUnlocked && <div className="absolute z-10 top-32 left-6"><Image src={`/locked.png`} alt="locked" width={`100`} height={`100`} /></div>}
      </div>
      <div className={`w-[800px] flex flex-col gap-8 pt-12 pl-10 ${!isUnlocked && "opacity-20"}`}>
        <div className="text-4xl">Level {level.levelNo} Boss</div>
        <div className="text-7xl">{level.position}</div>
        <Link href={isUnlocked ? `level/${level.levelNo}` : '#'}><Button disabled={!isUnlocked}>Start Day</Button></Link>
        </div>
    </div>
  );
}
