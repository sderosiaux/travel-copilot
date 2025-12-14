'use client'

import { TerminalCard } from './terminal-card'
import type { Terminal } from '@/types'

interface TerminalListProps {
  terminals: Terminal[]
}

export function TerminalList({ terminals }: TerminalListProps) {
  if (terminals.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary">No terminal information available</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {terminals.map((terminal) => (
        <TerminalCard key={terminal.id} terminal={terminal} />
      ))}
    </div>
  )
}
