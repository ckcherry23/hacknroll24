import { levels } from "@/levels";
import LevelPreview from "./level-preview";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default async function LevelSelector() {
  return (
    <div className="flex h-screen select-none items-center justify-center">
      <Carousel>
        <CarouselContent>
          {levels.map((level, index) => {
            return (
              <CarouselItem key={index} className="basis-1/3">
                <LevelPreview level={level} />
              </CarouselItem>
            );
          })}
          <CarouselItem key={levels.length} className="basis-1/3">
            <div className="text-3xl">More levels coming soon!</div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
