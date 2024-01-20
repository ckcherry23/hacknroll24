import { motion, stagger, useAnimate } from 'framer-motion'
import React, { useEffect } from 'react'
import Message from './bot/message'
import { ScrollArea } from '@/components/ui/scroll-area'
import Image from 'next/image';
import { type TelegramMessage } from '@/lib/types';

export default function Cutscene({messages}: {messages: TelegramMessage[]}) {
  // const [scope, animate] = useAnimate();
  // useEffect(() => {
  //   animate(".message", {
  //     opacity: 1,
  //     y: 0,
  //   })
  //   stagger(0.5);
  // }, [])
  
  return (
    <div className='relative w-[390px] flex flex-col justify-center items-center'>
        <div className='z-10 relative'>
        <Image src={"/iphone.png"} className='max-h-screen' width={390} height={844} alt="iphone"/>
        </div>
        <div className='bg-stone-700 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[350px] h-[720px]'>
          <div className='pt-5 bg-primary'></div> 
          <div className='bg-primary font-bold pt-2 pb-1 text-center text-black'>Tesla</div>
          <div className='text-italic text-gray-700 text-sm text-center bg-primary pb-1'>32 members</div>
          <ScrollArea className='h-[650px] px-6 py-6 overflow-scroll relative'>
            {messages.map((message, index) => (
              <motion.div key={index} 
                className='mb-4 flex w-full flex-col gap-2 relative'
                initial={{y: 20, opacity: 0}} 
                animate={{y: 0, opacity: 1}} 
                transition={{
                  duration: 0.5,
                  delay: message.delay,
                }}>
                <Message key={index} telegramMessage={message} />
              </motion.div>
            ))}
          </ScrollArea>
        </div>
    </div>
  )
}
