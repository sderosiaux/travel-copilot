'use client'

import { PhoneCall, Shield, User, Building2, Heart } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui'
import type { QuickDialEntry } from '@/types/emergency'

interface QuickDialProps {
  entries: QuickDialEntry[]
}

export function QuickDial({ entries }: QuickDialProps) {
  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'emergency':
        return Shield
      case 'personal':
        return User
      case 'embassy':
        return Building2
      case 'medical':
        return Heart
      case 'insurance':
        return Shield
      default:
        return PhoneCall
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'emergency':
        return 'bg-error/10 text-error border-error/20'
      case 'personal':
        return 'bg-primary-500/10 text-primary-500 border-primary-500/20'
      case 'embassy':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      case 'medical':
        return 'bg-success/10 text-success border-success/20'
      case 'insurance':
        return 'bg-warning/10 text-warning border-warning/20'
      default:
        return 'bg-text-secondary/10 text-text-secondary border-text-secondary/20'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PhoneCall className="h-5 w-5 text-primary-500" />
          Quick Dial
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {entries.map((entry) => {
            const Icon = getIcon(entry.type)
            return (
              <Button
                key={entry.id}
                variant="secondary"
                className={`h-auto p-4 flex items-start justify-between hover:bg-bg-secondary ${getTypeColor(
                  entry.type
                )}`}
                onClick={() => handleCall(entry.number)}
              >
                <div className="flex items-start gap-3 text-left flex-1">
                  <div
                    className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getTypeColor(
                      entry.type
                    )}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-text-primary">{entry.label}</h4>
                    <p className="text-xs font-mono text-text-secondary mt-1 truncate">
                      {entry.number}
                    </p>
                    {entry.description && (
                      <p className="text-xs text-text-tertiary mt-1 line-clamp-2">
                        {entry.description}
                      </p>
                    )}
                  </div>
                </div>
                <PhoneCall className="h-4 w-4 flex-shrink-0 ml-2" />
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
