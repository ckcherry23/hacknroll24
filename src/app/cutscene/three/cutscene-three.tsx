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
import { TelegramMessage } from "@/lib/types";

export default function CutsceneThree() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const delay = messages[messages.length - 1]?.delay ?? 1;

    const totalTime = (delay + 1) * 1000;
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
            You just met the CEO of Tesla. And he acknowledged your efforts!
            Surely now will begin your rise to the top.
            <br />
            <br />
            ...
            <br />
            <br />
            You wake up to the sound of your alarm. Looks like you passed out of
            exhaustion. It is a Sunday, so you are not late for work
          </DialogDescription>
          <DialogFooter>
            <button
              className="btn btn-primary"
              onClick={() => router.push("/end")}
            >
              Finish
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
