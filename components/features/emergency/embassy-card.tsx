'use client'

import { Building2, Phone, Globe, MapPin, Copy, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from '@/components/ui'
import type { Embassy } from '@/types/emergency'

interface EmbassyCardProps {
  embassy: Embassy
}

export function EmbassyCard({ embassy }: EmbassyCardProps) {
  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone)
  }

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`
  }

  const handleOpenWebsite = () => {
    window.open(embassy.website, '_blank')
  }

  const handleOpenMap = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${embassy.location.latitude},${embassy.location.longitude}`
    window.open(url, '_blank')
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'embassy':
        return 'bg-primary-500/10 text-primary-500 border-primary-500/20'
      case 'consulate':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      case 'high_commission':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20'
      default:
        return 'bg-text-secondary/10 text-text-secondary border-text-secondary/20'
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="h-12 w-12 rounded-lg bg-primary-500/10 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-primary-500" />
            </div>
            <div>
              <CardTitle>{embassy.name}</CardTitle>
              <p className="text-sm text-text-secondary mt-1">{embassy.city}</p>
            </div>
          </div>
          <Badge className={getTypeColor(embassy.type)}>
            {embassy.type.replace('_', ' ').charAt(0).toUpperCase() +
              embassy.type.replace('_', ' ').slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <MapPin className="h-4 w-4 text-text-tertiary mt-1 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-text-secondary">{embassy.address}</p>
              <p className="text-sm text-text-secondary">
                {embassy.city}
                {embassy.postalCode && `, ${embassy.postalCode}`}
              </p>
              <Button
                variant="link"
                className="h-auto p-0 text-primary-500 text-sm"
                onClick={handleOpenMap}
              >
                View on map
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-error/10 border border-error/20">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-text-primary flex items-center gap-2">
                <Phone className="h-4 w-4 text-error" />
                Emergency Line
              </h4>
            </div>
            <div className="flex items-center justify-between gap-2">
              <p className="text-xl font-mono font-bold text-error">
                {embassy.emergencyPhone}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleCopyPhone(embassy.emergencyPhone)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 bg-error hover:bg-error/90"
                  onClick={() => handleCall(embassy.emergencyPhone)}
                >
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="text-xs text-text-secondary mt-2">{embassy.emergencyAvailability}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-text-tertiary mb-1">Main Phone</p>
              <div className="flex items-center justify-between gap-2">
                <p className="font-mono text-text-primary text-xs">{embassy.phone}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => handleCopyPhone(embassy.phone)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div>
              <p className="text-text-tertiary mb-1">Email</p>
              <p className="text-text-primary text-xs truncate">{embassy.email}</p>
            </div>
          </div>

          {embassy.services && embassy.services.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-2">Services Offered</h4>
              <div className="flex flex-wrap gap-2">
                {embassy.services.map((service, index) => (
                  <Badge key={index} variant="default" className="text-xs">
                    {service}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2 border-t border-border">
            <h4 className="text-sm font-medium text-text-primary mb-2">Opening Hours</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-text-tertiary">Monday:</span>
                <span className="text-text-secondary">{embassy.openingHours.monday}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-tertiary">Tuesday:</span>
                <span className="text-text-secondary">{embassy.openingHours.tuesday}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-tertiary">Wednesday:</span>
                <span className="text-text-secondary">{embassy.openingHours.wednesday}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-tertiary">Thursday:</span>
                <span className="text-text-secondary">{embassy.openingHours.thursday}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-tertiary">Friday:</span>
                <span className="text-text-secondary">{embassy.openingHours.friday}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-tertiary">Weekend:</span>
                <span className="text-text-secondary">
                  {embassy.openingHours.saturday === embassy.openingHours.sunday
                    ? embassy.openingHours.saturday
                    : `${embassy.openingHours.saturday}, ${embassy.openingHours.sunday}`}
                </span>
              </div>
            </div>
          </div>

          {embassy.notes && embassy.notes.length > 0 && (
            <div className="pt-2 border-t border-border">
              <ul className="space-y-1">
                {embassy.notes.map((note, index) => (
                  <li key={index} className="text-xs text-text-secondary flex items-start gap-2">
                    <span className="text-primary-500 mt-1">•</span>
                    <span className="flex-1">{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Button variant="secondary" className="w-full" onClick={handleOpenWebsite}>
            <Globe className="h-4 w-4 mr-2" />
            Visit Website
            <ExternalLink className="h-3 w-3 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
