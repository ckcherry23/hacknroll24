'use client'

import React, { useEffect, useState } from 'react'
import { LevelType, type ProfileType } from '@/lib/types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CardHeader, Card, CardContent } from '@/components/ui/card';

type ChatboxProps = {
  level: LevelType
  messages: string[]
}

export default function Chatbox({ level, messages }: ChatboxProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const { name, imageUrl, position } = level;

  const tempProfile: ProfileType = {
    name: 'Elon',
    image: 'https://github.com/shadcn.png',
    position: 'CTO, Tesla'
  }

  useEffect(() => {
    setIsOpen(true)
  }, [messages])
}

  