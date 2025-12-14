import type { Lounge } from '@/types'

// Extended lounge data for various airports
export const additionalLounges: Lounge[] = [
  // LHR - Additional lounges
  {
    id: 'plaza-premium-lhr-t5',
    name: 'Plaza Premium Lounge',
    terminal: 'T5',
    location: 'After security, near Gate A',
    operator: 'Plaza Premium',
    access: {
      airlines: [],
      alliances: [],
      membershipPrograms: [],
      priorityPass: true,
      loungeKey: true,
      dayPass: {
        available: true,
        price: 45,
      },
    },
    amenities: {
      showers: true,
      wifi: true,
      food: 'buffet',
      bar: true,
      business_center: true,
      sleeping_areas: false,
      kids_area: true,
    },
    hours: {
      open: '05:00',
      close: '22:00',
    },
    rating: 4.0,
  },
  {
    id: 'aspire-lounge-lhr-t5',
    name: 'Aspire Lounge',
    terminal: 'T5',
    location: 'Departures, Level 2',
    operator: 'Aspire',
    access: {
      airlines: [],
      alliances: [],
      membershipPrograms: [],
      priorityPass: true,
      loungeKey: true,
      dayPass: {
        available: true,
        price: 40,
      },
    },
    amenities: {
      showers: true,
      wifi: true,
      food: 'buffet',
      bar: true,
      business_center: false,
      sleeping_areas: false,
      kids_area: true,
    },
    hours: {
      open: '04:30',
      close: '21:30',
    },
    rating: 3.9,
  },
  // HND - Additional lounges
  {
    id: 'ana-suite-lounge-hnd',
    name: 'ANA Suite Lounge',
    terminal: 'T3',
    location: '4th Floor, Central',
    operator: 'All Nippon Airways',
    access: {
      airlines: ['NH'],
      alliances: ['star_alliance'],
      membershipPrograms: ['ANA Mileage Club Diamond', 'Star Alliance Gold'],
      priorityPass: false,
      loungeKey: false,
    },
    amenities: {
      showers: true,
      wifi: true,
      food: 'a_la_carte',
      bar: true,
      business_center: true,
      sleeping_areas: true,
      kids_area: false,
    },
    hours: {
      open: '06:00',
      close: '23:30',
    },
    rating: 4.7,
  },
  {
    id: 'tiat-lounge-hnd',
    name: 'TIAT Lounge Annex',
    terminal: 'T3',
    location: '5th Floor',
    operator: 'Tokyo International Air Terminal',
    access: {
      airlines: [],
      alliances: [],
      membershipPrograms: [],
      priorityPass: true,
      loungeKey: true,
      dayPass: {
        available: true,
        price: 30,
      },
    },
    amenities: {
      showers: true,
      wifi: true,
      food: 'snacks',
      bar: false,
      business_center: true,
      sleeping_areas: true,
      kids_area: false,
    },
    hours: {
      open: '05:30',
      close: '23:00',
    },
    rating: 4.1,
  },
  // JFK - Additional lounges
  {
    id: 'aa-flagship-lounge-jfk',
    name: 'American Airlines Flagship Lounge',
    terminal: 'T8',
    location: 'Concourse B, near Gate 10',
    operator: 'American Airlines',
    access: {
      airlines: ['AA'],
      alliances: ['oneworld'],
      membershipPrograms: ['AAdvantage Executive Platinum', 'oneworld Emerald'],
      priorityPass: false,
      loungeKey: false,
    },
    amenities: {
      showers: true,
      wifi: true,
      food: 'a_la_carte',
      bar: true,
      business_center: true,
      sleeping_areas: false,
      kids_area: false,
    },
    hours: {
      open: '05:00',
      close: '22:30',
    },
    rating: 4.3,
  },
  {
    id: 'plaza-premium-jfk-t7',
    name: 'Plaza Premium Lounge',
    terminal: 'T7',
    location: 'After security, main concourse',
    operator: 'Plaza Premium',
    access: {
      airlines: [],
      alliances: [],
      membershipPrograms: [],
      priorityPass: true,
      loungeKey: true,
      dayPass: {
        available: true,
        price: 50,
      },
    },
    amenities: {
      showers: true,
      wifi: true,
      food: 'buffet',
      bar: true,
      business_center: true,
      sleeping_areas: false,
      kids_area: false,
    },
    hours: {
      open: '05:00',
      close: '23:00',
    },
    rating: 3.7,
  },
  // CDG - Lounges
  {
    id: 'af-lounge-cdg-2e',
    name: 'Air France Lounge',
    terminal: '2E',
    location: 'Hall K, Level 3',
    operator: 'Air France',
    access: {
      airlines: ['AF'],
      alliances: ['skyteam'],
      membershipPrograms: ['Flying Blue Platinum', 'SkyTeam Elite Plus'],
      priorityPass: false,
      loungeKey: false,
    },
    amenities: {
      showers: true,
      wifi: true,
      food: 'buffet',
      bar: true,
      business_center: true,
      sleeping_areas: false,
      kids_area: true,
    },
    hours: {
      open: '06:00',
      close: '22:00',
    },
    rating: 4.2,
  },
  {
    id: 'yotel-air-cdg',
    name: 'YOTELAIR Paris CDG',
    terminal: '2E',
    location: 'Hall M',
    operator: 'YOTELAIR',
    access: {
      airlines: [],
      alliances: [],
      membershipPrograms: [],
      priorityPass: true,
      loungeKey: true,
      dayPass: {
        available: true,
        price: 35,
      },
    },
    amenities: {
      showers: true,
      wifi: true,
      food: 'snacks',
      bar: false,
      business_center: false,
      sleeping_areas: true,
      kids_area: false,
    },
    hours: {
      open: '00:00',
      close: '23:59',
    },
    rating: 4.0,
  },
]

// Helper to get all lounges for an airport
export function getLoungesForAirport(airportCode: string): Lounge[] {
  return additionalLounges.filter((lounge) => {
    // Check if the lounge terminal contains the airport code
    // This is a simple implementation; you might want to add airport codes to lounges
    return lounge.id.includes(airportCode.toLowerCase())
  })
}

// Helper to filter lounges by access type
export function filterLoungesByAccess(
  lounges: Lounge[],
  filters: {
    priorityPass?: boolean
    alliance?: string
    airline?: string
    dayPass?: boolean
  }
): Lounge[] {
  return lounges.filter((lounge) => {
    if (filters.priorityPass && !lounge.access.priorityPass) return false
    if (filters.alliance && !lounge.access.alliances.includes(filters.alliance)) return false
    if (filters.airline && !lounge.access.airlines.includes(filters.airline)) return false
    if (filters.dayPass && !lounge.access.dayPass?.available) return false
    return true
  })
}

// Helper to get amenities as array
export function getLoungeAmenities(lounge: Lounge): string[] {
  const amenities: string[] = []
  if (lounge.amenities.wifi) amenities.push('WiFi')
  if (lounge.amenities.showers) amenities.push('Showers')
  if (lounge.amenities.bar) amenities.push('Bar')
  if (lounge.amenities.business_center) amenities.push('Business Center')
  if (lounge.amenities.sleeping_areas) amenities.push('Sleep Pods')
  if (lounge.amenities.kids_area) amenities.push("Children's Area")

  switch (lounge.amenities.food) {
    case 'a_la_carte':
      amenities.push('À La Carte Dining')
      break
    case 'buffet':
      amenities.push('Buffet')
      break
    case 'snacks':
      amenities.push('Light Snacks')
      break
  }

  return amenities
}
