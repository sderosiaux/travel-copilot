'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Globe, MapPin } from 'lucide-react'
import type { CountryVisit } from '@/types/stats'

interface CountriesMapProps {
  countries: CountryVisit[]
}

export function CountriesMap({ countries }: CountriesMapProps) {
  // Group countries by continent
  const continents = countries.reduce(
    (acc, country) => {
      if (!acc[country.continent]) {
        acc[country.continent] = []
      }
      acc[country.continent].push(country)
      return acc
    },
    {} as Record<string, CountryVisit[]>
  )

  const sortedContinents = Object.entries(continents).sort(
    ([, a], [, b]) => b.length - a.length
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-text-secondary" />
              Countries Visited
            </CardTitle>
            <p className="text-sm text-text-secondary mt-1">
              {countries.length} countries across {sortedContinents.length} continents
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {sortedContinents.map(([continent, continentCountries]) => (
            <div key={continent}>
              <h3 className="text-sm font-semibold text-text-primary mb-3">
                {continent}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {continentCountries
                  .sort((a, b) => b.visitCount - a.visitCount)
                  .map((country) => (
                    <div
                      key={country.countryCode}
                      className="flex items-start justify-between p-3 rounded-lg border border-border-primary bg-bg-secondary hover:bg-bg-tertiary transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">{getFlagEmoji(country.countryCode)}</span>
                          <span className="font-medium text-text-primary">
                            {country.countryName}
                          </span>
                        </div>
                        <div className="text-xs text-text-tertiary space-y-1">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{country.cities.slice(0, 2).join(', ')}</span>
                            {country.cities.length > 2 && (
                              <span>+{country.cities.length - 2}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="ml-2">
                        {country.visitCount} {country.visitCount === 1 ? 'visit' : 'visits'}
                      </Badge>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Helper function to get flag emoji from country code
function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}
