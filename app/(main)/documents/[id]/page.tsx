import { documentIds } from '@/lib/static-params'
import DocumentDetailClient from './document-detail-client'

export function generateStaticParams() {
  return documentIds.map((id) => ({ id }))
}

interface DocumentDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function DocumentDetailPage({ params }: DocumentDetailPageProps) {
  const { id } = await params
  return <DocumentDetailClient documentId={id} />
}
