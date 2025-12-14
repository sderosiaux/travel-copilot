import { airportCodes } from '@/lib/static-params'
import AirportDetailClient from './airport-detail-client'

export function generateStaticParams() {
  return airportCodes.map((code) => ({ code }))
}

interface AirportDetailPageProps {
  params: Promise<{ code: string }>
}

export default async function AirportDetailPage({ params }: AirportDetailPageProps) {
  const { code } = await params
  return <AirportDetailClient airportCode={code} />
}
