export interface Currency {
  code: string
  name: string
  symbol: string
  flag: string
}

export interface CurrencyRate {
  from: string
  to: string
  rate: number
  timestamp: string
}

export interface CurrencyConversion {
  id: string
  fromCurrency: string
  toCurrency: string
  amount: number
  convertedAmount: number
  rate: number
  timestamp: string
}

export interface FavoriteCurrency {
  userId: string
  currencyCode: string
  addedAt: string
}

export interface HistoricalRate {
  date: string
  rate: number
}

export interface CurrencyChart {
  fromCurrency: string
  toCurrency: string
  period: '7d' | '30d' | '90d' | '1y'
  data: HistoricalRate[]
}

export interface OfflineRateCache {
  rates: Record<string, Record<string, number>>
  lastUpdated: string
  expiresAt: string
}
