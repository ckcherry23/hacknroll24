'use client'

import React, { useState } from 'react'

export default function Chatbox() {
  const [messages, setMessages] = useState<string[]>([])


  return (
    <div className='my-2 p-4 bg-gray-100 flex flex-grow'>
      Chatbox
    </div>
  )
}
