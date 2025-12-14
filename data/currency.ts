import type { Currency, CurrencyRate, FavoriteCurrency, HistoricalRate } from '@/types/currency'

export const currencies: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿' },
  { code: 'MXN', name: 'Mexican Peso', symbol: 'Mex$', flag: '🇲🇽' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', flag: '🇹🇷' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭' },
]

// Mock exchange rates (base: USD)
export const mockExchangeRates: Record<string, Record<string, number>> = {
  USD: {
    EUR: 0.92,
    GBP: 0.79,
    JPY: 149.50,
    CAD: 1.36,
    AUD: 1.52,
    CHF: 0.88,
    CNY: 7.24,
    SEK: 10.45,
    NZD: 1.65,
    MXN: 17.15,
    SGD: 1.34,
    HKD: 7.83,
    NOK: 10.58,
    KRW: 1305.50,
    TRY: 28.95,
    INR: 83.12,
    BRL: 4.95,
    ZAR: 18.75,
    THB: 35.20,
  },
}

export const favoriteCurrencies: FavoriteCurrency[] = [
  {
    userId: 'user-carlos-001',
    currencyCode: 'EUR',
    addedAt: '2024-01-15T10:00:00Z',
  },
  {
    userId: 'user-carlos-001',
    currencyCode: 'GBP',
    addedAt: '2024-01-15T10:00:00Z',
  },
  {
    userId: 'user-carlos-001',
    currencyCode: 'JPY',
    addedAt: '2024-02-20T14:30:00Z',
  },
]

// Generate mock historical data
const generateHistoricalRates = (
  baseRate: number,
  days: number,
  volatility: number = 0.02
): HistoricalRate[] => {
  const data: HistoricalRate[] = []
  const now = new Date()

  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    const variation = (Math.random() - 0.5) * volatility * baseRate
    const rate = baseRate + variation

    data.push({
      date: date.toISOString().split('T')[0],
      rate: parseFloat(rate.toFixed(4)),
    })
  }

  return data
}

export const mockHistoricalRates = {
  'USD-EUR': {
    '7d': generateHistoricalRates(0.92, 7, 0.015),
    '30d': generateHistoricalRates(0.92, 30, 0.02),
    '90d': generateHistoricalRates(0.92, 90, 0.025),
    '1y': generateHistoricalRates(0.92, 365, 0.03),
  },
  'USD-GBP': {
    '7d': generateHistoricalRates(0.79, 7, 0.015),
    '30d': generateHistoricalRates(0.79, 30, 0.02),
    '90d': generateHistoricalRates(0.79, 90, 0.025),
    '1y': generateHistoricalRates(0.79, 365, 0.03),
  },
  'USD-JPY': {
    '7d': generateHistoricalRates(149.5, 7, 1.5),
    '30d': generateHistoricalRates(149.5, 30, 2),
    '90d': generateHistoricalRates(149.5, 90, 2.5),
    '1y': generateHistoricalRates(149.5, 365, 3),
  },
  'EUR-GBP': {
    '7d': generateHistoricalRates(0.86, 7, 0.015),
    '30d': generateHistoricalRates(0.86, 30, 0.02),
    '90d': generateHistoricalRates(0.86, 90, 0.025),
    '1y': generateHistoricalRates(0.86, 365, 0.03),
  },
}

// Helper function to get exchange rate
export const getExchangeRate = (from: string, to: string): number => {
  if (from === to) return 1

  // If from is USD
  if (from === 'USD' && mockExchangeRates.USD[to]) {
    return mockExchangeRates.USD[to]
  }

  // If to is USD
  if (to === 'USD' && mockExchangeRates.USD[from]) {
    return 1 / mockExchangeRates.USD[from]
  }

  // Convert through USD
  if (mockExchangeRates.USD[from] && mockExchangeRates.USD[to]) {
    const fromToUSD = 1 / mockExchangeRates.USD[from]
    const usdToTo = mockExchangeRates.USD[to]
    return fromToUSD * usdToTo
  }

  return 1
}

// Helper function to convert amount
export const convertCurrency = (
  amount: number,
  from: string,
  to: string
): number => {
  const rate = getExchangeRate(from, to)
  return parseFloat((amount * rate).toFixed(2))
}
