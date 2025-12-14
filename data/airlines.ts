import type { Airline } from '@/types'

export const britishAirways: Airline = {
  code: 'BA',
  name: 'British Airways',
  alliance: 'oneworld',
  country: 'United Kingdom',
  website: 'https://www.britishairways.com',
  logo: '/airlines/ba.svg',
  fleetSize: 277,
  destinations: 183,
  ratings: {
    overall: 4.2,
    service: 4.3,
    food: 4.0,
    entertainment: 4.1,
    comfort: 4.4,
  },
  policies: {
    checkIn: {
      online_hours_before: 24,
      airport_hours_before: 2,
    },
    baggage: {
      carry_on: {
        weight_kg: 23,
        dimensions: '56x45x25cm',
        pieces: 1,
      },
      checked: {
        weight_kg: 23,
        dimensions: '90x75x43cm',
        pieces: 1,
      },
    },
    changes: {
      allowed: true,
      fee: 50,
      restrictions: ['Fare difference may apply', 'Some fares non-changeable'],
    },
    cancellation: {
      allowed: true,
      refundable: false,
      restrictions: ['Flexible fares only', 'Cancellation fee applies'],
    },
  },
}

export const virginAtlantic: Airline = {
  code: 'VS',
  name: 'Virgin Atlantic',
  country: 'United Kingdom',
  website: 'https://www.virginatlantic.com',
  logo: '/airlines/vs.svg',
  fleetSize: 39,
  destinations: 30,
  ratings: {
    overall: 4.3,
    service: 4.5,
    food: 4.2,
    entertainment: 4.4,
    comfort: 4.3,
  },
  policies: {
    checkIn: {
      online_hours_before: 24,
      airport_hours_before: 3,
    },
    baggage: {
      carry_on: {
        weight_kg: 10,
        dimensions: '56x36x23cm',
        pieces: 1,
      },
      checked: {
        weight_kg: 23,
        dimensions: '90x75x43cm',
        pieces: 1,
      },
    },
    changes: {
      allowed: true,
      fee: 75,
    },
    cancellation: {
      allowed: true,
      refundable: false,
    },
  },
}

export const japanAirlines: Airline = {
  code: 'JL',
  name: 'Japan Airlines',
  alliance: 'oneworld',
  country: 'Japan',
  website: 'https://www.jal.com',
  logo: '/airlines/jl.svg',
  fleetSize: 165,
  destinations: 92,
  ratings: {
    overall: 4.6,
    service: 4.8,
    food: 4.5,
    entertainment: 4.4,
    comfort: 4.7,
  },
  policies: {
    checkIn: {
      online_hours_before: 24,
      airport_hours_before: 2,
    },
    baggage: {
      carry_on: {
        weight_kg: 10,
        dimensions: '55x40x25cm',
        pieces: 1,
      },
      checked: {
        weight_kg: 23,
        dimensions: '203cm total',
        pieces: 2,
      },
    },
    changes: {
      allowed: true,
      fee: 30,
    },
    cancellation: {
      allowed: true,
      refundable: true,
    },
  },
}

export const unitedAirlines: Airline = {
  code: 'UA',
  name: 'United Airlines',
  alliance: 'star_alliance',
  country: 'United States',
  website: 'https://www.united.com',
  logo: '/airlines/ua.svg',
  fleetSize: 900,
  destinations: 342,
  ratings: {
    overall: 3.8,
    service: 3.7,
    food: 3.6,
    entertainment: 3.9,
    comfort: 3.8,
  },
  policies: {
    checkIn: {
      online_hours_before: 24,
      airport_hours_before: 2,
    },
    baggage: {
      carry_on: {
        weight_kg: 7,
        dimensions: '56x35x22cm',
        pieces: 1,
      },
      checked: {
        weight_kg: 23,
        dimensions: '158cm total',
        pieces: 1,
        fee: 30,
      },
    },
    changes: {
      allowed: true,
      fee: 200,
    },
    cancellation: {
      allowed: true,
      refundable: false,
    },
  },
}

export const lufthansa: Airline = {
  code: 'LH',
  name: 'Lufthansa',
  alliance: 'star_alliance',
  country: 'Germany',
  website: 'https://www.lufthansa.com',
  logo: '/airlines/lh.svg',
  fleetSize: 710,
  destinations: 197,
  ratings: {
    overall: 4.1,
    service: 4.2,
    food: 4.0,
    entertainment: 3.9,
    comfort: 4.2,
  },
  policies: {
    checkIn: {
      online_hours_before: 23,
      airport_hours_before: 2,
    },
    baggage: {
      carry_on: {
        weight_kg: 8,
        dimensions: '55x40x23cm',
        pieces: 1,
      },
      checked: {
        weight_kg: 23,
        dimensions: '158cm total',
        pieces: 1,
      },
    },
    changes: {
      allowed: true,
      fee: 70,
    },
    cancellation: {
      allowed: true,
      refundable: false,
    },
  },
}

export const airFrance: Airline = {
  code: 'AF',
  name: 'Air France',
  alliance: 'skyteam',
  country: 'France',
  website: 'https://www.airfrance.com',
  logo: '/airlines/af.svg',
  fleetSize: 224,
  destinations: 175,
  ratings: {
    overall: 4.0,
    service: 4.1,
    food: 4.2,
    entertainment: 3.9,
    comfort: 4.0,
  },
  policies: {
    checkIn: {
      online_hours_before: 30,
      airport_hours_before: 2,
    },
    baggage: {
      carry_on: {
        weight_kg: 12,
        dimensions: '55x35x25cm',
        pieces: 1,
      },
      checked: {
        weight_kg: 23,
        dimensions: '158cm total',
        pieces: 1,
      },
    },
    changes: {
      allowed: true,
      fee: 60,
    },
    cancellation: {
      allowed: true,
      refundable: false,
    },
  },
}

export const mockAirlines = {
  BA: britishAirways,
  VS: virginAtlantic,
  JL: japanAirlines,
  UA: unitedAirlines,
  LH: lufthansa,
  AF: airFrance,
}
