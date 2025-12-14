import type { FamilyMember, Household } from '@/types'
import { mockApiCall, ApiError } from './client'
import { mockFamilyMembers, mockHouseholds } from '@/data'

// Simulated family members database
const familyMembers = new Map<string, FamilyMember>(
  Object.values(mockFamilyMembers).map(member => [member.id, member])
)

// Simulated households database
const households = new Map<string, Household>(
  Object.values(mockHouseholds).map(household => [household.id, household])
)

export async function getFamilyMembers(userId: string): Promise<FamilyMember[]> {
  // Find household where user is primary
  const household = Array.from(households.values()).find(h => h.primaryUserId === userId)

  if (!household) {
    return mockApiCall([])
  }

  // Get all family members except the primary user
  const members = household.members
    .filter(memberId => memberId !== userId)
    .map(memberId => familyMembers.get(memberId))
    .filter((member): member is FamilyMember => member !== undefined)

  return mockApiCall(members)
}

export async function getFamilyMember(memberId: string): Promise<FamilyMember> {
  const member = familyMembers.get(memberId)

  if (!member) {
    throw new ApiError('Family member not found', 404, 'MEMBER_NOT_FOUND')
  }

  return mockApiCall(member)
}

export async function getHousehold(userId: string): Promise<Household | null> {
  const household = Array.from(households.values()).find(h => h.primaryUserId === userId)

  if (!household) {
    return mockApiCall(null)
  }

  return mockApiCall(household)
}

export async function addFamilyMember(
  userId: string,
  member: Omit<FamilyMember, 'id' | 'createdAt' | 'updatedAt'>
): Promise<FamilyMember> {
  const now = new Date().toISOString()
  const newMember: FamilyMember = {
    ...member,
    id: `family-${Date.now()}`,
    createdAt: now,
    updatedAt: now,
  }

  familyMembers.set(newMember.id, newMember)

  // Add to household
  const household = Array.from(households.values()).find(h => h.primaryUserId === userId)

  if (household) {
    const updatedHousehold: Household = {
      ...household,
      members: [...household.members, newMember.id],
      updatedAt: now,
    }
    households.set(household.id, updatedHousehold)
  } else {
    // Create new household
    const newHousehold: Household = {
      id: `household-${Date.now()}`,
      primaryUserId: userId,
      name: 'My Family',
      members: [userId, newMember.id],
      preferences: {
        keepTogether: true,
        preferredSeating: 'together',
      },
      createdAt: now,
      updatedAt: now,
    }
    households.set(newHousehold.id, newHousehold)
  }

  return mockApiCall(newMember, 500)
}

export async function updateFamilyMember(
  memberId: string,
  updates: Partial<Omit<FamilyMember, 'id' | 'createdAt'>>
): Promise<FamilyMember> {
  const member = familyMembers.get(memberId)

  if (!member) {
    throw new ApiError('Family member not found', 404, 'MEMBER_NOT_FOUND')
  }

  const updatedMember: FamilyMember = {
    ...member,
    ...updates,
    updatedAt: new Date().toISOString(),
  }

  familyMembers.set(memberId, updatedMember)

  return mockApiCall(updatedMember)
}

export async function deleteFamilyMember(userId: string, memberId: string): Promise<void> {
  if (!familyMembers.has(memberId)) {
    throw new ApiError('Family member not found', 404, 'MEMBER_NOT_FOUND')
  }

  familyMembers.delete(memberId)

  // Remove from household
  const household = Array.from(households.values()).find(h => h.primaryUserId === userId)

  if (household) {
    const updatedHousehold: Household = {
      ...household,
      members: household.members.filter(id => id !== memberId),
      updatedAt: new Date().toISOString(),
    }
    households.set(household.id, updatedHousehold)
  }

  return mockApiCall(undefined)
}

export async function updateHousehold(
  userId: string,
  updates: Partial<Omit<Household, 'id' | 'primaryUserId' | 'members' | 'createdAt'>>
): Promise<Household> {
  const household = Array.from(households.values()).find(h => h.primaryUserId === userId)

  if (!household) {
    throw new ApiError('Household not found', 404, 'HOUSEHOLD_NOT_FOUND')
  }

  const updatedHousehold: Household = {
    ...household,
    ...updates,
    updatedAt: new Date().toISOString(),
  }

  households.set(household.id, updatedHousehold)

  return mockApiCall(updatedHousehold)
}
