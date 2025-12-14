'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Button } from '@/components/ui'
import { UserPlus } from 'lucide-react'
import { FamilyMemberForm } from './family-member-form'
import { useFamilyStore } from '@/lib/store/family-store'
import type { FamilyMember } from '@/types'

export function AddMemberDialog() {
  const [open, setOpen] = useState(false)
  const addMember = useFamilyStore((state) => state.addMember)

  const handleSubmit = (data: Partial<FamilyMember>) => {
    const newMember: FamilyMember = {
      id: `family-${Date.now()}`,
      firstName: data.firstName!,
      lastName: data.lastName!,
      relationship: data.relationship!,
      dateOfBirth: data.dateOfBirth,
      email: data.email,
      phone: data.phone,
      documents: [],
      preferences: data.preferences,
      specialNeeds: data.specialNeeds,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    addMember(newMember)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="primary">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Family Member
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Family Member</DialogTitle>
        </DialogHeader>
        <FamilyMemberForm onSubmit={handleSubmit} onCancel={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
