'use client'

import { TrendingUp, TrendingDown, Wallet } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, Progress } from '@/components/ui'
import { useExpenseStore } from '@/lib/store/expense-store'

interface BudgetOverviewProps {
  tripId: string
}

export function BudgetOverview({ tripId }: BudgetOverviewProps) {
  const { getTripBudget, getBudgetStatus } = useExpenseStore()

  const budget = getTripBudget(tripId)
  const status = getBudgetStatus(tripId)

  if (!budget) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Budget</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Wallet className="h-12 w-12 mx-auto text-text-tertiary mb-3" />
            <p className="text-text-secondary">No budget set for this trip</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const progressColor =
    status.status === 'over'
      ? 'bg-accent-red'
      : status.status === 'warning'
        ? 'bg-accent-yellow'
        : 'bg-accent-green'

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Total Budget Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Total Budget</span>
            <span className="font-medium text-text-primary">
              {budget.currency} {budget.totalBudget.toFixed(2)}
            </span>
          </div>
          <Progress value={status.percentage} className={progressColor} />
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">
              {status.percentage.toFixed(1)}% used
            </span>
            <span
              className={`font-medium ${
                status.status === 'over'
                  ? 'text-accent-red'
                  : status.status === 'warning'
                    ? 'text-accent-yellow'
                    : 'text-accent-green'
              }`}
            >
              {status.status === 'over' ? 'Over Budget' : 'On Track'}
            </span>
          </div>
        </div>

        {/* Spent vs Remaining */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-bg-secondary rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="h-4 w-4 text-accent-red" />
              <p className="text-sm text-text-secondary">Spent</p>
            </div>
            <p className="text-2xl font-semibold text-text-primary">
              {budget.currency} {budget.spent.toFixed(2)}
            </p>
          </div>
          <div className="bg-bg-secondary rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-accent-green" />
              <p className="text-sm text-text-secondary">Remaining</p>
            </div>
            <p className="text-2xl font-semibold text-text-primary">
              {budget.currency} {budget.remaining.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Category Budgets */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-text-primary">By Category</h4>
          {budget.categoryBudgets.map((category) => {
            const categoryPercent = (category.spent / category.allocated) * 100
            const categoryColor =
              categoryPercent >= 100
                ? 'bg-accent-red'
                : categoryPercent >= 80
                  ? 'bg-accent-yellow'
                  : 'bg-accent-green'

            return (
              <div key={category.category} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-text-primary capitalize">
                    {category.category}
                  </span>
                  <span className="text-text-secondary">
                    {budget.currency} {category.spent.toFixed(2)} /{' '}
                    {category.allocated.toFixed(2)}
                  </span>
                </div>
                <Progress value={categoryPercent} className={categoryColor} />
              </div>
            )
          })}
        </div>

        {/* Last Updated */}
        <p className="text-xs text-text-tertiary text-center">
          Last updated: {new Date(budget.lastUpdated).toLocaleString()}
        </p>
      </CardContent>
    </Card>
  )
}
