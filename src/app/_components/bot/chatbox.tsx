"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type LevelType, type ProfileType } from "@/lib/types";
import Image from "next/image";
import { MessageSquare } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Message from "./message";

type ChatboxProps = {
  level: LevelType;
  messages: string[];
};

export default function Chatbox({ level, messages }: ChatboxProps) {
  const { name, imageUrl, position } = level;
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setOpen(true);
  }, [messages]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className="w-32 rounded-full px-4 py-2 text-xl font-bold"
          variant="secondary"
          onClick={() => setOpen(!open)}
        >
          <MessageSquare className="mr-2 inline-block" />
          Chat
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[35vw] max-w-xl">
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <div className="flex flex-row gap-x-4">
                <Avatar>
                      <AvatarImage className="object-cover" width={100} height={100} src={level.imageUrl} alt="@shadcn" />
                      <AvatarFallback>{name}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-base font-bold">{name}</div>
                  <div className="text-base text-gray-200">{position}</div>
                </div>
              </div>
            </div>
            {/* <div className='text-gray-200 italic font-bold uppercase'>Valuable feedback</div> */}
          </CardHeader>
          <CardContent className="max-h-96 pr-0">
            <ScrollArea className="h-72 gap-4 pr-6">
              <div className="flex w-full flex-col gap-2">
                {messages.map((message, index) => (
                  <Message key={index} telegramMessage={{
                    sender: level.name,
                    message: message,
                    imageUrl: level.imageUrl,
                  }}/>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
