'use client'

import { useState, useEffect } from 'react'
import { Camera } from 'lucide-react'
import { Button, Input, Label, Avatar, AvatarFallback, AvatarImage } from '@/components/ui'
import { useUserStore } from '@/lib/store/user-store'
import type { User } from '@/types'

export function ProfileForm() {
  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth || '',
    nationality: user?.nationality || '',
  })

  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth || '',
        nationality: user.nationality || '',
      })
    }
  }, [user])

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setSaved(false)
  }

  const handleSave = () => {
    if (user) {
      setUser({
        ...user,
        ...formData,
        updatedAt: new Date().toISOString(),
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
  }

  const getInitials = () => {
    if (!user) return '??'
    return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <div className="relative">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="bg-primary-500 text-white text-2xl">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
          <Button
            size="icon"
            variant="secondary"
            className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
            title="Upload avatar"
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Profile Picture</h3>
          <p className="text-sm text-text-secondary">
            Upload a photo to personalize your profile
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleChange('dateOfBirth', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nationality">Nationality</Label>
          <Input
            id="nationality"
            value={formData.nationality}
            onChange={(e) => handleChange('nationality', e.target.value)}
            placeholder="e.g., GB, US"
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-4">
        {saved && (
          <span className="text-sm text-success animate-in fade-in duration-200">
            Changes saved successfully
          </span>
        )}
        <Button onClick={handleSave} className="ml-auto">
          Save Changes
        </Button>
      </div>
    </div>
  )
}
