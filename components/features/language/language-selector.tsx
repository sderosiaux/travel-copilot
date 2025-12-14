'use client'

import { Globe } from 'lucide-react'
import { useLanguageStore } from '@/lib/store/language-store'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'

export function LanguageSelector() {
  const languages = useLanguageStore((state) => state.languages)
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage)
  const setSelectedLanguage = useLanguageStore((state) => state.setSelectedLanguage)

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-text-secondary" />
      <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
        <SelectTrigger className="w-[180px]">
          <SelectValue>
            {languages.find((l) => l.code === selectedLanguage)?.flag}{' '}
            {languages.find((l) => l.code === selectedLanguage)?.name}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {languages.map((language) => (
            <SelectItem key={language.code} value={language.code}>
              <span className="flex items-center gap-2">
                <span>{language.flag}</span>
                <span>{language.name}</span>
                <span className="text-xs text-text-secondary">
                  {language.nativeName}
                </span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
