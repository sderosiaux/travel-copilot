'use client'

import { useState } from 'react'
import { TripCard } from '@/types/social'
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from '@/components/ui'
import { Share2, Copy, CheckCircle2 } from 'lucide-react'

interface TripCardGeneratorProps {
  tripCard: TripCard
  onShare?: (platform: string) => void
}

export function TripCardGenerator({ tripCard, onShare }: TripCardGeneratorProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    const url = `https://travelcopilot.app/share/card/${tripCard.id}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="overflow-hidden">
      <div
        className="p-8 text-center"
        style={{
          backgroundColor: tripCard.backgroundColor,
          color: tripCard.textColor,
        }}
      >
        <h2 className="text-2xl font-bold mb-2">{tripCard.title}</h2>
        <p className="text-lg opacity-90 mb-4">{tripCard.destination}</p>

        <div className="flex justify-center gap-4 text-sm opacity-90 mb-6">
          <div>
            <div className="font-semibold">{tripCard.stats.countries}</div>
            <div>Countries</div>
          </div>
          <div>
            <div className="font-semibold">{tripCard.stats.cities}</div>
            <div>Cities</div>
          </div>
          <div>
            <div className="font-semibold">{tripCard.stats.flights}</div>
            <div>Flights</div>
          </div>
          <div>
            <div className="font-semibold">{tripCard.stats.days}</div>
            <div>Days</div>
          </div>
        </div>

        {tripCard.photos.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mb-4">
            {tripCard.photos.slice(0, 4).map((photo, idx) => (
              <div
                key={idx}
                className="aspect-square bg-white/20 rounded-lg overflow-hidden"
              >
                <img
                  src={photo}
                  alt={`Trip photo ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        <div className="space-y-1 text-sm opacity-90">
          {tripCard.highlights.map((highlight, idx) => (
            <div key={idx}>• {highlight}</div>
          ))}
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="flex-1"
            onClick={handleCopyLink}
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy Link
              </>
            )}
          </Button>
          <Button
            size="sm"
            className="flex-1"
            onClick={() => onShare?.('social')}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
