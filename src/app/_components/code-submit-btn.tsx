'use client'

import { Button } from '@/components/ui/button'
import { useActiveCode } from '@codesandbox/sandpack-react';
import React from 'react'

type CodeSubmitButtonProps = {
  onSubmit: (code: string) => void;
}

export default function CodeSubmitButton({onSubmit}: CodeSubmitButtonProps) {
  const {code} = useActiveCode();
  return (
    <Button onClick={() => onSubmit(code)} className='w-full mt-4'>
      READY FOR REVIEW
    </Button>
  )
}
