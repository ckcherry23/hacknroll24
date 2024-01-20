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
      <div
        className="block w-full rounded-e-xl rounded-es-xl bg-[#179CDE] px-4 py-2"
        ref={ref}
      >
        {sender ? (
          <p className="text-xs font-bold text-white">{sender}</p>
        ) : null}
        <p className="text-white">{message}</p>
      </div>
    </div>
  );
}
