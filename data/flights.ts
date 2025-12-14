import type { Flight } from '@/types'

// Tokyo Trip - Outbound BA5
export const tokyoOutbound: Flight = {
  id: 'flight-ba5-20251115',
  flightNumber: 'BA5',
  airline: 'BA',
  aircraftType: 'Boeing 787-9',
  origin: 'LHR',
  destination: 'HND',
  departure: {
    scheduled: '2025-11-15T13:45:00Z',
    terminal: '5',
    gate: 'A23',
  },
  arrival: {
    scheduled: '2025-11-16T09:15:00+09:00',
    terminal: '3',
  },
  status: 'scheduled',
  duration: 690,
  distance: 9580,
  seats: {
    'user-carlos-001': '12A',
    'family-maria-001': '12B',
    'family-diego-001': '13A',
    'family-sofia-001': '13B',
    'family-elena-001': '14A',
  },
  bookingReference: 'ABC123',
  ticketNumbers: {
    'user-carlos-001': '1251234567890',
    'family-maria-001': '1251234567891',
    'family-diego-001': '1251234567892',
    'family-sofia-001': '1251234567893',
    'family-elena-001': '1251234567894',
  },
  fareBasis: 'JFLX',
  fareClass: 'J',
  createdAt: '2025-09-20T10:00:00Z',
  updatedAt: '2025-11-01T14:30:00Z',
}

// Tokyo Trip - Return BA6
export const tokyoReturn: Flight = {
  id: 'flight-ba6-20251122',
  flightNumber: 'BA6',
  airline: 'BA',
  aircraftType: 'Boeing 787-9',
  origin: 'HND',
  destination: 'LHR',
  departure: {
    scheduled: '2025-11-22T11:10:00+09:00',
    terminal: '3',
    gate: '114',
  },
  arrival: {
    scheduled: '2025-11-22T15:45:00Z',
    terminal: '5',
  },
  status: 'scheduled',
  duration: 755,
  distance: 9580,
  seats: {
    'user-carlos-001': '11A',
    'family-maria-001': '11B',
    'family-diego-001': '12A',
    'family-sofia-001': '12B',
    'family-elena-001': '13A',
  },
  bookingReference: 'ABC123',
  ticketNumbers: {
    'user-carlos-001': '1251234567895',
    'family-maria-001': '1251234567896',
    'family-diego-001': '1251234567897',
    'family-sofia-001': '1251234567898',
    'family-elena-001': '1251234567899',
  },
  fareBasis: 'JFLX',
  fareClass: 'J',
  createdAt: '2025-09-20T10:00:00Z',
  updatedAt: '2025-11-01T14:30:00Z',
}

// NYC Trip - Cancelled BA287
export const nycOutbound: Flight = {
  id: 'flight-ba287-20251215',
  flightNumber: 'BA287',
  airline: 'BA',
  aircraftType: 'Boeing 777-200',
  origin: 'LHR',
  destination: 'JFK',
  departure: {
    scheduled: '2025-12-15T15:20:00Z',
    terminal: '5',
  },
  arrival: {
    scheduled: '2025-12-15T18:45:00-05:00',
    terminal: '7',
  },
  status: 'cancelled',
  duration: 445,
  distance: 5541,
  seats: {
    'user-carlos-001': '2A',
  },
  bookingReference: 'XYZ789',
  ticketNumbers: {
    'user-carlos-001': '1251234560001',
  },
  fareBasis: 'CFLX',
  fareClass: 'C',
  createdAt: '2025-10-10T10:00:00Z',
  updatedAt: '2025-12-13T08:30:00Z',
}

// NYC Trip - Return BA178
export const nycReturn: Flight = {
  id: 'flight-ba178-20251218',
  flightNumber: 'BA178',
  airline: 'BA',
  aircraftType: 'Boeing 777-300ER',
  origin: 'JFK',
  destination: 'LHR',
  departure: {
    scheduled: '2025-12-18T20:15:00-05:00',
    terminal: '7',
  },
  arrival: {
    scheduled: '2025-12-19T08:30:00Z',
    terminal: '5',
  },
  status: 'scheduled',
  duration: 435,
  distance: 5541,
  seats: {
    'user-carlos-001': '3A',
  },
  bookingReference: 'XYZ789',
  ticketNumbers: {
    'user-carlos-001': '1251234560002',
  },
  fareBasis: 'CFLX',
  fareClass: 'C',
  createdAt: '2025-10-10T10:00:00Z',
  updatedAt: '2025-10-10T10:00:00Z',
}

// Paris Trip - Outbound BA303 (Past)
export const parisOutbound: Flight = {
  id: 'flight-ba303-20241012',
  flightNumber: 'BA303',
  airline: 'BA',
  aircraftType: 'Airbus A320',
  origin: 'LHR',
  destination: 'CDG',
  departure: {
    scheduled: '2024-10-12T07:40:00Z',
    actual: '2024-10-12T07:42:00Z',
    terminal: '5',
    gate: 'B35',
  },
  arrival: {
    scheduled: '2024-10-12T10:10:00+02:00',
    actual: '2024-10-12T10:05:00+02:00',
    terminal: '2A',
    gate: 'A23',
    baggage: '7',
  },
  status: 'arrived',
  duration: 85,
  distance: 344,
  seats: {
    'user-carlos-001': '3A',
    'family-maria-001': '3B',
  },
  bookingReference: 'DEF456',
  ticketNumbers: {
    'user-carlos-001': '1251234550001',
    'family-maria-001': '1251234550002',
  },
  fareBasis: 'JFLX',
  fareClass: 'J',
  createdAt: '2024-09-01T10:00:00Z',
  updatedAt: '2024-10-12T10:05:00Z',
}

// Paris Trip - Return BA308 (Past)
export const parisReturn: Flight = {
  id: 'flight-ba308-20241015',
  flightNumber: 'BA308',
  airline: 'BA',
  aircraftType: 'Airbus A320',
  origin: 'CDG',
  destination: 'LHR',
  departure: {
    scheduled: '2024-10-15T16:50:00+02:00',
    actual: '2024-10-15T16:55:00+02:00',
    terminal: '2A',
    gate: 'A45',
  },
  arrival: {
    scheduled: '2024-10-15T17:20:00Z',
    actual: '2024-10-15T17:15:00Z',
    terminal: '5',
    gate: 'B40',
    baggage: '5',
  },
  status: 'arrived',
  duration: 80,
  distance: 344,
  seats: {
    'user-carlos-001': '4A',
    'family-maria-001': '4B',
  },
  bookingReference: 'DEF456',
  ticketNumbers: {
    'user-carlos-001': '1251234550003',
    'family-maria-001': '1251234550004',
  },
  fareBasis: 'JFLX',
  fareClass: 'J',
  createdAt: '2024-09-01T10:00:00Z',
  updatedAt: '2024-10-15T17:15:00Z',
}

export const mockFlights = {
  tokyoOutbound,
  tokyoReturn,
  nycOutbound,
  nycReturn,
  parisOutbound,
  parisReturn,
}
