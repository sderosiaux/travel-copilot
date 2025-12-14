'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ExpiryBadge } from '@/components/features/documents'
import { useDocument, useDeleteDocument } from '@/lib/hooks/use-documents'
import type { PassportData, DocumentLoyaltyProgram as LoyaltyProgram, VisaData } from '@/types'
import {
  BookOpen,
  CreditCard,
  Badge,
  Shield,
  Syringe,
  FileText,
  Plane,
  ArrowLeft,
  Edit,
  Trash2,
  FileImage,
} from 'lucide-react'
import { format, parseISO } from 'date-fns'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

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

interface DocumentDetailClientProps {
  documentId: string
}

export default function DocumentDetailClient({ documentId }: DocumentDetailClientProps) {
  const router = useRouter()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const { data: document, isLoading } = useDocument(documentId)
  const deleteDocumentMutation = useDeleteDocument()

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <p className="text-text-secondary text-center">Loading document...</p>
      </div>
    )
  }

  if (!document) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <p className="text-text-secondary text-center">Document not found</p>
      </div>
    )
  }

  const Icon = documentIcons[document.type]

  const handleDelete = async () => {
    try {
      await deleteDocumentMutation.mutateAsync(document.id)
      router.push('/documents')
    } catch (error) {
      console.error('Failed to delete document:', error)
    }
  }

  const renderPassportDetails = (data: PassportData) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <div className="text-sm text-text-secondary font-medium mb-1">Full Name</div>
        <div className="text-text-primary">{`${data.surname}, ${data.givenNames}`}</div>
      </div>
      <div>
        <div className="text-sm text-text-secondary font-medium mb-1">Passport Number</div>
        <div className="text-text-primary font-mono">{data.passportNumber}</div>
      </div>
      <div>
        <div className="text-sm text-text-secondary font-medium mb-1">Nationality</div>
        <div className="text-text-primary">{data.nationality}</div>
      </div>
      <div>
        <div className="text-sm text-text-secondary font-medium mb-1">Date of Birth</div>
        <div className="text-text-primary">
          {format(parseISO(data.dateOfBirth), 'dd MMM yyyy')}
        </div>
      </div>
      {data.placeOfBirth && (
        <div>
          <div className="text-sm text-text-secondary font-medium mb-1">Place of Birth</div>
          <div className="text-text-primary">{data.placeOfBirth}</div>
        </div>
      )}
      <div>
        <div className="text-sm text-text-secondary font-medium mb-1">Sex</div>
        <div className="text-text-primary">{data.sex === 'M' ? 'Male' : data.sex === 'F' ? 'Female' : 'Other'}</div>
      </div>
      <div>
        <div className="text-sm text-text-secondary font-medium mb-1">Issue Date</div>
        <div className="text-text-primary">
          {format(parseISO(data.issueDate), 'dd MMM yyyy')}
        </div>
      </div>
      <div>
        <div className="text-sm text-text-secondary font-medium mb-1">Expiry Date</div>
        <div className="text-text-primary">
          {format(parseISO(data.expiryDate), 'dd MMM yyyy')}
        </div>
      </div>
      <div>
        <div className="text-sm text-text-secondary font-medium mb-1">Issuing Country</div>
        <div className="text-text-primary">{data.issuingCountry}</div>
      </div>
      {data.issuingAuthority && (
        <div>
          <div className="text-sm text-text-secondary font-medium mb-1">Issuing Authority</div>
          <div className="text-text-primary">{data.issuingAuthority}</div>
        </div>
      )}
    </div>
  )

  const renderLoyaltyProgramDetails = (data: LoyaltyProgram) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <div className="text-sm text-text-secondary font-medium mb-1">Program</div>
        <div className="text-text-primary">{data.program}</div>
      </div>
      <div>
        <div className="text-sm text-text-secondary font-medium mb-1">Member Number</div>
        <div className="text-text-primary font-mono">{data.memberNumber}</div>
      </div>
      {data.airline && (
        <div>
          <div className="text-sm text-text-secondary font-medium mb-1">Airline</div>
          <div className="text-text-primary">{data.airline}</div>
        </div>
      )}
      {data.alliance && (
        <div>
          <div className="text-sm text-text-secondary font-medium mb-1">Alliance</div>
          <div className="text-text-primary capitalize">{data.alliance.replace('_', ' ')}</div>
        </div>
      )}
      {data.tier && (
        <div>
          <div className="text-sm text-text-secondary font-medium mb-1">Tier</div>
          <div className="text-text-primary">{data.tier}</div>
        </div>
      )}
      {data.points !== undefined && (
        <div>
          <div className="text-sm text-text-secondary font-medium mb-1">Points</div>
          <div className="text-text-primary font-semibold text-lg">
            {data.points.toLocaleString()}
          </div>
        </div>
      )}
      {data.expiryDate && (
        <div>
          <div className="text-sm text-text-secondary font-medium mb-1">Points Expiry</div>
          <div className="text-text-primary">
            {format(parseISO(data.expiryDate), 'dd MMM yyyy')}
          </div>
        </div>
      )}
    </div>
  )

  const renderGenericDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {document.number && (
        <div>
          <div className="text-sm text-text-secondary font-medium mb-1">Document Number</div>
          <div className="text-text-primary font-mono">{document.number}</div>
        </div>
      )}
      {document.issueDate && (
        <div>
          <div className="text-sm text-text-secondary font-medium mb-1">Issue Date</div>
          <div className="text-text-primary">
            {format(parseISO(document.issueDate), 'dd MMM yyyy')}
          </div>
        </div>
      )}
      {document.expiryDate && (
        <div>
          <div className="text-sm text-text-secondary font-medium mb-1">Expiry Date</div>
          <div className="text-text-primary">
            {format(parseISO(document.expiryDate), 'dd MMM yyyy')}
          </div>
        </div>
      )}
      {document.issuingCountry && (
        <div>
          <div className="text-sm text-text-secondary font-medium mb-1">Issuing Country</div>
          <div className="text-text-primary">{document.issuingCountry}</div>
        </div>
      )}
      {document.issuingAuthority && (
        <div>
          <div className="text-sm text-text-secondary font-medium mb-1">Issuing Authority</div>
          <div className="text-text-primary">{document.issuingAuthority}</div>
        </div>
      )}
    </div>
  )

  const renderDetails = () => {
    if (document.type === 'passport' && document.data) {
      return renderPassportDetails(document.data as PassportData)
    }
    if (document.type === 'loyalty_program' && document.data) {
      return renderLoyaltyProgramDetails(document.data as LoyaltyProgram)
    }
    return renderGenericDetails()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => router.push('/documents')}
        className="mb-6 -ml-2"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Documents
      </Button>

      {/* Header Card */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary-50 text-primary">
                <Icon className="w-8 h-8" />
              </div>
              <div>
                <div className="text-sm text-text-secondary font-medium uppercase tracking-wider mb-1">
                  {documentTypeLabels[document.type]}
                </div>
                <h1 className="text-3xl font-bold text-text-primary">{document.name}</h1>
              </div>
            </div>
            <ExpiryBadge
              expiryDate={document.expiryDate}
              status={document.status}
              showDaysRemaining
            />
          </div>
        </CardHeader>
      </Card>

      {/* Details Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Document Details</CardTitle>
        </CardHeader>
        <CardContent>{renderDetails()}</CardContent>
      </Card>

      {/* Attachments Card */}
      {document.attachments && document.attachments.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Attachments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {document.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-bg-secondary transition-colors"
                >
                  <FileImage className="w-5 h-5 text-text-tertiary" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-text-primary">
                      {attachment.filename}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {(attachment.size / 1024).toFixed(1)} KB
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="secondary" className="gap-2" disabled>
          <Edit className="w-4 h-4" />
          Edit Document
        </Button>
        <Button
          variant="danger"
          className="gap-2"
          onClick={() => setDeleteDialogOpen(true)}
        >
          <Trash2 className="w-4 h-4" />
          Delete Document
        </Button>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Document</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{document.name}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              disabled={deleteDocumentMutation.isPending}
            >
              {deleteDocumentMutation.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
