"use client";

import { Button } from "@/components/ui/button";
import { LevelType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";

type LevelPreviewProps = {
  level: LevelType;
};

export default function LevelPreview({ level }: LevelPreviewProps) {
  const [completedLevels] = useLocalStorage<Array<string>>("completedLevels", [
    "0",
  ]);

  const isUnlocked =
    completedLevels.includes(level.levelNo) ||
    parseInt(level.levelNo) ==
      Math.max(...completedLevels.map((x) => parseInt(x))) + 1;

  return (
    <div className="relative">
      <div>
        {!isUnlocked && (
          <div className="absolute left-6 top-32 z-10">
            <Image
              src={`/locked.png`}
              alt="locked"
              width={`100`}
              height={`100`}
            />
          </div>
        )}
      </div>
      <div
        className={`flex w-[800px] flex-col gap-8 pt-12 ${!isUnlocked && "opacity-20"}`}
      >
        <div className="text-4xl">Level {level.levelNo} Boss</div>
        <div className="text-7xl">{level.position}</div>
        <Link href={isUnlocked ? `level/${level.levelNo}` : "#"}>
          <Button disabled={!isUnlocked}>Accept Offer</Button>
        </Link>
      </div>
    </div>
  );
}
