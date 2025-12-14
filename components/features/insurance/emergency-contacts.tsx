'use client'

import { Phone, Copy } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from '@/components/ui'
import type { InsuranceEmergencyContact } from '@/types/insurance'

interface EmergencyContactsProps {
  contacts: InsuranceEmergencyContact[]
}

export function EmergencyContacts({ contacts }: EmergencyContactsProps) {
  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone)
  }

  const getContactTypeColor = (type: string) => {
    switch (type) {
      case 'emergency':
        return 'bg-error/10 text-error border-error/20'
      case 'medical':
        return 'bg-success/10 text-success border-success/20'
      case 'claims':
        return 'bg-primary-500/10 text-primary-500 border-primary-500/20'
      default:
        return 'bg-text-secondary/10 text-text-secondary border-text-secondary/20'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5 text-primary-500" />
          Emergency Contact Numbers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-bg-secondary border border-border hover:border-border-hover transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-text-primary">{contact.name}</h4>
                  <Badge className={`${getContactTypeColor(contact.type)} mt-1`}>
                    {contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-xs text-text-tertiary">UK Number</p>
                    <p className="text-sm font-mono text-text-primary">{contact.phone}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleCopyPhone(contact.phone)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-xs text-text-tertiary">International</p>
                    <p className="text-sm font-mono text-text-primary">
                      {contact.phoneInternational}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleCopyPhone(contact.phoneInternational)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                {contact.email && (
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-text-tertiary">Email</p>
                    <p className="text-sm text-text-secondary">{contact.email}</p>
                  </div>
                )}

                <div className="pt-2">
                  <p className="text-xs text-text-tertiary">
                    Available: <span className="text-text-secondary">{contact.available}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
