import React from 'react'
import Chatbox from './chatbox'
import { LevelType, type ProfileType } from '@/lib/types'
import Profile from './profile'

const tempProfile: ProfileType = {
  name: 'Elon',
  image: 'https://github.com/shadcn.png',
  position: 'CTO, Tesla'
}

type ChatInterfaceProps = {
  level: LevelType
}

export default function ChatInterface({level}: ChatInterfaceProps) {
return (
    <>
      <Profile level={level} />
      <Chatbox/>
    </>
  )
}
