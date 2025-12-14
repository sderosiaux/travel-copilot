import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  EmergencyContact,
  CountryEmergencyNumbers,
  Embassy,
  QuickDialEntry,
} from '@/types/emergency'

interface EmergencyState {
  contacts: EmergencyContact[]
  countryNumbers: CountryEmergencyNumbers[]
  embassies: Embassy[]
  quickDial: QuickDialEntry[]
  selectedCountry: string | null
  isLoading: boolean
  error: string | null
  setContacts: (contacts: EmergencyContact[]) => void
  addContact: (contact: EmergencyContact) => void
  updateContact: (id: string, updates: Partial<EmergencyContact>) => void
  deleteContact: (id: string) => void
  setCountryNumbers: (numbers: CountryEmergencyNumbers[]) => void
  setEmbassies: (embassies: Embassy[]) => void
  setQuickDial: (entries: QuickDialEntry[]) => void
  addQuickDial: (entry: QuickDialEntry) => void
  removeQuickDial: (id: string) => void
  setSelectedCountry: (countryCode: string | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useEmergencyStore = create<EmergencyState>()(
  persist(
    (set) => ({
      contacts: [],
      countryNumbers: [],
      embassies: [],
      quickDial: [],
      selectedCountry: null,
      isLoading: false,
      error: null,

      setContacts: (contacts) =>
        set({ contacts, isLoading: false, error: null }),

      addContact: (contact) =>
        set((state) => ({
          contacts: [...state.contacts, contact],
        })),

      updateContact: (id, updates) =>
        set((state) => ({
          contacts: state.contacts.map((contact) =>
            contact.id === id
              ? { ...contact, ...updates, updatedAt: new Date().toISOString() }
              : contact
          ),
        })),

      deleteContact: (id) =>
        set((state) => ({
          contacts: state.contacts.filter((contact) => contact.id !== id),
        })),

      setCountryNumbers: (numbers) =>
        set({ countryNumbers: numbers }),

      setEmbassies: (embassies) =>
        set({ embassies }),

      setQuickDial: (entries) =>
        set({ quickDial: entries }),

      addQuickDial: (entry) =>
        set((state) => ({
          quickDial: [...state.quickDial, entry].sort((a, b) => a.priority - b.priority),
        })),

      removeQuickDial: (id) =>
        set((state) => ({
          quickDial: state.quickDial.filter((entry) => entry.id !== id),
        })),

      setSelectedCountry: (countryCode) =>
        set({ selectedCountry: countryCode }),

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),
    }),
    {
      name: 'travel-copilot-emergency',
      partialize: (state) => ({
        contacts: state.contacts,
        quickDial: state.quickDial,
      }),
    }
  )
)
