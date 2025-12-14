'use client'

import { useState, useEffect } from 'react'
import { Label, Slider, Card } from '@/components/ui'
import { useUserStore } from '@/lib/store/user-store'

const PERSONALITY_EXAMPLES = {
  just_facts: {
    title: 'Just Facts',
    example:
      'Your flight BA123 departs at 10:30 AM from Terminal 5. Gate opens 45 minutes before departure.',
    style: 'Direct and concise information',
  },
  balanced: {
    title: 'Balanced',
    example:
      "Your flight BA123 is scheduled to depart at 10:30 AM from Terminal 5. I'll keep you updated on any changes. Gate opens 45 minutes before departure.",
    style: 'Helpful with context',
  },
  supportive: {
    title: 'Supportive',
    example:
      "Great news! Your flight BA123 is on time for departure at 10:30 AM from Terminal 5. I'll be here to help if anything changes. The gate opens at 9:45 AM, giving you plenty of time. Have a wonderful trip!",
    style: 'Encouraging and detailed',
  },
}

export function CopilotSettings() {
  const user = useUserStore((state) => state.user)
  const updateSettings = useUserStore((state) => state.updateSettings)

  const [personality, setPersonality] = useState<
    'just_facts' | 'balanced' | 'supportive'
  >(user?.settings.copilotPersonality || 'balanced')
  const [sliderValue, setSliderValue] = useState([1])
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (user?.settings.copilotPersonality) {
      const personality = user.settings.copilotPersonality
      setPersonality(personality)
      const value =
        personality === 'just_facts' ? 0 : personality === 'balanced' ? 1 : 2
      setSliderValue([value])
    }
  }, [user])

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value)
    const newPersonality =
      value[0] === 0 ? 'just_facts' : value[0] === 1 ? 'balanced' : 'supportive'
    setPersonality(newPersonality)
    updateSettings({ copilotPersonality: newPersonality })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const currentExample = PERSONALITY_EXAMPLES[personality]

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base mb-2 block">Copilot Personality</Label>
        <p className="text-sm text-text-secondary mb-6">
          Adjust how your AI copilot communicates with you
        </p>

        <div className="space-y-6">
          <div className="px-4">
            <div className="flex justify-between text-xs text-text-secondary mb-2">
              <span>Just Facts</span>
              <span>Balanced</span>
              <span>Supportive</span>
            </div>
            <Slider
              value={sliderValue}
              onValueChange={handleSliderChange}
              min={0}
              max={2}
              step={1}
              className="w-full"
            />
          </div>

          <Card className="p-4 bg-bg-secondary border-border">
            <div className="flex items-start gap-3 mb-3">
              <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center shrink-0">
                <span className="text-white text-xs font-semibold">AI</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-sm">{currentExample.title}</h4>
                  <span className="text-xs text-text-tertiary">
                    {currentExample.style}
                  </span>
                </div>
                <p className="text-sm text-text-primary leading-relaxed">
                  {currentExample.example}
                </p>
              </div>
            </div>
          </Card>

          <div className="bg-bg-secondary border border-border rounded-lg p-4">
            <h4 className="font-semibold text-sm mb-3">Personality Traits</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div
                  className={`h-2 w-2 rounded-full ${
                    personality === 'just_facts'
                      ? 'bg-primary-500'
                      : 'bg-border'
                  }`}
                />
                <span className={personality === 'just_facts' ? 'font-medium' : ''}>
                  Just Facts: Minimal, direct, no fluff
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`h-2 w-2 rounded-full ${
                    personality === 'balanced' ? 'bg-primary-500' : 'bg-border'
                  }`}
                />
                <span className={personality === 'balanced' ? 'font-medium' : ''}>
                  Balanced: Helpful with appropriate context
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`h-2 w-2 rounded-full ${
                    personality === 'supportive'
                      ? 'bg-primary-500'
                      : 'bg-border'
                  }`}
                />
                <span className={personality === 'supportive' ? 'font-medium' : ''}>
                  Supportive: Friendly, encouraging, detailed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {saved && (
        <div className="text-sm text-success animate-in fade-in duration-200">
          Copilot personality updated
        </div>
      )}
    </div>
  )
}
