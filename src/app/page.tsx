import { unstable_noStore as noStore } from "next/cache";
import { api } from "@/trpc/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  noStore();

  // const tts = await api.tts.convert.query({
  //   text: "The quick brown fox jumps over the lazy dog",
  //   emotion_name: "Default",
  //   person_voice: "Elon Musk",
  // });

  return (
    <main className="flex min-h-screen flex-col">
      <h1>
        Making you tougher for the working world
      </h1>
      <Link href={`level-selector`}><Button>Start</Button></Link>
    </main>
  );
}

