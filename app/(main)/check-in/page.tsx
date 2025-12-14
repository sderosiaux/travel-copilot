'use client'

import { useState } from 'react'
import { CheckInList, BoardingPassDisplay } from '@/components/features/check-in'
import { EmptyState } from '@/components/shared/empty-state'
import { Skeleton } from '@/components/ui/skeleton'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { mockCheckIns } from '@/data'
import { CheckSquare, CheckCircle2 } from 'lucide-react'
import type { BoardingPass } from '@/types'

export default function CheckInPage() {
  const [isLoading] = useState(false)
  const [selectedBoardingPass, setSelectedBoardingPass] = useState<BoardingPass | null>(null)

  const checkIns = Object.values(mockCheckIns)

  const handleCheckIn = (flightId: string) => {
    // Simulate check-in process
    const checkIn = mockCheckIns[flightId as keyof typeof mockCheckIns]
    if (!checkIn) return

    // Create mock boarding pass for first passenger
    const firstPassenger = checkIn.passengers[0]
    const mockBoardingPass: BoardingPass = {
      id: `bp-${flightId}`,
      passengerName: firstPassenger.name,
      flightNumber: checkIn.flightNumber,
      date: checkIn.departure,
      from: checkIn.origin,
      to: checkIn.destination,
      seat: firstPassenger.seat || '12A',
      boardingTime: new Date(new Date(checkIn.departure).getTime() - 45 * 60 * 1000)
        .toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      gate: 'A23',
      terminal: '5',
      bookingReference: checkIn.bookingReference,
      barcode: `${checkIn.bookingReference}${firstPassenger.travelerId.slice(-4)}`,
      class: 'Business',
    }

    setSelectedBoardingPass(mockBoardingPass)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-5 w-96" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="container mx-auto p-6 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-500/10">
              <CheckSquare size={24} className="text-primary-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-text-primary">Check-in</h1>
              <p className="text-text-secondary">
                Check in for your upcoming flights and get your boarding passes
              </p>
            </div>
          </div>
        </div>

        {checkIns.length === 0 ? (
          <EmptyState
            icon={<CheckSquare size={32} />}
            title="No flights available for check-in"
            description="You don't have any upcoming flights. Check-in typically opens 24 hours before departure."
          />
        ) : (
          <div className="space-y-6">
            {/* Info Banner */}
            <div className="bg-info/10 border border-info/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-info flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-text-primary">
                    Check-in opens 24 hours before departure
                  </p>
                  <p className="text-xs text-text-secondary">
                    Save time at the airport by checking in online. You'll receive your boarding
                    passes via email and SMS.
                  </p>
                </div>
              </div>
            </div>

            <CheckInList checkIns={checkIns} onCheckIn={handleCheckIn} />
          </div>
        )}
      </div>

      {/* Boarding Pass Dialog */}
      <Dialog open={!!selectedBoardingPass} onOpenChange={() => setSelectedBoardingPass(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Boarding Pass</DialogTitle>
          </DialogHeader>
          {selectedBoardingPass && <BoardingPassDisplay boardingPass={selectedBoardingPass} />}
        </DialogContent>
      </Dialog>
    </>
  )
}
