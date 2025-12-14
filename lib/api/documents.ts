import type { Document, DocumentType } from '@/types'
import { mockApiCall, ApiError } from './client'
import { mockDocuments } from '@/data'

// Simulated documents database
const documents = new Map<string, Document>(
  Object.values(mockDocuments).map(doc => [doc.id, doc])
)

export async function getDocuments(userId: string): Promise<Document[]> {
  const userDocs = Array.from(documents.values()).filter(doc => doc.userId === userId)
  return mockApiCall(userDocs)
}

export async function getDocument(documentId: string): Promise<Document> {
  const document = documents.get(documentId)

  if (!document) {
    throw new ApiError('Document not found', 404, 'DOCUMENT_NOT_FOUND')
  }

  return mockApiCall(document)
}

export async function getDocumentsByType(
  userId: string,
  type: DocumentType
): Promise<Document[]> {
  const userDocs = Array.from(documents.values()).filter(
    doc => doc.userId === userId && doc.type === type
  )

  return mockApiCall(userDocs)
}

export async function getExpiringDocuments(
  userId: string,
  daysBeforeExpiry: number = 90
): Promise<Document[]> {
  const now = new Date()
  const threshold = new Date(now.getTime() + daysBeforeExpiry * 24 * 60 * 60 * 1000)

  const expiringDocs = Array.from(documents.values()).filter(doc => {
    if (doc.userId !== userId || !doc.expiryDate) return false

    const expiryDate = new Date(doc.expiryDate)
    return expiryDate <= threshold && expiryDate >= now
  })

  return mockApiCall(expiringDocs)
}

export async function addDocument(
  document: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Document> {
  const now = new Date().toISOString()
  const newDocument: Document = {
    ...document,
    id: `doc-${Date.now()}`,
    createdAt: now,
    updatedAt: now,
  }

  documents.set(newDocument.id, newDocument)

  return mockApiCall(newDocument, 500)
}

export async function updateDocument(
  documentId: string,
  updates: Partial<Omit<Document, 'id' | 'userId' | 'createdAt'>>
): Promise<Document> {
  const document = documents.get(documentId)

  if (!document) {
    throw new ApiError('Document not found', 404, 'DOCUMENT_NOT_FOUND')
  }

  const updatedDocument: Document = {
    ...document,
    ...updates,
    updatedAt: new Date().toISOString(),
  }

  documents.set(documentId, updatedDocument)

  return mockApiCall(updatedDocument)
}

export async function deleteDocument(documentId: string): Promise<void> {
  if (!documents.has(documentId)) {
    throw new ApiError('Document not found', 404, 'DOCUMENT_NOT_FOUND')
  }

  documents.delete(documentId)

  return mockApiCall(undefined)
}

export async function uploadDocumentAttachment(
  documentId: string,
  file: File
): Promise<Document> {
  const document = documents.get(documentId)

  if (!document) {
    throw new ApiError('Document not found', 404, 'DOCUMENT_NOT_FOUND')
  }

  // Simulate file upload
  const attachment = {
    id: `att-${Date.now()}`,
    filename: file.name,
    url: `/uploads/${documentId}/${file.name}`,
    type: file.type,
    size: file.size,
  }

  const updatedDocument: Document = {
    ...document,
    attachments: [...(document.attachments || []), attachment],
    updatedAt: new Date().toISOString(),
  }

  documents.set(documentId, updatedDocument)

  return mockApiCall(updatedDocument, 1000)
}
