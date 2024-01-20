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
    [],
  );

  const isCompleted = completedLevels.includes(level.levelNo);

  return (
    <div>
    <div className={`w-[800px] flex flex-col gap-8 pt-12 ${!isCompleted && "opacity-20"}`}>
      <div className="text-4xl">Level {level.levelNo} Boss</div>
      <div className="text-7xl">{level.position}</div>
      <Link href={isCompleted ? `level/${level.levelNo}` : '#'}><Button disabled={!isCompleted}>Accept Offer</Button></Link>
    </div>
    {!isCompleted &&<div>Locked</div>}
    </div>
  );
}
