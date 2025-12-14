export type ExpenseCategory =
  | 'accommodation'
  | 'food'
  | 'transport'
  | 'entertainment'
  | 'shopping'
  | 'activities'
  | 'health'
  | 'other'

export interface Expense {
  id: string
  tripId: string
  userId: string
  category: ExpenseCategory
  title: string
  amount: number
  currency: string
  date: string
  location?: string
  notes?: string
  receipt?: string
  tags?: string[]
  splitWith?: ExpenseSplit[]
  convertedAmount?: number
  convertedCurrency?: string
  createdAt: string
  updatedAt: string
}

export interface ExpenseSplit {
  userId: string
  amount: number
  percentage: number
  isPaid: boolean
}

export interface TripBudget {
  tripId: string
  totalBudget: number
  currency: string
  spent: number
  remaining: number
  categoryBudgets: CategoryBudget[]
  lastUpdated: string
}

export interface CategoryBudget {
  category: ExpenseCategory
  allocated: number
  spent: number
  remaining: number
}

export interface ExpenseReport {
  tripId: string
  period: {
    start: string
    end: string
  }
  totalExpenses: number
  currency: string
  categoryBreakdown: CategoryBreakdown[]
  dailyExpenses: DailyExpense[]
  splitSummary: SplitSummary[]
  generatedAt: string
}

export interface CategoryBreakdown {
  category: ExpenseCategory
  total: number
  count: number
  percentage: number
}

export interface DailyExpense {
  date: string
  total: number
  expenses: Expense[]
}

export interface SplitSummary {
  userId: string
  totalPaid: number
  totalOwed: number
  balance: number
}
