import type { FlightCheckIn, CheckInStatus, CheckInWindow } from '@/types/check-in'

// Helper function to calculate check-in window
function calculateCheckInWindow(departureTime: string): CheckInWindow {
  const now = new Date()
  const departure = new Date(departureTime)
  const hoursUntilDeparture = (departure.getTime() - now.getTime()) / (1000 * 60 * 60)

  const opensAt = new Date(departure.getTime() - 24 * 60 * 60 * 1000).toISOString()
  const closesAt = new Date(departure.getTime() - 45 * 60 * 1000).toISOString()

  let status: CheckInStatus
  let hoursUntilOpen: number | undefined
  let hoursUntilClose: number | undefined

  if (hoursUntilDeparture > 24) {
    status = 'not_open'
    hoursUntilOpen = hoursUntilDeparture - 24
  } else if (hoursUntilDeparture > 2) {
    status = 'open'
    hoursUntilClose = hoursUntilDeparture - 0.75
  } else if (hoursUntilDeparture > 0.75) {
    status = 'closing_soon'
    hoursUntilClose = hoursUntilDeparture - 0.75
  } else if (hoursUntilDeparture > 0) {
    status = 'closed'
  } else {
    status = 'closed'
  }

  return {
    opensAt,
    closesAt,
    status,
    hoursUntilOpen,
    hoursUntilClose,
  }
}

// Tokyo outbound - check-in open
export const tokyoOutboundCheckIn: FlightCheckIn = {
  flightId: 'flight-ba5-20251115',
  flightNumber: 'BA5',
  airline: 'BA',
  departure: '2025-11-15T13:45:00Z',
  origin: 'LHR',
  destination: 'HND',
  passengers: [
    {
      travelerId: 'user-carlos-001',
      name: 'Carlos Rodriguez',
      status: 'open',
      seat: '12A',
    },
    {
      travelerId: 'family-maria-001',
      name: 'Maria Rodriguez',
      status: 'open',
      seat: '12B',
    },
    {
      travelerId: 'family-diego-001',
      name: 'Diego Rodriguez',
      status: 'open',
      seat: '13A',
    },
    {
      travelerId: 'family-sofia-001',
      name: 'Sofia Rodriguez',
      status: 'open',
      seat: '13B',
    },
    {
      travelerId: 'family-elena-001',
      name: 'Elena Rodriguez',
      status: 'open',
      seat: '14A',
    },
  ],
  window: calculateCheckInWindow('2025-11-15T13:45:00Z'),
  bookingReference: 'ABC123',
  groupCheckIn: true,
}

// Tokyo return - check-in not open yet
export const tokyoReturnCheckIn: FlightCheckIn = {
  flightId: 'flight-ba6-20251122',
  flightNumber: 'BA6',
  airline: 'BA',
  departure: '2025-11-22T11:10:00+09:00',
  origin: 'HND',
  destination: 'LHR',
  passengers: [
    {
      travelerId: 'user-carlos-001',
      name: 'Carlos Rodriguez',
      status: 'not_open',
      seat: '11A',
    },
    {
      travelerId: 'family-maria-001',
      name: 'Maria Rodriguez',
      status: 'not_open',
      seat: '11B',
    },
    {
      travelerId: 'family-diego-001',
      name: 'Diego Rodriguez',
      status: 'not_open',
      seat: '12A',
    },
    {
      travelerId: 'family-sofia-001',
      name: 'Sofia Rodriguez',
      status: 'not_open',
      seat: '12B',
    },
    {
      travelerId: 'family-elena-001',
      name: 'Elena Rodriguez',
      status: 'not_open',
      seat: '13A',
    },
  ],
  window: calculateCheckInWindow('2025-11-22T11:10:00+09:00'),
  bookingReference: 'ABC123',
  groupCheckIn: true,
}

// NYC return - check-in open
export const nycReturnCheckIn: FlightCheckIn = {
  flightId: 'flight-ba178-20251218',
  flightNumber: 'BA178',
  airline: 'BA',
  departure: '2025-12-18T20:15:00-05:00',
  origin: 'JFK',
  destination: 'LHR',
  passengers: [
    {
      travelerId: 'user-carlos-001',
      name: 'Carlos Rodriguez',
      status: 'open',
      seat: '3A',
    },
  ],
  window: calculateCheckInWindow('2025-12-18T20:15:00-05:00'),
  bookingReference: 'XYZ789',
  groupCheckIn: false,
}

export const mockCheckIns = {
  'flight-ba5-20251115': tokyoOutboundCheckIn,
  'flight-ba6-20251122': tokyoReturnCheckIn,
  'flight-ba178-20251218': nycReturnCheckIn,
}
