import type { Disruption } from '@/types/disruption'

// NYC Trip - BA287 Cancellation
export const nycCancellation: Disruption = {
  id: 'disruption-ba287-001',
  type: 'cancellation',
  severity: 'critical',
  flightId: 'flight-ba287-20251215',
  tripId: 'trip-nyc-001',
  detectedAt: '2025-12-13T08:30:00Z',
  status: 'active',
  details: {
    reason: 'Aircraft technical issue - aircraft requires maintenance',
    originalValue: '2025-12-15T15:20:00Z',
    newValue: 'Cancelled',
    impact: 'Flight cancelled. Rebooking required for all passengers.',
    affectedTravelers: ['user-carlos-001'],
  },
  actions: {
    recommended: [
      'Review alternative flight options',
      'Consider next available BA flight',
      'File EU261 compensation claim',
      'Notify meeting attendees of potential delay',
    ],
    taken: ['Notification sent to passenger', 'Alternative options generated'],
    available: [],
  },
  compensation: {
    id: 'comp-ba287-001',
    disruptionId: 'disruption-ba287-001',
    type: 'eu261',
    status: 'pending',
    eligibility: {
      eligible: true,
      reasoning:
        'Flight cancelled less than 14 days before departure. Distance over 3500km qualifies for €600 compensation under EU261.',
      estimatedAmount: {
        currency: 'EUR',
        amount: 600,
      },
    },
    createdAt: '2025-12-13T08:30:00Z',
    updatedAt: '2025-12-13T08:30:00Z',
  },
  notifications: [
    {
      timestamp: '2025-12-13T08:30:00Z',
      channel: 'push',
      message: 'Your flight BA287 on Dec 15 has been cancelled',
      acknowledged: true,
    },
    {
      timestamp: '2025-12-13T08:31:00Z',
      channel: 'email',
      message: 'Flight BA287 Cancellation - Action Required',
      acknowledged: true,
    },
    {
      timestamp: '2025-12-13T08:32:00Z',
      channel: 'in_app',
      message: 'Alternative options are available for your cancelled flight',
      acknowledged: false,
    },
  ],
  createdAt: '2025-12-13T08:30:00Z',
  updatedAt: '2025-12-13T08:30:00Z',
}

// Tokyo Trip - BA5 Delay (Example)
export const tokyoDelay: Disruption = {
  id: 'disruption-ba5-001',
  type: 'delay',
  severity: 'medium',
  flightId: 'flight-ba5-20251115',
  tripId: 'trip-tokyo-001',
  detectedAt: '2025-11-15T10:00:00Z',
  status: 'monitoring',
  details: {
    reason: 'Air traffic control delays',
    originalValue: '2025-11-15T13:45:00Z',
    newValue: '2025-11-15T15:15:00Z',
    impact: 'Flight delayed by 90 minutes. Monitor for further updates.',
    affectedTravelers: [
      'user-carlos-001',
      'family-maria-001',
      'family-diego-001',
      'family-sofia-001',
      'family-elena-001',
    ],
  },
  actions: {
    recommended: [
      'Continue to airport as planned',
      'Monitor for further updates',
      'Inform hotel of late arrival',
    ],
    taken: ['Notification sent to all travelers'],
    available: [],
  },
  notifications: [
    {
      timestamp: '2025-11-15T10:00:00Z',
      channel: 'push',
      message: 'BA5 delayed by 90 minutes - new departure time 15:15',
      acknowledged: false,
    },
    {
      timestamp: '2025-11-15T10:01:00Z',
      channel: 'in_app',
      message: 'Flight delay detected - monitoring situation',
      acknowledged: false,
    },
  ],
  createdAt: '2025-11-15T10:00:00Z',
  updatedAt: '2025-11-15T10:00:00Z',
}

// Tokyo Trip - Gate Change (Minor)
export const tokyoGateChange: Disruption = {
  id: 'disruption-ba5-002',
  type: 'gate_change',
  severity: 'low',
  flightId: 'flight-ba5-20251115',
  tripId: 'trip-tokyo-001',
  detectedAt: '2025-11-15T12:30:00Z',
  status: 'resolved',
  resolvedAt: '2025-11-15T13:45:00Z',
  details: {
    reason: 'Operational requirements',
    originalValue: 'A23',
    newValue: 'A28',
    impact: 'Gate changed from A23 to A28. Same terminal.',
    affectedTravelers: [
      'user-carlos-001',
      'family-maria-001',
      'family-diego-001',
      'family-sofia-001',
      'family-elena-001',
    ],
  },
  actions: {
    recommended: ['Proceed to new gate A28', 'Allow extra time for wheelchair assistance'],
    taken: ['Notification sent', 'Airport assistance notified of gate change'],
    available: [],
  },
  notifications: [
    {
      timestamp: '2025-11-15T12:30:00Z',
      channel: 'push',
      message: 'Gate change: BA5 now boarding at gate A28',
      acknowledged: true,
    },
    {
      timestamp: '2025-11-15T12:30:00Z',
      channel: 'in_app',
      message: 'Gate changed from A23 to A28',
      acknowledged: true,
    },
  ],
  createdAt: '2025-11-15T12:30:00Z',
  updatedAt: '2025-11-15T13:45:00Z',
}

export const mockDisruptions = {
  nycCancellation,
  tokyoDelay,
  tokyoGateChange,
}
