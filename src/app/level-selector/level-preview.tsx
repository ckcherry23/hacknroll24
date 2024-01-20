import { Button } from "@/components/ui/button";
import { LevelType } from "@/lib/types";
import Link from "next/link";

type LevelPreviewProps = {
  level: LevelType;
}

export default async function LevelPreview({ level }: LevelPreviewProps) {
  return (
    <div className="w-[800px] flex flex-col gap-8 pt-12">
      <div className="text-4xl">Level {level.levelNo}</div>
      <div className="text-7xl">{level.position}</div>
      <Link href={`level/${level.levelNo}`}><Button>Accept Offer</Button></Link>
    </div>
  );
}
