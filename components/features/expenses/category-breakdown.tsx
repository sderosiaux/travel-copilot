'use client'

import { PieChart } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui'
import { useExpenseStore } from '@/lib/store/expense-store'
import type { ExpenseCategory } from '@/types/expense'

interface CategoryBreakdownProps {
  tripId: string
}

const categoryColors: Record<ExpenseCategory, string> = {
  accommodation: 'bg-accent-blue text-accent-blue',
  food: 'bg-accent-orange text-accent-orange',
  transport: 'bg-accent-purple text-accent-purple',
  entertainment: 'bg-accent-pink text-accent-pink',
  shopping: 'bg-accent-green text-accent-green',
  activities: 'bg-accent-yellow text-accent-yellow',
  health: 'bg-accent-red text-accent-red',
  other: 'bg-text-tertiary text-text-tertiary',
}

export function CategoryBreakdown({ tripId }: CategoryBreakdownProps) {
  const { getExpensesByTrip, getCategoryTotal, getTripTotal } = useExpenseStore()

  const expenses = getExpensesByTrip(tripId)
  const total = getTripTotal(tripId)

  if (expenses.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Spending by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <PieChart className="h-12 w-12 mx-auto text-text-tertiary mb-3" />
            <p className="text-text-secondary">No expenses to show</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Calculate category totals and percentages
  const categories = Array.from(new Set(expenses.map((e) => e.category))) as ExpenseCategory[]
  const categoryData = categories
    .map((category) => {
      const categoryTotal = getCategoryTotal(tripId, category)
      const percentage = (categoryTotal / total) * 100
      return {
        category,
        total: categoryTotal,
        percentage,
        count: expenses.filter((e) => e.category === category).length,
      }
    })
    .sort((a, b) => b.total - a.total)

  const currency = expenses[0]?.currency || 'USD'

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Total */}
        <div className="bg-bg-secondary rounded-lg p-4 text-center">
          <p className="text-sm text-text-secondary mb-1">Total Spent</p>
          <p className="text-3xl font-bold text-text-primary">
            {currency} {total.toFixed(2)}
          </p>
        </div>

        {/* Category List */}
        <div className="space-y-3">
          {categoryData.map((item) => {
            const colorClass = categoryColors[item.category]
            return (
              <div
                key={item.category}
                className="flex items-center justify-between p-3 rounded-lg border border-border-primary"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${colorClass.split(' ')[0]}`}
                  />
                  <div>
                    <p className="font-medium text-text-primary capitalize">
                      {item.category}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {item.count} {item.count === 1 ? 'expense' : 'expenses'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-text-primary">
                    {currency} {item.total.toFixed(2)}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {item.percentage.toFixed(1)}%
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Visual Bar Chart */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-text-primary">Distribution</p>
          <div className="flex h-8 rounded-lg overflow-hidden">
            {categoryData.map((item, index) => (
              <div
                key={item.category}
                className={`${categoryColors[item.category].split(' ')[0]}/80`}
                style={{ width: `${item.percentage}%` }}
                title={`${item.category}: ${item.percentage.toFixed(1)}%`}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
