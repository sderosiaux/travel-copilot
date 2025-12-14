export interface Document {
  id: string
  userId: string
  type: DocumentType
  name: string
  number?: string
  issueDate?: string
  expiryDate?: string
  issuingCountry?: string
  issuingAuthority?: string
  status: 'valid' | 'expiring_soon' | 'expired' | 'pending'
  data?: PassportData | LoyaltyProgram | Record<string, unknown>
  attachments?: Array<{
    id: string
    filename: string
    url: string
    type: string
    size: number
  }>
  createdAt: string
  updatedAt: string
}

export type DocumentType =
  | 'passport'
  | 'visa'
  | 'driving_license'
  | 'national_id'
  | 'loyalty_program'
  | 'insurance'
  | 'vaccination'
  | 'other'

export interface PassportData {
  surname: string
  givenNames: string
  nationality: string
  dateOfBirth: string
  placeOfBirth?: string
  sex: 'M' | 'F' | 'X'
  passportNumber: string
  issueDate: string
  expiryDate: string
  issuingCountry: string
  issuingAuthority?: string
  machineReadableZone?: string[]
}

export interface LoyaltyProgram {
  program: string
  airline?: string
  alliance?: 'oneworld' | 'star_alliance' | 'skyteam'
  memberNumber: string
  tier?: string
  points?: number
  expiryDate?: string
}

export interface VisaData {
  visaType: string
  visaNumber: string
  country: string
  entries: 'single' | 'multiple'
  validFrom: string
  validUntil: string
  purpose?: string
}
