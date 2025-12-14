import { flightIds } from '@/lib/static-params'
import AlternativesClient from './alternatives-client'

export function generateStaticParams() {
  return flightIds.map((id) => ({ id }))
}

interface AlternativesPageProps {
  params: Promise<{ id: string }>
}

export default async function AlternativesPage({ params }: AlternativesPageProps) {
  const { id } = await params
  return <AlternativesClient flightId={id} />
}
