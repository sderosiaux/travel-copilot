import { z } from 'zod'

export const passportSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  surname: z.string().min(1, 'Surname is required'),
  givenNames: z.string().min(1, 'Given names are required'),
  passportNumber: z.string().min(1, 'Passport number is required'),
  nationality: z.string().min(2, 'Nationality is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  placeOfBirth: z.string().optional(),
  sex: z.enum(['M', 'F', 'X']),
  issueDate: z.string().min(1, 'Issue date is required'),
  expiryDate: z.string().min(1, 'Expiry date is required'),
  issuingCountry: z.string().min(2, 'Issuing country is required'),
  issuingAuthority: z.string().optional(),
})

export const loyaltyProgramSchema = z.object({
  name: z.string().min(1, 'Program name is required'),
  program: z.string().min(1, 'Program is required'),
  airline: z.string().optional(),
  alliance: z.enum(['oneworld', 'star_alliance', 'skyteam']).optional(),
  memberNumber: z.string().min(1, 'Member number is required'),
  tier: z.string().optional(),
  points: z.number().optional(),
  expiryDate: z.string().optional(),
})

export const visaSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  visaType: z.string().min(1, 'Visa type is required'),
  visaNumber: z.string().min(1, 'Visa number is required'),
  country: z.string().min(2, 'Country is required'),
  entries: z.enum(['single', 'multiple']),
  validFrom: z.string().min(1, 'Valid from date is required'),
  validUntil: z.string().min(1, 'Valid until date is required'),
  purpose: z.string().optional(),
})

export const drivingLicenseSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  licenseNumber: z.string().min(1, 'License number is required'),
  issuingCountry: z.string().min(2, 'Issuing country is required'),
  issueDate: z.string().min(1, 'Issue date is required'),
  expiryDate: z.string().min(1, 'Expiry date is required'),
  categories: z.string().optional(),
})

export const insuranceSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  provider: z.string().min(1, 'Provider is required'),
  policyNumber: z.string().min(1, 'Policy number is required'),
  policyType: z.string().optional(),
  coverageAmount: z.string().optional(),
  validFrom: z.string().min(1, 'Valid from date is required'),
  validUntil: z.string().min(1, 'Valid until date is required'),
})

export const vaccinationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  vaccineType: z.string().min(1, 'Vaccine type is required'),
  certificateNumber: z.string().optional(),
  dateAdministered: z.string().min(1, 'Date administered is required'),
  validUntil: z.string().optional(),
  administeredBy: z.string().optional(),
  batchNumber: z.string().optional(),
})

export const genericDocumentSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  issueDate: z.string().optional(),
  expiryDate: z.string().optional(),
})

export type PassportFormData = z.infer<typeof passportSchema>
export type LoyaltyProgramFormData = z.infer<typeof loyaltyProgramSchema>
export type VisaFormData = z.infer<typeof visaSchema>
export type DrivingLicenseFormData = z.infer<typeof drivingLicenseSchema>
export type InsuranceFormData = z.infer<typeof insuranceSchema>
export type VaccinationFormData = z.infer<typeof vaccinationSchema>
export type GenericDocumentFormData = z.infer<typeof genericDocumentSchema>
