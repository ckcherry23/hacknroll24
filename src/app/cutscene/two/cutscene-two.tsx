"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Message from "../../_components/bot/message";
import { messages } from "./messages";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import Cutscene from "@/app/_components/cutscene";

export default function CutsceneOne() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const delay = messages[messages.length - 1]?.delay ?? 1;
    const totalTime = (delay + 1) * 1000;
    console.log(messages);
    console.log(totalTime);
    setTimeout(() => {
      setOpen(true);
    }, totalTime);
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>Another day, another day</DialogHeader>
          <DialogDescription>
            It&apos;s your first all-nighter. You&apos;re busy trying to finish
            your project and Sarah&apos;s. You start to regrest offering to help
            her. Is she taking advantage of you? It&apos;s too late to think
            about it anyway
            <br />
            <br />
            ...
            <br />
            <br />
            You wake up to the sound of your alarm. Looks like you passed out of
            exhaustion. But luckily you&apos;re already at work, so you&apos;re
            not late. How fortunate.
          </DialogDescription>
          <DialogFooter>
            <button
              className="btn btn-primary"
              onClick={() => router.push("/level-selector")}
            >
              Continue
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Cutscene messages={messages} />
    </div>
  );
}

const animationValue = {
  initial: {
    y: -20,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
  transition: {
    delay: 0.5,
  },
};
