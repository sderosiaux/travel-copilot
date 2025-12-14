'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { TripTimeline } from '@/types/trip'
import type { FlightStatus } from '@/types/flight'
import {
  Plane,
  Hotel,
  Calendar,
  Car,
  MapPin,
  Clock,
  ChevronRight,
  CheckCircle2,
  Circle,
  XCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface TimelineEventProps {
  event: TripTimeline
  isFirst?: boolean
  isLast?: boolean
  isCurrent?: boolean
  onViewDetails?: (event: TripTimeline) => void
}

export function TimelineEvent({
  event,
  isFirst = false,
  isLast = false,
  isCurrent = false,
  onViewDetails,
}: TimelineEventProps) {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'flight':
        return <Plane size={20} />
      case 'hotel':
        return <Hotel size={20} />
      case 'activity':
        return <Calendar size={20} />
      case 'transfer':
        return <Car size={20} />
      case 'milestone':
        return <MapPin size={20} />
      default:
        return <Circle size={20} />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 size={16} className="text-success" />
      case 'in_progress':
        return <Circle size={16} className="text-primary-500 fill-primary-500" />
      case 'cancelled':
        return <XCircle size={16} className="text-error" />
      default:
        return <Circle size={16} className="text-text-tertiary" />
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success'
      case 'in_progress':
        return 'primary'
      case 'cancelled':
        return 'error'
      default:
        return 'default'
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case 'flight':
        return 'text-primary-500 bg-primary-500/10'
      case 'hotel':
        return 'text-info bg-info/10'
      case 'activity':
        return 'text-success bg-success/10'
      case 'transfer':
        return 'text-warning bg-warning/10'
      case 'milestone':
        return 'text-error bg-error/10'
      default:
        return 'text-text-tertiary bg-bg-secondary'
    }
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-GB', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })
  }

  // Type definitions for event details
  interface FlightDetailsType {
    origin?: string
    destination?: string
    flightNumber?: string
    status?: FlightStatus
  }
  interface HotelDetailsType {
    hotelName?: string
    checkIn?: string
    checkOut?: string
  }

  // Cast details to proper types based on event type
  const flightDetails = event.type === 'flight' ? (event.details as FlightDetailsType | undefined) : undefined
  const hotelDetails = event.type === 'hotel' ? (event.details as HotelDetailsType | undefined) : undefined
  const flightStatus = flightDetails?.status

  return (
    <div className="flex gap-4 group">
      {/* Timeline connector */}
      <div className="flex flex-col items-center">
        {/* Icon */}
        <div
          className={cn(
            'flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all',
            getEventColor(event.type),
            isCurrent && 'ring-4 ring-primary-500/20 scale-110',
            event.status === 'completed' && 'border-success',
            event.status === 'cancelled' && 'border-error opacity-50'
          )}
        >
          {getEventIcon(event.type)}
        </div>

        {/* Connector line */}
        {!isLast && (
          <div
            className={cn(
              'w-0.5 flex-1 min-h-[60px] transition-all',
              event.status === 'completed'
                ? 'bg-success'
                : event.status === 'cancelled'
                ? 'bg-error/30'
                : 'bg-border'
            )}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <Card
          className={cn(
            'transition-all hover:shadow-md',
            isCurrent && 'border-primary-500 border-2 shadow-lg',
            event.status === 'cancelled' && 'opacity-60'
          )}
        >
          <CardContent className="pt-4">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-lg font-semibold text-text-primary">
                    {event.title}
                  </h4>
                  {getStatusIcon(event.status)}
                </div>
                {event.description && (
                  <p className="text-sm text-text-secondary">{event.description}</p>
                )}
              </div>
              <Badge variant={getStatusBadgeVariant(event.status)} className="text-xs">
                {event.status.replace('_', ' ')}
              </Badge>
            </div>

            {/* Time and Location */}
            <div className="flex flex-wrap gap-4 text-sm mb-3">
              <div className="flex items-center gap-2 text-text-secondary">
                <Clock size={16} className="text-text-tertiary" />
                <span>{formatTime(event.timestamp)}</span>
                <span className="text-text-tertiary">•</span>
                <span className="text-text-tertiary">{formatDate(event.timestamp)}</span>
              </div>
              {event.location && (
                <div className="flex items-center gap-2 text-text-secondary">
                  <MapPin size={16} className="text-text-tertiary" />
                  <span>{event.location}</span>
                </div>
              )}
            </div>

            {/* Flight-specific info */}
            {flightDetails && (
              <div className="space-y-2 pt-3 border-t border-border">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-text-tertiary">From: </span>
                    <span className="text-text-primary font-medium">
                      {flightDetails.origin}
                    </span>
                  </div>
                  <div>
                    <span className="text-text-tertiary">To: </span>
                    <span className="text-text-primary font-medium">
                      {flightDetails.destination}
                    </span>
                  </div>
                  <div>
                    <span className="text-text-tertiary">Flight: </span>
                    <span className="text-text-primary font-medium">
                      {flightDetails.flightNumber}
                    </span>
                  </div>
                  {flightStatus && (
                    <div>
                      <Badge variant={flightStatus as any} className="text-xs">
                        {flightStatus}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Hotel-specific info */}
            {hotelDetails && (
              <div className="space-y-2 pt-3 border-t border-border">
                <div className="text-sm space-y-1">
                  {hotelDetails.hotelName && (
                    <div>
                      <span className="text-text-tertiary">Hotel: </span>
                      <span className="text-text-primary font-medium">
                        {hotelDetails.hotelName}
                      </span>
                    </div>
                  )}
                  {hotelDetails.checkIn && hotelDetails.checkOut && (
                    <div className="flex gap-4">
                      <div>
                        <span className="text-text-tertiary">Check-in: </span>
                        <span className="text-text-primary">
                          {formatTime(hotelDetails.checkIn)}
                        </span>
                      </div>
                      <div>
                        <span className="text-text-tertiary">Check-out: </span>
                        <span className="text-text-primary">
                          {formatTime(hotelDetails.checkOut)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Actions */}
            {onViewDetails && (
              <div className="pt-3 mt-3 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewDetails(event)}
                  className="gap-2"
                >
                  View Details
                  <ChevronRight size={16} />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
