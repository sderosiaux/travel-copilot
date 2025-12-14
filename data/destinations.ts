export interface DestinationInfo {
  city: string
  country: string
  timezone: string
  timezoneOffset: string
  currency: {
    code: string
    symbol: string
    name: string
  }
  language: {
    primary: string
    others?: string[]
  }
  emergency: {
    police: string
    ambulance: string
    fire: string
    embassy?: {
      name: string
      phone: string
      address: string
    }
  }
  weather: {
    current: {
      temperature: number
      conditions: string
      humidity: number
      windSpeed: number
    }
    forecast: Array<{
      date: string
      high: number
      low: number
      conditions: string
      precipitation: number
    }>
  }
  localInfo: {
    voltage: string
    drivingSide: 'left' | 'right'
    tipping: string
    businessHours: string
  }
}

export const destinations: Record<string, DestinationInfo> = {
  'Tokyo': {
    city: 'Tokyo',
    country: 'Japan',
    timezone: 'Asia/Tokyo',
    timezoneOffset: '+09:00',
    currency: {
      code: 'JPY',
      symbol: '¥',
      name: 'Japanese Yen',
    },
    language: {
      primary: 'Japanese',
      others: ['English (limited)'],
    },
    emergency: {
      police: '110',
      ambulance: '119',
      fire: '119',
      embassy: {
        name: 'British Embassy Tokyo',
        phone: '+81 3 5211 1100',
        address: '1 Ichiban-cho, Chiyoda-ku, Tokyo 102-8381',
      },
    },
    weather: {
      current: {
        temperature: 15,
        conditions: 'Partly Cloudy',
        humidity: 65,
        windSpeed: 12,
      },
      forecast: [
        {
          date: '2025-11-15',
          high: 18,
          low: 12,
          conditions: 'Partly Cloudy',
          precipitation: 10,
        },
        {
          date: '2025-11-16',
          high: 17,
          low: 11,
          conditions: 'Sunny',
          precipitation: 5,
        },
        {
          date: '2025-11-17',
          high: 16,
          low: 10,
          conditions: 'Cloudy',
          precipitation: 20,
        },
        {
          date: '2025-11-18',
          high: 19,
          low: 13,
          conditions: 'Light Rain',
          precipitation: 60,
        },
        {
          date: '2025-11-19',
          high: 18,
          low: 12,
          conditions: 'Partly Cloudy',
          precipitation: 15,
        },
        {
          date: '2025-11-20',
          high: 17,
          low: 11,
          conditions: 'Sunny',
          precipitation: 5,
        },
        {
          date: '2025-11-21',
          high: 16,
          low: 10,
          conditions: 'Cloudy',
          precipitation: 25,
        },
      ],
    },
    localInfo: {
      voltage: '100V, 50/60Hz (Type A/B plugs)',
      drivingSide: 'left',
      tipping: 'Not customary; can be seen as rude',
      businessHours: 'Shops: 10:00-20:00, Restaurants: 11:00-23:00',
    },
  },
  'New York': {
    city: 'New York',
    country: 'United States',
    timezone: 'America/New_York',
    timezoneOffset: '-05:00',
    currency: {
      code: 'USD',
      symbol: '$',
      name: 'US Dollar',
    },
    language: {
      primary: 'English',
      others: ['Spanish'],
    },
    emergency: {
      police: '911',
      ambulance: '911',
      fire: '911',
      embassy: {
        name: 'British Consulate General New York',
        phone: '+1 212 745 0200',
        address: '845 Third Avenue, New York, NY 10022',
      },
    },
    weather: {
      current: {
        temperature: 2,
        conditions: 'Cloudy',
        humidity: 72,
        windSpeed: 18,
      },
      forecast: [
        {
          date: '2025-12-15',
          high: 5,
          low: -2,
          conditions: 'Snow',
          precipitation: 80,
        },
        {
          date: '2025-12-16',
          high: 3,
          low: -3,
          conditions: 'Partly Cloudy',
          precipitation: 20,
        },
        {
          date: '2025-12-17',
          high: 4,
          low: -1,
          conditions: 'Sunny',
          precipitation: 10,
        },
        {
          date: '2025-12-18',
          high: 6,
          low: 0,
          conditions: 'Cloudy',
          precipitation: 30,
        },
      ],
    },
    localInfo: {
      voltage: '120V, 60Hz (Type A/B plugs)',
      drivingSide: 'right',
      tipping: '18-20% in restaurants, $2-5 per bag for porters',
      businessHours: 'Shops: 10:00-21:00, Restaurants: 11:00-23:00',
    },
  },
  'Paris': {
    city: 'Paris',
    country: 'France',
    timezone: 'Europe/Paris',
    timezoneOffset: '+01:00',
    currency: {
      code: 'EUR',
      symbol: '€',
      name: 'Euro',
    },
    language: {
      primary: 'French',
      others: ['English (in tourist areas)'],
    },
    emergency: {
      police: '17',
      ambulance: '15',
      fire: '18',
      embassy: {
        name: 'British Embassy Paris',
        phone: '+33 1 44 51 31 00',
        address: '35 rue du Faubourg Saint-Honoré, 75383 Paris',
      },
    },
    weather: {
      current: {
        temperature: 12,
        conditions: 'Light Rain',
        humidity: 78,
        windSpeed: 15,
      },
      forecast: [
        {
          date: '2024-10-12',
          high: 16,
          low: 10,
          conditions: 'Partly Cloudy',
          precipitation: 30,
        },
        {
          date: '2024-10-13',
          high: 15,
          low: 9,
          conditions: 'Cloudy',
          precipitation: 40,
        },
        {
          date: '2024-10-14',
          high: 17,
          low: 11,
          conditions: 'Sunny',
          precipitation: 10,
        },
        {
          date: '2024-10-15',
          high: 16,
          low: 10,
          conditions: 'Light Rain',
          precipitation: 50,
        },
      ],
    },
    localInfo: {
      voltage: '230V, 50Hz (Type C/E plugs)',
      drivingSide: 'right',
      tipping: 'Service included; round up or 5-10% for good service',
      businessHours: 'Shops: 09:00-19:00, Restaurants: 12:00-14:30, 19:00-22:30',
    },
  },
  'London': {
    city: 'London',
    country: 'United Kingdom',
    timezone: 'Europe/London',
    timezoneOffset: '+00:00',
    currency: {
      code: 'GBP',
      symbol: '£',
      name: 'British Pound',
    },
    language: {
      primary: 'English',
    },
    emergency: {
      police: '999',
      ambulance: '999',
      fire: '999',
    },
    weather: {
      current: {
        temperature: 8,
        conditions: 'Rainy',
        humidity: 85,
        windSpeed: 20,
      },
      forecast: [
        {
          date: '2025-11-15',
          high: 10,
          low: 6,
          conditions: 'Rainy',
          precipitation: 70,
        },
        {
          date: '2025-11-16',
          high: 11,
          low: 7,
          conditions: 'Cloudy',
          precipitation: 40,
        },
        {
          date: '2025-11-17',
          high: 9,
          low: 5,
          conditions: 'Partly Cloudy',
          precipitation: 30,
        },
      ],
    },
    localInfo: {
      voltage: '230V, 50Hz (Type G plugs)',
      drivingSide: 'left',
      tipping: '10-15% in restaurants if service not included',
      businessHours: 'Shops: 09:00-18:00, Restaurants: 12:00-23:00',
    },
  },
}

export function getDestinationInfo(city: string): DestinationInfo | undefined {
  return destinations[city]
}
