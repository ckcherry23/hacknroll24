'use client';

import { Button } from "@/components/ui/button";
import { LevelType } from "@/lib/types";
import Link from "next/link";
import { useLocalStorage } from 'usehooks-ts';

type LevelPreviewProps = {
  level: LevelType;
}

export default function LevelPreview({ level }: LevelPreviewProps) {
  const [completedLevels, setCompletedLevels] = useLocalStorage<Array<string>>(
    'completedLevels',
    ["0"],
  );

  const isUnlocked = completedLevels.includes(level.levelNo)
    || parseInt(level.levelNo) == Math.max(...completedLevels.map((x) => parseInt(x))) + 1;

  return (
    <div>
      <div className={`w-[800px] flex flex-col gap-8 pt-12 ${!isUnlocked && "opacity-20"}`}>
        <div className="text-4xl">Level {level.levelNo} Boss</div>
        <div className="text-7xl">{level.position}</div>
        <Link href={isUnlocked ? `level/${level.levelNo}` : '#'}><Button disabled={!isUnlocked}>Accept Offer</Button></Link>
      </div>
      {!isUnlocked && <div>Locked</div>}
    </div>
  );
}
