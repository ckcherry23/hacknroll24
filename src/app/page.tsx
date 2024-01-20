'use client';
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Terminal from "./_components/terminal";
import { motion } from "framer-motion";

export default function Home() {
  noStore();

  // const tts = await api.tts.convert.query({
  //   text: "The quick brown fox jumps over the lazy dog",
  //   emotion_name: "Default",
  //   person_voice: "Elon Musk",
  // });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2 font-bold">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
      <h1 className="text-8xl">
        Looks<span className="text-primary">Bad</span>ToMe
      </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="w-full flex justify-center"
      >
        <h1 className="mt-4 text-lg italic text-gray-300">
          Making you tougher for the working world
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 2 }}
      >
      <h2 className="mb-2 mt-12 text-xl">
        To begin, clone the{" "}
        <a
          className="cursor-pointer font-mono text-blue-500 underline"
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          target="_blank"
          rel="noopener noreferrer"
        >
          lbtm
        </a>{" "}
        Git repository.
      </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        
        transition={{ duration: 0.5, delay: 2.5 }}
        className="w-full flex justify-center"
      >
      <Terminal />
      </motion.div>
    </main>
  );
}
