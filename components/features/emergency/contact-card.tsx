'use client'

import { User, Phone, Copy, Trash2 } from 'lucide-react'
import { Card, CardContent, Badge, Button } from '@/components/ui'
import type { EmergencyContact } from '@/types/emergency'

interface ContactCardProps {
  contact: EmergencyContact
  onDelete?: (id: string) => void
}

export function ContactCard({ contact, onDelete }: ContactCardProps) {
  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone)
  }

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'personal':
        return 'bg-primary-500/10 text-primary-500 border-primary-500/20'
      case 'medical':
        return 'bg-success/10 text-success border-success/20'
      case 'legal':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      case 'work':
        return 'bg-warning/10 text-warning border-warning/20'
      case 'insurance':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20'
      default:
        return 'bg-text-secondary/10 text-text-secondary border-text-secondary/20'
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-text-primary">{contact.name}</h4>
                {contact.isPrimary && (
                  <Badge className="bg-primary-500 text-white text-xs">Primary</Badge>
                )}
              </div>
              {contact.relationship && (
                <p className="text-sm text-text-secondary">{contact.relationship}</p>
              )}
              <Badge className={`${getTypeColor(contact.type)} mt-1 text-xs`}>
                {contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}
              </Badge>
            </div>
          </div>
          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-error hover:text-error hover:bg-error/10"
              onClick={() => onDelete(contact.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2 p-2 rounded bg-bg-secondary">
            <div className="flex items-center gap-2 flex-1">
              <Phone className="h-4 w-4 text-text-tertiary" />
              <span className="text-sm font-mono text-text-primary">{contact.phone}</span>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => handleCopyPhone(contact.phone)}
              >
                <Copy className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => handleCall(contact.phone)}
              >
                <Phone className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {contact.phoneSecondary && (
            <div className="flex items-center justify-between gap-2 p-2 rounded bg-bg-secondary">
              <div className="flex items-center gap-2 flex-1">
                <Phone className="h-4 w-4 text-text-tertiary" />
                <span className="text-sm font-mono text-text-primary">
                  {contact.phoneSecondary}
                </span>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => handleCopyPhone(contact.phoneSecondary!)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => handleCall(contact.phoneSecondary!)}
                >
                  <Phone className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )}

          {contact.email && (
            <div className="text-sm">
              <p className="text-text-tertiary">Email</p>
              <p className="text-text-secondary">{contact.email}</p>
            </div>
          )}

          {contact.address && (
            <div className="text-sm">
              <p className="text-text-tertiary">Address</p>
              <p className="text-text-secondary">{contact.address}</p>
            </div>
          )}

          {contact.notes && (
            <div className="pt-2 border-t border-border">
              <p className="text-xs text-text-tertiary italic">{contact.notes}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
