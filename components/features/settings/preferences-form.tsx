'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import {
  Label,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Button,
  Badge,
  Input,
} from '@/components/ui'
import { useUserStore } from '@/lib/store/user-store'
import type { UserPreferences } from '@/types'

const AIRLINES = [
  { code: 'BA', name: 'British Airways' },
  { code: 'AA', name: 'American Airlines' },
  { code: 'UA', name: 'United Airlines' },
  { code: 'DL', name: 'Delta Air Lines' },
  { code: 'QF', name: 'Qantas' },
  { code: 'LH', name: 'Lufthansa' },
  { code: 'AF', name: 'Air France' },
  { code: 'KL', name: 'KLM' },
  { code: 'NH', name: 'ANA' },
  { code: 'SQ', name: 'Singapore Airlines' },
]

export function PreferencesForm() {
  const user = useUserStore((state) => state.user)
  const updatePreferences = useUserStore((state) => state.updatePreferences)

  const [prefs, setPrefs] = useState<Partial<UserPreferences>>(
    user?.preferences || {}
  )
  const [airlineInput, setAirlineInput] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (user?.preferences) {
      setPrefs(user.preferences)
    }
  }, [user])

  const handleChange = (field: keyof UserPreferences, value: any) => {
    const newPrefs = { ...prefs, [field]: value }
    setPrefs(newPrefs)
    updatePreferences({ [field]: value })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const addPreferredAirline = () => {
    if (airlineInput && !prefs.preferredAirlines?.includes(airlineInput)) {
      const newAirlines = [...(prefs.preferredAirlines || []), airlineInput]
      handleChange('preferredAirlines', newAirlines)
      setAirlineInput('')
    }
  }

  const removePreferredAirline = (code: string) => {
    const newAirlines = prefs.preferredAirlines?.filter((a) => a !== code) || []
    handleChange('preferredAirlines', newAirlines)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label className="text-base mb-3 block">Seat Position</Label>
          <RadioGroup
            value={prefs.seatPosition}
            onValueChange={(value) =>
              handleChange('seatPosition', value as any)
            }
            className="grid grid-cols-4 gap-2"
          >
            {[
              { value: 'window', label: 'Window' },
              { value: 'middle', label: 'Middle' },
              { value: 'aisle', label: 'Aisle' },
              { value: 'no_preference', label: 'No Preference' },
            ].map((option) => (
              <Label
                key={option.value}
                htmlFor={`seat-${option.value}`}
                className="flex items-center gap-2 px-4 py-3 border border-border rounded-lg cursor-pointer hover:bg-bg-secondary transition-colors"
              >
                <RadioGroupItem
                  id={`seat-${option.value}`}
                  value={option.value}
                />
                <span className="text-sm">{option.label}</span>
              </Label>
            ))}
          </RadioGroup>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cabinClass">Cabin Class</Label>
            <Select
              value={prefs.cabinClass}
              onValueChange={(value) => handleChange('cabinClass', value as any)}
            >
              <SelectTrigger id="cabinClass">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="economy">Economy</SelectItem>
                <SelectItem value="premium_economy">Premium Economy</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="first">First Class</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mealPreference">Meal Preference</Label>
            <Select
              value={prefs.mealPreference}
              onValueChange={(value) => handleChange('mealPreference', value as any)}
            >
              <SelectTrigger id="mealPreference">
                <SelectValue placeholder="Select meal preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="regular">Regular</SelectItem>
                <SelectItem value="vegetarian">Vegetarian</SelectItem>
                <SelectItem value="vegan">Vegan</SelectItem>
                <SelectItem value="halal">Halal</SelectItem>
                <SelectItem value="kosher">Kosher</SelectItem>
                <SelectItem value="gluten_free">Gluten Free</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Preferred Airlines</Label>
          <div className="flex gap-2">
            <Select value={airlineInput} onValueChange={setAirlineInput}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select airline to add" />
              </SelectTrigger>
              <SelectContent>
                {AIRLINES.map((airline) => (
                  <SelectItem key={airline.code} value={airline.code}>
                    {airline.code} - {airline.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={addPreferredAirline} disabled={!airlineInput}>
              Add
            </Button>
          </div>
          {prefs.preferredAirlines && prefs.preferredAirlines.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {prefs.preferredAirlines.map((code) => (
                <Badge key={code} variant="default" className="gap-1">
                  {code}
                  <button
                    onClick={() => removePreferredAirline(code)}
                    className="ml-1 hover:text-error"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-3 pt-4 border-t border-border">
          <Label className="text-base">Accessibility Needs</Label>
          <div className="space-y-2">
            <Label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={prefs.requiresWheelchair}
                onChange={(e) =>
                  handleChange('requiresWheelchair', e.target.checked)
                }
                className="h-4 w-4 rounded border-border text-primary-500 focus:ring-primary-500"
              />
              <span className="text-sm">Wheelchair assistance</span>
            </Label>
            <Label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={prefs.requiresHearingAssistance}
                onChange={(e) =>
                  handleChange('requiresHearingAssistance', e.target.checked)
                }
                className="h-4 w-4 rounded border-border text-primary-500 focus:ring-primary-500"
              />
              <span className="text-sm">Hearing assistance</span>
            </Label>
            <Label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={prefs.requiresVisualAssistance}
                onChange={(e) =>
                  handleChange('requiresVisualAssistance', e.target.checked)
                }
                className="h-4 w-4 rounded border-border text-primary-500 focus:ring-primary-500"
              />
              <span className="text-sm">Visual assistance</span>
            </Label>
          </div>
        </div>
      </div>

      {saved && (
        <div className="text-sm text-success animate-in fade-in duration-200">
          Preferences saved automatically
        </div>
      )}
    </div>
  )
}
