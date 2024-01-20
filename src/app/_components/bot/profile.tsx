import { Profiler } from 'inspector';
import React from 'react'
import {type ProfileType } from '@/lib/types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type ProfileProps = {
  profile: ProfileType
}

export default function Profile({profile}: ProfileProps) {
  const {name, image, position} = profile;
  return (
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
  )
}
