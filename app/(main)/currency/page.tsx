'use client'

import { CurrencyConverter } from '@/components/features/currency/currency-converter'
import { FavoriteCurrencies } from '@/components/features/currency/favorite-currencies'
import { RateChart } from '@/components/features/currency/rate-chart'
import { CurrencyList } from '@/components/features/currency/currency-list'

export default function CurrencyPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Currency Converter</h1>
        <p className="text-text-secondary">
          Convert currencies and track exchange rates for your travels
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <CurrencyConverter />
          <FavoriteCurrencies />
        </div>
        <div className="space-y-6">
          <RateChart />
        </div>
      </div>

      <CurrencyList />
    </div>
  )
}
