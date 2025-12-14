'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { SetupInstruction } from '@/types/sim'
import { Info } from 'lucide-react'

interface SetupInstructionsProps {
  instructions: SetupInstruction[]
}

export function SetupInstructions({ instructions }: SetupInstructionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-text-primary">Setup Instructions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {instructions.map((instruction) => (
            <div key={instruction.step} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 font-semibold">
                  {instruction.step}
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-text-primary mb-1">
                  {instruction.title}
                </h4>
                <p className="text-sm text-text-secondary mb-2">
                  {instruction.description}
                </p>
                {instruction.note && (
                  <div className="flex gap-2 p-2 bg-primary-50 dark:bg-primary-900/20 rounded text-xs text-primary-700 dark:text-primary-400">
                    <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
                    <span>{instruction.note}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
