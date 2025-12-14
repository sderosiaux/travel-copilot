import { packingIds } from '@/lib/static-params'
import PackingListClient from './packing-list-client'

export function generateStaticParams() {
  return packingIds.map((id) => ({ id }))
}

interface PackingListPageProps {
  params: Promise<{ id: string }>
}

export default async function PackingListPage({ params }: PackingListPageProps) {
  const { id } = await params
  return <PackingListClient listId={id} />
}
