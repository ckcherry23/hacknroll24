'use client';
import { levels } from "@/levels"
import { type LevelType } from "@/lib/types";
import Level from "@/app/_components/level";
import ErrorNotFound from "@/app/_components/error-not-found";
import { useLocalStorage } from 'usehooks-ts';

export default function LevelPage({ params }: { params: { id: string } }) {
  const [completedLevels, setCompletedLevels] = useLocalStorage<Array<string>>(
    'completedLevels',
    ["0"],
  );

  // noStore();
  // const tts = await api.tts.convert.query({
  //   text: "The quick brown fox jumps over the lazy dog",
  //   emotion_name: "Default",
  //   person_voice: "Elon Musk",
  // });

  const isUnlocked = completedLevels.includes(params.id)
    || parseInt(params.id) == Math.max(...completedLevels.map((x) => parseInt(x))) + 1;

  const level: LevelType = levels[parseInt(params.id) - 1]!;
  return (
    level && isUnlocked ? <Level level={level} /> : <ErrorNotFound />
  )
}
