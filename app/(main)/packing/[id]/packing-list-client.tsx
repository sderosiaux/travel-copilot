'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Plus, Share2, MapPin, Calendar, Users } from 'lucide-react'
import { CategorySection } from '@/components/features/packing/category-section'
import { PackingSuggestions } from '@/components/features/packing/packing-suggestions'
import { usePackingStore } from '@/lib/store/packing-store'
import { mockPackingData } from '@/data/packing'
import type { PackingCategory, PackingItem } from '@/types/packing'

interface PackingListClientProps {
  listId: string
}

export default function PackingListClient({ listId }: PackingListClientProps) {
  const router = useRouter()

  const {
    lists,
    currentList,
    suggestions,
    setLists,
    setCurrentList,
    setSuggestions,
    addItem,
    updateItem,
    deleteItem,
    toggleItemPacked,
    toggleItemEssential,
    addSuggestedItem,
  } = usePackingStore()

  const [newItemName, setNewItemName] = useState('')
  const [newItemCategory, setNewItemCategory] = useState<PackingCategory>('other')

  useEffect(() => {
    // Load mock data
    if (lists.length === 0) {
      setLists(Object.values(mockPackingData.lists))
    }

    // Load suggestions for Tokyo list
    if (listId === 'packing-tokyo-001') {
      setSuggestions(mockPackingData.suggestions.tokyo)
    }
  }, [lists.length, listId, setLists, setSuggestions])

  useEffect(() => {
    // Set current list
    const list = lists.find((l) => l.id === listId)
    if (list) {
      setCurrentList(list)
    }
  }, [listId, lists, setCurrentList])

  const handleAddItem = () => {
    if (!newItemName.trim() || !currentList) return

    const newItem: PackingItem = {
      id: `item-${Date.now()}`,
      name: newItemName,
      category: newItemCategory,
      quantity: 1,
      isPacked: false,
      isEssential: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    addItem(currentList.id, newItem)
    setNewItemName('')
  }

  if (!currentList) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-12">
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    )
  }

  const categories: PackingCategory[] = [
    'documents',
    'clothing',
    'electronics',
    'toiletries',
    'medications',
    'accessories',
    'outdoor',
    'entertainment',
    'food',
    'other',
  ]

  const itemsByCategory = categories.map((category) => ({
    category,
    items: currentList.items.filter((item) => item.category === category),
  }))

  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => router.push('/packing')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Lists
        </Button>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">{currentList.title}</h1>
            {currentList.description && (
              <p className="text-text-secondary mt-2">{currentList.description}</p>
            )}
            <div className="flex flex-wrap gap-3 mt-3 text-sm text-text-secondary">
              {currentList.destination && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{currentList.destination}</span>
                </div>
              )}
              {currentList.startDate && currentList.endDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {formatDate(currentList.startDate)} - {formatDate(currentList.endDate)}
                  </span>
                </div>
              )}
              {currentList.sharedWith.length > 0 && (
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>Shared with {currentList.sharedWith.length}</span>
                </div>
              )}
            </div>
          </div>
          <Button>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Progress Card */}
      <Card>
        <CardHeader>
          <CardTitle>Packing Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Overall Progress</span>
                <span className="text-lg font-bold text-text-primary">
                  {currentList.progress.packedItems}/{currentList.progress.totalItems}
                </span>
              </div>
              <Progress value={currentList.progress.percentage} className="h-3" />
              <p className="text-sm text-text-tertiary">
                {currentList.progress.percentage}% complete
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border-primary">
              <div>
                <p className="text-sm text-text-secondary mb-1">Essential Items</p>
                <p className="text-2xl font-bold text-text-primary">
                  {currentList.progress.essentialsPacked}/{currentList.progress.essentialsTotal}
                </p>
              </div>
              <div>
                <p className="text-sm text-text-secondary mb-1">Trip Type</p>
                <Badge className="text-sm capitalize">{currentList.tripType}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Add item */}
          <Card>
            <CardHeader>
              <CardTitle>Add Item</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Item name..."
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
                  className="flex-1"
                />
                <Select value={newItemCategory} onValueChange={(value) => setNewItemCategory(value as PackingCategory)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category} className="capitalize">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={handleAddItem}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Items by category */}
          <div className="space-y-6">
            {itemsByCategory.map(({ category, items }) => (
              <CategorySection
                key={category}
                category={category}
                items={items}
                onTogglePacked={(itemId) => toggleItemPacked(currentList.id, itemId)}
                onToggleEssential={(itemId) => toggleItemEssential(currentList.id, itemId)}
                onUpdateItem={(itemId, updates) => updateItem(currentList.id, itemId, updates)}
                onDeleteItem={(itemId) => deleteItem(currentList.id, itemId)}
              />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {suggestions.length > 0 && (
            <PackingSuggestions
              suggestions={suggestions}
              onAddItem={(categoryIndex, itemIndex) =>
                addSuggestedItem(currentList.id, categoryIndex, itemIndex)
              }
            />
          )}
        </div>
      </div>
    </div>
  )
}
