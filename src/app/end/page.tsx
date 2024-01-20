import { Card, CardDescription, CardHeader } from '@/components/ui/card'
import React from 'react'
import Image from 'next/image';

export default function EndPage() {
  return (
    <div className='flex justify-center text-center items-center w-screen min-h-screen px-24'>
      <Card className='py-4'>
        <Image src={"/depressed.jpeg"} alt="Depressed" className='object-cover object-top w-full h-[500px]' width={500} height={250} />
        <CardHeader className='text-4xl font-bold'>You never did reach senior software engineer intern</CardHeader>
        <CardDescription className='px-6 text-lg pb-6'>
          Although you managed to get a full-time internship at Tesla, your tenure seemed to be indefinite as you never got promoted to a full-time software engineer.
          <br/><br/>
          <p className='text-2xl my-4 text-center font-bold'>CODE MONKEY END</p>
          <p className='text-6xl text-center w-full mt-4'>🧑🏻‍💻🐒</p>

        </CardDescription>
      </Card>
    </div>
  )
}
