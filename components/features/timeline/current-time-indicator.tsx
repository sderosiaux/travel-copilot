'use client'

import { useEffect, useState } from 'react'
import { Circle } from 'lucide-react'

export function CurrentTimeIndicator() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="relative flex items-center gap-3 py-2 animate-pulse-slow">
      <div className="flex items-center justify-center w-12 h-12">
        <Circle size={12} className="fill-primary-500 text-primary-500" />
      </div>
      <div className="flex-1 flex items-center gap-3">
        <div className="h-0.5 flex-1 bg-gradient-to-r from-primary-500 to-transparent" />
        <div className="px-3 py-1 bg-primary-500 text-white rounded-full text-xs font-semibold whitespace-nowrap">
          Now - {formatTime(currentTime)}
        </div>
        <div className="h-0.5 flex-1 bg-gradient-to-l from-primary-500 to-transparent" />
      </div>
    </div>
  )
}
