'use client'

import { Volume2, Mic } from 'lucide-react'
import { Card, Badge } from '@/components/ui'
import { useLanguageStore } from '@/lib/store/language-store'

export function PronunciationGuide() {
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage)
  const getCommonPhrases = useLanguageStore((state) => state.getCommonPhrases)
  const settings = useLanguageStore((state) => state.settings)
  const getLanguageByCode = useLanguageStore((state) => state.getLanguageByCode)

  const commonPhrases = getCommonPhrases().slice(0, 6)
  const targetLanguage = getLanguageByCode(selectedLanguage)

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
          <Mic className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-primary">
            Pronunciation Guide
          </h3>
          <p className="text-sm text-text-secondary">
            Essential phrases with pronunciation
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {commonPhrases.map((phrase) => {
          const translation = phrase.translations[selectedLanguage]
          const pronunciation = phrase.pronunciation?.[selectedLanguage]

          return (
            <div
              key={phrase.id}
              className="p-3 rounded-lg border border-border hover:bg-bg-secondary transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-text-secondary">{phrase.english}</p>
                    <Badge variant="default" className="text-xs">
                      {phrase.category}
                    </Badge>
                  </div>
                  <p className="text-base font-medium text-text-primary">
                    {translation || phrase.english}
                  </p>
                  {settings.showPhonetics && pronunciation && (
                    <p className="text-sm text-purple-600 dark:text-purple-400 italic">
                      /{pronunciation}/
                    </p>
                  )}
                </div>
                <button
                  className="p-2 hover:bg-bg-tertiary rounded-lg transition-colors"
                  onClick={() => console.log('Playing audio for:', phrase.id)}
                >
                  <Volume2 className="h-5 w-5 text-text-secondary" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-text-secondary text-center">
          Tap the speaker icon to hear native pronunciation
        </p>
      </div>
    </Card>
  )
}
