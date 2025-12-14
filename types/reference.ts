export interface Airport {
  code: string
  name: string
  city: string
  country: string
  timezone: string
  terminals: Terminal[]
  coordinates: {
    latitude: number
    longitude: number
  }
  facilities: {
    wifi: boolean
    lounges: Lounge[]
    fastTrack: boolean
    prayer_rooms: boolean
    nursing_rooms: boolean
    pet_relief: boolean
    medical: boolean
    baggage_storage: boolean
  }
  transport: {
    taxi: boolean
    uber: boolean
    public_transport: string[]
    rental_car: boolean
    hotel_shuttle: boolean
  }
}

export interface Terminal {
  id: string
  name: string
  airlines: string[]
  gates: string[]
  facilities: string[]
  walkingTime?: {
    from: string
    to: string
    minutes: number
  }[]
}

export interface Lounge {
  id: string
  name: string
  terminal: string
  location: string
  operator: string
  access: {
    airlines: string[]
    alliances: string[]
    membershipPrograms: string[]
    priorityPass: boolean
    loungeKey: boolean
    dayPass?: {
      available: boolean
      price?: number
    }
  }
  amenities: {
    showers: boolean
    wifi: boolean
    food: 'snacks' | 'buffet' | 'a_la_carte'
    bar: boolean
    business_center: boolean
    sleeping_areas: boolean
    kids_area: boolean
  }
  hours: {
    open: string
    close: string
    days?: string[]
  }
  capacity?: number
  rating?: number
}

export interface Airline {
  code: string
  name: string
  alliance?: 'oneworld' | 'star_alliance' | 'skyteam'
  country: string
  website: string
  logo?: string
  fleetSize?: number
  destinations?: number
  ratings?: {
    overall: number
    service: number
    food: number
    entertainment: number
    comfort: number
  }
  policies: {
    checkIn: {
      online_hours_before: number
      airport_hours_before: number
    }
    baggage: {
      carry_on: {
        weight_kg: number
        dimensions: string
        pieces: number
      }
      checked: {
        weight_kg: number
        dimensions: string
        pieces: number
        fee?: number
      }
    }
    changes: {
      allowed: boolean
      fee?: number
      restrictions?: string[]
    }
    cancellation: {
      allowed: boolean
      fee?: number
      refundable?: boolean
      restrictions?: string[]
    }
  }
}

export interface Gate {
  code: string
  terminal: string
  type: 'domestic' | 'international' | 'both'
  pier?: string
  facilities: string[]
  seatingCapacity?: number
}
