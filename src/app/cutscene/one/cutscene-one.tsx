'use client'

import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import Message from '../../_components/bot/message'
import { messages } from './messages'
import { ScrollArea } from '@/components/ui/scroll-area'
import Image from 'next/image'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation'
import Cutscene from '@/app/_components/cutscene'

export default function CutsceneOne() {
  const [open, setOpen] = useState(false)
  const router = useRouter();
  useEffect(() => {
    const totalTime = (messages[messages.length-1]?.delay ?? 0 + 1) * 1000;
    console.log(messages);
    console.log(totalTime)
    setTimeout(() => {
      setOpen(true);
    }, totalTime)
  }, [])

  return (
    <div className='w-full flex flex-col justify-center items-center'>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>Another day, another day</DialogHeader>
        <DialogDescription>
          You doomscroll on TikTok overnight as you are overwhelemed by your first day...
          <br/><br/>
          ...
          <br/><br/>
          You wake up to the sound of your alarm. Looks like you passed out of exhaustion. You are late for work again.
        </DialogDescription>
        <DialogFooter>
          <button className='btn btn-primary' onClick={() => router.push("/level-selector")}>Continue</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <Cutscene messages={messages} />
    </div>
  )
}


const animationValue = {
  initial: {
    y: -20,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
  transition: {
    delay: 0.5,
  }
}
