import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Terminal from "./_components/terminal";

export default async function Home() {
  noStore();

  // const tts = await api.tts.convert.query({
  //   text: "The quick brown fox jumps over the lazy dog",
  //   emotion_name: "Default",
  //   person_voice: "Elon Musk",
  // });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2">
      <h1 className="font-mono text-8xl">Looks</h1>
      <h1 className="font-mono text-8xl">
        <span className="text-primary">Bad </span>
        To Me
      </h1>

      <h2 className="mb-2 mt-8 text-xl">
        To begin clone, the{" "}
        <a
          className="cursor-pointer font-mono text-blue-500 underline"
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          target="_blank"
          rel="noopener noreferrer"
        >
          lbtm/example
        </a>{" "}
        GitHub repository.
      </h2>
      <Terminal />

      <h1 className="mt-12 text-lg italic text-gray-300">
        Making you tougher for the working world
      </h1>
    </main>
  );
}
