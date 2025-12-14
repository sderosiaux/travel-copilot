'use client'

import { PackingItem } from './packing-item'
import { Badge } from '@/components/ui/badge'
import type { PackingItem as PackingItemType, PackingCategory } from '@/types/packing'

interface CategorySectionProps {
  category: PackingCategory
  items: PackingItemType[]
  onTogglePacked: (itemId: string) => void
  onToggleEssential: (itemId: string) => void
  onUpdateItem: (itemId: string, updates: Partial<PackingItemType>) => void
  onDeleteItem: (itemId: string) => void
}

const categoryLabels: Record<PackingCategory, string> = {
  clothing: 'Clothing',
  toiletries: 'Toiletries',
  electronics: 'Electronics',
  documents: 'Documents',
  medications: 'Medications',
  accessories: 'Accessories',
  outdoor: 'Outdoor & Sports',
  entertainment: 'Entertainment',
  food: 'Food & Snacks',
  other: 'Other',
}

const categoryIcons: Record<PackingCategory, string> = {
  clothing: '👕',
  toiletries: '🧴',
  electronics: '🔌',
  documents: '📄',
  medications: '💊',
  accessories: '👜',
  outdoor: '⛰️',
  entertainment: '🎮',
  food: '🍎',
  other: '📦',
}

export function CategorySection({
  category,
  items,
  onTogglePacked,
  onToggleEssential,
  onUpdateItem,
  onDeleteItem,
}: CategorySectionProps) {
  if (items.length === 0) return null

  const packedCount = items.filter((item) => item.isPacked).length
  const totalCount = items.length

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{categoryIcons[category]}</span>
          <h3 className="text-lg font-semibold text-text-primary">
            {categoryLabels[category]}
          </h3>
          <Badge variant="default" className="text-xs">
            {packedCount}/{totalCount}
          </Badge>
        </div>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <PackingItem
            key={item.id}
            item={item}
            onTogglePacked={onTogglePacked}
            onToggleEssential={onToggleEssential}
            onUpdate={onUpdateItem}
            onDelete={onDeleteItem}
          />
        ))}
      </div>
    </div>
  )
}
