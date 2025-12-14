'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Users, CheckCircle2 } from 'lucide-react'
import type { PassengerCheckIn } from '@/types'

interface CheckInFormProps {
  passengers: PassengerCheckIn[]
  onConfirm: (data: { passengers: string[]; options: CheckInOptions }) => void
  onCancel: () => void
}

interface CheckInOptions {
  emailBoardingPass: boolean
  smsBoardingPass: boolean
  addBags: boolean
}

export function CheckInForm({ passengers, onConfirm, onCancel }: CheckInFormProps) {
  const [selectedPassengers, setSelectedPassengers] = React.useState<string[]>(
    passengers.map((p) => p.travelerId)
  )
  const [options, setOptions] = React.useState<CheckInOptions>({
    emailBoardingPass: true,
    smsBoardingPass: true,
    addBags: false,
  })

  const handleTogglePassenger = (travelerId: string) => {
    setSelectedPassengers((prev) =>
      prev.includes(travelerId)
        ? prev.filter((id) => id !== travelerId)
        : [...prev, travelerId]
    )
  }

  const handleConfirm = () => {
    onConfirm({ passengers: selectedPassengers, options })
  }

  return (
    <Card>
      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
            <Users className="h-5 w-5" />
            Select Passengers
          </h3>
          <p className="text-sm text-text-secondary mt-1">
            Choose which passengers to check in for this flight
          </p>
        </div>

        {/* Passenger Selection */}
        <div className="space-y-3">
          {passengers.map((passenger) => (
            <div
              key={passenger.travelerId}
              className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-bg-secondary transition-colors cursor-pointer"
              onClick={() => handleTogglePassenger(passenger.travelerId)}
            >
              <div>
                <p className="font-medium text-text-primary">{passenger.name}</p>
                <p className="text-sm text-text-tertiary">
                  Seat: {passenger.seat || 'Not assigned'}
                </p>
              </div>
              <div
                className={cn(
                  'h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all',
                  selectedPassengers.includes(passenger.travelerId)
                    ? 'border-primary-500 bg-primary-500'
                    : 'border-border'
                )}
              >
                {selectedPassengers.includes(passenger.travelerId) && (
                  <CheckCircle2 className="h-4 w-4 text-white" />
                )}
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Check-in Options */}
        <div className="space-y-4">
          <h4 className="font-medium text-text-primary">Check-in Options</h4>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-bp" className="text-sm font-normal">
                Email boarding pass
              </Label>
              <p className="text-xs text-text-tertiary">Receive boarding pass via email</p>
            </div>
            <Switch
              id="email-bp"
              checked={options.emailBoardingPass}
              onCheckedChange={(checked) =>
                setOptions((prev) => ({ ...prev, emailBoardingPass: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="sms-bp" className="text-sm font-normal">
                SMS boarding pass
              </Label>
              <p className="text-xs text-text-tertiary">Receive boarding pass via SMS</p>
            </div>
            <Switch
              id="sms-bp"
              checked={options.smsBoardingPass}
              onCheckedChange={(checked) =>
                setOptions((prev) => ({ ...prev, smsBoardingPass: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="add-bags" className="text-sm font-normal">
                Add checked baggage
              </Label>
              <p className="text-xs text-text-tertiary">Purchase additional baggage allowance</p>
            </div>
            <Switch
              id="add-bags"
              checked={options.addBags}
              onCheckedChange={(checked) =>
                setOptions((prev) => ({ ...prev, addBags: checked }))
              }
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4">
          <Button variant="ghost" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirm}
            disabled={selectedPassengers.length === 0}
            className="flex-1"
          >
            Confirm Check-in ({selectedPassengers.length})
          </Button>
        </div>
      </div>
    </Card>
  )
}
