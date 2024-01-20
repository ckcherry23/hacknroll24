'use client'
import React, { useState } from 'react'
import Stage from './stage'
import ChatBox from './bot/chatbox'
import { type LevelType } from '@/lib/types'
import { api } from '@/trpc/react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

type LevelProps = {
  level: LevelType
}

export default function Level({level}: LevelProps) {
  const [messages, setMessages] = React.useState<Array<string>>([])
  const [passed, setPassed] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const textMutation = api.openAI.hello.useMutation({
    onSuccess: (data) => {
      console.log("recevied data", data.message);
      const message = JSON.parse(data.message);
      const correctness = message.correctness;
      const newMessages = message.comments
      setMessages((prev) => [...prev, ...newMessages])
      console.log(typeof correctness)
      console.log(correctness)
      if (correctness > level.correctness! * 100) {
        alert("You're hired!")
        setPassed(true);
        setOpen(true);
      } else {
        alert("You're fired!")
      }
    }
  })

  const onSubmit = async (code: string) => {
    const textPrompt = `{
"INTERN_CODE": \`${code}\`,
"CONTEXT": \`${level.contextPrompt}\`,
"SAMPLE_ANSWER": \"${level.sampleAnswer}\",
"SAMPLE_CORRECT_RESPONSE_FORMAT": \"${level.sampleCorrectResponse}\",
"SAMPLE_WRONG_RESPONSE_FORMAT": \"${level.sampleWrongResponse}\"
}`

    console.log("text prompt", textPrompt);
    textMutation.mutate({
      message: textPrompt,
      persona: level.persona,
      correctness: level.correctness!,
    })
  }

  const advance = () => {
    router.push(`/level/${parseInt(level.levelNo) + 1}`);
  }

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-row">
        <div className="px-4 py-4 w-[600px] flex flex-col fixed bottom-0 right-0 z-10">
          <ChatBox level={level} messages={messages} />
        </div>
        <div className="flex w-full">

          <Stage level={level} passed={passed} advance={advance} onSubmit={onSubmit}  />
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white"></p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>You are done for the day!</DialogHeader>
            <DialogDescription>A hard day&apos;s work makes even water taste sweet. Due to your successes today, you&apos;ve earned a promotion to {level.promotion}!</DialogDescription>
            <DialogFooter>
              <Button onClick={advance}>Accept Promotion</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* <audio
          src={tts.data.oss_url}
          preload="auto"
          style={{ display: "none" }}
          autoPlay
        ></audio> */}
      </div>
    </main>
  );
}
