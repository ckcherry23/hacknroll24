'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React, { useState } from 'react'
import { type ProfileType } from '@/lib/types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type ProfileProps = {
  profile: ProfileType
}

export default function Chatbox() {
  const [messages, setMessages] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const tempProfile: ProfileType = {
    name: 'Elon',
    image: 'https://github.com/shadcn.png',
    position: 'CTO, Tesla'
  }

  return (
    <div>
      {
        isOpen
          ? <Card>
            <CardHeader>
              <div className='flex justify-between'>

                <div className='flex flex-row gap-x-4'>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className='text-base font-bold'>Elon Musk</div>
                    <div className='text-base text-gray-700'>CTO, Tesla</div>
                  </div>
                </div>
              <Button onClick={() => setIsOpen(false)}>X</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col'>
                <div className='flex-grow'>
                  {
                    messages.map((message, index) => (
                      <div key={index}>{message}</div>
                    ))
                  }
                </div>
                <div className='flex'>
                  <input type="text" defaultValue='You are not allowed to send messages' disabled={true} />
                  <Button disabled={true} >Send</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          :
          <Button onClick={() => setIsOpen(true)}>Open Chatbox</Button>

      }
    </div>

  )
}
