import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { Badge } from '@/components/ui'
import { FileText, CheckCircle2, AlertCircle, XCircle, Clock } from 'lucide-react'
import type { DocumentChecklistItem } from '@/lib/briefing/generate-briefing'

interface DocumentChecklistProps {
  documents: DocumentChecklistItem[]
}

export function DocumentChecklistCard({ documents }: DocumentChecklistProps) {
  const validDocs = documents.filter(d => d.status === 'valid').length
  const totalRequired = documents.filter(d => d.required).length

  const getStatusIcon = (status: DocumentChecklistItem['status']) => {
    switch (status) {
      case 'valid':
        return <CheckCircle2 className="w-5 h-5 text-success" />
      case 'expiring_soon':
        return <Clock className="w-5 h-5 text-warning" />
      case 'expired':
        return <XCircle className="w-5 h-5 text-error" />
      case 'missing':
        return <AlertCircle className="w-5 h-5 text-error" />
      case 'pending':
        return <Clock className="w-5 h-5 text-warning" />
      default:
        return <FileText className="w-5 h-5 text-text-tertiary" />
    }
  }

  const getStatusBadge = (status: DocumentChecklistItem['status']) => {
    switch (status) {
      case 'valid':
        return <Badge variant="success">Valid</Badge>
      case 'expiring_soon':
        return <Badge variant="warning">Expiring Soon</Badge>
      case 'expired':
        return <Badge variant="error">Expired</Badge>
      case 'missing':
        return <Badge variant="error">Missing</Badge>
      case 'pending':
        return <Badge variant="warning">Pending</Badge>
      default:
        return <Badge variant="default">Unknown</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Document Checklist</CardTitle>
          <div className="text-sm text-text-secondary">
            {validDocs} / {totalRequired} required documents ready
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {documents.map(doc => (
            <div
              key={doc.id}
              className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-bg-secondary transition-colors"
            >
              <div className="mt-0.5">{getStatusIcon(doc.status)}</div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-medium text-text-primary truncate">
                    {doc.name}
                  </h4>
                  {doc.required && (
                    <Badge variant="default" className="text-xs">
                      Required
                    </Badge>
                  )}
                </div>

                {doc.expiryDate && (
                  <p className="text-xs text-text-secondary">
                    Expires: {new Date(doc.expiryDate).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                    {doc.daysUntilExpiry !== undefined && (
                      <span className="ml-1">
                        ({doc.daysUntilExpiry} days)
                      </span>
                    )}
                  </p>
                )}

                {doc.notes && (
                  <p className="text-xs text-text-tertiary mt-1">{doc.notes}</p>
                )}
              </div>

              <div className="flex-shrink-0">{getStatusBadge(doc.status)}</div>
            </div>
          ))}

          {documents.length === 0 && (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-text-tertiary mx-auto mb-2" />
              <p className="text-text-secondary">No documents to display</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
