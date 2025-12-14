import { tripIds } from '@/lib/static-params'
import TripDetailClient from './trip-detail-client'

export function generateStaticParams() {
  return tripIds.map((id) => ({ id }))
}

interface TripDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function TripDetailPage({ params }: TripDetailPageProps) {
  const { id } = await params
  return <TripDetailClient tripId={id} />
}
