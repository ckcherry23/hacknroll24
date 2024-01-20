'use client'

import { Button } from '@/components/ui/button'
import { type LevelType } from '@/lib/types';
import { api } from '@/trpc/react';
import { useActiveCode } from '@codesandbox/sandpack-react'
import React from 'react'

type CodeSubmitButtonProps = {
  level: LevelType;
}

export default function CodeSubmitButton({level}: CodeSubmitButtonProps) {
  const {code} = useActiveCode();
  const textMutation = api.openAI.hello.useMutation({
    onSuccess: (data) => {
      console.log("data", data)
    }
  })

  const onSubmit = async () => {
    const textPrompt = `
INTERN CODE: ${code}

CONTEXT: ${level.contextPrompt}
    `
    console.log("text prompt", textPrompt);
    // textMutation.mutate({
    //   message: code,
    //   persona: "Colleague",
    // })
  }

  return (
    <Button onClick={() => onSubmit()}>
      Submit code
    </Button>
  )
}
