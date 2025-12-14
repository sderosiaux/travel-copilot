'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useUIStore } from '@/lib/store/ui-store'
import { QUICK_ACTIONS, PRIMARY_NAV, type QuickAction } from '@/lib/constants/navigation'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'

export function CommandPalette() {
  const router = useRouter()
  const { commandPaletteOpen, setCommandPaletteOpen } = useUIStore()
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Combine all searchable items
  const allItems = useMemo(() => {
    const navItems = PRIMARY_NAV.map((item) => ({
      id: `nav-${item.href}`,
      label: item.label,
      icon: item.icon,
      href: item.href,
      keywords: [item.label.toLowerCase(), item.description?.toLowerCase() || ''],
      category: 'navigation' as const,
      description: item.description,
    }))

    return [...QUICK_ACTIONS, ...navItems]
  }, [])

  // Filter items based on query
  const filteredItems = useMemo(() => {
    if (!query.trim()) {
      // Show utilities and navigation when no query
      return allItems.filter(
        (item) => item.category === 'utility' || item.category === 'navigation'
      )
    }

    const lowerQuery = query.toLowerCase()
    return allItems.filter((item) => {
      const matchesLabel = item.label.toLowerCase().includes(lowerQuery)
      const matchesKeywords = item.keywords.some((kw) => kw.includes(lowerQuery))
      const matchesDescription = item.description?.toLowerCase().includes(lowerQuery)
      return matchesLabel || matchesKeywords || matchesDescription
    })
  }, [query, allItems])

  // Group items by category
  const groupedItems = useMemo(() => {
    const groups: Record<string, typeof filteredItems> = {}
    filteredItems.forEach((item) => {
      const category = item.category
      if (!groups[category]) {
        groups[category] = []
      }
      groups[category].push(item)
    })
    return groups
  }, [filteredItems])

  const categoryLabels: Record<string, string> = {
    utility: 'Tools & Utilities',
    navigation: 'Go to',
    action: 'Actions',
  }

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex((prev) =>
            prev < filteredItems.length - 1 ? prev + 1 : 0
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredItems.length - 1
          )
          break
        case 'Enter':
          e.preventDefault()
          if (filteredItems[selectedIndex]) {
            handleSelect(filteredItems[selectedIndex])
          }
          break
        case 'Escape':
          e.preventDefault()
          setCommandPaletteOpen(false)
          break
      }
    },
    [filteredItems, selectedIndex, setCommandPaletteOpen]
  )

  const handleSelect = (item: QuickAction) => {
    if (item.href) {
      router.push(item.href)
    } else if (item.action) {
      // Handle special actions
      console.log('Action:', item.action)
    }
    setCommandPaletteOpen(false)
    setQuery('')
    setSelectedIndex(0)
  }

  // Global keyboard shortcut
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCommandPaletteOpen(!commandPaletteOpen)
      }
    }

    document.addEventListener('keydown', handleGlobalKeyDown)
    return () => document.removeEventListener('keydown', handleGlobalKeyDown)
  }, [commandPaletteOpen, setCommandPaletteOpen])

  // Reset state when opening
  useEffect(() => {
    if (commandPaletteOpen) {
      setQuery('')
      setSelectedIndex(0)
    }
  }, [commandPaletteOpen])

  // Reset selection when filtered items change
  useEffect(() => {
    setSelectedIndex(0)
  }, [filteredItems.length])

  let globalIndex = -1

  return (
    <Dialog open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen}>
      <DialogContent className="p-0 gap-0 max-w-xl overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center border-b border-border px-4">
          <Search className="h-5 w-5 text-text-tertiary shrink-0" />
          <input
            type="text"
            placeholder="Search actions, pages, or tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 h-14 px-4 bg-transparent text-text-primary placeholder:text-text-tertiary focus:outline-none text-base"
            autoFocus
          />
          <kbd className="hidden sm:inline-flex h-6 select-none items-center gap-1 rounded border border-border bg-bg-tertiary px-2 font-mono text-xs text-text-tertiary">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[400px] overflow-y-auto py-2">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-text-secondary">
              <p>No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-sm text-text-tertiary mt-1">
                Try a different search term
              </p>
            </div>
          ) : (
            Object.entries(groupedItems).map(([category, items]) => (
              <div key={category}>
                <div className="px-4 py-2 text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                  {categoryLabels[category] || category}
                </div>
                {items.map((item) => {
                  globalIndex++
                  const currentIndex = globalIndex
                  const Icon = item.icon

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(currentIndex)}
                      className={cn(
                        'w-full flex items-center gap-3 px-4 py-3 text-left transition-colors',
                        currentIndex === selectedIndex
                          ? 'bg-primary-500/10 text-primary-600'
                          : 'text-text-primary hover:bg-bg-secondary'
                      )}
                    >
                      <div
                        className={cn(
                          'flex h-9 w-9 items-center justify-center rounded-lg shrink-0',
                          currentIndex === selectedIndex
                            ? 'bg-primary-500 text-white'
                            : 'bg-bg-tertiary text-text-secondary'
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{item.label}</div>
                        {item.description && (
                          <div className="text-sm text-text-tertiary truncate">
                            {item.description}
                          </div>
                        )}
                      </div>
                      {currentIndex === selectedIndex && (
                        <kbd className="hidden sm:inline-flex h-6 items-center rounded border border-border bg-bg-tertiary px-2 font-mono text-xs text-text-tertiary">
                          Enter
                        </kbd>
                      )}
                    </button>
                  )
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border px-4 py-2 text-xs text-text-tertiary bg-bg-secondary">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="inline-flex h-5 items-center rounded border border-border bg-bg-tertiary px-1.5 font-mono">
                ↑↓
              </kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="inline-flex h-5 items-center rounded border border-border bg-bg-tertiary px-1.5 font-mono">
                Enter
              </kbd>
              Select
            </span>
          </div>
          <span className="flex items-center gap-1">
            <kbd className="inline-flex h-5 items-center rounded border border-border bg-bg-tertiary px-1.5 font-mono">
              ⌘K
            </kbd>
            to toggle
          </span>
        </div>
      </DialogContent>
    </Dialog>
  )
}
