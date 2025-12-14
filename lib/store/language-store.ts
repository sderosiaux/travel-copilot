import { create } from 'zustand'
import type {
  Language,
  TravelPhrase,
  PhraseCategory,
  Translation,
  LanguageSettings,
} from '@/types/language'
import {
  mockLanguages,
  mockTravelPhrases,
  mockPhraseCategories,
} from '@/data/languages'

interface LanguageState {
  languages: Language[]
  phrases: TravelPhrase[]
  categories: PhraseCategory[]
  translations: Translation[]
  settings: LanguageSettings
  selectedLanguage: string
  searchQuery: string
  selectedCategory: string | null
  isLoading: boolean
  error: string | null

  // Actions
  setSelectedLanguage: (code: string) => void
  addTranslation: (translation: Translation) => void
  translateText: (
    text: string,
    sourceLang: string,
    targetLang: string
  ) => Promise<string>
  updateSettings: (settings: Partial<LanguageSettings>) => void
  setSearchQuery: (query: string) => void
  setSelectedCategory: (categoryId: string | null) => void
  loadData: () => void

  // Computed
  getFilteredPhrases: () => TravelPhrase[]
  getPhrasesByCategory: (categoryId: string) => TravelPhrase[]
  getCommonPhrases: () => TravelPhrase[]
  getLanguageByCode: (code: string) => Language | undefined
  getCategoryById: (id: string) => PhraseCategory | undefined
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
  languages: mockLanguages,
  phrases: mockTravelPhrases,
  categories: mockPhraseCategories,
  translations: [],
  settings: {
    primaryLanguage: 'en',
    translationLanguages: ['es', 'fr', 'de', 'ja'],
    autoDetect: true,
    showPhonetics: true,
    offlineLanguages: ['es', 'fr', 'de'],
  },
  selectedLanguage: 'es',
  searchQuery: '',
  selectedCategory: null,
  isLoading: false,
  error: null,

  // Actions
  setSelectedLanguage: (code) => set({ selectedLanguage: code }),

  addTranslation: (translation) =>
    set((state) => ({
      translations: [translation, ...state.translations.slice(0, 49)], // Keep last 50
    })),

  translateText: async (text, sourceLang, targetLang) => {
    set({ isLoading: true })

    // Simulate translation API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Mock translation
    const translation: Translation = {
      id: `trans-${Date.now()}`,
      sourceText: text,
      sourceLang,
      targetLang,
      translatedText: `[Translated: ${text}]`,
      confidence: 0.95,
      timestamp: new Date().toISOString(),
    }

    get().addTranslation(translation)

    set({ isLoading: false })
    return translation.translatedText
  },

  updateSettings: (settings) =>
    set((state) => ({
      settings: { ...state.settings, ...settings },
    })),

  setSearchQuery: (query) => set({ searchQuery: query }),

  setSelectedCategory: (categoryId) => set({ selectedCategory: categoryId }),

  loadData: () => {
    set({
      languages: mockLanguages,
      phrases: mockTravelPhrases,
      categories: mockPhraseCategories,
    })
  },

  // Computed
  getFilteredPhrases: () => {
    const { phrases, searchQuery, selectedCategory } = get()

    let filtered = phrases

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.english.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          Object.values(p.translations).some((t) => t.toLowerCase().includes(query))
      )
    }

    return filtered
  },

  getPhrasesByCategory: (categoryId) => {
    const { phrases } = get()
    return phrases.filter((p) => p.category === categoryId)
  },

  getCommonPhrases: () => {
    const { phrases } = get()
    return phrases.filter((p) => p.commonUse)
  },

  getLanguageByCode: (code) => {
    const { languages } = get()
    return languages.find((l) => l.code === code)
  },

  getCategoryById: (id) => {
    const { categories } = get()
    return categories.find((c) => c.id === id)
  },
}))
