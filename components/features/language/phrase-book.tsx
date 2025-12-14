'use client'

import { useState } from 'react'
import { Search, Volume2, BookOpen } from 'lucide-react'
import { useLanguageStore } from '@/lib/store/language-store'
import { Card, Input, Badge, Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui'

export function PhraseBook() {
  const categories = useLanguageStore((state) => state.categories)
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage)
  const selectedCategory = useLanguageStore((state) => state.selectedCategory)
  const setSelectedCategory = useLanguageStore((state) => state.setSelectedCategory)
  const searchQuery = useLanguageStore((state) => state.searchQuery)
  const setSearchQuery = useLanguageStore((state) => state.setSearchQuery)
  const getFilteredPhrases = useLanguageStore((state) => state.getFilteredPhrases)
  const settings = useLanguageStore((state) => state.settings)

  const filteredPhrases = getFilteredPhrases()

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
          <Input
            placeholder="Search phrases..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs
        value={selectedCategory || 'all'}
        onValueChange={(value) => setSelectedCategory(value === 'all' ? null : value)}
      >
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            All
          </TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.name}
              className="flex items-center gap-2"
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
              <Badge variant="default" className="ml-1">
                {category.phraseCount}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory || 'all'} className="space-y-3 mt-4">
          {filteredPhrases.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-text-secondary">No phrases found</p>
            </Card>
          ) : (
            filteredPhrases.map((phrase) => {
              const translation = phrase.translations[selectedLanguage]
              const pronunciation = phrase.pronunciation?.[selectedLanguage]

              return (
                <Card key={phrase.id} className="p-4 hover:bg-bg-secondary transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <p className="text-sm text-text-secondary">{phrase.english}</p>
                        {phrase.commonUse && (
                          <Badge variant="default" className="text-xs">
                            Common
                          </Badge>
                        )}
                      </div>
                      <p className="text-lg font-medium text-text-primary">
                        {translation || phrase.english}
                      </p>
                      {settings.showPhonetics && pronunciation && (
                        <p className="text-sm text-text-tertiary italic">
                          /{pronunciation}/
                        </p>
                      )}
                    </div>
                    <button
                      className="p-2 hover:bg-bg-tertiary rounded-lg transition-colors"
                      onClick={() => {
                        // Mock audio playback
                        console.log('Playing audio for:', phrase.id)
                      }}
                    >
                      <Volume2 className="h-5 w-5 text-text-secondary" />
                    </button>
                  </div>
                </Card>
              )
            })
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
