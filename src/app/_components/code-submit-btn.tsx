'use client'

import { Button } from '@/components/ui/button'
import { useActiveCode } from '@codesandbox/sandpack-react';
import React from 'react'

type CodeSubmitButtonProps = {
  client: unknown;
  onSubmit: (code: string) => void;
  loading: boolean;
}

export default function CodeSubmitButton({client, onSubmit, loading}: CodeSubmitButtonProps) {
  const {code} = useActiveCode();
  return (
    <Button 
      disabled={loading}
      onClick={() => {
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
