'use client'

import { Star } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from '@/components/ui'
import { useCurrencyStore } from '@/lib/store/currency-store'
import { currencies, getExchangeRate } from '@/data/currency'

export function FavoriteCurrencies() {
  const {
    favoriteCurrencies,
    fromCurrency,
    setToCurrency,
    removeFavoriteCurrency,
  } = useCurrencyStore()

  const favoriteCurrencyData = favoriteCurrencies
    .map((code) => currencies.find((c) => c.code === code))
    .filter(Boolean) as typeof currencies

  if (favoriteCurrencyData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Favorite Currencies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Star className="h-12 w-12 mx-auto text-text-tertiary mb-3" />
            <p className="text-text-secondary">No favorite currencies yet</p>
            <p className="text-sm text-text-tertiary mt-1">
              Add currencies to quickly access conversion rates
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Favorite Currencies</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {favoriteCurrencyData.map((currency) => {
            const rate = getExchangeRate(fromCurrency, currency.code)
            return (
              <div
                key={currency.code}
                className="flex items-center justify-between p-3 rounded-lg border border-border-primary hover:bg-bg-secondary transition-colors cursor-pointer"
                onClick={() => setToCurrency(currency.code)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{currency.flag}</span>
                  <div>
                    <p className="font-medium text-text-primary">{currency.code}</p>
                    <p className="text-sm text-text-secondary">{currency.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm text-text-secondary">1 {fromCurrency} =</p>
                    <p className="font-semibold text-text-primary">
                      {rate.toFixed(4)} {currency.code}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFavoriteCurrency(currency.code)
                    }}
                  >
                    <Star className="h-4 w-4 fill-accent-yellow text-accent-yellow" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
