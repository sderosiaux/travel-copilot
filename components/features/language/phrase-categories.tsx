'use client'

import { ChevronRight } from 'lucide-react'
import { useLanguageStore } from '@/lib/store/language-store'
import { Card, Badge } from '@/components/ui'

interface PhraseCategoriesProps {
  onSelectCategory?: (categoryId: string) => void
}

export function PhraseCategories({ onSelectCategory }: PhraseCategoriesProps) {
  const categories = useLanguageStore((state) => state.categories)
  const setSelectedCategory = useLanguageStore((state) => state.setSelectedCategory)

  const handleSelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    onSelectCategory?.(categoryId)
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {categories.map((category) => (
        <Card
          key={category.id}
          className="p-4 cursor-pointer hover:border-primary-500 hover:bg-bg-secondary transition-all"
          onClick={() => handleSelect(category.name)}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-3xl">{category.icon}</span>
            <ChevronRight className="h-5 w-5 text-text-tertiary" />
          </div>
          <h3 className="font-semibold text-text-primary mb-1">{category.name}</h3>
          <p className="text-xs text-text-secondary mb-2">
            {category.description}
          </p>
          <Badge variant="default">{category.phraseCount} phrases</Badge>
        </Card>
      ))}
    </div>
  )
}
