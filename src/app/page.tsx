import { Button } from "@/components/ui/button";
import CodeEditor from "./_components/stage";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[url('/bg.jpeg')] bg-contain">
      <div className="">
        <CodeEditor/>
      </div>
    </main>
  );
}
