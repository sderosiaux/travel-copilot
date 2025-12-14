'use client'

import { useState } from 'react'
import { Languages, Volume2 } from 'lucide-react'
import { useLanguageStore } from '@/lib/store/language-store'
import { Card, Button, Label } from '@/components/ui'

export function TranslationHelper() {
  const [inputText, setInputText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage)
  const translateText = useLanguageStore((state) => state.translateText)
  const isLoading = useLanguageStore((state) => state.isLoading)
  const getLanguageByCode = useLanguageStore((state) => state.getLanguageByCode)

  const targetLanguage = getLanguageByCode(selectedLanguage)

  const handleTranslate = async () => {
    if (!inputText.trim()) return

    const result = await translateText(inputText, 'en', selectedLanguage)
    setTranslatedText(result)
  }

  const handleSwap = () => {
    setInputText(translatedText)
    setTranslatedText(inputText)
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
          <Languages className="h-5 w-5 text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-primary">
            Quick Translator
          </h3>
          <p className="text-sm text-text-secondary">
            Translate text to {targetLanguage?.name}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="input-text" className="text-sm mb-2 block">
            English
          </Label>
          <textarea
            id="input-text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type text to translate..."
            className="w-full min-h-[100px] p-3 text-sm border border-border rounded-lg bg-bg-primary text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
          />
        </div>

        <div className="flex items-center justify-center">
          <Button
            onClick={handleTranslate}
            disabled={!inputText.trim() || isLoading}
            className="w-full"
          >
            {isLoading ? 'Translating...' : 'Translate'}
          </Button>
        </div>

        {translatedText && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm">
                {targetLanguage?.flag} {targetLanguage?.name}
              </Label>
              <button
                className="p-2 hover:bg-bg-secondary rounded-lg transition-colors"
                onClick={() => console.log('Playing audio')}
              >
                <Volume2 className="h-4 w-4 text-text-secondary" />
              </button>
            </div>
            <div className="min-h-[100px] p-3 text-sm border border-border rounded-lg bg-bg-secondary text-text-primary">
              {translatedText}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
