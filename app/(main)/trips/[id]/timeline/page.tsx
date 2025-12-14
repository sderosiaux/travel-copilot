import { tripIds } from '@/lib/static-params'
import TimelineClient from './timeline-client'

export function generateStaticParams() {
  return tripIds.map((id) => ({ id }))
}

interface TimelinePageProps {
  params: Promise<{ id: string }>
}

export default async function TimelinePage({ params }: TimelinePageProps) {
  const { id } = await params
  return <TimelineClient tripId={id} />
}
