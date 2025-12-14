import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { InsurancePolicy, ActiveClaim } from '@/types/insurance'

interface InsuranceState {
  policies: InsurancePolicy[]
  activeClaims: ActiveClaim[]
  selectedPolicy: InsurancePolicy | null
  isLoading: boolean
  error: string | null
  setPolicies: (policies: InsurancePolicy[]) => void
  addPolicy: (policy: InsurancePolicy) => void
  updatePolicy: (id: string, updates: Partial<InsurancePolicy>) => void
  deletePolicy: (id: string) => void
  setSelectedPolicy: (policy: InsurancePolicy | null) => void
  setActiveClaims: (claims: ActiveClaim[]) => void
  addClaim: (claim: ActiveClaim) => void
  updateClaim: (id: string, updates: Partial<ActiveClaim>) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useInsuranceStore = create<InsuranceState>()(
  persist(
    (set) => ({
      policies: [],
      activeClaims: [],
      selectedPolicy: null,
      isLoading: false,
      error: null,

      setPolicies: (policies) =>
        set({ policies, isLoading: false, error: null }),

      addPolicy: (policy) =>
        set((state) => ({
          policies: [...state.policies, policy],
        })),

      updatePolicy: (id, updates) =>
        set((state) => ({
          policies: state.policies.map((policy) =>
            policy.id === id
              ? { ...policy, ...updates, updatedAt: new Date().toISOString() }
              : policy
          ),
          selectedPolicy:
            state.selectedPolicy?.id === id
              ? { ...state.selectedPolicy, ...updates, updatedAt: new Date().toISOString() }
              : state.selectedPolicy,
        })),

      deletePolicy: (id) =>
        set((state) => ({
          policies: state.policies.filter((policy) => policy.id !== id),
          selectedPolicy: state.selectedPolicy?.id === id ? null : state.selectedPolicy,
        })),

      setSelectedPolicy: (policy) =>
        set({ selectedPolicy: policy }),

      setActiveClaims: (claims) =>
        set({ activeClaims: claims }),

      addClaim: (claim) =>
        set((state) => ({
          activeClaims: [...state.activeClaims, claim],
        })),

      updateClaim: (id, updates) =>
        set((state) => ({
          activeClaims: state.activeClaims.map((claim) =>
            claim.id === id ? { ...claim, ...updates } : claim
          ),
        })),

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),
    }),
    {
      name: 'travel-copilot-insurance',
      partialize: (state) => ({
        policies: state.policies,
        activeClaims: state.activeClaims,
      }),
    }
  )
)
