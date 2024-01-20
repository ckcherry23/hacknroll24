'use client'

import { Button } from '@/components/ui/button'
import { useActiveCode, useSandpackClient } from '@codesandbox/sandpack-react';
import React from 'react'

type CodeSubmitButtonProps = {
  client: unknown;
  onSubmit: (code: string) => void;
}

export default function CodeSubmitButton({client, onSubmit}: CodeSubmitButtonProps) {
  const {code} = useActiveCode();
  return (
    <Button onClick={() => {
      console.log(client)
      // @ts-expect-error: Just trust me
      if (client && client.errors.length == 0) {
        onSubmit(code)
      } else {
        alert("Don't you dare turn up shoddy work, intern")
      }
    }} className='w-full mt-4'>
      READY FOR REVIEW
    </Button>
  )
}
