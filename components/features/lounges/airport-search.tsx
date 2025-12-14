'use client'

import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Airport {
  code: string
  name: string
  city: string
  country: string
}

interface AirportSearchProps {
  airports: Airport[]
  selectedAirport?: string
  onSelect: (airportCode: string) => void
  placeholder?: string
}

export function AirportSearch({
  airports,
  selectedAirport,
  onSelect,
  placeholder = 'Search airports...',
}: AirportSearchProps) {
  const [query, setQuery] = React.useState('')
  const [isOpen, setIsOpen] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  const selected = airports.find((a) => a.code === selectedAirport)

  const filteredAirports = React.useMemo(() => {
    if (!query) return airports
    const lowerQuery = query.toLowerCase()
    return airports.filter(
      (airport) =>
        airport.code.toLowerCase().includes(lowerQuery) ||
        airport.name.toLowerCase().includes(lowerQuery) ||
        airport.city.toLowerCase().includes(lowerQuery) ||
        airport.country.toLowerCase().includes(lowerQuery)
    )
  }, [query, airports])

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (airportCode: string) => {
    onSelect(airportCode)
    setQuery('')
    setIsOpen(false)
  }

  const handleClear = () => {
    onSelect('')
    setQuery('')
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="airport-search">Airport</Label>
      <div className="relative">
        {selected ? (
          <div className="flex items-center gap-2">
            <Badge variant="primary" className="flex items-center gap-2 px-3 py-2 text-sm">
              <span className="font-mono font-bold">{selected.code}</span>
              <span>•</span>
              <span>{selected.name}</span>
              <button
                onClick={handleClear}
                className="ml-2 hover:text-white/80 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </Badge>
          </div>
        ) : (
          <>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
              <Input
                ref={inputRef}
                id="airport-search"
                type="text"
                placeholder={placeholder}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setIsOpen(true)
                }}
                onFocus={() => setIsOpen(true)}
                className="pl-10"
              />
            </div>

            {isOpen && (
              <div
                ref={dropdownRef}
                className="absolute z-50 w-full mt-2 bg-bg-primary border border-border rounded-lg shadow-lg max-h-80 overflow-auto"
              >
                {filteredAirports.length === 0 ? (
                  <div className="p-4 text-center text-sm text-text-tertiary">
                    No airports found
                  </div>
                ) : (
                  <div className="py-2">
                    {filteredAirports.map((airport) => (
                      <button
                        key={airport.code}
                        onClick={() => handleSelect(airport.code)}
                        className={cn(
                          'w-full px-4 py-3 text-left hover:bg-bg-secondary transition-colors',
                          'flex items-start gap-3'
                        )}
                      >
                        <div className="font-mono font-bold text-primary-500 text-sm min-w-[3rem]">
                          {airport.code}
                        </div>
                        <div className="flex-1 space-y-0.5">
                          <p className="text-sm font-medium text-text-primary">{airport.name}</p>
                          <p className="text-xs text-text-tertiary">
                            {airport.city}, {airport.country}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
