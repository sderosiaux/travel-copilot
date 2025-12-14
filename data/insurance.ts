import type { InsurancePolicy, ActiveClaim } from '@/types/insurance'

export const comprehensivePolicy: InsurancePolicy = {
  id: 'ins-001',
  userId: 'user-carlos-001',
  policyNumber: 'WTI-2025-1234567',
  provider: 'World Travel Insurance',
  type: 'comprehensive',
  status: 'active',
  coverageStart: '2025-01-01',
  coverageEnd: '2025-12-31',
  coverageDetails: {
    medicalExpenses: {
      covered: true,
      maxAmount: 1000000,
      currency: 'GBP',
      deductible: 100,
      notes: 'Covers emergency medical treatment, hospitalization, and repatriation',
    },
    emergencyEvacuation: {
      covered: true,
      maxAmount: 500000,
      currency: 'GBP',
      notes: 'Includes air ambulance and medical evacuation to nearest suitable facility',
    },
    tripCancellation: {
      covered: true,
      maxAmount: 5000,
      currency: 'GBP',
      deductible: 50,
      notes: 'Covers pre-paid, non-refundable trip costs for covered reasons',
    },
    tripInterruption: {
      covered: true,
      maxAmount: 5000,
      currency: 'GBP',
      deductible: 50,
      notes: 'Reimburses unused trip costs and additional transportation',
    },
    baggageLoss: {
      covered: true,
      maxAmount: 2500,
      currency: 'GBP',
      deductible: 100,
      notes: 'Per person limit. Single item limit £500',
    },
    baggageDelay: {
      covered: true,
      maxAmount: 500,
      currency: 'GBP',
      notes: 'After 12 hours delay for emergency purchases',
    },
    flightDelay: {
      covered: true,
      maxAmount: 300,
      currency: 'GBP',
      notes: 'After 6 hours delay. £50 per 6 hours up to maximum',
    },
    personalLiability: {
      covered: true,
      maxAmount: 2000000,
      currency: 'GBP',
      notes: 'Legal liability for injury to others or damage to property',
    },
    additionalBenefits: [
      'Travel document replacement',
      'Legal assistance',
      '24/7 emergency assistance',
      'COVID-19 coverage included',
      'Adventure sports coverage (skiing, diving)',
      'Rental car excess coverage',
      'Missed connection coverage',
    ],
    exclusions: [
      'Pre-existing medical conditions not declared',
      'Travel against government advice',
      'Activities under influence of alcohol/drugs',
      'War, terrorism in high-risk zones',
      'Extreme sports not listed in policy',
      'Pregnancy after 28 weeks',
      'Non-emergency treatment',
    ],
  },
  claimInfo: {
    howToFile: [
      'Contact 24/7 claims hotline: +44 20 1234 5678',
      'Report claim online at www.worldtravelinsurance.com/claims',
      'Email: claims@worldtravelinsurance.com',
      'Provide policy number, incident details, and supporting documents',
      'Keep all receipts and medical reports',
    ],
    requiredDocuments: [
      'Completed claim form',
      'Original receipts and invoices',
      'Medical reports (for medical claims)',
      'Police report (for theft/loss)',
      'Airline/hotel confirmation and correspondence',
      'Bank statements showing purchases',
      'Photographs of damaged items',
    ],
    processingTime: 'Claims typically processed within 10-15 business days',
  },
  emergencyContacts: [
    {
      type: 'emergency',
      name: 'Emergency Assistance',
      phone: '0800 123 4567',
      phoneInternational: '+44 20 1234 5678',
      email: 'emergency@worldtravelinsurance.com',
      available: '24/7',
    },
    {
      type: 'claims',
      name: 'Claims Department',
      phone: '0800 123 4568',
      phoneInternational: '+44 20 1234 5679',
      email: 'claims@worldtravelinsurance.com',
      available: 'Mon-Fri 9:00-17:00 GMT',
    },
    {
      type: 'medical',
      name: 'Medical Assistance',
      phone: '0800 123 4569',
      phoneInternational: '+44 20 1234 5680',
      email: 'medical@worldtravelinsurance.com',
      available: '24/7',
    },
    {
      type: 'assistance',
      name: 'General Enquiries',
      phone: '0800 123 4570',
      phoneInternational: '+44 20 1234 5681',
      email: 'help@worldtravelinsurance.com',
      available: 'Mon-Fri 8:00-20:00, Sat-Sun 9:00-17:00 GMT',
    },
  ],
  policyDocuments: [
    {
      id: 'doc-policy-001',
      name: 'Insurance Policy Document',
      type: 'policy',
      url: '/documents/policy-WTI-2025-1234567.pdf',
      size: 2456789,
      uploadedAt: '2025-01-01T10:00:00Z',
    },
    {
      id: 'doc-cert-001',
      name: 'Certificate of Insurance',
      type: 'certificate',
      url: '/documents/certificate-WTI-2025-1234567.pdf',
      size: 123456,
      uploadedAt: '2025-01-01T10:00:00Z',
    },
    {
      id: 'doc-terms-001',
      name: 'Terms and Conditions',
      type: 'terms',
      url: '/documents/terms-WTI-2025.pdf',
      size: 567890,
      uploadedAt: '2025-01-01T10:00:00Z',
    },
    {
      id: 'doc-claim-form-001',
      name: 'Claim Form (Blank)',
      type: 'claim_form',
      url: '/documents/claim-form-WTI.pdf',
      size: 98765,
      uploadedAt: '2025-01-01T10:00:00Z',
    },
  ],
  premium: {
    amount: 299.99,
    currency: 'GBP',
    frequency: 'annual',
  },
  createdAt: '2025-01-01T10:00:00Z',
  updatedAt: '2025-01-01T10:00:00Z',
}

export const activeClaim: ActiveClaim = {
  id: 'claim-001',
  policyId: 'ins-001',
  claimNumber: 'CLM-2025-789456',
  type: 'Flight Delay',
  status: 'processing',
  amount: 150.0,
  currency: 'GBP',
  filedDate: '2025-12-13T10:30:00Z',
  description:
    'Flight BA287 from London to New York was cancelled, resulting in 12-hour delay and overnight hotel stay.',
  documents: [
    'Booking confirmation',
    'Cancellation notice from airline',
    'Hotel receipt',
    'Meal receipts',
  ],
  updates: [
    {
      date: '2025-12-13T10:30:00Z',
      status: 'Received',
      message: 'Your claim has been received and assigned reference number CLM-2025-789456',
      updatedBy: 'System',
    },
    {
      date: '2025-12-13T14:20:00Z',
      status: 'Under Review',
      message:
        'Claims assessor has started reviewing your documentation. Additional information may be requested.',
      updatedBy: 'Sarah Johnson',
    },
    {
      date: '2025-12-14T09:15:00Z',
      status: 'Processing',
      message:
        'All documents verified. Claim approved for £150.00. Payment will be processed within 3-5 business days.',
      updatedBy: 'Sarah Johnson',
    },
  ],
}

export const mockInsurancePolicies = {
  comprehensive: comprehensivePolicy,
}

export const mockActiveClaims = {
  flightDelay: activeClaim,
}
