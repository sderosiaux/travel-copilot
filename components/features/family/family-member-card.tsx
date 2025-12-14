'use client'

import Link from 'next/link'
import { Card, Avatar, AvatarImage, AvatarFallback, Badge, Button } from '@/components/ui'
import { FileText, Edit, Mail, Phone } from 'lucide-react'
import type { FamilyMember } from '@/types'
import { RelationshipBadge } from './relationship-badge'
import { AgeIndicator } from './age-indicator'
import { SpecialNeedsBadges } from './special-needs-badges'

interface FamilyMemberCardProps {
  member: FamilyMember
}

export function FamilyMemberCard({ member }: FamilyMemberCardProps) {
  const initials = `${member.firstName[0]}${member.lastName[0]}`.toUpperCase()
  const fullName = `${member.firstName} ${member.lastName}`

  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={member.avatar} alt={fullName} />
          <AvatarFallback className="bg-primary-500 text-white text-lg">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <Link
                href={`/family/${member.id}`}
                className="text-lg font-semibold text-text-primary hover:text-primary-500 transition-colors"
              >
                {fullName}
              </Link>
              <div className="flex flex-wrap gap-2 mt-1">
                <RelationshipBadge relationship={member.relationship} />
                <AgeIndicator dateOfBirth={member.dateOfBirth} />
              </div>
            </div>
          </div>

          {(member.email || member.phone) && (
            <div className="space-y-1 mb-3 text-sm text-text-secondary">
              {member.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5" />
                  <span className="truncate">{member.email}</span>
                </div>
              )}
              {member.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5" />
                  <span>{member.phone}</span>
                </div>
              )}
            </div>
          )}

          <SpecialNeedsBadges specialNeeds={member.specialNeeds} className="mb-3" />

          {member.documents && member.documents.length > 0 && (
            <div className="mb-3">
              <Badge variant="success" className="text-xs">
                <FileText className="h-3 w-3 mr-1" />
                {member.documents.length} document{member.documents.length !== 1 ? 's' : ''}
              </Badge>
            </div>
          )}

          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              asChild
            >
              <Link href={`/family/${member.id}`}>
                <Edit className="h-4 w-4 mr-1.5" />
                Edit
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              asChild
            >
              <Link href={`/family/${member.id}?tab=documents`}>
                <FileText className="h-4 w-4 mr-1.5" />
                Documents
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
