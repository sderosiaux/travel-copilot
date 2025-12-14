'use client'

import { Check } from 'lucide-react'
import { Card } from '@/components/ui'
import { useMode } from '@/lib/hooks/use-mode'
import { cn } from '@/lib/utils'

const MODES = [
  {
    value: 'essential' as const,
    icon: '🎯',
    name: 'Essential',
    description: 'Simplified interface for ease of use',
    features: [
      'Larger text and buttons',
      'Clear visual hierarchy',
      'Reduced complexity',
      'Essential features only',
    ],
  },
  {
    value: 'standard' as const,
    icon: '⚖️',
    name: 'Standard',
    description: 'Balanced experience with all features',
    features: [
      'Full feature set',
      'Comfortable spacing',
      'Standard layouts',
      'All capabilities available',
    ],
  },
  {
    value: 'expert' as const,
    icon: '🚀',
    name: 'Expert',
    description: 'Dense layout for power users',
    features: [
      'Compact interface',
      'Advanced features',
      'More data visible',
      'Power user tools',
    ],
  },
]

export function ModeSwitcher() {
  const { mode, setMode } = useMode()

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-semibold mb-2">Experience Mode</h3>
        <p className="text-sm text-text-secondary">
          Choose how much information and density you prefer in the interface
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {MODES.map((modeOption) => (
          <Card
            key={modeOption.value}
            className={cn(
              'p-4 cursor-pointer transition-all hover:border-primary-500 hover:shadow-md relative',
              mode === modeOption.value
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-md'
                : 'border-border'
            )}
            onClick={() => setMode(modeOption.value)}
          >
            {mode === modeOption.value && (
              <div className="absolute top-3 right-3 h-5 w-5 rounded-full bg-primary-500 flex items-center justify-center">
                <Check className="h-3 w-3 text-white" />
              </div>
            )}

            <div className="text-3xl mb-3">{modeOption.icon}</div>

            <h4 className="font-semibold text-base mb-1">{modeOption.name}</h4>
            <p className="text-sm text-text-secondary mb-4">
              {modeOption.description}
            </p>

            <ul className="space-y-1.5">
              {modeOption.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-xs">
                  <span className="text-primary-500 mt-0.5">✓</span>
                  <span className="text-text-secondary">{feature}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  )
}
