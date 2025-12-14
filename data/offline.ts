// Offline Mode Mock Data

import type {
  ServiceWorkerStatus,
  DataSync,
  CacheStats,
  OfflineCapability,
  OfflineSettings,
} from '@/types/offline'

export const mockServiceWorkerStatus: ServiceWorkerStatus = {
  registered: true,
  active: true,
  lastUpdate: '2025-12-14T10:30:00Z',
  version: '1.2.3',
}

export const mockDataSyncs: DataSync[] = [
  {
    id: 'sync-1',
    type: 'trips',
    status: 'synced',
    lastSync: '2025-12-14T10:25:00Z',
    nextSync: '2025-12-14T11:25:00Z',
    itemsCount: 12,
    size: '2.4 MB',
    priority: 'high',
  },
  {
    id: 'sync-2',
    type: 'flights',
    status: 'synced',
    lastSync: '2025-12-14T10:20:00Z',
    nextSync: '2025-12-14T11:20:00Z',
    itemsCount: 24,
    size: '1.8 MB',
    priority: 'high',
  },
  {
    id: 'sync-3',
    type: 'documents',
    status: 'synced',
    lastSync: '2025-12-14T09:45:00Z',
    nextSync: '2025-12-14T12:45:00Z',
    itemsCount: 8,
    size: '4.2 MB',
    priority: 'medium',
  },
  {
    id: 'sync-4',
    type: 'settings',
    status: 'synced',
    lastSync: '2025-12-14T10:30:00Z',
    nextSync: '2025-12-14T11:30:00Z',
    itemsCount: 1,
    size: '24 KB',
    priority: 'low',
  },
]

export const mockCacheStats: CacheStats = {
  totalSize: '8.4 MB',
  itemCount: 45,
  lastCleared: '2025-12-10T08:00:00Z',
  maxSize: '50 MB',
  usagePercentage: 16.8,
}

export const mockOfflineCapabilities: OfflineCapability[] = [
  {
    id: 'cap-1',
    feature: 'View Trips',
    available: true,
    requiresSync: false,
    description: 'Browse your upcoming and past trips offline',
  },
  {
    id: 'cap-2',
    feature: 'Flight Details',
    available: true,
    requiresSync: false,
    description: 'Access boarding passes and flight information',
  },
  {
    id: 'cap-3',
    feature: 'Travel Documents',
    available: true,
    requiresSync: false,
    description: 'View passports, visas, and other documents',
  },
  {
    id: 'cap-4',
    feature: 'Airport Maps',
    available: true,
    requiresSync: true,
    description: 'Navigate terminals with offline maps',
  },
  {
    id: 'cap-5',
    feature: 'Phrase Book',
    available: true,
    requiresSync: true,
    description: 'Access common travel phrases',
  },
  {
    id: 'cap-6',
    feature: 'Real-time Updates',
    available: false,
    requiresSync: true,
    description: 'Flight status updates require internet',
  },
  {
    id: 'cap-7',
    feature: 'Booking Changes',
    available: false,
    requiresSync: true,
    description: 'Making changes requires internet connection',
  },
]

export const mockOfflineSettings: OfflineSettings = {
  enabled: true,
  autoSync: true,
  syncOnWifi: true,
  syncInterval: 60,
  maxCacheSize: 50,
  keepOfflineData: 30,
}
