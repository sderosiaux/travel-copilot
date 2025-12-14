'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Check, Square, Trash2, Star } from 'lucide-react'
import type { PackingItem as PackingItemType } from '@/types/packing'

interface PackingItemProps {
  item: PackingItemType
  onTogglePacked: (itemId: string) => void
  onToggleEssential: (itemId: string) => void
  onUpdate: (itemId: string, updates: Partial<PackingItemType>) => void
  onDelete: (itemId: string) => void
}

export function PackingItem({
  item,
  onTogglePacked,
  onToggleEssential,
  onUpdate,
  onDelete,
}: PackingItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(item.name)
  const [editedQuantity, setEditedQuantity] = useState(item.quantity.toString())

  const handleSave = () => {
    onUpdate(item.id, {
      name: editedName,
      quantity: parseInt(editedQuantity) || 1,
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedName(item.name)
    setEditedQuantity(item.quantity.toString())
    setIsEditing(false)
  }

  return (
    <div
      className={`p-3 border border-border-primary rounded-lg hover:bg-bg-secondary transition-colors ${
        item.isPacked ? 'bg-bg-secondary opacity-75' : ''
      }`}
    >
      <div className="flex items-center gap-3">
        {/* Checkbox */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onTogglePacked(item.id)}
          className="h-8 w-8 p-0"
        >
          {item.isPacked ? (
            <Check className="h-5 w-5 text-primary-500" />
          ) : (
            <Square className="h-5 w-5 text-text-tertiary" />
          )}
        </Button>

        {/* Content */}
        <div className="flex-1">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <Input
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="h-8 text-sm"
                placeholder="Item name"
                autoFocus
              />
              <Input
                type="number"
                value={editedQuantity}
                onChange={(e) => setEditedQuantity(e.target.value)}
                className="h-8 w-20 text-sm"
                min="1"
              />
              <Button size="sm" onClick={handleSave} className="h-8">
                Save
              </Button>
              <Button size="sm" variant="ghost" onClick={handleCancel} className="h-8">
                Cancel
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className={`text-sm font-medium text-left hover:text-primary-500 transition-colors ${
                  item.isPacked ? 'line-through text-text-tertiary' : 'text-text-primary'
                }`}
              >
                {item.name}
              </button>
              {item.quantity > 1 && (
                <Badge variant="default" className="text-xs">
                  x{item.quantity}
                </Badge>
              )}
              {item.isEssential && (
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              )}
              {item.addedBy && (
                <Badge variant="default" className="text-xs">
                  Added by member
                </Badge>
              )}
            </div>
          )}
          {item.notes && (
            <p className="text-xs text-text-secondary mt-1">{item.notes}</p>
          )}
        </div>

        {/* Actions */}
        {!isEditing && (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleEssential(item.id)}
              className="h-8 w-8 p-0"
              title="Toggle essential"
            >
              <Star
                className={`h-4 w-4 ${
                  item.isEssential ? 'text-yellow-500 fill-yellow-500' : 'text-text-tertiary'
                }`}
              />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(item.id)}
              className="h-8 w-8 p-0 hover:text-red-500"
              title="Delete item"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
