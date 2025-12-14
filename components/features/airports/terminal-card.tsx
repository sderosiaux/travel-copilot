'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Building2, Plane, Clock } from 'lucide-react'
import type { Terminal } from '@/types'

interface TerminalCardProps {
  terminal: Terminal
}

export function TerminalCard({ terminal }: TerminalCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Building2 size={24} className="text-primary-500" />
            <CardTitle>{terminal.name}</CardTitle>
          </div>
          <Badge variant="primary">{terminal.id}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="text-sm text-text-tertiary mb-2">Airlines</div>
          <div className="flex flex-wrap gap-2">
            {terminal.airlines.map((airline) => (
              <Badge key={airline} variant="default">
                {airline}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <div className="text-sm text-text-tertiary mb-2">Gates</div>
          <div className="flex items-center gap-2">
            <Plane size={16} className="text-text-tertiary" />
            <div className="text-sm text-text-secondary">
              {Array.isArray(terminal.gates) && terminal.gates.length > 0
                ? terminal.gates.join(', ')
                : 'No gates listed'}
            </div>
          </div>
        </div>

        <div>
          <div className="text-sm text-text-tertiary mb-2">Facilities</div>
          <div className="flex flex-wrap gap-2">
            {terminal.facilities.map((facility) => (
              <Badge key={facility} variant="info">
                {facility}
              </Badge>
            ))}
          </div>
        </div>

        {terminal.walkingTime && terminal.walkingTime.length > 0 && (
          <div className="pt-4 border-t border-border">
            <div className="text-sm text-text-tertiary mb-2">Walking Times</div>
            <div className="space-y-2">
              {terminal.walkingTime.map((time, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm bg-bg-secondary rounded-lg p-2"
                >
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-text-tertiary" />
                    <span className="text-text-secondary">
                      {time.from} → {time.to}
                    </span>
                  </div>
                  <Badge variant="default">{time.minutes} min</Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
