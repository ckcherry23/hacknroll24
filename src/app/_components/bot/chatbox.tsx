"use client";

import React, { useEffect, useState } from "react";
import { LevelType, type ProfileType } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardHeader, Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type ChatboxProps = {
  level: LevelType;
  messages: string[];
};

export default function Chatbox({ level, messages }: ChatboxProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const { name, imageUrl, position } = level;

  const tempProfile: ProfileType = {
    name: "Elon",
    image: "https://github.com/shadcn.png",
    position: "CTO, Tesla",
  };

  useEffect(() => {
    setIsOpen(true);
  }, [messages]);

  return (
    <div className="">
      {isOpen ? (
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <div className="flex flex-row gap-x-4">
                <Avatar>
                  {level.name == "Elon" ? (
                    <Image
                      src={require("../../images/elonmusk.jpg")}
                      alt="Elon Musk"
                      width={50}
                      height={50}
                    />
                  ) : (
                    <>
                      <AvatarImage src={level.imageUrl} alt="@shadcn" />
                      <AvatarFallback>{name}</AvatarFallback>
                    </>
                  )}
                </Avatar>
                <div>
                  <div className="text-base font-bold">{name}</div>
                  <div className="text-base text-gray-200">{position}</div>
                </div>
              </div>
              <Button onClick={() => setIsOpen(false)} variant="secondary">
                X
              </Button>
            </div>
            {/* <div className='text-gray-200 italic font-bold uppercase'>Valuable feedback</div> */}
          </CardHeader>
          <CardContent>
            <div className="flex w-full flex-col">
              <div className="max-h-[600px] flex-grow space-y-4 overflow-y-scroll">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className="block rounded-e-xl rounded-es-xl bg-accent p-4"
                  >
                    {message}
                  </div>
                ))}
                {/* <div className='flex justify-between'>
                  <input type="text" defaultValue='You are not allowed to send messages' className='w-full rounded p-2' disabled={true} />
                  <Button disabled={true} variant='secondary'>Send</Button>
                </div> */}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        // <Button
        //   className="rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        //   onClick={() => setIsOpen(true)}
        //   variant="secondary"
        // >
        //   Open Chatbox
        // </Button>

        <Button
          className="float-right m-auto w-48 rounded-full px-4 py-2 font-bold text-white"
          onClick={() => setIsOpen(true)}
          variant="secondary"
        >
          Open Chatbox
        </Button>
      )}
    </div>
  );
}
