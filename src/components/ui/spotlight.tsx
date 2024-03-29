// Credits: https://github.com/cruip/cruip-tutorials-next/blob/main/components/spotlight.tsx
import React, { useRef, useState, useEffect } from 'react'
import MousePosition from '../utils/mouse-position'

type SpotlightProps = {
  children: React.ReactNode
  className?: string
}

export default function Spotlight({
  children,
  className = '',
}: SpotlightProps) {

  const containerRef = useRef<HTMLDivElement>(null)
  const mousePosition = MousePosition()
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const containerSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 })
  const [boxes, setBoxes] = useState<Array<HTMLElement>>([])

  useEffect(() => {
    containerRef.current && setBoxes(Array.from(containerRef.current.children).map((el) => el as HTMLElement))
    boxes.forEach((box) => {
      console.log(box.getBoundingClientRect().right)
      const boxX = box.getBoundingClientRect().right / 2
      const boxY = box.getBoundingClientRect().bottom / 2
      box.style.setProperty('--mouse-x', `${boxX}px`)
      box.style.setProperty('--mouse-y', `${boxY}px`)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    initContainer()
    window.addEventListener('resize', initContainer)

    return () => {
      window.removeEventListener('resize', initContainer)
    }
  }, [setBoxes])

  useEffect(() => {
    onMouseMove()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mousePosition])

  const initContainer = () => {
    if (containerRef.current) {
      containerSize.current.w = containerRef.current.offsetWidth
      containerSize.current.h = containerRef.current.offsetHeight
    }
  }

  const onMouseMove = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const { w, h } = containerSize.current
      const x = mousePosition.x - rect.left
      const y = mousePosition.y - rect.top
      const inside = x < w && x > 0 && y < h && y > 0
      if (inside) {
        mouse.current.x = x
        mouse.current.y = y
        boxes.forEach((box) => {
          const boxX = -(box.getBoundingClientRect().left - rect.left) + mouse.current.x
          const boxY = -(box.getBoundingClientRect().top - rect.top) + mouse.current.y
          box.style.setProperty('--mouse-x', `${boxX}px`)
          box.style.setProperty('--mouse-y', `${boxY}px`)
        })
      }
    }
  }

  return (
    <div className={className} ref={containerRef}>{children}</div>
  )
}

type SpotlightCardProps = {
  children: React.ReactNode,
  className?: string
}

export function SpotlightCard({
  children,
  className = ''
}: SpotlightCardProps) {
  return <div className={`relative h-full p-px 
  before:absolute before:w-96 before:h-96 before:-left-48 before:-top-48 before:bg-primary/50 before:opacity-20 before:pointer-events-none before:transition-opacity before:duration-500 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:group-hover:opacity-20 before:z-10 before:blur-[200px] 
  after:absolute after:w-96 after:h-96 after:-left-48 after:-top-48 after:bg-primary/50 after:opacity-10 after:pointer-events-none after:transition-opacity after:duration-500 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:hover:opacity-20 after:z-30 after:blur-[100px] 
  overflow-hidden ${className}`}>
    {children}
  </div>
}
