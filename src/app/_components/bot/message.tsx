"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { type TelegramMessage } from "@/lib/types";
import React, { useEffect, useRef } from "react";

type MessageProps = {
  telegramMessage: TelegramMessage;
};
export default function Message({ telegramMessage }: MessageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { message, sender, imageUrl } = telegramMessage;
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [ref]);

  return (
    <div className="flex w-full items-start gap-x-2">
      <Avatar>
        <AvatarImage src={imageUrl} alt="Elon Musk" />
      </Avatar>
      <div className="block w-full rounded-e-xl rounded-es-xl bg-primary py-2 px-4" ref={ref}>
        {sender ? <p className='text-xs text-black font-bold'>{sender}</p> : null}
        <p className='text-black'>{message}</p>
      </div>
    </div>
  );
}
