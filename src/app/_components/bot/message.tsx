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
    setTimeout(
      () => {
        if (ref.current) {
          ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
      },
      (delay ?? 1) * 1000 ?? 0,
    );
  }, [ref]);

  return (
    <div className="message flex w-full items-start gap-x-2">
      <Avatar>
        <AvatarImage
          src={imageUrl}
          width={100}
          height={100}
          className="object-cover"
          alt="Elon Musk"
        />
      </Avatar>
      <div
        className="block w-full rounded-e-xl rounded-es-xl bg-accent px-4 pb-4 pt-2"
        ref={ref}
      >
        {sender ? <p className="text-xs font-bold">{sender}</p> : null}
        <p className="">{message}</p>
      </div>
    </div>
  );
}
