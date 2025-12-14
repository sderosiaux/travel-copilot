import { familyIds } from '@/lib/static-params'
import FamilyMemberClient from './family-member-client'

export function generateStaticParams() {
  return familyIds.map((id) => ({ id }))
}

interface FamilyMemberPageProps {
  params: Promise<{ id: string }>
}

export default async function FamilyMemberPage({ params }: FamilyMemberPageProps) {
  const { id } = await params
  return <FamilyMemberClient memberId={id} />
}
