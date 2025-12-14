import { create } from 'zustand'
import type { PackingList, PackingItem, PackingTemplate, PackingSuggestion } from '@/types/packing'

interface PackingState {
  lists: PackingList[]
  currentList: PackingList | null
  templates: PackingTemplate[]
  suggestions: PackingSuggestion[]
  isLoading: boolean
  error: string | null

  // List actions
  setLists: (lists: PackingList[]) => void
  addList: (list: PackingList) => void
  updateList: (listId: string, updates: Partial<PackingList>) => void
  deleteList: (listId: string) => void
  setCurrentList: (list: PackingList | null) => void
  duplicateList: (listId: string) => void

  // Item actions
  addItem: (listId: string, item: PackingItem) => void
  updateItem: (listId: string, itemId: string, updates: Partial<PackingItem>) => void
  deleteItem: (listId: string, itemId: string) => void
  toggleItemPacked: (listId: string, itemId: string) => void
  toggleItemEssential: (listId: string, itemId: string) => void

  // Template actions
  setTemplates: (templates: PackingTemplate[]) => void
  createListFromTemplate: (template: PackingTemplate, tripDetails: Partial<PackingList>) => PackingList

  // Suggestion actions
  setSuggestions: (suggestions: PackingSuggestion[]) => void
  addSuggestedItem: (listId: string, categoryIndex: number, itemIndex: number) => void

  // Share actions
  shareList: (listId: string, userIds: string[]) => void
  updateShareSettings: (listId: string, userId: string, canEdit: boolean) => void

  // State management
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void

  // Computed
  getListsByTrip: (tripId: string) => PackingList[]
  getListProgress: (listId: string) => { packed: number; total: number; percentage: number }
  getTemplatesByType: (tripType: string) => PackingTemplate[]
}

export const usePackingStore = create<PackingState>((set, get) => ({
  lists: [],
  currentList: null,
  templates: [],
  suggestions: [],
  isLoading: false,
  error: null,

  // List actions
  setLists: (lists) => set({ lists, isLoading: false, error: null }),

  addList: (list) =>
    set((state) => ({
      lists: [...state.lists, list],
    })),

  updateList: (listId, updates) =>
    set((state) => {
      const updatedLists = state.lists.map((list) =>
        list.id === listId
          ? { ...list, ...updates, updatedAt: new Date().toISOString() }
          : list
      )

      // Recalculate progress if items were updated
      const updatedList = updatedLists.find((l) => l.id === listId)
      if (updatedList && updates.items) {
        const packedItems = updatedList.items.filter((item) => item.isPacked).length
        const totalItems = updatedList.items.length
        const essentialsPacked = updatedList.items.filter(
          (item) => item.isEssential && item.isPacked
        ).length
        const essentialsTotal = updatedList.items.filter((item) => item.isEssential).length

        updatedList.progress = {
          totalItems,
          packedItems,
          percentage: totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0,
          essentialsPacked,
          essentialsTotal,
        }
      }

      return {
        lists: updatedLists,
        currentList: state.currentList?.id === listId ? updatedLists.find((l) => l.id === listId) || null : state.currentList,
      }
    }),

  deleteList: (listId) =>
    set((state) => ({
      lists: state.lists.filter((list) => list.id !== listId),
      currentList: state.currentList?.id === listId ? null : state.currentList,
    })),

  setCurrentList: (list) => set({ currentList: list }),

  duplicateList: (listId) =>
    set((state) => {
      const originalList = state.lists.find((l) => l.id === listId)
      if (!originalList) return state

      const newList: PackingList = {
        ...originalList,
        id: `packing-${Date.now()}`,
        title: `${originalList.title} (Copy)`,
        items: originalList.items.map((item) => ({
          ...item,
          id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          isPacked: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      return {
        lists: [...state.lists, newList],
      }
    }),

  // Item actions
  addItem: (listId, item) =>
    set((state) => {
      const list = state.lists.find((l) => l.id === listId)
      if (!list) return state

      const updatedItems = [...list.items, item]
      const packedItems = updatedItems.filter((i) => i.isPacked).length
      const totalItems = updatedItems.length
      const essentialsPacked = updatedItems.filter((i) => i.isEssential && i.isPacked).length
      const essentialsTotal = updatedItems.filter((i) => i.isEssential).length

      const updatedList = {
        ...list,
        items: updatedItems,
        progress: {
          totalItems,
          packedItems,
          percentage: totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0,
          essentialsPacked,
          essentialsTotal,
        },
        updatedAt: new Date().toISOString(),
      }

      return {
        lists: state.lists.map((l) => (l.id === listId ? updatedList : l)),
        currentList: state.currentList?.id === listId ? updatedList : state.currentList,
      }
    }),

  updateItem: (listId, itemId, updates) =>
    set((state) => {
      const list = state.lists.find((l) => l.id === listId)
      if (!list) return state

      const updatedItems = list.items.map((item) =>
        item.id === itemId ? { ...item, ...updates, updatedAt: new Date().toISOString() } : item
      )

      const packedItems = updatedItems.filter((i) => i.isPacked).length
      const totalItems = updatedItems.length
      const essentialsPacked = updatedItems.filter((i) => i.isEssential && i.isPacked).length
      const essentialsTotal = updatedItems.filter((i) => i.isEssential).length

      const updatedList = {
        ...list,
        items: updatedItems,
        progress: {
          totalItems,
          packedItems,
          percentage: totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0,
          essentialsPacked,
          essentialsTotal,
        },
        updatedAt: new Date().toISOString(),
      }

      return {
        lists: state.lists.map((l) => (l.id === listId ? updatedList : l)),
        currentList: state.currentList?.id === listId ? updatedList : state.currentList,
      }
    }),

  deleteItem: (listId, itemId) =>
    set((state) => {
      const list = state.lists.find((l) => l.id === listId)
      if (!list) return state

      const updatedItems = list.items.filter((item) => item.id !== itemId)

      const packedItems = updatedItems.filter((i) => i.isPacked).length
      const totalItems = updatedItems.length
      const essentialsPacked = updatedItems.filter((i) => i.isEssential && i.isPacked).length
      const essentialsTotal = updatedItems.filter((i) => i.isEssential).length

      const updatedList = {
        ...list,
        items: updatedItems,
        progress: {
          totalItems,
          packedItems,
          percentage: totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0,
          essentialsPacked,
          essentialsTotal,
        },
        updatedAt: new Date().toISOString(),
      }

      return {
        lists: state.lists.map((l) => (l.id === listId ? updatedList : l)),
        currentList: state.currentList?.id === listId ? updatedList : state.currentList,
      }
    }),

  toggleItemPacked: (listId, itemId) =>
    set((state) => {
      const list = state.lists.find((l) => l.id === listId)
      if (!list) return state

      const updatedItems = list.items.map((item) =>
        item.id === itemId
          ? { ...item, isPacked: !item.isPacked, updatedAt: new Date().toISOString() }
          : item
      )

      const packedItems = updatedItems.filter((i) => i.isPacked).length
      const totalItems = updatedItems.length
      const essentialsPacked = updatedItems.filter((i) => i.isEssential && i.isPacked).length
      const essentialsTotal = updatedItems.filter((i) => i.isEssential).length

      const updatedList = {
        ...list,
        items: updatedItems,
        progress: {
          totalItems,
          packedItems,
          percentage: totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0,
          essentialsPacked,
          essentialsTotal,
        },
        updatedAt: new Date().toISOString(),
      }

      return {
        lists: state.lists.map((l) => (l.id === listId ? updatedList : l)),
        currentList: state.currentList?.id === listId ? updatedList : state.currentList,
      }
    }),

  toggleItemEssential: (listId, itemId) =>
    set((state) => {
      const list = state.lists.find((l) => l.id === listId)
      if (!list) return state

      const updatedItems = list.items.map((item) =>
        item.id === itemId
          ? { ...item, isEssential: !item.isEssential, updatedAt: new Date().toISOString() }
          : item
      )

      const packedItems = updatedItems.filter((i) => i.isPacked).length
      const totalItems = updatedItems.length
      const essentialsPacked = updatedItems.filter((i) => i.isEssential && i.isPacked).length
      const essentialsTotal = updatedItems.filter((i) => i.isEssential).length

      const updatedList = {
        ...list,
        items: updatedItems,
        progress: {
          totalItems,
          packedItems,
          percentage: totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0,
          essentialsPacked,
          essentialsTotal,
        },
        updatedAt: new Date().toISOString(),
      }

      return {
        lists: state.lists.map((l) => (l.id === listId ? updatedList : l)),
        currentList: state.currentList?.id === listId ? updatedList : state.currentList,
      }
    }),

  // Template actions
  setTemplates: (templates) => set({ templates }),

  createListFromTemplate: (template, tripDetails) => {
    const items: PackingItem[] = []

    template.categories.forEach((category) => {
      category.items.forEach((templateItem) => {
        items.push({
          id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: templateItem.name,
          category: category.category,
          quantity: templateItem.quantity,
          isPacked: false,
          isEssential: templateItem.isEssential,
          notes: templateItem.conditions ? templateItem.conditions.join(', ') : undefined,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      })
    })

    const totalItems = items.length
    const essentialsTotal = items.filter((item) => item.isEssential).length

    const newList: PackingList = {
      id: `packing-${Date.now()}`,
      userId: tripDetails.userId || 'user-carlos-001',
      title: tripDetails.title || template.name,
      description: tripDetails.description || template.description,
      destination: tripDetails.destination,
      startDate: tripDetails.startDate,
      endDate: tripDetails.endDate,
      tripType: template.tripTypes[0],
      weatherConditions: template.weatherConditions,
      items,
      sharedWith: tripDetails.sharedWith || [],
      isTemplate: false,
      progress: {
        totalItems,
        packedItems: 0,
        percentage: 0,
        essentialsPacked: 0,
        essentialsTotal,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return newList
  },

  // Suggestion actions
  setSuggestions: (suggestions) => set({ suggestions }),

  addSuggestedItem: (listId, categoryIndex, itemIndex) =>
    set((state) => {
      const suggestion = state.suggestions[categoryIndex]
      if (!suggestion) return state

      const suggestedItem = suggestion.items[itemIndex]
      if (!suggestedItem) return state

      const newItem: PackingItem = {
        id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: suggestedItem.name,
        category: suggestion.category,
        quantity: suggestedItem.quantity,
        isPacked: false,
        isEssential: suggestedItem.isEssential,
        notes: suggestedItem.reason,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      const list = state.lists.find((l) => l.id === listId)
      if (!list) return state

      const updatedItems = [...list.items, newItem]
      const packedItems = updatedItems.filter((i) => i.isPacked).length
      const totalItems = updatedItems.length
      const essentialsPacked = updatedItems.filter((i) => i.isEssential && i.isPacked).length
      const essentialsTotal = updatedItems.filter((i) => i.isEssential).length

      const updatedList = {
        ...list,
        items: updatedItems,
        progress: {
          totalItems,
          packedItems,
          percentage: totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0,
          essentialsPacked,
          essentialsTotal,
        },
        updatedAt: new Date().toISOString(),
      }

      return {
        lists: state.lists.map((l) => (l.id === listId ? updatedList : l)),
        currentList: state.currentList?.id === listId ? updatedList : state.currentList,
      }
    }),

  // Share actions
  shareList: (listId, userIds) =>
    set((state) => ({
      lists: state.lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              sharedWith: [...new Set([...list.sharedWith, ...userIds])],
              updatedAt: new Date().toISOString(),
            }
          : list
      ),
    })),

  updateShareSettings: (listId, userId, canEdit) =>
    set((state) => ({
      lists: state.lists.map((list) =>
        list.id === listId
          ? { ...list, updatedAt: new Date().toISOString() }
          : list
      ),
    })),

  // State management
  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  // Computed
  getListsByTrip: (tripId: string) => {
    const { lists } = get()
    return lists.filter((list) => list.tripId === tripId)
  },

  getListProgress: (listId: string) => {
    const { lists } = get()
    const list = lists.find((l) => l.id === listId)
    if (!list) return { packed: 0, total: 0, percentage: 0 }

    return {
      packed: list.progress.packedItems,
      total: list.progress.totalItems,
      percentage: list.progress.percentage,
    }
  },

  getTemplatesByType: (tripType: string) => {
    const { templates } = get()
    return templates.filter((template) => template.tripTypes.includes(tripType as any))
  },
}))
