export interface EmergencyContact {
  id: string
  userId: string
  type: EmergencyContactType
  name: string
  relationship?: string
  phone: string
  phoneSecondary?: string
  email?: string
  address?: string
  isPrimary: boolean
  notes?: string
  createdAt: string
  updatedAt: string
}

export type EmergencyContactType = 'personal' | 'medical' | 'legal' | 'work' | 'insurance'

export interface CountryEmergencyNumbers {
  countryCode: string
  countryName: string
  services: EmergencyService[]
  notes?: string[]
  lastUpdated: string
}

export interface EmergencyService {
  type: ServiceType
  name: string
  number: string
  description?: string
  available: string
}

export type ServiceType =
  | 'police'
  | 'ambulance'
  | 'fire'
  | 'general_emergency'
  | 'coast_guard'
  | 'mountain_rescue'
  | 'poison_control'
  | 'tourist_police'

export interface Embassy {
  id: string
  country: string
  representingCountry: string
  type: 'embassy' | 'consulate' | 'high_commission'
  name: string
  address: string
  city: string
  postalCode?: string
  phone: string
  emergencyPhone: string
  fax?: string
  email: string
  website: string
  services: string[]
  openingHours: OpeningHours
  emergencyAvailability: string
  location: {
    latitude: number
    longitude: number
  }
  notes?: string[]
}

export interface OpeningHours {
  monday: string
  tuesday: string
  wednesday: string
  thursday: string
  friday: string
  saturday: string
  sunday: string
  holidays?: string
}

export interface QuickDialEntry {
  id: string
  label: string
  type: 'emergency' | 'personal' | 'embassy' | 'insurance' | 'medical' | 'other'
  number: string
  description?: string
  icon?: string
  priority: number
}

export interface EmergencyInfo {
  userId: string
  medicalInfo?: MedicalInfo
  allergies: string[]
  medications: string[]
  bloodType?: string
  emergencyContacts: string[]
  insurancePolicies: string[]
  lastUpdated: string
}

export interface MedicalInfo {
  conditions: string[]
  allergies: string[]
  medications: Medication[]
  bloodType?: string
  doctorName?: string
  doctorPhone?: string
  notes?: string
}

export interface Medication {
  name: string
  dosage: string
  frequency: string
  prescribedBy?: string
  notes?: string
}
