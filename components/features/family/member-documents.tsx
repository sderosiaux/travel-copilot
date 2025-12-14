'use client'

import { Card, Badge } from '@/components/ui'
import { FileText, Calendar, AlertCircle, CheckCircle } from 'lucide-react'

interface Document {
  id: string
  type: string
  number: string
  expiryDate: string
  status: 'valid' | 'expiring' | 'expired'
}

interface MemberDocumentsProps {
  documentIds: string[]
}

// Mock function to get document details - in a real app this would fetch from a store or API
function getDocumentDetails(documentIds: string[]): Document[] {
  // This is mock data - in reality, you'd fetch this from your document store
  return [
    {
      id: documentIds[0] || 'doc-1',
      type: 'Passport',
      number: 'GB123456789',
      expiryDate: '2026-08-15',
      status: 'valid',
    },
  ]
}

export function MemberDocuments({ documentIds }: MemberDocumentsProps) {
  const documents = getDocumentDetails(documentIds)

  if (documents.length === 0) {
    return (
      <Card className="p-8 text-center">
        <FileText className="h-12 w-12 mx-auto mb-4 text-text-tertiary" />
        <h3 className="text-lg font-semibold text-text-primary mb-2">No Documents</h3>
        <p className="text-text-secondary">
          No travel documents have been added for this family member yet.
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {documents.map((doc) => (
        <Card key={doc.id} className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-500">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">{doc.type}</h3>
                <p className="text-sm text-text-secondary">Number: {doc.number}</p>
                <div className="flex items-center gap-2 mt-2 text-sm text-text-secondary">
                  <Calendar className="h-4 w-4" />
                  <span>Expires: {new Date(doc.expiryDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div>
              {doc.status === 'valid' && (
                <Badge variant="success">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Valid
                </Badge>
              )}
              {doc.status === 'expiring' && (
                <Badge variant="warning">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Expiring Soon
                </Badge>
              )}
              {doc.status === 'expired' && (
                <Badge variant="error">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Expired
                </Badge>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
