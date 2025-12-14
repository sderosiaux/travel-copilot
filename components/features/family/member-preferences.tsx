'use client'

import { Card } from '@/components/ui'
import { ArmchairIcon, UtensilsCrossed, Baby } from 'lucide-react'
import type { FamilyMember } from '@/types'

interface MemberPreferencesProps {
  preferences?: FamilyMember['preferences']
}

const seatPositionLabels = {
  window: 'Window',
  middle: 'Middle',
  aisle: 'Aisle',
  no_preference: 'No Preference',
}

const mealPreferenceLabels = {
  regular: 'Regular',
  vegetarian: 'Vegetarian',
  vegan: 'Vegan',
  halal: 'Halal',
  kosher: 'Kosher',
  gluten_free: 'Gluten Free',
}

export function MemberPreferences({ preferences }: MemberPreferencesProps) {
  if (!preferences) {
    return (
      <Card className="p-8 text-center">
        <p className="text-text-secondary">No preferences set for this member.</p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-500">
            <ArmchairIcon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary mb-1">Seat Position</h3>
            <p className="text-text-secondary">
              {preferences.seatPosition
                ? seatPositionLabels[preferences.seatPosition]
                : 'Not specified'}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-500">
            <UtensilsCrossed className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary mb-1">Meal Preference</h3>
            <p className="text-text-secondary">
              {preferences.mealPreference
                ? mealPreferenceLabels[preferences.mealPreference]
                : 'Not specified'}
            </p>
          </div>
        </div>
      </Card>

      {preferences.requiresSupervision && (
        <Card className="p-6 border-warning">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10 text-warning">
              <Baby className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-1">Supervision Required</h3>
              <p className="text-text-secondary">
                This family member requires supervision during travel.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
