'use client'

import { Phone, AlertTriangle, Copy } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from '@/components/ui'
import type { CountryEmergencyNumbers } from '@/types/emergency'

interface CountryNumbersProps {
  countries: CountryEmergencyNumbers[]
  selectedCountry?: string | null
}

export function CountryNumbers({ countries, selectedCountry }: CountryNumbersProps) {
  const displayCountries = selectedCountry
    ? countries.filter((c) => c.countryCode === selectedCountry)
    : countries

  const handleCopyNumber = (number: string) => {
    navigator.clipboard.writeText(number)
  }

  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`
  }

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'general_emergency':
        return '🚨'
      case 'police':
        return '👮'
      case 'ambulance':
        return '🚑'
      case 'fire':
        return '🚒'
      case 'coast_guard':
        return '⛵'
      case 'mountain_rescue':
        return '⛰️'
      case 'poison_control':
        return '☠️'
      case 'tourist_police':
        return '🗺️'
      default:
        return '📞'
    }
  }

  return (
    <div className="space-y-6">
      {displayCountries.map((country) => (
        <Card key={country.countryCode}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">{country.countryCode === 'GB' ? '🇬🇧' : country.countryCode === 'JP' ? '🇯🇵' : country.countryCode === 'US' ? '🇺🇸' : country.countryCode === 'FR' ? '🇫🇷' : '🌍'}</span>
                {country.countryName}
              </CardTitle>
              <Badge variant="default">{country.countryCode}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {country.services.map((service, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-bg-secondary border border-border hover:border-border-hover transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <span className="text-2xl flex-shrink-0">
                        {getServiceIcon(service.type)}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-text-primary">{service.name}</h4>
                        <p className="text-2xl font-mono font-bold text-primary-500 mt-1">
                          {service.number}
                        </p>
                        {service.description && (
                          <p className="text-sm text-text-secondary mt-2">
                            {service.description}
                          </p>
                        )}
                        <p className="text-xs text-text-tertiary mt-2">
                          Available: {service.available}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button
                        variant="secondary"
                        size="icon"
                        onClick={() => handleCopyNumber(service.number)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        onClick={() => handleCall(service.number)}
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {country.notes && country.notes.length > 0 && (
              <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-warning flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    {country.notes.map((note, index) => (
                      <p key={index} className="text-sm text-text-secondary">
                        {note}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <p className="text-xs text-text-tertiary text-right">
              Last updated: {new Date(country.lastUpdated).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
