'use client'

import { useState } from 'react'
import { DocumentCard } from './document-card'
import type { Document, DocumentType } from '@/types'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DocumentListProps {
  documents: Document[]
  onDocumentClick?: (document: Document) => void
}

interface DocumentCategory {
  label: string
  types: DocumentType[]
  documents: Document[]
}

export function DocumentList({ documents, onDocumentClick }: DocumentListProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['identity', 'loyalty', 'travel'])
  )

  const categories: Record<string, DocumentCategory> = {
    identity: {
      label: 'Identity Documents',
      types: ['passport', 'national_id', 'driving_license'],
      documents: [],
    },
    loyalty: {
      label: 'Loyalty Programs',
      types: ['loyalty_program'],
      documents: [],
    },
    travel: {
      label: 'Travel Documents',
      types: ['visa', 'insurance', 'vaccination'],
      documents: [],
    },
    other: {
      label: 'Other Documents',
      types: ['other'],
      documents: [],
    },
  }

  // Group documents by category
  documents.forEach((doc) => {
    for (const [key, category] of Object.entries(categories)) {
      if (category.types.includes(doc.type)) {
        category.documents.push(doc)
        break
      }
    }
  })

  const toggleCategory = (categoryKey: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(categoryKey)) {
        newSet.delete(categoryKey)
      } else {
        newSet.add(categoryKey)
      }
      return newSet
    })
  }

  if (documents.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary text-lg">No documents found</p>
        <p className="text-text-tertiary text-sm mt-2">
          Add your first document to get started
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {Object.entries(categories).map(([key, category]) => {
        if (category.documents.length === 0) return null

        const isExpanded = expandedCategories.has(key)

        return (
          <div key={key} className="space-y-3">
            <Button
              variant="ghost"
              className="w-full justify-between p-3 h-auto hover:bg-bg-secondary"
              onClick={() => toggleCategory(key)}
            >
              <div className="flex items-center gap-2">
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-text-secondary" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-text-secondary" />
                )}
                <h2 className="text-lg font-semibold text-text-primary">
                  {category.label}
                </h2>
                <span className="text-sm text-text-tertiary">
                  ({category.documents.length})
                </span>
              </div>
            </Button>

            {isExpanded && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.documents.map((doc) => (
                  <DocumentCard
                    key={doc.id}
                    document={doc}
                    onClick={() => onDocumentClick?.(doc)}
                  />
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
