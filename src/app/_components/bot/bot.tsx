import React from 'react'
import Chatbox from './chatbox'
import { type ProfileType } from '@/lib/types'
import Profile from './profile'

const tempProfile: ProfileType = {
  name: 'Elon',
  image: 'https://github.com/shadcn.png',
  position: 'CTO, Tesla'
}

export default function ChatInterface() {
return (
    <>
      <Profile profile={tempProfile} />
      <Chatbox/>
    </>
  )
}
