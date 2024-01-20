import React, { useEffect, useRef } from 'react'

type MessageProps = {
  message: string
}
export default function Message({message}: MessageProps) {

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [ref])
  
  return (
    <div className="block rounded-e-xl rounded-es-xl bg-accent p-4" ref={ref}>
      {message}
    </div>
  )
}
