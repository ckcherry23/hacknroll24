'use client'
import React, { useState } from 'react'
import Stage from './stage'
import ChatBox from './bot/chatbox'
import { type LevelType } from '@/lib/types'
import { api } from '@/trpc/react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { levels } from '@/levels'
import { useLocalStorage } from 'usehooks-ts'

type LevelProps = {
  level: LevelType;
};

export default function Level({ level }: LevelProps) {
  const [messages, setMessages] = useState<Array<string>>([]);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [passed, setPassed] = useState(false);
  const [open, setOpen] = useState(false);
  
  const [completedLevels, setCompletedLevels] = useLocalStorage<Array<string>>(
    'completedLevels',
    ["0"],
  );
  const router = useRouter();

  const textMutation = api.openAI.hello.useMutation({
    onSuccess: (data) => {
      console.log(data.audio_url);
      console.log("data", data);
      console.log("recevied data", data.message);
      const message = JSON.parse(data.message);
      const status = message.status;
      const newMessage = message.comment;
      setMessages((prev) => [...prev, newMessage]);
      setAudioUrl(data.audio_url);
      if (status == "PASS") {
        alert("You're hired!");
        setPassed(true);
        setOpen(true);
      } else {
        alert("You're fired!");
      }
    },
  });

  const onSubmit = async (code: string) => {
    const textPrompt = `{
"INTERN_CODE": ${code},
"CONTEXT": ${level.contextPrompt},
"ANSWER": ${level.sampleAnswer},
"SAMPLE_CORRECT_RESPONSE_FORMAT": ${level.sampleCorrectResponse},
}`;

    console.log("text prompt", textPrompt);
    textMutation.mutate({
      message: textPrompt,
      persona: level.persona,
      correctness: level.correctness!,
    });
  };

  const advance = () => {
    setCompletedLevels((prev) => [...prev, level.levelNo]);
    const newLevel = parseInt(level.levelNo)
    if (newLevel < levels.length) {
      router.push(`/level/${newLevel+1}`);
    } else {
      router.push(`/end`)
    }
  }

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-row">
        <div className="fixed bottom-0 right-0 z-10 flex w-[600px] flex-col px-4 py-4">
          <ChatBox level={level} messages={messages} />
        </div>
        <div className="flex w-full">
          <Stage
            level={level}
            passed={passed}
            advance={advance}
            onSubmit={onSubmit}
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white"></p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>You are done for the day!</DialogHeader>
            <DialogDescription className='text-base'>
              A hard day&apos;s work makes even water taste sweet. Due to your successes today, you&apos;ve earned a promotion to <b>{level.promotion}!</b>
              <br/><br/>
              {level.conclusionText}
            </DialogDescription>
            <DialogFooter>
              <Button className='uppercase' onClick={advance}>Accept Promotion</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* <audio
          src={audioUrl}
          preload="auto"
          style={{ display: "none" }}
          autoPlay
        ></audio> */}
      </div>
    </main>
  );
}
