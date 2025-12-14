'use client'

import { useState } from 'react'
import { Plus, Download } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui'
import { useExpenseStore } from '@/lib/store/expense-store'
import { ExpenseCard } from './expense-card'
import { AddExpenseDialog } from './add-expense-dialog'
import type { Expense } from '@/types/expense'

interface ExpenseListProps {
  tripId: string
}

export function ExpenseList({ tripId }: ExpenseListProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const { getExpensesByTrip, getSortedExpenses, exportExpenseReport } = useExpenseStore()

  const expenses = getExpensesByTrip(tripId)
  const sortedExpenses = getSortedExpenses(expenses)

  const handleExport = () => {
    const report = exportExpenseReport(tripId)
    const blob = new Blob([report], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `expense-report-${tripId}-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Expenses</CardTitle>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm" onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {sortedExpenses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text-secondary">No expenses yet</p>
              <p className="text-sm text-text-tertiary mt-1">
                Add your first expense to start tracking
              </p>
              <Button
                className="mt-4"
                onClick={() => setIsAddDialogOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {sortedExpenses.map((expense) => (
                <ExpenseCard key={expense.id} expense={expense} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AddExpenseDialog
        tripId={tripId}
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </>
  )
}
