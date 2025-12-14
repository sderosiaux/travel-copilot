'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { DocumentForm } from './document-form'
import type { DocumentType, Document } from '@/types'
import {
  BookOpen,
  CreditCard,
  Badge,
  Shield,
  Syringe,
  FileText,
  Plane,
  ChevronLeft,
} from 'lucide-react'
import { useAddDocument } from '@/lib/hooks/use-documents'
import type { PassportFormData, LoyaltyProgramFormData } from '@/lib/schemas/document'

interface AddDocumentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userId: string
}

const documentTypes = [
  {
    type: 'passport' as DocumentType,
    label: 'Passport',
    icon: BookOpen,
    description: 'Travel passport document',
  },
  {
    type: 'visa' as DocumentType,
    label: 'Visa',
    icon: Plane,
    description: 'Travel visa or entry permit',
  },
  {
    type: 'loyalty_program' as DocumentType,
    label: 'Loyalty Program',
    icon: CreditCard,
    description: 'Airline or hotel loyalty card',
  },
  {
    type: 'driving_license' as DocumentType,
    label: 'Driving License',
    icon: Badge,
    description: 'Driving license or permit',
  },
  {
    type: 'insurance' as DocumentType,
    label: 'Insurance',
    icon: Shield,
    description: 'Travel or health insurance',
  },
  {
    type: 'vaccination' as DocumentType,
    label: 'Vaccination',
    icon: Syringe,
    description: 'Vaccination certificate',
  },
  {
    type: 'national_id' as DocumentType,
    label: 'National ID',
    icon: Badge,
    description: 'National identity card',
  },
  {
    type: 'other' as DocumentType,
    label: 'Other',
    icon: FileText,
    description: 'Other travel document',
  },
]

export function AddDocumentDialog({ open, onOpenChange, userId }: AddDocumentDialogProps) {
  const [step, setStep] = useState<'select' | 'form'>('select')
  const [selectedType, setSelectedType] = useState<DocumentType | null>(null)

  const addDocumentMutation = useAddDocument()

  const handleTypeSelect = (type: DocumentType) => {
    setSelectedType(type)
    setStep('form')
  }

  const handleBack = () => {
    setStep('select')
    setSelectedType(null)
  }

  const handleSubmit = async (data: any) => {
    if (!selectedType) return

    let documentData: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>

    if (selectedType === 'passport') {
      const formData = data as PassportFormData
      documentData = {
        userId,
        type: 'passport',
        name: formData.name,
        number: formData.passportNumber,
        issueDate: formData.issueDate,
        expiryDate: formData.expiryDate,
        issuingCountry: formData.issuingCountry,
        issuingAuthority: formData.issuingAuthority,
        status: 'valid',
        data: {
          surname: formData.surname,
          givenNames: formData.givenNames,
          nationality: formData.nationality,
          dateOfBirth: formData.dateOfBirth,
          placeOfBirth: formData.placeOfBirth,
          sex: formData.sex,
          passportNumber: formData.passportNumber,
          issueDate: formData.issueDate,
          expiryDate: formData.expiryDate,
          issuingCountry: formData.issuingCountry,
          issuingAuthority: formData.issuingAuthority,
        },
      }
    } else if (selectedType === 'loyalty_program') {
      const formData = data as LoyaltyProgramFormData
      documentData = {
        userId,
        type: 'loyalty_program',
        name: formData.name,
        number: formData.memberNumber,
        expiryDate: formData.expiryDate,
        status: 'valid',
        data: {
          program: formData.program,
          airline: formData.airline,
          alliance: formData.alliance,
          memberNumber: formData.memberNumber,
          tier: formData.tier,
          points: formData.points,
          expiryDate: formData.expiryDate,
        },
      }
    } else {
      documentData = {
        userId,
        type: selectedType,
        name: data.name,
        number: data.number,
        issueDate: data.issueDate,
        expiryDate: data.expiryDate,
        status: 'valid',
        data,
      }
    }

    try {
      await addDocumentMutation.mutateAsync(documentData)
      onOpenChange(false)
      setStep('select')
      setSelectedType(null)
    } catch (error) {
      console.error('Failed to add document:', error)
    }
  }

  const handleCancel = () => {
    onOpenChange(false)
    setTimeout(() => {
      setStep('select')
      setSelectedType(null)
    }, 200)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {step === 'select' ? 'Add New Document' : 'Document Details'}
          </DialogTitle>
          <DialogDescription>
            {step === 'select'
              ? 'Select the type of document you want to add'
              : 'Fill in the document information'}
          </DialogDescription>
        </DialogHeader>

        {step === 'select' ? (
          <div className="grid grid-cols-2 gap-3 py-4">
            {documentTypes.map((docType) => {
              const Icon = docType.icon
              return (
                <button
                  key={docType.type}
                  onClick={() => handleTypeSelect(docType.type)}
                  className="flex items-start gap-3 p-4 rounded-lg border border-border hover:border-primary-300 hover:bg-primary-50/30 transition-all text-left"
                >
                  <div className="p-2 rounded-lg bg-primary-50 text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-text-primary">{docType.label}</div>
                    <div className="text-sm text-text-secondary mt-1">
                      {docType.description}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        ) : (
          <div className="py-4">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="mb-4 -ml-2"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to selection
            </Button>

            {selectedType && (
              <DocumentForm
                type={selectedType}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                isSubmitting={addDocumentMutation.isPending}
              />
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
