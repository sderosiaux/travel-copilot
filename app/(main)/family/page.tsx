'use client'

import { Users, UserPlus } from 'lucide-react'
import { Card, Skeleton } from '@/components/ui'
import { FamilyMemberList, AddMemberDialog } from '@/components/features/family'
import { useFamilyStore } from '@/lib/store/family-store'

export default function FamilyPage() {
  const { members, isLoading } = useFamilyStore()

  if (isLoading) {
    return (
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <div className="mb-8">
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    )
  }

  const hasMembers = members.length > 0

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-primary-500" />
            <h1 className="text-3xl font-bold text-text-primary">Family</h1>
          </div>
          <AddMemberDialog />
        </div>
        <p className="text-text-secondary">
          Manage your family members and their travel preferences
        </p>
      </div>

      {hasMembers ? (
        <div className="space-y-6">
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-4 bg-bg-secondary rounded-lg">
                <div className="text-3xl font-bold text-primary-500 mb-1">
                  {members.length}
                </div>
                <div className="text-sm text-text-secondary">Total Members</div>
              </div>
              <div className="text-center p-4 bg-bg-secondary rounded-lg">
                <div className="text-3xl font-bold text-success mb-1">
                  {members.filter((m) => {
                    const age = m.dateOfBirth
                      ? new Date().getFullYear() - new Date(m.dateOfBirth).getFullYear()
                      : null
                    return age === null || age >= 18
                  }).length}
                </div>
                <div className="text-sm text-text-secondary">Adults</div>
              </div>
              <div className="text-center p-4 bg-bg-secondary rounded-lg">
                <div className="text-3xl font-bold text-warning mb-1">
                  {members.filter((m) => {
                    const age = m.dateOfBirth
                      ? new Date().getFullYear() - new Date(m.dateOfBirth).getFullYear()
                      : null
                    return age !== null && age < 18
                  }).length}
                </div>
                <div className="text-sm text-text-secondary">Children</div>
              </div>
            </div>
          </Card>

          <FamilyMemberList members={members} />
        </div>
      ) : (
        <Card className="p-12 text-center">
          <div className="flex flex-col items-center max-w-md mx-auto">
            <div className="h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center mb-6">
              <UserPlus className="h-10 w-10 text-primary-500" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-3">
              No Family Members Yet
            </h2>
            <p className="text-text-secondary mb-6">
              Start by adding your family members to manage their travel documents,
              preferences, and special needs all in one place.
            </p>
            <AddMemberDialog />
          </div>
        </Card>
      )}
    </div>
  )
}
