'use client'

import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import type { MealPreorder } from '@/types/meals'
import { Check, Clock, Utensils, Calendar } from 'lucide-react'

interface PreorderConfirmationProps {
  preorder: MealPreorder
  flightNumber: string
  travelerName: string
}

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-yellow-500', icon: Clock },
  confirmed: { label: 'Confirmed', color: 'bg-green-500', icon: Check },
  delivered: { label: 'Delivered', color: 'bg-blue-500', icon: Check },
  cancelled: { label: 'Cancelled', color: 'bg-red-500', icon: Clock },
}

export function PreorderConfirmation({ preorder, flightNumber, travelerName }: PreorderConfirmationProps) {
  const status = statusConfig[preorder.status]
  const StatusIcon = status.icon

  return (
    <Card className="border-accent-primary">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">Meal Pre-order Confirmed</CardTitle>
            <CardDescription className="mt-1">
              Flight {flightNumber} • {travelerName}
            </CardDescription>
          </div>
          <Badge className={`${status.color} text-white`}>
            <StatusIcon className="mr-1 h-3 w-3" />
            {status.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Meal Details */}
        <div className="rounded-lg bg-bg-secondary p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-accent-primary/10 p-2">
              <Utensils className="h-5 w-5 text-accent-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-text-primary">{preorder.meal.name}</h4>
              <p className="text-sm text-text-secondary mt-1">{preorder.meal.description}</p>
            </div>
          </div>
        </div>

        {/* Special Requests */}
        {preorder.specialRequests && (
          <div className="space-y-2">
            <h5 className="text-sm font-medium text-text-primary">Special Requests</h5>
            <p className="text-sm text-text-secondary">{preorder.specialRequests}</p>
          </div>
        )}

        {/* Order Info */}
        <div className="flex items-center gap-2 text-xs text-text-tertiary">
          <Calendar className="h-3 w-3" />
          <span>
            Ordered on {new Date(preorder.orderDate).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>

        {/* Order ID */}
        <div className="text-xs text-text-tertiary">
          Order ID: {preorder.id}
        </div>
      </CardContent>
    </Card>
  )
}
