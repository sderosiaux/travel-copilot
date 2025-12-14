import { Badge } from '@/components/ui'
import { Accessibility, Ear, Eye, Brain, Heart, AlertCircle } from 'lucide-react'
import type { SpecialNeeds } from '@/types'

interface SpecialNeedsBadgesProps {
  specialNeeds?: SpecialNeeds
  className?: string
}

export function SpecialNeedsBadges({ specialNeeds, className }: SpecialNeedsBadgesProps) {
  if (!specialNeeds) return null

  const needs = []

  if (specialNeeds.wheelchair) {
    needs.push({
      icon: Accessibility,
      label: 'Wheelchair',
      variant: 'info' as const,
    })
  }

  if (specialNeeds.hearingAssistance) {
    needs.push({
      icon: Ear,
      label: 'Hearing',
      variant: 'info' as const,
    })
  }

  if (specialNeeds.visualAssistance) {
    needs.push({
      icon: Eye,
      label: 'Visual',
      variant: 'info' as const,
    })
  }

  if (specialNeeds.cognitiveAssistance) {
    needs.push({
      icon: Brain,
      label: 'Cognitive',
      variant: 'info' as const,
    })
  }

  if (specialNeeds.medicalConditions && specialNeeds.medicalConditions.length > 0) {
    needs.push({
      icon: Heart,
      label: 'Medical',
      variant: 'warning' as const,
    })
  }

  if (specialNeeds.allergies && specialNeeds.allergies.length > 0) {
    needs.push({
      icon: AlertCircle,
      label: 'Allergies',
      variant: 'error' as const,
    })
  }

  if (needs.length === 0) return null

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-1.5">
        {needs.map((need) => {
          const Icon = need.icon
          return (
            <Badge key={need.label} variant={need.variant} className="text-xs">
              <Icon className="h-3 w-3 mr-1" />
              {need.label}
            </Badge>
          )
        })}
      </div>
    </div>
  )
}
