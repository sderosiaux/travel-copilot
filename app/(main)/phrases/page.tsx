'use client'

import { useEffect } from 'react'
import { MessageSquare, BookOpen } from 'lucide-react'
import { Card, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import {
  LanguageSelector,
  PhraseBook,
  PhraseCategories,
  TranslationHelper,
  PronunciationGuide,
} from '@/components/features/language'
import { useLanguageStore } from '@/lib/store/language-store'

export default function PhrasesPage() {
  const loadData = useLanguageStore((state) => state.loadData)
  const selectedCategory = useLanguageStore((state) => state.selectedCategory)

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <MessageSquare className="h-8 w-8 text-primary-500" />
            <h1 className="text-3xl font-bold text-text-primary">Travel Phrases</h1>
          </div>
          <LanguageSelector />
        </div>
        <p className="text-text-secondary">
          Common travel phrases and translations for your journey
        </p>
      </div>

      <Tabs defaultValue="phrases" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="phrases" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Phrase Book</span>
          </TabsTrigger>
          <TabsTrigger value="translator" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>Translator</span>
          </TabsTrigger>
          <TabsTrigger value="pronunciation" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>Pronunciation</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="phrases" className="space-y-6">
          {!selectedCategory ? (
            <>
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-text-primary mb-1">
                  Browse by Category
                </h2>
                <p className="text-sm text-text-secondary mb-4">
                  Select a category to see relevant phrases
                </p>
              </Card>
              <PhraseCategories />
            </>
          ) : (
            <PhraseBook />
          )}
        </TabsContent>

        <TabsContent value="translator" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <TranslationHelper />
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Translation Tips
              </h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-primary-500">•</span>
                  <span>Translations are provided as guidance - local dialects may vary</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500">•</span>
                  <span>Tap the speaker icon to hear native pronunciation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500">•</span>
                  <span>Download language packs for offline access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500">•</span>
                  <span>Use phonetic guides when speaking isn't possible</span>
                </li>
              </ul>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pronunciation" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <PronunciationGuide />
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Pronunciation Guide
              </h3>
              <div className="space-y-4 text-sm text-text-secondary">
                <div>
                  <h4 className="font-medium text-text-primary mb-1">How to Use</h4>
                  <p>
                    The phonetic spellings are designed to be read like English words.
                    Capital letters indicate stressed syllables.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-text-primary mb-1">Audio Playback</h4>
                  <p>
                    Tap the speaker icon to hear each phrase spoken by a native speaker.
                    Listen multiple times to practice your pronunciation.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-text-primary mb-1">Practice Tips</h4>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>Start with common greetings</li>
                    <li>Practice essential phrases daily</li>
                    <li>Pay attention to tone and inflection</li>
                    <li>Don't be afraid to make mistakes</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
