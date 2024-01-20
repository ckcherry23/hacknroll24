"use client";

import { Button } from "@/components/ui/button";
import { LevelType } from "@/lib/types";
import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";

type LevelPreviewProps = {
  level: LevelType;
};

export default function LevelPreview({ level }: LevelPreviewProps) {
  const [completedLevels, setCompletedLevels] = useLocalStorage<Array<string>>(
    "completedLevels",
    ["0"],
  );

  const isUnlocked =
    completedLevels.includes(level.levelNo) ||
    parseInt(level.levelNo) ==
      Math.max(...completedLevels.map((x) => parseInt(x))) + 1;

  return (
    <>
      <div className={`${!isUnlocked && "opacity-20"}`}>
        <div className="text-3xl">Level {level.levelNo} Boss</div>
        <div className="text-5xl">{level.position}</div>
        <Link href={isUnlocked ? `level/${level.levelNo}` : "#"}>
          <Button disabled={!isUnlocked} className="mt-5">
            Accept Offer
          </Button>
        </Link>
      </div>
      {!isUnlocked && <div>Locked</div>}
    </>
  );
}
