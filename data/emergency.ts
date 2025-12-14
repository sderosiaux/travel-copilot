import type {
  EmergencyContact,
  CountryEmergencyNumbers,
  Embassy,
  QuickDialEntry,
} from '@/types/emergency'

// Personal emergency contacts
export const personalEmergencyContact: EmergencyContact = {
  id: 'emergency-001',
  userId: 'user-carlos-001',
  type: 'personal',
  name: 'Maria Rodriguez',
  relationship: 'Spouse',
  phone: '+44 7700 900123',
  phoneSecondary: '+44 20 7946 0958',
  email: 'maria.rodriguez@email.com',
  address: '123 High Street, London, SW1A 1AA, UK',
  isPrimary: true,
  notes: 'Primary emergency contact. Available 24/7.',
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-15T10:00:00Z',
}

export const medicalContact: EmergencyContact = {
  id: 'emergency-002',
  userId: 'user-carlos-001',
  type: 'medical',
  name: 'Dr. Sarah Thompson',
  relationship: 'General Practitioner',
  phone: '+44 20 7946 0123',
  email: 'reception@londonmedical.nhs.uk',
  address: 'London Medical Centre, 45 Park Lane, London, W1K 1PN',
  isPrimary: false,
  notes: 'Regular GP. Has full medical history.',
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-15T10:00:00Z',
}

export const workContact: EmergencyContact = {
  id: 'emergency-003',
  userId: 'user-carlos-001',
  type: 'work',
  name: 'James Wilson',
  relationship: 'Manager',
  phone: '+44 20 7123 4567',
  email: 'james.wilson@company.com',
  isPrimary: false,
  notes: 'To be contacted for work-related emergencies.',
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-15T10:00:00Z',
}

// Country-specific emergency numbers
export const ukEmergencyNumbers: CountryEmergencyNumbers = {
  countryCode: 'GB',
  countryName: 'United Kingdom',
  services: [
    {
      type: 'general_emergency',
      name: 'Emergency Services',
      number: '999',
      description: 'Police, Ambulance, Fire Brigade',
      available: '24/7',
    },
    {
      type: 'general_emergency',
      name: 'Emergency Services (EU)',
      number: '112',
      description: 'Alternative emergency number',
      available: '24/7',
    },
    {
      type: 'police',
      name: 'Police Non-Emergency',
      number: '101',
      available: '24/7',
    },
    {
      type: 'ambulance',
      name: 'NHS Non-Emergency',
      number: '111',
      description: 'Medical advice and out-of-hours care',
      available: '24/7',
    },
    {
      type: 'coast_guard',
      name: 'Coastguard',
      number: '999',
      description: 'Maritime emergencies',
      available: '24/7',
    },
  ],
  notes: ['Ask for specific service when calling 999', 'Text relay service available: 18000'],
  lastUpdated: '2025-01-01T00:00:00Z',
}

export const japanEmergencyNumbers: CountryEmergencyNumbers = {
  countryCode: 'JP',
  countryName: 'Japan',
  services: [
    {
      type: 'police',
      name: 'Police',
      number: '110',
      description: 'Police emergencies',
      available: '24/7',
    },
    {
      type: 'ambulance',
      name: 'Ambulance/Fire',
      number: '119',
      description: 'Medical emergencies and fire',
      available: '24/7',
    },
    {
      type: 'coast_guard',
      name: 'Coast Guard',
      number: '118',
      description: 'Maritime emergencies',
      available: '24/7',
    },
    {
      type: 'tourist_police',
      name: 'Japan Helpline',
      number: '0570-000-911',
      description: 'Tourist support in English',
      available: '24/7',
    },
  ],
  notes: [
    'English may be limited - try to have address written in Japanese',
    'Tell operator "ambulance" or "fire" when calling 119',
  ],
  lastUpdated: '2025-01-01T00:00:00Z',
}

export const usaEmergencyNumbers: CountryEmergencyNumbers = {
  countryCode: 'US',
  countryName: 'United States',
  services: [
    {
      type: 'general_emergency',
      name: 'Emergency Services',
      number: '911',
      description: 'Police, Ambulance, Fire Department',
      available: '24/7',
    },
    {
      type: 'poison_control',
      name: 'Poison Control',
      number: '1-800-222-1222',
      available: '24/7',
    },
    {
      type: 'coast_guard',
      name: 'Coast Guard',
      number: '911',
      description: 'Can be reached via 911',
      available: '24/7',
    },
  ],
  notes: ['Text-to-911 available in many areas', 'Stay calm and speak clearly'],
  lastUpdated: '2025-01-01T00:00:00Z',
}

export const franceEmergencyNumbers: CountryEmergencyNumbers = {
  countryCode: 'FR',
  countryName: 'France',
  services: [
    {
      type: 'general_emergency',
      name: 'Emergency Services (EU)',
      number: '112',
      description: 'All emergencies - English available',
      available: '24/7',
    },
    {
      type: 'police',
      name: 'Police',
      number: '17',
      available: '24/7',
    },
    {
      type: 'ambulance',
      name: 'Ambulance (SAMU)',
      number: '15',
      description: 'Medical emergencies',
      available: '24/7',
    },
    {
      type: 'fire',
      name: 'Fire Brigade',
      number: '18',
      description: 'Also responds to some medical emergencies',
      available: '24/7',
    },
  ],
  notes: ['112 is recommended for tourists', 'English speakers usually available on 112'],
  lastUpdated: '2025-01-01T00:00:00Z',
}

// Embassy information
export const britishEmbassyJapan: Embassy = {
  id: 'embassy-gb-jp-001',
  country: 'JP',
  representingCountry: 'GB',
  type: 'embassy',
  name: 'British Embassy Tokyo',
  address: 'No.1 Ichiban-cho, Chiyoda-ku',
  city: 'Tokyo',
  postalCode: '102-8381',
  phone: '+81 3 5211 1100',
  emergencyPhone: '+81 3 5211 1100',
  email: 'consular.tokyo@fcdo.gov.uk',
  website: 'https://www.gov.uk/world/organisations/british-embassy-tokyo',
  services: [
    'Emergency passport replacement',
    'Consular assistance',
    'Notarial services',
    'Registration of birth/death',
    'Emergency travel documents',
  ],
  openingHours: {
    monday: '09:00-17:00',
    tuesday: '09:00-17:00',
    wednesday: '09:00-17:00',
    thursday: '09:00-17:00',
    friday: '09:00-17:00',
    saturday: 'Closed',
    sunday: 'Closed',
  },
  emergencyAvailability: '24/7 emergency phone line available',
  location: {
    latitude: 35.6842,
    longitude: 139.7368,
  },
  notes: [
    'Appointment required for most services',
    'Emergency services available outside office hours',
    'English and Japanese spoken',
  ],
}

export const britishEmbassyUSA: Embassy = {
  id: 'embassy-gb-us-001',
  country: 'US',
  representingCountry: 'GB',
  type: 'embassy',
  name: 'British Embassy Washington DC',
  address: '3100 Massachusetts Avenue NW',
  city: 'Washington DC',
  postalCode: '20008',
  phone: '+1 202 588 6500',
  emergencyPhone: '+1 202 588 7800',
  email: 'ukiusa.washington@fcdo.gov.uk',
  website: 'https://www.gov.uk/world/organisations/british-embassy-washington',
  services: [
    'Emergency passport replacement',
    'Consular assistance',
    'Notarial services',
    'Registration of birth/death',
    'Emergency travel documents',
    'Support for British nationals',
  ],
  openingHours: {
    monday: '09:00-17:00',
    tuesday: '09:00-17:00',
    wednesday: '09:00-17:00',
    thursday: '09:00-17:00',
    friday: '09:00-17:00',
    saturday: 'Closed',
    sunday: 'Closed',
  },
  emergencyAvailability: '24/7 emergency consular assistance available',
  location: {
    latitude: 38.9186,
    longitude: -77.0669,
  },
  notes: [
    'Appointment required for consular services',
    '24/7 emergency line for British nationals in distress',
    'Consulates also in New York, Boston, Atlanta, Chicago, Houston, Los Angeles, Miami, San Francisco',
  ],
}

export const britishConsulateFrance: Embassy = {
  id: 'embassy-gb-fr-001',
  country: 'FR',
  representingCountry: 'GB',
  type: 'embassy',
  name: 'British Embassy Paris',
  address: '35 rue du Faubourg St Honoré',
  city: 'Paris',
  postalCode: '75383',
  phone: '+33 1 44 51 31 00',
  emergencyPhone: '+33 1 44 51 31 00',
  email: 'paris.consular@fcdo.gov.uk',
  website: 'https://www.gov.uk/world/organisations/british-embassy-paris',
  services: [
    'Emergency passport replacement',
    'Consular assistance',
    'Emergency travel documents',
    'Support for British nationals',
  ],
  openingHours: {
    monday: '09:30-13:00, 14:30-17:00',
    tuesday: '09:30-13:00, 14:30-17:00',
    wednesday: '09:30-13:00, 14:30-17:00',
    thursday: '09:30-13:00, 14:30-17:00',
    friday: '09:30-13:00, 14:30-17:00',
    saturday: 'Closed',
    sunday: 'Closed',
  },
  emergencyAvailability: '24/7 emergency phone line available',
  location: {
    latitude: 48.8709,
    longitude: 2.3166,
  },
  notes: ['Appointment required', 'Close to Champs-Élysées', 'English and French spoken'],
}

// Quick dial entries
export const quickDialEntries: QuickDialEntry[] = [
  {
    id: 'qd-001',
    label: 'UK Emergency',
    type: 'emergency',
    number: '999',
    description: 'Police, Ambulance, Fire',
    priority: 1,
  },
  {
    id: 'qd-002',
    label: 'Maria (Spouse)',
    type: 'personal',
    number: '+44 7700 900123',
    description: 'Primary emergency contact',
    priority: 2,
  },
  {
    id: 'qd-003',
    label: 'Travel Insurance',
    type: 'insurance',
    number: '+44 20 1234 5678',
    description: 'World Travel Insurance - 24/7',
    priority: 3,
  },
  {
    id: 'qd-004',
    label: 'British Embassy Tokyo',
    type: 'embassy',
    number: '+81 3 5211 1100',
    description: 'Emergency consular assistance',
    priority: 4,
  },
  {
    id: 'qd-005',
    label: 'Dr. Thompson',
    type: 'medical',
    number: '+44 20 7946 0123',
    description: 'General Practitioner',
    priority: 5,
  },
]

export const mockEmergencyContacts = {
  personal: personalEmergencyContact,
  medical: medicalContact,
  work: workContact,
}

export const mockCountryEmergencyNumbers = {
  uk: ukEmergencyNumbers,
  japan: japanEmergencyNumbers,
  usa: usaEmergencyNumbers,
  france: franceEmergencyNumbers,
}

export const mockEmbassies = {
  japanUK: britishEmbassyJapan,
  usaUK: britishEmbassyUSA,
  franceUK: britishConsulateFrance,
}

export const mockQuickDialEntries = quickDialEntries
