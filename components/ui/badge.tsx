import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-bg-secondary text-text-primary border border-border',
        secondary: 'bg-bg-secondary text-text-secondary border border-border',
        primary: 'bg-primary-500 text-white',
        success: 'bg-success text-white',
        warning: 'bg-warning text-white',
        error: 'bg-error text-white',
        info: 'bg-info text-white',
        // Flight status specific
        on_time: 'bg-success text-white',
        delayed: 'bg-warning text-white',
        cancelled: 'bg-error text-white',
        boarding: 'bg-info text-white',
        arrived: 'bg-success-dark text-white',
        departed: 'bg-primary-600 text-white',
        scheduled: 'bg-bg-secondary text-text-primary border border-border',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
