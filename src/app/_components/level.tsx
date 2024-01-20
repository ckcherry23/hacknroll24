'use client'
import React from 'react'
import Stage from './stage'
import ChatBox from './bot/chatbox'
import { type LevelType } from '@/lib/types'
import { api } from '@/trpc/react'

type LevelProps = {
  level: LevelType
}

export default function Level({level}: LevelProps) {
  const [messages, setMessages] = React.useState<Array<string>>([])
  
  const textMutation = api.openAI.hello.useMutation({
    onSuccess: (data) => {
      setMessages((prev) => [...prev, data.message])
    }
  })

  const onSubmit = async (code: string) => {
    const textPrompt = `{
"INTERN_CODE": ${code},
"CONTEXT": ${level.contextPrompt},
"ANSWER": ${level.sampleAnswer},
"SAMPLE_CORRECT_RESPONSE_FORMAT": ${level.sampleCorrectResponse},
"SAMPLE_WRONG_RESPONSE": ${level.sampleWrongResponse}
}`

    console.log("text prompt", textPrompt);
    textMutation.mutate({
      message: textPrompt,
      persona: level.persona,
      similarity: level.similarity!,
    })
  }

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-row">
        <div className="px-4 py-4 w-[600px] flex flex-col absolute bottom-0 right-0 z-10">
          <ChatBox level={level} messages={messages} />
        </div>
        <div className="flex w-full">

          <Stage level={level} onSubmit={onSubmit}  />
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white"></p>
        </div>

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
