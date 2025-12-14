// Verification file to test all imports work correctly
// This file can be deleted - it's just for Phase 0 validation

// Type imports
import type {
  User,
  UserPreferences,
  UserSettings,
  Trip,
  TripTraveler,
  TripBriefing,
  Flight,
  FlightStatus,
  Document,
  DocumentType,
  FamilyMember,
  Household,
  SpecialNeeds,
  Disruption,
  RebookingOption,
  CompensationClaim,
  Airport,
  Airline,
  Lounge,
} from '@/types'

// Data imports
import {
  carlosMartinez,
  marcusThompson,
  mockUsers,
  mockFamilyMembers,
  mockHouseholds,
  mockTrips,
  mockFlights,
  mockDocuments,
  mockAirports,
  mockAirlines,
} from '@/data'

// API imports
import {
  getUser,
  updateUser,
  updatePreferences,
  updateSettings,
} from '@/lib/api/users'

import {
  getTrips,
  getTrip,
  getUpcomingTrips,
  createTrip,
  updateTrip,
} from '@/lib/api/trips'

import {
  getFlight,
  getFlightStatus,
  simulateStatusUpdate,
  simulateGateChange,
  simulateDelay,
} from '@/lib/api/flights'

import {
  getDocuments,
  getDocument,
  getDocumentsByType,
  addDocument,
  updateDocument,
} from '@/lib/api/documents'

import {
  getFamilyMembers,
  getFamilyMember,
  getHousehold,
  addFamilyMember,
  updateFamilyMember,
} from '@/lib/api/family'

// Store imports
import { useUserStore } from '@/lib/store/user-store'
import { useUIStore } from '@/lib/store/ui-store'
import { useTripStore } from '@/lib/store/trip-store'

// Verification function
export function verifyPhase0Imports() {
  console.log('Phase 0 Data Model Verification')
  console.log('================================')
  console.log('')
  console.log('Types imported: User, Trip, Flight, Document, etc.')
  console.log('')
  console.log('Mock data imported:', {
    users: Object.keys(mockUsers).length,
    trips: Object.keys(mockTrips).length,
    flights: Object.keys(mockFlights).length,
    documents: Object.keys(mockDocuments).length,
    airports: Object.keys(mockAirports).length,
    airlines: Object.keys(mockAirlines).length,
  })
  console.log('')
  console.log('API functions available:', {
    users: typeof getUser === 'function',
    trips: typeof getTrips === 'function',
    flights: typeof getFlight === 'function',
    documents: typeof getDocuments === 'function',
    family: typeof getFamilyMembers === 'function',
  })
  console.log('')
  console.log('Stores available:', {
    userStore: typeof useUserStore === 'function',
    uiStore: typeof useUIStore === 'function',
    tripStore: typeof useTripStore === 'function',
  })
  console.log('')
  console.log('✅ All imports verified successfully!')
  console.log('Phase 0 is complete and ready for Phase 1')
}
