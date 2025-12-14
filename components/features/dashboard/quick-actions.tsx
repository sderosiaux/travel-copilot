'use client'

import Link from 'next/link'
import { PlusCircle, FileText, Plane, Users } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export interface QuickAction {
  id: string
  label: string
  description: string
  icon: React.ReactNode
  href: string
  color: string
}

const defaultActions: QuickAction[] = [
  {
    id: 'create-trip',
    label: 'Create Trip',
    description: 'Plan your next adventure',
    icon: <PlusCircle size={24} />,
    href: '/trips/new',
    color: 'bg-primary-50 text-primary-500 hover:bg-primary-100',
  },
  {
    id: 'add-document',
    label: 'Add Document',
    description: 'Upload passport or visa',
    icon: <FileText size={24} />,
    href: '/documents/new',
    color: 'bg-success-light/20 text-success hover:bg-success-light/30',
  },
  {
    id: 'track-flight',
    label: 'Track Flight',
    description: 'Monitor flight status',
    icon: <Plane size={24} />,
    href: '/flights/track',
    color: 'bg-info-light/20 text-info hover:bg-info-light/30',
  },
  {
    id: 'view-family',
    label: 'Family',
    description: 'Manage travel companions',
    icon: <Users size={24} />,
    href: '/family',
    color: 'bg-warning-light/20 text-warning hover:bg-warning-light/30',
  },
]

export interface QuickActionsProps {
  actions?: QuickAction[]
}

export function QuickActions({ actions = defaultActions }: QuickActionsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-text-primary">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {actions.map((action) => (
          <Link key={action.id} href={action.href}>
            <Card
              variant="interactive"
              padding="md"
              className="h-full flex flex-col items-center justify-center text-center space-y-3"
            >
              <div
                className={cn(
                  'flex h-14 w-14 items-center justify-center rounded-full transition-colors',
                  action.color
                )}
              >
                {action.icon}
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">{action.label}</h3>
                <p className="text-xs text-text-secondary">{action.description}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
