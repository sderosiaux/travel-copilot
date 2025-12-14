import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark' | 'system'
type ModalType =
  | 'trip-create'
  | 'trip-edit'
  | 'flight-details'
  | 'document-add'
  | 'family-add'
  | 'settings'
  | 'rebooking'
  | null

interface UIState {
  // Sidebar
  sidebarCollapsed: boolean
  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void

  // Command Palette
  commandPaletteOpen: boolean
  setCommandPaletteOpen: (open: boolean) => void
  toggleCommandPalette: () => void

  // Copilot
  copilotOpen: boolean
  copilotMinimized: boolean
  toggleCopilot: () => void
  setCopilotOpen: (open: boolean) => void
  minimizeCopilot: () => void
  maximizeCopilot: () => void

  // Modals
  activeModal: ModalType
  modalData: unknown
  openModal: (modal: ModalType, data?: unknown) => void
  closeModal: () => void

  // Theme
  theme: Theme
  setTheme: (theme: Theme) => void

  // Notifications
  showNotifications: boolean
  toggleNotifications: () => void
  notificationCount: number
  setNotificationCount: (count: number) => void

  // Loading states
  globalLoading: boolean
  setGlobalLoading: (loading: boolean) => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // Sidebar
      sidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

      // Command Palette
      commandPaletteOpen: false,
      setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
      toggleCommandPalette: () =>
        set((state) => ({ commandPaletteOpen: !state.commandPaletteOpen })),

      // Copilot
      copilotOpen: false,
      copilotMinimized: false,
      toggleCopilot: () => set((state) => ({ copilotOpen: !state.copilotOpen })),
      setCopilotOpen: (open) => set({ copilotOpen: open, copilotMinimized: false }),
      minimizeCopilot: () => set({ copilotMinimized: true }),
      maximizeCopilot: () => set({ copilotMinimized: false }),

      // Modals
      activeModal: null,
      modalData: null,
      openModal: (modal, data) => set({ activeModal: modal, modalData: data }),
      closeModal: () => set({ activeModal: null, modalData: null }),

      // Theme
      theme: 'system',
      setTheme: (theme) => set({ theme }),

      // Notifications
      showNotifications: false,
      toggleNotifications: () =>
        set((state) => ({ showNotifications: !state.showNotifications })),
      notificationCount: 0,
      setNotificationCount: (count) => set({ notificationCount: count }),

      // Loading states
      globalLoading: false,
      setGlobalLoading: (loading) => set({ globalLoading: loading }),
    }),
    {
      name: 'travel-copilot-ui',
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        theme: state.theme,
      }),
    }
  )
)
