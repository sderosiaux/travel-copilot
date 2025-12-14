import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Document, DocumentType } from '@/types'
import * as documentsApi from '@/lib/api/documents'

export function useDocuments(userId: string) {
  return useQuery({
    queryKey: ['documents', userId],
    queryFn: () => documentsApi.getDocuments(userId),
    enabled: !!userId,
  })
}

export function useDocument(documentId: string) {
  return useQuery({
    queryKey: ['documents', 'detail', documentId],
    queryFn: () => documentsApi.getDocument(documentId),
    enabled: !!documentId,
  })
}

export function useDocumentsByType(userId: string, type: DocumentType) {
  return useQuery({
    queryKey: ['documents', userId, 'type', type],
    queryFn: () => documentsApi.getDocumentsByType(userId, type),
    enabled: !!userId && !!type,
  })
}

export function useExpiringDocuments(userId: string, daysBeforeExpiry = 90) {
  return useQuery({
    queryKey: ['documents', userId, 'expiring', daysBeforeExpiry],
    queryFn: () => documentsApi.getExpiringDocuments(userId, daysBeforeExpiry),
    enabled: !!userId,
  })
}

export function useAddDocument() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: documentsApi.addDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] })
    },
  })
}

export function useUpdateDocument() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ documentId, updates }: {
      documentId: string
      updates: Partial<Omit<Document, 'id' | 'userId' | 'createdAt'>>
    }) => documentsApi.updateDocument(documentId, updates),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['documents'] })
      queryClient.invalidateQueries({ queryKey: ['documents', 'detail', data.id] })
    },
  })
}

export function useDeleteDocument() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: documentsApi.deleteDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] })
    },
  })
}

export function useUploadDocumentAttachment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ documentId, file }: { documentId: string; file: File }) =>
      documentsApi.uploadDocumentAttachment(documentId, file),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['documents'] })
      queryClient.invalidateQueries({ queryKey: ['documents', 'detail', data.id] })
    },
  })
}
