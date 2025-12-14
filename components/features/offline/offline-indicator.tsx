'use client'

import { useEffect, useState } from 'react'
import { WifiOff, Wifi } from 'lucide-react'
import { useOfflineStore } from '@/lib/store/offline-store'
import { Badge } from '@/components/ui'

export function OfflineIndicator() {
  const isOnline = useOfflineStore((state) => state.isOnline)
  const setOnlineStatus = useOfflineStore((state) => state.setOnlineStatus)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleOnline = () => setOnlineStatus(true)
    const handleOffline = () => setOnlineStatus(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Set initial status
    setOnlineStatus(navigator.onLine)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [setOnlineStatus])

  useEffect(() => {
    if (!isOnline) {
      setShow(true)
    } else {
      // Show "back online" message briefly
      const timer = setTimeout(() => setShow(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [isOnline])

  if (!show) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-2 duration-300">
      <Badge
        variant={isOnline ? 'default' : 'error'}
        className="flex items-center gap-2 px-4 py-2 text-sm shadow-lg"
      >
        {isOnline ? (
          <>
            <Wifi className="h-4 w-4" />
            <span>Back online</span>
          </>
        ) : (
          <>
            <WifiOff className="h-4 w-4" />
            <span>You are offline</span>
          </>
        )}
      </Badge>
    </div>
  )
}
