import { unstable_noStore as noStore } from "next/cache";
import ChatInterface from "./_components/bot/bot";
import Stage from "./_components/stage";
import { api } from "@/trpc/server";
import { type LevelType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <h1>
        Making you tougher for the working world
      </h1>
      <Link href={`level-selector`}><Button>Start</Button></Link>
    </main>
  );
}

