'use client'

import { Button } from '@/components/ui/button'
import { useActiveCode } from '@codesandbox/sandpack-react'
import React from 'react'

export default function CodeSubmitButton() {
  const {code} = useActiveCode();
  return (
    <Button className='bg-black text-white hover:bg-gray-800' 
      onClick={() => console.log("submitting", code)}>
      Submit code
    </Button>
  )
}
