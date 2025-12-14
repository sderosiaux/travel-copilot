import type { Disruption } from '@/types/disruption'
import type { Notification } from '@/lib/types/notification'

/**
 * Mock disruption data for testing the disruption detection and notification system
 */

export const mockDisruptions: Disruption[] = [
  {
    id: 'disruption_001',
    type: 'delay',
    severity: 'medium',
    flightId: 'flight_123',
    tripId: 'trip_456',
    detectedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
    status: 'active',
    details: {
      reason: 'Air traffic control delays',
      originalValue: '10:00 AM',
      newValue: '10:30 AM',
      impact: 'Your flight is delayed by 30 minutes. New departure time is 10:30 AM.',
      affectedTravelers: ['traveler_001', 'traveler_002'],
    },
    actions: {
      recommended: [
        'Check in online if you haven\'t already',
        'Monitor flight status for further updates',
        'Arrive at the airport at your originally planned time',
      ],
      taken: [],
      available: [],
    },
    notifications: [
      {
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        channel: 'push',
        message: 'Flight UA123 delayed by 30 minutes',
        acknowledged: true,
      },
    ],
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: 'disruption_002',
    type: 'cancellation',
    severity: 'critical',
    flightId: 'flight_789',
    tripId: 'trip_456',
    detectedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    status: 'active',
    details: {
      reason: 'Aircraft maintenance issue',
      impact: 'Your flight has been cancelled. We recommend rebooking as soon as possible.',
      affectedTravelers: ['traveler_001', 'traveler_002'],
    },
    actions: {
      recommended: [
        'Contact the airline immediately for rebooking',
        'Check available alternative flights',
        'Consider filing for compensation if eligible',
      ],
      taken: [],
      available: [
        {
          id: 'rebook_001',
          type: 'same_day',
          flights: [
            {
              flightNumber: 'UA456',
              airline: 'United Airlines',
              departure: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
              arrival: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
              duration: 180,
              stops: 0,
            },
          ],
          cost: {
            currency: 'USD',
            amount: 0,
            breakdown: {
              'Ticket difference': 0,
            },
          },
          availability: {
            seatsAvailable: 8,
            cabinClass: 'Economy',
            seatsTogether: true,
          },
          pros: ['Same day departure', 'Direct flight', 'No additional cost'],
          cons: ['3 hours later than original'],
          copilotRecommendation: {
            score: 95,
            reasoning: 'Best option for same-day travel with no additional cost',
          },
        },
      ],
    },
    compensation: {
      id: 'comp_001',
      disruptionId: 'disruption_002',
      type: 'airline_policy',
      status: 'pending',
      eligibility: {
        eligible: true,
        reasoning: 'Flight cancelled less than 14 days before departure',
        estimatedAmount: {
          currency: 'USD',
          amount: 400,
        },
      },
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    notifications: [
      {
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        channel: 'push',
        message: 'Flight UA789 has been cancelled',
        acknowledged: true,
      },
      {
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        channel: 'email',
        message: 'Flight cancellation notice and rebooking options',
        acknowledged: true,
      },
    ],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'disruption_003',
    type: 'gate_change',
    severity: 'medium',
    flightId: 'flight_456',
    tripId: 'trip_789',
    detectedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
    status: 'active',
    details: {
      reason: 'Operational requirements',
      originalValue: 'Gate B12',
      newValue: 'Gate C24',
      impact: 'Your departure gate has changed from B12 to C24.',
      affectedTravelers: ['traveler_001'],
    },
    actions: {
      recommended: [
        'Proceed to the new gate C24',
        'Allow extra time as the new gate may be farther',
        'Check airport terminal map',
      ],
      taken: [],
      available: [],
    },
    notifications: [
      {
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        channel: 'push',
        message: 'Gate change: Now departing from C24',
        acknowledged: false,
      },
    ],
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
  },
  {
    id: 'disruption_004',
    type: 'missed_connection',
    severity: 'high',
    flightId: 'flight_999',
    tripId: 'trip_456',
    detectedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 minutes ago
    status: 'monitoring',
    details: {
      reason: 'Tight connection time due to incoming flight delay',
      impact: 'You may miss your connecting flight. Only 35 minutes connection time available.',
      affectedTravelers: ['traveler_001', 'traveler_002'],
    },
    actions: {
      recommended: [
        'Request priority boarding on your arriving flight',
        'Have airline app ready for gate information',
        'Consider notifying connecting flight crew',
        'Review alternative flights as backup',
      ],
      taken: [],
      available: [],
    },
    notifications: [
      {
        timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        channel: 'push',
        message: 'Connection risk: Only 35 minutes between flights',
        acknowledged: true,
      },
    ],
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  },
]

/**
 * Mock notifications for testing the notification system
 */
export const mockNotifications: Notification[] = [
  {
    id: 'notif_001',
    type: 'disruption',
    severity: 'critical',
    title: 'Flight Cancelled',
    message: 'Flight UA789 from SFO to JFK has been cancelled due to maintenance issues.',
    tripId: 'trip_456',
    flightId: 'flight_789',
    actionUrl: '/trips/trip_456',
    actionLabel: 'View Rebooking Options',
    read: false,
    dismissed: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif_002',
    type: 'disruption',
    severity: 'medium',
    title: 'Flight Delayed',
    message: 'Flight UA123 is delayed by 30 minutes. New departure: 10:30 AM.',
    tripId: 'trip_456',
    flightId: 'flight_123',
    actionUrl: '/trips/trip_456',
    actionLabel: 'View Details',
    read: false,
    dismissed: false,
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif_003',
    type: 'disruption',
    severity: 'high',
    title: 'Tight Connection Warning',
    message: 'Only 35 minutes between your connecting flights in ORD.',
    tripId: 'trip_456',
    flightId: 'flight_999',
    actionUrl: '/trips/trip_456',
    actionLabel: 'See Recommendations',
    read: false,
    dismissed: false,
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif_004',
    type: 'disruption',
    severity: 'medium',
    title: 'Gate Change',
    message: 'Your flight now departs from Gate C24 (changed from B12).',
    tripId: 'trip_789',
    flightId: 'flight_456',
    actionUrl: '/trips/trip_789',
    actionLabel: 'View Terminal Map',
    read: false,
    dismissed: false,
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif_005',
    type: 'reminder',
    severity: 'low',
    title: 'Check-in Available',
    message: 'Online check-in is now open for your flight tomorrow.',
    tripId: 'trip_123',
    flightId: 'flight_abc',
    actionUrl: '/trips/trip_123',
    actionLabel: 'Check In Now',
    read: true,
    dismissed: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif_006',
    type: 'update',
    severity: 'low',
    title: 'Trip Documents Updated',
    message: 'Your boarding passes and itinerary have been updated.',
    tripId: 'trip_456',
    actionUrl: '/trips/trip_456/documents',
    actionLabel: 'View Documents',
    read: true,
    dismissed: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif_007',
    type: 'action_required',
    severity: 'high',
    title: 'Passport Expiring Soon',
    message: 'Your passport expires in 4 months. Some countries require 6 months validity.',
    actionUrl: '/documents',
    actionLabel: 'Update Passport',
    read: false,
    dismissed: false,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif_008',
    type: 'reminder',
    severity: 'medium',
    title: 'Departure Reminder',
    message: 'Your flight departs in 3 hours. Time to head to the airport!',
    tripId: 'trip_456',
    flightId: 'flight_123',
    actionUrl: '/trips/trip_456',
    actionLabel: 'View Trip',
    read: false,
    dismissed: false,
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
]

/**
 * Utility function to seed notifications in the store
 */
export function seedMockNotifications() {
  if (typeof window === 'undefined') return

  // Only seed if there are no notifications already
  const existingNotifications = localStorage.getItem('travel-copilot-notifications')
  if (existingNotifications) {
    const parsed = JSON.parse(existingNotifications)
    if (parsed?.state?.notifications?.length > 0) {
      return // Already have notifications
    }
  }

  // Seed notifications
  const notificationStore = {
    state: {
      notifications: mockNotifications,
      unreadCount: mockNotifications.filter(n => !n.read && !n.dismissed).length,
    },
    version: 0,
  }

  localStorage.setItem('travel-copilot-notifications', JSON.stringify(notificationStore))
}
