import type {
  Seat,
  SeatMap,
  SeatMapSection,
  SeatLegend,
  SeatSelection,
  AircraftLayout,
  SeatAmenities,
  SeatClass,
  SeatStatus,
  SeatType,
} from '@/types/seatmap'

// Helper function to create seat amenities
const createAmenities = (overrides?: Partial<SeatAmenities>): SeatAmenities => ({
  power: false,
  usb: false,
  wifi: false,
  entertainment: false,
  recline: false,
  extraLegroom: false,
  bassinet: false,
  storage: false,
  ...overrides,
})

// Helper function to generate seats for a section
const generateSeats = (
  startRow: number,
  endRow: number,
  columns: string[],
  seatClass: SeatClass,
  basePrice: number
): Seat[] => {
  const seats: Seat[] = []
  const exitRows = [12, 13, 30] // Example exit rows

  for (let row = startRow; row <= endRow; row++) {
    columns.forEach((column, index) => {
      const isExitRow = exitRows.includes(row)
      const isWindowSeat = index === 0 || index === columns.length - 1
      const isAisle = index === Math.floor(columns.length / 2) - 1 || index === Math.floor(columns.length / 2)

      let seatType: SeatType = 'middle'
      if (isWindowSeat) seatType = 'window'
      else if (isAisle) seatType = 'aisle'

      // Randomly mark some seats as occupied
      const random = Math.random()
      let status: SeatStatus = 'available'
      if (random < 0.3) status = 'occupied'
      else if (isExitRow) status = 'extra-legroom'

      const seat: Seat = {
        id: `seat-${row}${column}`,
        row,
        column,
        seatNumber: `${row}${column}`,
        class: seatClass,
        status,
        type: seatType,
        price: isExitRow ? basePrice + 50 : basePrice,
        amenities: createAmenities({
          power: seatClass !== 'economy',
          usb: true,
          wifi: true,
          entertainment: true,
          recline: seatClass !== 'economy',
          extraLegroom: isExitRow,
          storage: seatClass === 'business' || seatClass === 'first',
        }),
        legroom: isExitRow ? 38 : seatClass === 'economy' ? 31 : seatClass === 'premium-economy' ? 34 : seatClass === 'business' ? 42 : 50,
        width: seatClass === 'economy' ? 17 : seatClass === 'premium-economy' ? 18.5 : seatClass === 'business' ? 21 : 24,
        pitch: isExitRow ? 38 : seatClass === 'economy' ? 31 : seatClass === 'premium-economy' ? 35 : seatClass === 'business' ? 60 : 78,
        isExitRow,
        restrictions: isExitRow ? ['Must be able to assist in emergency', 'No children under 15'] : undefined,
      }

      seats.push(seat)
    })
  }

  return seats
}

export const seatLegends: SeatLegend[] = [
  { status: 'available', label: 'Available', color: 'bg-green-500' },
  { status: 'occupied', label: 'Occupied', color: 'bg-gray-400' },
  { status: 'selected', label: 'Selected', color: 'bg-blue-500' },
  { status: 'extra-legroom', label: 'Extra Legroom', color: 'bg-purple-500' },
  { status: 'blocked', label: 'Blocked', color: 'bg-red-500' },
]

export const seatMapSections: SeatMapSection[] = [
  {
    id: 'first',
    class: 'first',
    startRow: 1,
    endRow: 4,
    columns: ['A', 'C', 'D', 'F'],
    aisleAfter: ['C'],
  },
  {
    id: 'business',
    class: 'business',
    startRow: 5,
    endRow: 15,
    columns: ['A', 'C', 'D', 'F', 'G', 'H'],
    aisleAfter: ['C', 'F'],
  },
  {
    id: 'premium-economy',
    class: 'premium-economy',
    startRow: 16,
    endRow: 22,
    columns: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    aisleAfter: ['C', 'E'],
  },
  {
    id: 'economy',
    class: 'economy',
    startRow: 23,
    endRow: 45,
    columns: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J'],
    aisleAfter: ['C', 'F'],
  },
]

export const seatMaps: SeatMap[] = [
  {
    id: 'seatmap-1',
    flightNumber: 'BA123',
    aircraftType: 'Boeing 777-300ER',
    totalSeats: 345,
    sections: seatMapSections,
    seats: [
      ...generateSeats(1, 4, ['A', 'C', 'D', 'F'], 'first', 500),
      ...generateSeats(5, 15, ['A', 'C', 'D', 'F', 'G', 'H'], 'business', 250),
      ...generateSeats(16, 22, ['A', 'B', 'C', 'D', 'E', 'F', 'G'], 'premium-economy', 100),
      ...generateSeats(23, 45, ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J'], 'economy', 35),
    ],
    exitRows: [12, 13, 30],
    legend: seatLegends,
  },
  {
    id: 'seatmap-2',
    flightNumber: 'AF456',
    aircraftType: 'Airbus A350-900',
    totalSeats: 325,
    sections: [
      {
        id: 'business',
        class: 'business',
        startRow: 1,
        endRow: 10,
        columns: ['A', 'C', 'D', 'F', 'G', 'H'],
        aisleAfter: ['C', 'F'],
      },
      {
        id: 'premium-economy',
        class: 'premium-economy',
        startRow: 11,
        endRow: 18,
        columns: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        aisleAfter: ['C', 'E'],
      },
      {
        id: 'economy',
        class: 'economy',
        startRow: 19,
        endRow: 42,
        columns: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J'],
        aisleAfter: ['C', 'F'],
      },
    ],
    seats: [
      ...generateSeats(1, 10, ['A', 'C', 'D', 'F', 'G', 'H'], 'business', 300),
      ...generateSeats(11, 18, ['A', 'B', 'C', 'D', 'E', 'F', 'G'], 'premium-economy', 120),
      ...generateSeats(19, 42, ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J'], 'economy', 40),
    ],
    exitRows: [11, 25],
    legend: seatLegends,
  },
]

export const seatSelections: SeatSelection[] = [
  {
    id: 'sel-1',
    flightId: 'flight-1',
    passengerId: 'passenger-1',
    passengerName: 'Carlos Martinez',
    seatId: 'seat-12A',
    seatNumber: '12A',
    class: 'business',
    price: 250,
    selectedAt: '2024-12-10T10:30:00Z',
  },
  {
    id: 'sel-2',
    flightId: 'flight-1',
    passengerId: 'passenger-2',
    passengerName: 'Sofia Martinez',
    seatId: 'seat-12C',
    seatNumber: '12C',
    class: 'business',
    price: 250,
    selectedAt: '2024-12-10T10:30:00Z',
  },
]

export const aircraftLayouts: AircraftLayout[] = [
  {
    aircraftType: 'Boeing 777-300ER',
    totalRows: 45,
    seatsPerRow: {
      first: 4,
      business: 6,
      'premium-economy': 7,
      economy: 9,
    },
    configuration: '3-4-3',
    hasUpperDeck: false,
  },
  {
    aircraftType: 'Airbus A350-900',
    totalRows: 42,
    seatsPerRow: {
      first: 0,
      business: 6,
      'premium-economy': 7,
      economy: 9,
    },
    configuration: '3-3-3',
    hasUpperDeck: false,
  },
  {
    aircraftType: 'Airbus A380-800',
    totalRows: 50,
    seatsPerRow: {
      first: 4,
      business: 7,
      'premium-economy': 8,
      economy: 10,
    },
    configuration: '3-4-3',
    hasUpperDeck: true,
  },
  {
    aircraftType: 'Boeing 787-9',
    totalRows: 38,
    seatsPerRow: {
      first: 0,
      business: 6,
      'premium-economy': 7,
      economy: 9,
    },
    configuration: '3-3-3',
    hasUpperDeck: false,
  },
]

// Helper functions
export const getSeatById = (seatMapId: string, seatId: string): Seat | undefined => {
  const seatMap = seatMaps.find((sm) => sm.id === seatMapId)
  return seatMap?.seats.find((s) => s.id === seatId)
}

export const getSeatsByClass = (seatMapId: string, seatClass: SeatClass): Seat[] => {
  const seatMap = seatMaps.find((sm) => sm.id === seatMapId)
  return seatMap?.seats.filter((s) => s.class === seatClass) || []
}

export const getAvailableSeats = (seatMapId: string): Seat[] => {
  const seatMap = seatMaps.find((sm) => sm.id === seatMapId)
  return seatMap?.seats.filter((s) => s.status === 'available' || s.status === 'extra-legroom') || []
}

export const compareSeatAmenities = (seat1: Seat, seat2: Seat): string[] => {
  const differences: string[] = []
  const amenityKeys = Object.keys(seat1.amenities) as (keyof SeatAmenities)[]

  amenityKeys.forEach((key) => {
    if (seat1.amenities[key] !== seat2.amenities[key]) {
      differences.push(key)
    }
  })

  return differences
}

export const calculateSeatScore = (seat: Seat, preferences: {
  preferWindow?: boolean
  preferAisle?: boolean
  wantExtraLegroom?: boolean
}): number => {
  let score = 0

  // Type preference
  if (preferences.preferWindow && seat.type === 'window') score += 30
  if (preferences.preferAisle && seat.type === 'aisle') score += 30

  // Legroom
  if (preferences.wantExtraLegroom && seat.amenities.extraLegroom) score += 40

  // Amenities
  if (seat.amenities.power) score += 5
  if (seat.amenities.entertainment) score += 5
  if (seat.amenities.wifi) score += 5
  if (seat.amenities.recline) score += 5

  // Position (middle rows are generally better)
  const middleRow = 20
  const rowDistance = Math.abs(seat.row - middleRow)
  score += Math.max(0, 20 - rowDistance)

  return score
}
