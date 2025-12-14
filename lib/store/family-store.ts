import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { FamilyMember } from '@/types'
import { mockFamilyMembers } from '@/data/family'

interface FamilyState {
  members: FamilyMember[]
  isLoading: boolean
  error: string | null

  // Actions
  setMembers: (members: FamilyMember[]) => void
  addMember: (member: FamilyMember) => void
  updateMember: (id: string, updates: Partial<FamilyMember>) => void
  removeMember: (id: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void

  // Selectors
  getMemberById: (id: string) => FamilyMember | undefined
  getChildren: () => FamilyMember[]
  getAdults: () => FamilyMember[]
  getMembersWithExpiringDocuments: () => FamilyMember[]
}

const calculateAge = (dateOfBirth?: string): number | null => {
  if (!dateOfBirth) return null
  const today = new Date()
  const birthDate = new Date(dateOfBirth)
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

export const useFamilyStore = create<FamilyState>()(
  persist(
    (set, get) => ({
      members: Object.values(mockFamilyMembers),
      isLoading: false,
      error: null,

      setMembers: (members) => set({ members, isLoading: false, error: null }),

      addMember: (member) =>
        set((state) => ({
          members: [...state.members, { ...member, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }],
        })),

      updateMember: (id, updates) =>
        set((state) => ({
          members: state.members.map((member) =>
            member.id === id
              ? { ...member, ...updates, updatedAt: new Date().toISOString() }
              : member
          ),
        })),

      removeMember: (id) =>
        set((state) => ({
          members: state.members.filter((member) => member.id !== id),
        })),

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      getMemberById: (id) => {
        return get().members.find((member) => member.id === id)
      },

      getChildren: () => {
        return get().members.filter((member) => {
          const age = calculateAge(member.dateOfBirth)
          return age !== null && age < 18
        })
      },

      getAdults: () => {
        return get().members.filter((member) => {
          const age = calculateAge(member.dateOfBirth)
          return age === null || age >= 18
        })
      },

      getMembersWithExpiringDocuments: () => {
        // This would need to be implemented with actual document expiry logic
        // For now, return empty array
        return []
      },
    }),
    {
      name: 'travel-copilot-family',
      partialize: (state) => ({ members: state.members }),
    }
  )
)
