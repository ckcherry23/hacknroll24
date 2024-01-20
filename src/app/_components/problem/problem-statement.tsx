import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { type LevelType } from '@/lib/types'
import { time } from 'console';
import React, { useEffect, useState } from 'react'

type ProblemProps = {
  level: LevelType
}

export default function ProblemStatement({ level }: ProblemProps) {
  const { levelNo, challenge } = level;
  return (
    <Card>
      <CardHeader>
        <div className='flex justify-between items-center'>
        <h1 className='font-bold text-4xl'>Level: {levelNo}</h1>
        <Timer />
        </div>
      </CardHeader>
      <CardContent>
        <div className='flex'>
          <div>{challenge}</div>
        </div>
      </CardContent>
    </Card >
  )
}

function Timer() {
  const [timeLeft, setTimeLeft] = useState(60 * 5)

  // Use the useEffect hook to set up the timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(timeLeft => timeLeft - 1)
    }, 1000)

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='flex'>
      <div className="text-6xl text-center flex w-full items-center justify-center">
        <div className="w-24 mx-1 p-2 bg-accent text-primary rounded-lg">
          <div className="font-mono leading-none" x-text="minutes">0{Math.round(timeLeft/60)}</div>
          <div className="font-mono uppercase text-sm leading-none">Minutes</div>
        </div>
        <div className="w-24 mx-1 p-2 bg-accent text-primary rounded-lg">
          <div className="font-mono leading-none" x-text="seconds">{Math.round(timeLeft%60)}</div>
          <div className="font-mono uppercase text-sm leading-none">Seconds</div>
        </div>
      </div>
    </div>
  )
}
