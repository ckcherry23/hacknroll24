'use client'

import { motion } from 'framer-motion'
import React from 'react'
import Message from '../_components/bot/message'
import { messages } from './one/messages'
import { ScrollArea } from '@/components/ui/scroll-area'
import Image from 'next/image'

export default function CutsceneOne() {
  return (
    <>
    <div className='relative w-[390px]'>
        <div className='z-10 relative'>
        <Image src={"/iphone.png"} className='max-h-screen' width={390} height={844} alt="iphone"/>
        </div>
        <div className='bg-white absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[350px] h-[720px]'>
          <div className='pt-5 bg-primary'></div> 
          <div className='bg-primary font-bold pt-2 pb-1 text-center text-black'>Company A</div>
          <div className='text-italic text-gray-700 text-sm text-center bg-primary pb-1'>32 members</div>
          <ScrollArea className='h-[650px] px-6 py-6 overflow-scroll'>
            {messages.map((message, index) => (
              <motion.div key={index} 
                className='mb-4 flex w-full flex-col gap-2'
                animate={{y: 0, opacity: 1}} 
                initial={{y: -20, opacity: 0}} 
                transition={{
                  duration: 0.5,
                  delay: message.delay,
                }}>
                <Message  telegramMessage={message} />
              </motion.div>
            ))}
          </ScrollArea>
        </div>
      </div>
    </>
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
