'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, MapPin, Navigation2, Clock } from 'lucide-react'
import type { Terminal } from '@/types'

interface GateFinderProps {
  terminals: Terminal[]
}

export function GateFinder({ terminals }: GateFinderProps) {
  const [fromGate, setFromGate] = useState('')
  const [toGate, setToGate] = useState('')
  const [result, setResult] = useState<{
    found: boolean
    fromTerminal?: string
    toTerminal?: string
    walkingTime?: number
    route?: string
  } | null>(null)

  const findGate = (gate: string): { terminal: Terminal; found: boolean } | null => {
    for (const terminal of terminals) {
      const gateFound = terminal.gates.some((g) => {
        if (g.includes('-')) {
          // Handle gate ranges like "A1-A23"
          const [start, end] = g.split('-')
          return gate.toUpperCase() >= start && gate.toUpperCase() <= end
        }
        return g.toUpperCase() === gate.toUpperCase()
      })
      if (gateFound) {
        return { terminal, found: true }
      }
    }
    return null
  }

  const calculateRoute = () => {
    if (!fromGate || !toGate) {
      setResult({ found: false })
      return
    }

    const fromResult = findGate(fromGate)
    const toResult = findGate(toGate)

    if (!fromResult || !toResult) {
      setResult({ found: false })
      return
    }

    const sameTerminal = fromResult.terminal.id === toResult.terminal.id

    if (sameTerminal) {
      // Check if we have walking time within the same terminal
      const walkingTimeEntry = fromResult.terminal.walkingTime?.find(
        (wt) =>
          (wt.from === fromGate && wt.to === toGate) ||
          (wt.from === toGate && wt.to === fromGate)
      )

      setResult({
        found: true,
        fromTerminal: fromResult.terminal.name,
        toTerminal: toResult.terminal.name,
        walkingTime: walkingTimeEntry?.minutes || 5,
        route: `Walk within ${fromResult.terminal.name}`,
      })
    } else {
      // Different terminals - look for inter-terminal walking time
      const walkingTimeEntry = fromResult.terminal.walkingTime?.find(
        (wt) => wt.to === toResult.terminal.id
      )

      setResult({
        found: true,
        fromTerminal: fromResult.terminal.name,
        toTerminal: toResult.terminal.name,
        walkingTime: walkingTimeEntry?.minutes || 20,
        route: `Walk from ${fromResult.terminal.name} to ${toResult.terminal.name}`,
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <MapPin size={24} className="text-primary-500" />
          <CardTitle>Gate-to-Gate Navigation</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-text-primary mb-2 block">
              From Gate
            </label>
            <Input
              placeholder="e.g., A1, B32"
              value={fromGate}
              onChange={(e) => setFromGate(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-text-primary mb-2 block">
              To Gate
            </label>
            <Input
              placeholder="e.g., C52, B48"
              value={toGate}
              onChange={(e) => setToGate(e.target.value)}
            />
          </div>
        </div>

        <Button onClick={calculateRoute} variant="primary" className="w-full">
          <Search size={16} />
          Find Route
        </Button>

        {result && (
          <div className="pt-4 border-t border-border">
            {result.found ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-primary-500 font-medium">
                  <Navigation2 size={18} />
                  <span>Route Found</span>
                </div>

                <div className="bg-primary-50/50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">From:</span>
                    <Badge variant="default">{result.fromTerminal}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">To:</span>
                    <Badge variant="default">{result.toTerminal}</Badge>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-text-tertiary" />
                      <span className="text-sm text-text-secondary">Walking Time:</span>
                    </div>
                    <Badge variant="primary" className="text-base">
                      {result.walkingTime} min
                    </Badge>
                  </div>
                </div>

                <div className="text-sm text-text-secondary bg-bg-secondary rounded-lg p-3">
                  <div className="font-medium text-text-primary mb-1">Directions:</div>
                  {result.route}
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-text-secondary">
                  Could not find one or both gates. Please check the gate numbers and try again.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
