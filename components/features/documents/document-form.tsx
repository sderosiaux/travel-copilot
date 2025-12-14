'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { DocumentType } from '@/types'
import {
  passportSchema,
  loyaltyProgramSchema,
  visaSchema,
  drivingLicenseSchema,
  insuranceSchema,
  vaccinationSchema,
  genericDocumentSchema,
  type PassportFormData,
  type LoyaltyProgramFormData,
  type VisaFormData,
  type DrivingLicenseFormData,
  type InsuranceFormData,
  type VaccinationFormData,
  type GenericDocumentFormData,
} from '@/lib/schemas/document'

type DocumentFormData =
  | PassportFormData
  | LoyaltyProgramFormData
  | VisaFormData
  | DrivingLicenseFormData
  | InsuranceFormData
  | VaccinationFormData
  | GenericDocumentFormData

interface DocumentFormProps {
  type: DocumentType
  defaultValues?: Partial<DocumentFormData>
  onSubmit: (data: DocumentFormData) => void
  onCancel?: () => void
  isSubmitting?: boolean
}

const schemas = {
  passport: passportSchema,
  loyalty_program: loyaltyProgramSchema,
  visa: visaSchema,
  driving_license: drivingLicenseSchema,
  insurance: insuranceSchema,
  vaccination: vaccinationSchema,
  national_id: genericDocumentSchema,
  other: genericDocumentSchema,
}

export function DocumentForm({
  type,
  defaultValues,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: DocumentFormProps) {
  const schema = schemas[type]

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DocumentFormData>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const renderPassportFields = () => {
    const err = errors as any
    return (
      <>
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">Display Name</label>
          <Input {...register('name' as any)} placeholder="e.g., UK Passport - John Doe" />
          {err.name && <p className="text-xs text-error">{err.name.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Surname</label>
            <Input {...register('surname' as any)} />
            {err.surname && <p className="text-xs text-error">{err.surname.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Given Names</label>
            <Input {...register('givenNames' as any)} />
            {err.givenNames && <p className="text-xs text-error">{err.givenNames.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Passport Number</label>
            <Input {...register('passportNumber' as any)} />
            {err.passportNumber && <p className="text-xs text-error">{err.passportNumber.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Nationality</label>
            <Input {...register('nationality' as any)} placeholder="e.g., GBR" />
            {err.nationality && <p className="text-xs text-error">{err.nationality.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Date of Birth</label>
            <Input type="date" {...register('dateOfBirth' as any)} />
            {err.dateOfBirth && <p className="text-xs text-error">{err.dateOfBirth.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Sex</label>
            <select {...register('sex' as any)} className="w-full px-3 py-2 border border-border rounded-lg bg-bg-primary text-text-primary">
              <option value="">Select...</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="X">Other</option>
            </select>
            {err.sex && <p className="text-xs text-error">{err.sex.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">Place of Birth</label>
          <Input {...register('placeOfBirth' as any)} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Issue Date</label>
            <Input type="date" {...register('issueDate' as any)} />
            {err.issueDate && <p className="text-xs text-error">{err.issueDate.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Expiry Date</label>
            <Input type="date" {...register('expiryDate' as any)} />
            {err.expiryDate && <p className="text-xs text-error">{err.expiryDate.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Issuing Country</label>
            <Input {...register('issuingCountry' as any)} placeholder="e.g., GBR" />
            {err.issuingCountry && <p className="text-xs text-error">{err.issuingCountry.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Issuing Authority</label>
            <Input {...register('issuingAuthority' as any)} placeholder="e.g., HMPO" />
          </div>
        </div>
      </>
    )
  }

  const renderLoyaltyProgramFields = () => {
    const err = errors as any
    return (
      <>
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">Display Name</label>
          <Input {...register('name' as any)} placeholder="e.g., BA Executive Club Gold" />
          {err.name && <p className="text-xs text-error">{err.name.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">Program Name</label>
          <Input {...register('program' as any)} placeholder="e.g., BA Executive Club" />
          {err.program && <p className="text-xs text-error">{err.program.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Member Number</label>
            <Input {...register('memberNumber' as any)} />
            {err.memberNumber && <p className="text-xs text-error">{err.memberNumber.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Tier</label>
            <Input {...register('tier' as any)} placeholder="e.g., Gold" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Airline</label>
            <Input {...register('airline' as any)} placeholder="e.g., BA" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Alliance</label>
            <select {...register('alliance' as any)} className="w-full px-3 py-2 border border-border rounded-lg bg-bg-primary text-text-primary">
              <option value="">None</option>
              <option value="oneworld">Oneworld</option>
              <option value="star_alliance">Star Alliance</option>
              <option value="skyteam">SkyTeam</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Points</label>
            <Input type="number" {...register('points' as any, { valueAsNumber: true })} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Expiry Date (optional)</label>
            <Input type="date" {...register('expiryDate' as any)} />
          </div>
        </div>
      </>
    )
  }

  const renderVisaFields = () => {
    const err = errors as any
    return (
      <>
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">Display Name</label>
          <Input {...register('name' as any)} placeholder="e.g., US Tourist Visa" />
          {err.name && <p className="text-xs text-error">{err.name.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Visa Type</label>
            <Input {...register('visaType' as any)} placeholder="e.g., Tourist" />
            {err.visaType && <p className="text-xs text-error">{err.visaType.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Visa Number</label>
            <Input {...register('visaNumber' as any)} />
            {err.visaNumber && <p className="text-xs text-error">{err.visaNumber.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Country</label>
            <Input {...register('country' as any)} placeholder="e.g., USA" />
            {err.country && <p className="text-xs text-error">{err.country.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Entries</label>
            <select {...register('entries' as any)} className="w-full px-3 py-2 border border-border rounded-lg bg-bg-primary text-text-primary">
              <option value="">Select...</option>
              <option value="single">Single</option>
              <option value="multiple">Multiple</option>
            </select>
            {err.entries && <p className="text-xs text-error">{err.entries.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Valid From</label>
            <Input type="date" {...register('validFrom' as any)} />
            {err.validFrom && <p className="text-xs text-error">{err.validFrom.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Valid Until</label>
            <Input type="date" {...register('validUntil' as any)} />
            {err.validUntil && <p className="text-xs text-error">{err.validUntil.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">Purpose (optional)</label>
          <Input {...register('purpose' as any)} />
        </div>
      </>
    )
  }

  const renderGenericFields = () => {
    const err = errors as any
    return (
      <>
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">Document Name</label>
          <Input {...register('name' as any)} placeholder="Document name" />
          {err.name && <p className="text-xs text-error">{err.name.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">Description (optional)</label>
          <Input {...register('description' as any)} placeholder="Brief description" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Issue Date (optional)</label>
            <Input type="date" {...register('issueDate' as any)} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Expiry Date (optional)</label>
            <Input type="date" {...register('expiryDate' as any)} />
          </div>
        </div>
      </>
    )
  }

  const renderFields = () => {
    switch (type) {
      case 'passport':
        return renderPassportFields()
      case 'loyalty_program':
        return renderLoyaltyProgramFields()
      case 'visa':
        return renderVisaFields()
      default:
        return renderGenericFields()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {renderFields()}

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? 'Saving...' : 'Save Document'}
        </Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}
