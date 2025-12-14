'use client'

import { useState } from 'react'
import { ArrowRightLeft, RefreshCw } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { Button } from '@/components/ui'
import { Input } from '@/components/ui'
import { useCurrencyStore } from '@/lib/store/currency-store'
import { CurrencySelect } from './currency-select'
import { currencies } from '@/data/currency'

export function CurrencyConverter() {
  const {
    fromCurrency,
    toCurrency,
    amount,
    convertedAmount,
    setFromCurrency,
    setToCurrency,
    setAmount,
    swapCurrencies,
    refreshRates,
    isLoading,
    lastUpdated,
    getConversionRate,
  } = useCurrencyStore()

  const rate = getConversionRate()

  const fromCurrencyData = currencies.find((c) => c.code === fromCurrency)
  const toCurrencyData = currencies.find((c) => c.code === toCurrency)

  const handleAmountChange = (value: string) => {
    const num = parseFloat(value)
    if (!isNaN(num) && num >= 0) {
      setAmount(num)
    } else if (value === '') {
      setAmount(0)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Currency Converter</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => refreshRates()}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        {lastUpdated && (
          <p className="text-sm text-text-secondary">
            Last updated: {new Date(lastUpdated).toLocaleTimeString()}
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* From Currency */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">From</label>
          <div className="flex gap-2">
            <Input
              type="number"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="0.00"
              className="flex-1"
              min="0"
              step="0.01"
            />
            <CurrencySelect
              value={fromCurrency}
              onChange={setFromCurrency}
              currencies={currencies}
            />
          </div>
          <div className="text-sm text-text-secondary">
            {fromCurrencyData?.flag} {fromCurrencyData?.name}
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button
            variant="secondary"
            size="sm"
            onClick={swapCurrencies}
            className="rounded-full"
          >
            <ArrowRightLeft className="h-4 w-4" />
          </Button>
        </div>

        {/* To Currency */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">To</label>
          <div className="flex gap-2">
            <Input
              type="number"
              value={convertedAmount.toFixed(2)}
              readOnly
              className="flex-1 bg-bg-secondary"
            />
            <CurrencySelect
              value={toCurrency}
              onChange={setToCurrency}
              currencies={currencies}
            />
          </div>
          <div className="text-sm text-text-secondary">
            {toCurrencyData?.flag} {toCurrencyData?.name}
          </div>
        </div>

        {/* Exchange Rate */}
        <div className="rounded-lg bg-bg-secondary p-4">
          <div className="text-center">
            <p className="text-sm text-text-secondary">Exchange Rate</p>
            <p className="text-2xl font-semibold text-text-primary mt-1">
              1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
