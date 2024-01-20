import { Profiler } from 'inspector';
import React from 'react'
import {LevelType, type ProfileType } from '@/lib/types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type ProfileProps = {
  level: LevelType
}

export default function Profile({level}: ProfileProps) {
  const {name, imageUrl, position} = level;
  return (
    <div className='flex flex-row gap-x-4'>
      <Avatar>
        <AvatarImage src={imageUrl} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <div className='text-base font-bold'>{name}</div>
        <div className='text-base text-gray-200'>{position}</div>
      </div>
    </div>
  )
}
