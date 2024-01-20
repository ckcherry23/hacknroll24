import { Button } from "@/components/ui/button";
import Link from "next/link";

type LevelPreviewProps = {
  levelNo: string;
}

export default async function LevelPreview({ levelNo }: LevelPreviewProps) {
  return (
    <div className="text-7xl w-[800px]">
      Level {levelNo}
      <Link href={`level/${levelNo}`}><Button>Accept Offer</Button></Link>
    </div>
  );
}
