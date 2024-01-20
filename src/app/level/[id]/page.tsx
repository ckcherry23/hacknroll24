import { levels } from "@/levels"
import { type LevelType } from "@/lib/types";
import Level from "@/app/_components/level";
import ErrorNotFound from "@/app/_components/error-not-found";



export default async function LevelPage({ params }: { params: { id: string } }) {

  // noStore();
  // const tts = await api.tts.convert.query({
  //   text: "The quick brown fox jumps over the lazy dog",
  //   emotion_name: "Default",
  //   person_voice: "Elon Musk",
  // });
  const level: LevelType = levels[parseInt(params.id) - 1]!;
  return (
    level ? <Level level={level} /> : <ErrorNotFound />
  )
}
