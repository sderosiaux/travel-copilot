'use client'

import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Airport } from '@/types'

interface AirportSearchProps {
  airports: Airport[]
  onSearch: (filtered: Airport[]) => void
  placeholder?: string
}

export function AirportSearch({
  airports,
  onSearch,
  placeholder = 'Search airports by name, code, or city...'
}: AirportSearchProps) {
  const [query, setQuery] = useState('')

  const filteredAirports = useMemo(() => {
    if (!query.trim()) {
      return airports
    }

    const lowerQuery = query.toLowerCase().trim()
    return airports.filter((airport) => {
      return (
        airport.code.toLowerCase().includes(lowerQuery) ||
        airport.name.toLowerCase().includes(lowerQuery) ||
        airport.city.toLowerCase().includes(lowerQuery) ||
        airport.country.toLowerCase().includes(lowerQuery)
      )
    })
  }, [airports, query])

  // Update parent component whenever filtered results change
  useMemo(() => {
    onSearch(filteredAirports)
  }, [filteredAirports, onSearch])

  const handleClear = () => {
    setQuery('')
  }

  return (
    <div className="relative">
      <div className="relative">
        <Search
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none"
        />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
          >
            <X size={16} />
          </Button>
        )}
      </div>
      {query && (
        <div className="mt-2 text-sm text-text-secondary">
          Found {filteredAirports.length} airport{filteredAirports.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  )
}
