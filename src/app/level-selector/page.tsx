import { levels } from "@/levels";
import LevelPreview from "./level-preview";

export default async function LevelSelector() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-center bg-[url('/bg.jpeg')] bg-contain">
      <div className="flex items-start justify-start">
        <div className="hide-scroll-bar overflow-x-scroll p-40">
          <div className="h-[1px] w-[3000px] bg-white"></div>
          <div className="flex justify-center items-center gap-8">
            {levels.map((level, index) => {
              return <LevelPreview key={index} level={level} />;
            })}
            <div className="p-4 text-2xl">
              More levels coming soon!
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
