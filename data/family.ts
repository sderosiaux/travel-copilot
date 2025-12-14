import type { FamilyMember, Household } from '@/types'

export const mariaMartinez: FamilyMember = {
  id: 'family-maria-001',
  firstName: 'Maria',
  lastName: 'Martinez',
  relationship: 'spouse',
  dateOfBirth: '1987-06-20',
  email: 'maria.martinez@email.com',
  phone: '+44 7700 900124',
  avatar: '/avatars/maria.jpg',
  documents: ['doc-maria-passport-001', 'doc-maria-ba-executive-001'],
  preferences: {
    seatPosition: 'window',
    mealPreference: 'vegetarian',
  },
  createdAt: '2023-01-15T10:05:00Z',
  updatedAt: '2025-11-20T09:15:00Z',
}

export const sofiaMartinez: FamilyMember = {
  id: 'family-sofia-001',
  firstName: 'Sofia',
  lastName: 'Martinez',
  relationship: 'child',
  dateOfBirth: '2018-09-12',
  avatar: '/avatars/sofia.jpg',
  documents: ['doc-sofia-passport-001'],
  preferences: {
    seatPosition: 'window',
    mealPreference: 'regular',
    requiresSupervision: true,
  },
  createdAt: '2023-01-15T10:10:00Z',
  updatedAt: '2025-11-20T09:15:00Z',
}

export const diegoMartinez: FamilyMember = {
  id: 'family-diego-001',
  firstName: 'Diego',
  lastName: 'Martinez',
  relationship: 'child',
  dateOfBirth: '2015-04-08',
  avatar: '/avatars/diego.jpg',
  documents: ['doc-diego-passport-001'],
  preferences: {
    seatPosition: 'aisle',
    mealPreference: 'regular',
    requiresSupervision: true,
  },
  createdAt: '2023-01-15T10:15:00Z',
  updatedAt: '2025-11-20T09:15:00Z',
}

export const elenaMartinez: FamilyMember = {
  id: 'family-elena-001',
  firstName: 'Elena',
  lastName: 'Rodriguez',
  relationship: 'parent',
  dateOfBirth: '1955-02-14',
  email: 'elena.rodriguez@email.com',
  phone: '+44 7700 900125',
  avatar: '/avatars/elena.jpg',
  documents: ['doc-elena-passport-001'],
  specialNeeds: {
    wheelchair: true,
    hearingAssistance: false,
    visualAssistance: false,
    cognitiveAssistance: false,
    medicalConditions: ['Reduced mobility'],
    medications: [
      {
        name: 'Blood pressure medication',
        dosage: '10mg',
        frequency: 'Once daily',
        keepInCarryOn: true,
      },
    ],
    allergies: ['Shellfish'],
    emergencyContact: {
      name: 'Carlos Martinez',
      relationship: 'Son',
      phone: '+44 7700 900123',
    },
    notes: 'Requires wheelchair assistance at all airports. Prefers aisle seat for easy access.',
  },
  preferences: {
    seatPosition: 'aisle',
    mealPreference: 'regular',
  },
  createdAt: '2023-01-15T10:20:00Z',
  updatedAt: '2025-11-20T09:15:00Z',
}

export const martinezHousehold: Household = {
  id: 'household-martinez-001',
  primaryUserId: 'user-carlos-001',
  name: 'Martinez Family',
  members: [
    'user-carlos-001',
    'family-maria-001',
    'family-sofia-001',
    'family-diego-001',
    'family-elena-001',
  ],
  preferences: {
    keepTogether: true,
    preferredSeating: 'together',
    specialRequirements: [
      'Wheelchair assistance for Elena',
      'Child supervision required for Sofia and Diego',
      'Pre-boarding assistance preferred',
    ],
  },
  createdAt: '2023-01-15T10:25:00Z',
  updatedAt: '2025-11-20T09:15:00Z',
}

export const mockFamilyMembers = {
  maria: mariaMartinez,
  sofia: sofiaMartinez,
  diego: diegoMartinez,
  elena: elenaMartinez,
}

export const mockHouseholds = {
  martinez: martinezHousehold,
}
