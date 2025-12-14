import { tripIds } from '@/lib/static-params'
import BriefingClient from './briefing-client'

export function generateStaticParams() {
  return tripIds.map((tripId) => ({ tripId }))
}

interface BriefingDetailPageProps {
  params: Promise<{ tripId: string }>
}

export default async function BriefingDetailPage({ params }: BriefingDetailPageProps) {
  const { tripId } = await params
  return <BriefingClient tripId={tripId} />
}
