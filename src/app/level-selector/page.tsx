import {levels} from "@/levels";
import LevelPreview from "./level-preview";

export default async function LevelSelector() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-center bg-[url('/bg.jpeg')] bg-contain">
      <div className="flex items-start justify-start">
        <div className="overflow-x-scroll hide-scroll-bar p-40">
          <div className="h-[1px] bg-white w-[3000px] px-20"></div>
          <div className="flex justify-start">
          {
            levels.map((level, index) => {
              return (
                <LevelPreview key={index} levelNo={level.levelNo} />
              );
            })
          }
          </div>
        </div>
      </div>
    </main>
  );
}
