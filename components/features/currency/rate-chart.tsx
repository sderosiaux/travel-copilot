'use client'

import { TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, Tabs, TabsList, TabsTrigger } from '@/components/ui'
import { useCurrencyStore } from '@/lib/store/currency-store'
import { mockHistoricalRates } from '@/data/currency'

export function RateChart() {
  const { fromCurrency, toCurrency, chartPeriod, setChartPeriod } = useCurrencyStore()

  const chartKey = `${fromCurrency}-${toCurrency}`
  const historicalData = mockHistoricalRates[chartKey as keyof typeof mockHistoricalRates]

  if (!historicalData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Historical Rates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-text-secondary">
              No historical data available for {fromCurrency}/{toCurrency}
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const data = historicalData[chartPeriod]
  const firstRate = data[0].rate
  const lastRate = data[data.length - 1].rate
  const change = lastRate - firstRate
  const changePercent = (change / firstRate) * 100
  const isPositive = change > 0

  // Simple sparkline visualization
  const min = Math.min(...data.map((d) => d.rate))
  const max = Math.max(...data.map((d) => d.rate))
  const range = max - min

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Historical Rates</CardTitle>
          <Tabs value={chartPeriod} onValueChange={(v) => setChartPeriod(v as any)}>
            <TabsList>
              <TabsTrigger value="7d">7D</TabsTrigger>
              <TabsTrigger value="30d">30D</TabsTrigger>
              <TabsTrigger value="90d">90D</TabsTrigger>
              <TabsTrigger value="1y">1Y</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Rate change indicator */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-secondary">
              {fromCurrency} to {toCurrency}
            </p>
            <p className="text-2xl font-semibold text-text-primary">
              {lastRate.toFixed(4)}
            </p>
          </div>
          <div className={`flex items-center gap-1 ${isPositive ? 'text-accent-green' : 'text-accent-red'}`}>
            {isPositive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span className="font-semibold">
              {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
            </span>
          </div>
        </div>

        {/* Simple chart visualization */}
        <div className="relative h-40 bg-bg-secondary rounded-lg p-4">
          <svg width="100%" height="100%" className="overflow-visible">
            <polyline
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={isPositive ? 'text-accent-green' : 'text-accent-red'}
              points={data
                .map((point, index) => {
                  const x = (index / (data.length - 1)) * 100
                  const y = 100 - ((point.rate - min) / range) * 100
                  return `${x}%,${y}%`
                })
                .join(' ')}
            />
          </svg>
        </div>

        {/* Date range */}
        <div className="flex justify-between text-xs text-text-tertiary">
          <span>{new Date(data[0].date).toLocaleDateString()}</span>
          <span>{new Date(data[data.length - 1].date).toLocaleDateString()}</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border-primary">
          <div>
            <p className="text-xs text-text-secondary">High</p>
            <p className="font-semibold text-text-primary">{max.toFixed(4)}</p>
          </div>
          <div>
            <p className="text-xs text-text-secondary">Low</p>
            <p className="font-semibold text-text-primary">{min.toFixed(4)}</p>
          </div>
          <div>
            <p className="text-xs text-text-secondary">Average</p>
            <p className="font-semibold text-text-primary">
              {(data.reduce((sum, d) => sum + d.rate, 0) / data.length).toFixed(4)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
