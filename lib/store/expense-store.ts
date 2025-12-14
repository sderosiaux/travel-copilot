import { create } from 'zustand'
import type { Expense, TripBudget, ExpenseCategory } from '@/types/expense'
import { convertCurrency } from '@/data/currency'

interface ExpenseFilters {
  tripId?: string
  category?: ExpenseCategory[]
  dateRange?: {
    start: string
    end: string
  }
  minAmount?: number
  maxAmount?: number
}

type SortOption = 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc' | 'category'

interface ExpenseState {
  expenses: Expense[]
  budgets: Record<string, TripBudget>
  currentTripId: string | null
  filters: ExpenseFilters
  sortBy: SortOption
  isLoading: boolean
  error: string | null

  // Actions
  setExpenses: (expenses: Expense[]) => void
  addExpense: (expense: Expense) => void
  updateExpense: (expenseId: string, updates: Partial<Expense>) => void
  deleteExpense: (expenseId: string) => void
  setBudgets: (budgets: Record<string, TripBudget>) => void
  updateBudget: (tripId: string, budget: Partial<TripBudget>) => void
  setCurrentTripId: (tripId: string | null) => void
  setFilters: (filters: ExpenseFilters) => void
  clearFilters: () => void
  setSortBy: (sortBy: SortOption) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void

  // Computed
  getExpensesByTrip: (tripId: string) => Expense[]
  getTripBudget: (tripId: string) => TripBudget | null
  getFilteredExpenses: () => Expense[]
  getSortedExpenses: (expenses: Expense[]) => Expense[]
  getCategoryTotal: (tripId: string, category: ExpenseCategory) => number
  getTripTotal: (tripId: string) => number
  getBudgetStatus: (tripId: string) => {
    percentage: number
    status: 'good' | 'warning' | 'over'
  }
  exportExpenseReport: (tripId: string) => string
}

export const useExpenseStore = create<ExpenseState>((set, get) => ({
  expenses: [],
  budgets: {},
  currentTripId: null,
  filters: {},
  sortBy: 'date-desc',
  isLoading: false,
  error: null,

  // Actions
  setExpenses: (expenses) => set({ expenses, isLoading: false, error: null }),

  addExpense: (expense) =>
    set((state) => {
      const newExpenses = [...state.expenses, expense]

      // Update budget if exists
      const budget = state.budgets[expense.tripId]
      if (budget) {
        const categoryBudget = budget.categoryBudgets.find(
          (cb) => cb.category === expense.category
        )
        if (categoryBudget) {
          categoryBudget.spent += expense.amount
          categoryBudget.remaining -= expense.amount
        }
        budget.spent += expense.amount
        budget.remaining -= expense.amount
        budget.lastUpdated = new Date().toISOString()
      }

      return { expenses: newExpenses, budgets: { ...state.budgets } }
    }),

  updateExpense: (expenseId, updates) =>
    set((state) => ({
      expenses: state.expenses.map((expense) =>
        expense.id === expenseId
          ? { ...expense, ...updates, updatedAt: new Date().toISOString() }
          : expense
      ),
    })),

  deleteExpense: (expenseId) =>
    set((state) => {
      const expense = state.expenses.find((e) => e.id === expenseId)
      if (!expense) return state

      // Update budget if exists
      const budget = state.budgets[expense.tripId]
      if (budget) {
        const categoryBudget = budget.categoryBudgets.find(
          (cb) => cb.category === expense.category
        )
        if (categoryBudget) {
          categoryBudget.spent -= expense.amount
          categoryBudget.remaining += expense.amount
        }
        budget.spent -= expense.amount
        budget.remaining += expense.amount
        budget.lastUpdated = new Date().toISOString()
      }

      return {
        expenses: state.expenses.filter((e) => e.id !== expenseId),
        budgets: { ...state.budgets },
      }
    }),

  setBudgets: (budgets) => set({ budgets }),

  updateBudget: (tripId, budgetUpdates) =>
    set((state) => ({
      budgets: {
        ...state.budgets,
        [tripId]: {
          ...state.budgets[tripId],
          ...budgetUpdates,
          lastUpdated: new Date().toISOString(),
        },
      },
    })),

  setCurrentTripId: (tripId) => set({ currentTripId: tripId }),

  setFilters: (filters) => set({ filters }),

  clearFilters: () => set({ filters: {} }),

  setSortBy: (sortBy) => set({ sortBy }),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  // Computed
  getExpensesByTrip: (tripId) => {
    const { expenses } = get()
    return expenses.filter((expense) => expense.tripId === tripId)
  },

  getTripBudget: (tripId) => {
    const { budgets } = get()
    return budgets[tripId] || null
  },

  getFilteredExpenses: () => {
    const { expenses, filters } = get()

    return expenses.filter((expense) => {
      // Filter by trip
      if (filters.tripId && expense.tripId !== filters.tripId) {
        return false
      }

      // Filter by category
      if (filters.category && filters.category.length > 0) {
        if (!filters.category.includes(expense.category)) {
          return false
        }
      }

      // Filter by date range
      if (filters.dateRange) {
        const expenseDate = new Date(expense.date)
        const filterStart = new Date(filters.dateRange.start)
        const filterEnd = new Date(filters.dateRange.end)

        if (expenseDate < filterStart || expenseDate > filterEnd) {
          return false
        }
      }

      // Filter by amount range
      if (filters.minAmount !== undefined && expense.amount < filters.minAmount) {
        return false
      }

      if (filters.maxAmount !== undefined && expense.amount > filters.maxAmount) {
        return false
      }

      return true
    })
  },

  getSortedExpenses: (expenses) => {
    const { sortBy } = get()
    const sorted = [...expenses]

    switch (sortBy) {
      case 'date-desc':
        return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      case 'date-asc':
        return sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      case 'amount-desc':
        return sorted.sort((a, b) => b.amount - a.amount)
      case 'amount-asc':
        return sorted.sort((a, b) => a.amount - b.amount)
      case 'category':
        return sorted.sort((a, b) => a.category.localeCompare(b.category))
      default:
        return sorted
    }
  },

  getCategoryTotal: (tripId, category) => {
    const expenses = get().getExpensesByTrip(tripId)
    return expenses
      .filter((expense) => expense.category === category)
      .reduce((total, expense) => total + expense.amount, 0)
  },

  getTripTotal: (tripId) => {
    const expenses = get().getExpensesByTrip(tripId)
    return expenses.reduce((total, expense) => total + expense.amount, 0)
  },

  getBudgetStatus: (tripId) => {
    const budget = get().getTripBudget(tripId)
    if (!budget) {
      return { percentage: 0, status: 'good' as const }
    }

    const percentage = (budget.spent / budget.totalBudget) * 100

    if (percentage >= 100) {
      return { percentage, status: 'over' as const }
    } else if (percentage >= 80) {
      return { percentage, status: 'warning' as const }
    } else {
      return { percentage, status: 'good' as const }
    }
  },

  exportExpenseReport: (tripId) => {
    const expenses = get().getExpensesByTrip(tripId)
    const budget = get().getTripBudget(tripId)

    let report = 'Expense Report\n\n'
    report += `Trip ID: ${tripId}\n`
    report += `Generated: ${new Date().toISOString()}\n\n`

    if (budget) {
      report += `Budget: ${budget.currency} ${budget.totalBudget.toFixed(2)}\n`
      report += `Spent: ${budget.currency} ${budget.spent.toFixed(2)}\n`
      report += `Remaining: ${budget.currency} ${budget.remaining.toFixed(2)}\n\n`
    }

    report += 'Expenses:\n'
    report += '---\n'

    expenses.forEach((expense) => {
      report += `${expense.date} - ${expense.title}\n`
      report += `  Category: ${expense.category}\n`
      report += `  Amount: ${expense.currency} ${expense.amount.toFixed(2)}\n`
      if (expense.notes) {
        report += `  Notes: ${expense.notes}\n`
      }
      report += '\n'
    })

    return report
  },
}))
