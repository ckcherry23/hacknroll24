"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { type TelegramMessage } from "@/lib/types";
import React, { useEffect, useRef } from "react";

type MessageProps = {
  telegramMessage: TelegramMessage;
};
export default function Message({ telegramMessage }: MessageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { message, sender, imageUrl, delay } = telegramMessage;
  useEffect(() => {
    if (ref.current) {
      setTimeout(() => {
        ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }, delay * 1000 ?? 0)
    }
  }, [ref]);

  return (
    <div className="message flex w-full items-start gap-x-2">
      <Avatar>
        <AvatarImage src={imageUrl} alt="Elon Musk" />
      </Avatar>
      <div className="block w-full rounded-e-xl rounded-es-xl bg-accent pt-2 pb-4 px-4" ref={ref}>
        {sender ? <p className='text-xs font-bold'>{sender}</p> : null}
        <p className=''>{message}</p>
      </div>
    </div>
  );
}
