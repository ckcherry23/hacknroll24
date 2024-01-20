import { Card, CardHeader, CardDescription } from '@/components/ui/card'
import React from 'react'
import Image from 'next/image';

export default function FailurePage() {
  return (
    <div className='flex justify-center text-center items-center w-screen h-screen px-24'>
    <Card className='py-4'>
      <Image src={"/homeless.png"} alt="Homeless" className='object-cover object-center w-full h-[500px]' width={500} height={250} />
      <CardHeader className='text-4xl font-bold'>You have failed far too many times</CardHeader>
      <CardDescription className='px-6 text-lg pb-6'>
        Your internship was cut short due to poor performance. You never got to see the light of day as a software engineer.
        <br/><br/>
        <p className='text-2xl my-4 text-center font-bold'>BAD END</p>
        <p className='text-6xl text-center w-full mt-4'>💀</p>
      </CardDescription>
    </Card>
  </div>
  )
}
