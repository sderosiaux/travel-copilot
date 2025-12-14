'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DocumentList, AddDocumentDialog } from '@/components/features/documents'
import { useDocuments } from '@/lib/hooks/use-documents'
import type { Document, DocumentType } from '@/types'
import { Plus, Search, Filter } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const documentTypeFilters = [
  { value: 'all', label: 'All Documents' },
  { value: 'passport', label: 'Passports' },
  { value: 'visa', label: 'Visas' },
  { value: 'loyalty_program', label: 'Loyalty Programs' },
  { value: 'driving_license', label: 'Driving Licenses' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'vaccination', label: 'Vaccinations' },
  { value: 'other', label: 'Other' },
]

export default function DocumentsPage() {
  const router = useRouter()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')

  // For demo purposes, using the first user's documents
  const userId = 'user-carlos-001'
  const { data: documents = [], isLoading } = useDocuments(userId)

  const handleDocumentClick = (document: Document) => {
    router.push(`/documents/${document.id}`)
  }

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.number?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = typeFilter === 'all' || doc.type === typeFilter

    return matchesSearch && matchesType
  })

  const expiringCount = documents.filter((doc) => doc.status === 'expiring_soon').length
  const expiredCount = documents.filter((doc) => doc.status === 'expired').length

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-text-primary mb-2">Document Vault</h1>
        <p className="text-text-secondary text-lg">
          Securely store and manage your travel documents
        </p>
      </div>

      {/* Stats */}
      {(expiringCount > 0 || expiredCount > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {expiringCount > 0 && (
            <div className="p-4 rounded-lg border border-warning bg-warning-light/20">
              <div className="text-2xl font-bold text-warning-dark">{expiringCount}</div>
              <div className="text-sm text-text-secondary">
                Document{expiringCount !== 1 ? 's' : ''} expiring soon
              </div>
            </div>
          )}
          {expiredCount > 0 && (
            <div className="p-4 rounded-lg border border-error bg-error-light/20">
              <div className="text-2xl font-bold text-error-dark">{expiredCount}</div>
              <div className="text-sm text-text-secondary">
                Expired document{expiredCount !== 1 ? 's' : ''}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <Input
            type="search"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="gap-2">
              <Filter className="w-4 h-4" />
              {typeFilter === 'all'
                ? 'All Types'
                : documentTypeFilters.find((f) => f.value === typeFilter)?.label}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {documentTypeFilters.map((filter) => (
              <DropdownMenuItem
                key={filter.value}
                onClick={() => setTypeFilter(filter.value)}
              >
                {filter.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Document
        </Button>
      </div>

      {/* Documents List */}
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-text-secondary">Loading documents...</p>
        </div>
      ) : (
        <DocumentList
          documents={filteredDocuments}
          onDocumentClick={handleDocumentClick}
        />
      )}

      {/* Add Document Dialog */}
      <AddDocumentDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        userId={userId}
      />
    </div>
  )
}
