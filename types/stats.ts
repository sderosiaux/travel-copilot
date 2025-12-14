export interface TravelStats {
  id: string
  userId: string
  totalDistance: number // in kilometers
  totalFlightTime: number // in minutes
  totalTrips: number
  countriesVisited: CountryVisit[]
  yearlyStats: YearlyStats[]
  topDestinations: DestinationStats[]
  preferredAirlines: AirlineStats[]
  cabinClassDistribution: CabinClassStats
  tripTimeline: TripTimelineEntry[]
  lastUpdated: string
}

export interface CountryVisit {
  countryCode: string
  countryName: string
  continent: string
  visitCount: number
  firstVisit: string
  lastVisit: string
  cities: string[]
}

export interface YearlyStats {
  year: number
  trips: number
  distance: number
  flightTime: number
  countries: number
}

export interface DestinationStats {
  destination: string
  country: string
  countryCode: string
  visitCount: number
  totalDays: number
  lastVisit: string
}

export interface AirlineStats {
  airlineCode: string
  airlineName: string
  flights: number
  distance: number
  flightTime: number
}

export interface CabinClassStats {
  economy: number
  premiumEconomy: number
  business: number
  first: number
}

export interface TripTimelineEntry {
  id: string
  tripId: string
  destination: string
  startDate: string
  endDate: string
  duration: number // in days
  distance: number
  flightTime: number
}

export interface StatsFilter {
  year?: number
  startDate?: string
  endDate?: string
  destination?: string
}

export interface StatsPeriod {
  label: string
  value: 'all' | 'year' | 'custom'
  year?: number
  startDate?: string
  endDate?: string
}
