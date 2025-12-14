// Multi-language Support Types

export interface Language {
  code: string
  name: string
  nativeName: string
  flag: string
  rtl?: boolean
}

export interface TravelPhrase {
  id: string
  category: string
  english: string
  translations: Record<string, string>
  pronunciation?: Record<string, string>
  audioUrl?: string
  commonUse: boolean
}

export interface PhraseCategory {
  id: string
  name: string
  icon: string
  phraseCount: number
  description: string
}

export interface Translation {
  id: string
  sourceText: string
  sourceLang: string
  targetLang: string
  translatedText: string
  confidence: number
  timestamp: string
}

export interface PronunciationGuide {
  id: string
  phrase: string
  language: string
  phonetic: string
  audioUrl?: string
  tips?: string
}

export interface LanguageSettings {
  primaryLanguage: string
  translationLanguages: string[]
  autoDetect: boolean
  showPhonetics: boolean
  offlineLanguages: string[]
}

export interface ConversationStarter {
  id: string
  category: string
  english: string
  translations: Record<string, string>
  context: string
  difficulty: 'easy' | 'medium' | 'hard'
}
