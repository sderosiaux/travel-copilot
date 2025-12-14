'use client'

import { useState } from 'react'
import { Star, Search } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, Input, Button } from '@/components/ui'
import { useCurrencyStore } from '@/lib/store/currency-store'
import { currencies, getExchangeRate } from '@/data/currency'

export function CurrencyList() {
  const [searchQuery, setSearchQuery] = useState('')
  const { fromCurrency, favoriteCurrencies, addFavoriteCurrency, removeFavoriteCurrency } =
    useCurrencyStore()

  const filteredCurrencies = currencies.filter(
    (currency) =>
      currency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      currency.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const isFavorite = (code: string) => favoriteCurrencies.includes(code)

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Currencies</CardTitle>
        <div className="relative mt-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-tertiary" />
          <Input
            type="text"
            placeholder="Search currencies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-[600px] overflow-y-auto">
          {filteredCurrencies.map((currency) => {
            const rate = getExchangeRate(fromCurrency, currency.code)
            const favorite = isFavorite(currency.code)

            return (
              <div
                key={currency.code}
                className="flex items-center justify-between p-3 rounded-lg border border-border-primary hover:bg-bg-secondary transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{currency.flag}</span>
                  <div>
                    <p className="font-medium text-text-primary">
                      {currency.code} - {currency.symbol}
                    </p>
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
                    onClick={() => {
                      if (favorite) {
                        removeFavoriteCurrency(currency.code)
                      } else {
                        addFavoriteCurrency(currency.code)
                      }
                    }}
                  >
                    <Star
                      className={`h-4 w-4 ${
                        favorite
                          ? 'fill-accent-yellow text-accent-yellow'
                          : 'text-text-tertiary'
                      }`}
                    />
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
