'use client'

import { Trash2, Edit } from 'lucide-react'
import { Badge, Button } from '@/components/ui'
import { useExpenseStore } from '@/lib/store/expense-store'
import type { Expense } from '@/types/expense'

interface ExpenseCardProps {
  expense: Expense
}

const categoryColors: Record<string, string> = {
  accommodation: 'bg-accent-blue/10 text-accent-blue border-accent-blue/20',
  food: 'bg-accent-orange/10 text-accent-orange border-accent-orange/20',
  transport: 'bg-accent-purple/10 text-accent-purple border-accent-purple/20',
  entertainment: 'bg-accent-pink/10 text-accent-pink border-accent-pink/20',
  shopping: 'bg-accent-green/10 text-accent-green border-accent-green/20',
  activities: 'bg-accent-yellow/10 text-accent-yellow border-accent-yellow/20',
  health: 'bg-accent-red/10 text-accent-red border-accent-red/20',
  other: 'bg-text-tertiary/10 text-text-tertiary border-text-tertiary/20',
}

export function ExpenseCard({ expense }: ExpenseCardProps) {
  const { deleteExpense } = useExpenseStore()

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this expense?')) {
      deleteExpense(expense.id)
    }
  }

  return (
    <div className="flex items-start justify-between p-4 rounded-lg border border-border-primary hover:bg-bg-secondary transition-colors">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-medium text-text-primary">{expense.title}</h4>
          <Badge className={categoryColors[expense.category]}>
            {expense.category}
          </Badge>
        </div>
        <div className="text-sm text-text-secondary space-y-1">
          <p>{new Date(expense.date).toLocaleDateString()}</p>
          {expense.location && <p>{expense.location}</p>}
          {expense.notes && <p className="text-text-tertiary">{expense.notes}</p>}
          {expense.splitWith && expense.splitWith.length > 0 && (
            <p className="text-accent-blue">
              Split between {expense.splitWith.length} travelers
            </p>
          )}
        </div>
      </div>
      <div className="flex items-start gap-3">
        <div className="text-right">
          <p className="text-lg font-semibold text-text-primary">
            {expense.currency} {expense.amount.toFixed(2)}
          </p>
          {expense.convertedAmount && expense.convertedCurrency && (
            <p className="text-sm text-text-tertiary">
              {expense.convertedCurrency} {expense.convertedAmount.toFixed(2)}
            </p>
          )}
        </div>
        <Button variant="ghost" size="sm" onClick={handleDelete}>
          <Trash2 className="h-4 w-4 text-accent-red" />
        </Button>
      </div>
    </div>
  )
}
