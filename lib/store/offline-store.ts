import { create } from 'zustand'
import type {
  ServiceWorkerStatus,
  DataSync,
  CacheStats,
  OfflineSettings,
  SyncStatus,
} from '@/types/offline'
import {
  mockServiceWorkerStatus,
  mockDataSyncs,
  mockCacheStats,
  mockOfflineSettings,
} from '@/data/offline'

interface OfflineState {
  isOnline: boolean
  serviceWorker: ServiceWorkerStatus
  dataSyncs: DataSync[]
  cacheStats: CacheStats
  settings: OfflineSettings
  isLoading: boolean
  error: string | null

  // Actions
  setOnlineStatus: (online: boolean) => void
  updateServiceWorker: (status: Partial<ServiceWorkerStatus>) => void
  syncData: (type: DataSync['type']) => Promise<void>
  syncAll: () => Promise<void>
  updateSyncStatus: (id: string, status: SyncStatus) => void
  clearCache: () => Promise<void>
  updateSettings: (settings: Partial<OfflineSettings>) => void
  loadData: () => void

  // Computed
  getSyncByType: (type: DataSync['type']) => DataSync | undefined
  getFailedSyncs: () => DataSync[]
  isPendingSync: () => boolean
}

export const useOfflineStore = create<OfflineState>((set, get) => ({
  isOnline: true,
  serviceWorker: mockServiceWorkerStatus,
  dataSyncs: mockDataSyncs,
  cacheStats: mockCacheStats,
  settings: mockOfflineSettings,
  isLoading: false,
  error: null,

  // Actions
  setOnlineStatus: (online) => set({ isOnline: online }),

  updateServiceWorker: (status) =>
    set((state) => ({
      serviceWorker: { ...state.serviceWorker, ...status },
    })),

  syncData: async (type) => {
    const { isOnline, dataSyncs } = get()

    if (!isOnline) {
      set({ error: 'Cannot sync while offline' })
      return
    }

    const syncIndex = dataSyncs.findIndex((s) => s.type === type)
    if (syncIndex === -1) return

    // Update status to syncing
    set((state) => ({
      dataSyncs: state.dataSyncs.map((s) =>
        s.type === type ? { ...s, status: 'syncing' as SyncStatus } : s
      ),
    }))

    // Simulate sync delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Update to synced
    const now = new Date().toISOString()
    const nextSync = new Date(Date.now() + 60 * 60 * 1000).toISOString()

    set((state) => ({
      dataSyncs: state.dataSyncs.map((s) =>
        s.type === type
          ? {
              ...s,
              status: 'synced' as SyncStatus,
              lastSync: now,
              nextSync,
            }
          : s
      ),
    }))
  },

  syncAll: async () => {
    const { dataSyncs } = get()
    set({ isLoading: true })

    for (const sync of dataSyncs) {
      await get().syncData(sync.type)
    }

    set({ isLoading: false })
  },

  updateSyncStatus: (id, status) =>
    set((state) => ({
      dataSyncs: state.dataSyncs.map((s) => (s.id === id ? { ...s, status } : s)),
    })),

  clearCache: async () => {
    set({ isLoading: true })

    // Simulate cache clearing
    await new Promise((resolve) => setTimeout(resolve, 1000))

    set((state) => ({
      cacheStats: {
        ...state.cacheStats,
        totalSize: '0 MB',
        itemCount: 0,
        lastCleared: new Date().toISOString(),
        usagePercentage: 0,
      },
      isLoading: false,
    }))
  },

  updateSettings: (settings) =>
    set((state) => ({
      settings: { ...state.settings, ...settings },
    })),

  loadData: () => {
    set({
      serviceWorker: mockServiceWorkerStatus,
      dataSyncs: mockDataSyncs,
      cacheStats: mockCacheStats,
      settings: mockOfflineSettings,
    })
  },

  // Computed
  getSyncByType: (type) => {
    const { dataSyncs } = get()
    return dataSyncs.find((s) => s.type === type)
  },

  getFailedSyncs: () => {
    const { dataSyncs } = get()
    return dataSyncs.filter((s) => s.status === 'failed')
  },

  isPendingSync: () => {
    const { dataSyncs } = get()
    return dataSyncs.some((s) => s.status === 'pending' || s.status === 'syncing')
  },
}))
