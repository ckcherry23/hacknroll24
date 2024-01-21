"use client";
import { levels } from "@/levels";
import { type LevelType } from "@/lib/types";
import Level from "@/app/_components/level";
import ErrorNotFound from "@/app/_components/error-not-found";
import { useEffect, useState } from "react";

export default function LevelPage({ params }: { params: { id: string } }) {
  // noStore();
  // const tts = await api.tts.convert.query({
  //   text: "The quick brown fox jumps over the lazy dog",
  //   emotion_name: "Default",
  //   person_voice: "Elon Musk",
  // });

  // const isUnlocked = completedLevels.includes(params.id)
  //   || parseInt(params.id) == Math.max(...completedLevels.map((x) => parseInt(x))) + 1;
  // Initialize state with null or undefined to indicate "not loaded"
  const [completedLevels, setCompletedLevels] = useState<Array<string> | null>(
    null,
  );

  useEffect(() => {
    // Retrieve completed levels from localStorage after the component mounts
    const storedCompletedLevels =
      window.localStorage.getItem("completedLevels");
    const parsedCompletedLevels = storedCompletedLevels
      ? JSON.parse(storedCompletedLevels)
      : ["0"];
    setCompletedLevels(parsedCompletedLevels as string[]);
  }, []);

  // If completedLevels is not loaded yet, render null or a loading spinner
  if (completedLevels === null) {
    return null; // or a loading indicator
  }

  const isUnlocked =
    completedLevels.includes(params.id) ||
    parseInt(params.id) ===
      Math.max(...completedLevels.map((x) => parseInt(x))) + 1;

  const level: LevelType = levels[parseInt(params.id) - 1]!;
  return level && isUnlocked ? <Level level={level} /> : <ErrorNotFound />;
}
