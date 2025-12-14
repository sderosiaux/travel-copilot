'use client'

import { useState } from 'react'
import { Button, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Switch } from '@/components/ui'
import type { FamilyMember } from '@/types'

interface FamilyMemberFormProps {
  member?: FamilyMember
  onSubmit: (data: Partial<FamilyMember>) => void
  onCancel?: () => void
}

type RelationshipType = 'self' | 'spouse' | 'partner' | 'child' | 'parent' | 'sibling' | 'other'

export function FamilyMemberForm({ member, onSubmit, onCancel }: FamilyMemberFormProps) {
  const [formData, setFormData] = useState<{
    firstName: string
    lastName: string
    relationship: RelationshipType
    dateOfBirth: string
    email: string
    phone: string
    seatPosition: string
    mealPreference: string
    requiresSupervision: boolean
    wheelchair: boolean
    hearingAssistance: boolean
    visualAssistance: boolean
    cognitiveAssistance: boolean
  }>({
    firstName: member?.firstName || '',
    lastName: member?.lastName || '',
    relationship: member?.relationship || 'other',
    dateOfBirth: member?.dateOfBirth || '',
    email: member?.email || '',
    phone: member?.phone || '',
    seatPosition: member?.preferences?.seatPosition || 'no_preference',
    mealPreference: member?.preferences?.mealPreference || 'regular',
    requiresSupervision: member?.preferences?.requiresSupervision || false,
    wheelchair: member?.specialNeeds?.wheelchair || false,
    hearingAssistance: member?.specialNeeds?.hearingAssistance || false,
    visualAssistance: member?.specialNeeds?.visualAssistance || false,
    cognitiveAssistance: member?.specialNeeds?.cognitiveAssistance || false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const submitData: Partial<FamilyMember> = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      relationship: formData.relationship as FamilyMember['relationship'],
      dateOfBirth: formData.dateOfBirth || undefined,
      email: formData.email || undefined,
      phone: formData.phone || undefined,
      preferences: {
        seatPosition: formData.seatPosition as any,
        mealPreference: formData.mealPreference as any,
        requiresSupervision: formData.requiresSupervision,
      },
      specialNeeds: {
        wheelchair: formData.wheelchair,
        hearingAssistance: formData.hearingAssistance,
        visualAssistance: formData.visualAssistance,
        cognitiveAssistance: formData.cognitiveAssistance,
      },
    }

    onSubmit(submitData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="relationship">Relationship *</Label>
            <Select
              value={formData.relationship}
              onValueChange={(value) => setFormData({ ...formData, relationship: value as RelationshipType })}
            >
              <SelectTrigger id="relationship">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spouse">Spouse</SelectItem>
                <SelectItem value="partner">Partner</SelectItem>
                <SelectItem value="child">Child</SelectItem>
                <SelectItem value="parent">Parent</SelectItem>
                <SelectItem value="sibling">Sibling</SelectItem>
                <SelectItem value="other">Other Family</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">Travel Preferences</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="seatPosition">Seat Preference</Label>
            <Select
              value={formData.seatPosition}
              onValueChange={(value) => setFormData({ ...formData, seatPosition: value })}
            >
              <SelectTrigger id="seatPosition">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="window">Window</SelectItem>
                <SelectItem value="middle">Middle</SelectItem>
                <SelectItem value="aisle">Aisle</SelectItem>
                <SelectItem value="no_preference">No Preference</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="mealPreference">Meal Preference</Label>
            <Select
              value={formData.mealPreference}
              onValueChange={(value) => setFormData({ ...formData, mealPreference: value })}
            >
              <SelectTrigger id="mealPreference">
                <SelectValue />
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

        <div className="flex items-center justify-between p-4 bg-bg-secondary rounded-lg">
          <Label htmlFor="requiresSupervision" className="cursor-pointer">
            Requires Supervision (for children)
          </Label>
          <Switch
            id="requiresSupervision"
            checked={formData.requiresSupervision}
            onCheckedChange={(checked) => setFormData({ ...formData, requiresSupervision: checked })}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">Accessibility Needs</h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-bg-secondary rounded-lg">
            <Label htmlFor="wheelchair" className="cursor-pointer">
              Wheelchair Assistance
            </Label>
            <Switch
              id="wheelchair"
              checked={formData.wheelchair}
              onCheckedChange={(checked) => setFormData({ ...formData, wheelchair: checked })}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-bg-secondary rounded-lg">
            <Label htmlFor="hearingAssistance" className="cursor-pointer">
              Hearing Assistance
            </Label>
            <Switch
              id="hearingAssistance"
              checked={formData.hearingAssistance}
              onCheckedChange={(checked) => setFormData({ ...formData, hearingAssistance: checked })}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-bg-secondary rounded-lg">
            <Label htmlFor="visualAssistance" className="cursor-pointer">
              Visual Assistance
            </Label>
            <Switch
              id="visualAssistance"
              checked={formData.visualAssistance}
              onCheckedChange={(checked) => setFormData({ ...formData, visualAssistance: checked })}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-bg-secondary rounded-lg">
            <Label htmlFor="cognitiveAssistance" className="cursor-pointer">
              Cognitive Assistance
            </Label>
            <Switch
              id="cognitiveAssistance"
              checked={formData.cognitiveAssistance}
              onCheckedChange={(checked) => setFormData({ ...formData, cognitiveAssistance: checked })}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" variant="primary">
          {member ? 'Update Member' : 'Add Member'}
        </Button>
      </div>
    </form>
  )
}
