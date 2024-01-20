import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { type LevelType } from '@/lib/types'
import React from 'react'

type ProblemProps = {
  level: LevelType
}

export default function ProblemStatement({level}: ProblemProps) {
  const {levelNo, challenge} = level;
  return (
    <Card>
      <CardHeader>
        <h1 className='font-bold text-4xl'>Level: {levelNo}</h1>
      </CardHeader>
      <CardContent>
        <div>{challenge}</div>
      </CardContent>
    </Card>
  )
}
