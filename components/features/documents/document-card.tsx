'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ExpiryBadge } from './expiry-badge'
import type { Document } from '@/types'
import {
  BookOpen,
  CreditCard,
  Badge,
  Shield,
  Syringe,
  FileText,
  Plane,
} from 'lucide-react'
import { format, parseISO } from 'date-fns'

interface DocumentCardProps {
  document: Document
  onClick?: () => void
}

const documentIcons = {
  passport: BookOpen,
  visa: Plane,
  driving_license: Badge,
  national_id: Badge,
  loyalty_program: CreditCard,
  insurance: Shield,
  vaccination: Syringe,
  other: FileText,
}

const documentTypeLabels = {
  passport: 'Passport',
  visa: 'Visa',
  driving_license: 'Driving License',
  national_id: 'National ID',
  loyalty_program: 'Loyalty Program',
  insurance: 'Insurance',
  vaccination: 'Vaccination',
  other: 'Document',
}

export function DocumentCard({ document, onClick }: DocumentCardProps) {
  const Icon = documentIcons[document.type]

  return (
    <Card
      variant="interactive"
      className="h-full"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary-50 text-primary">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-text-secondary font-medium uppercase tracking-wider">
                {documentTypeLabels[document.type]}
              </div>
              <h3 className="text-base font-semibold text-text-primary mt-0.5">
                {document.name}
              </h3>
            </div>
          </div>
          <ExpiryBadge expiryDate={document.expiryDate} status={document.status} />
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        {document.number && (
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Number:</span>
            <span className="text-text-primary font-medium">{document.number}</span>
          </div>
        )}

        {document.expiryDate && (
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Expires:</span>
            <span className="text-text-primary font-medium">
              {format(parseISO(document.expiryDate), 'dd MMM yyyy')}
            </span>
          </div>
        )}

        {document.issuingCountry && (
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Country:</span>
            <span className="text-text-primary font-medium">{document.issuingCountry}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
