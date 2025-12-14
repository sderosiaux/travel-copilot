import { flightIds } from '@/lib/static-params'
import FlightDetailClient from './flight-detail-client'

export function generateStaticParams() {
  return flightIds.map((id) => ({ id }))
}

interface FlightDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function FlightDetailPage({ params }: FlightDetailPageProps) {
  const { id } = await params
  return <FlightDetailClient flightId={id} />
}
