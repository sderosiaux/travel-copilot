'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { AlternativeCard } from './alternative-card'
import { CompareFlights } from './compare-flights'
import { CompensationInfo } from './compensation-info'
import type { AlternativeOption } from '@/types/alternative'
import type { Flight } from '@/types/flight'
import {
  Plane,
  RefreshCw,
  Hotel,
  Car,
  Euro,
  Filter,
  AlertCircle
} from 'lucide-react'

interface AlternativesPanelProps {
  alternatives: AlternativeOption[]
  originalFlight: Flight
  onSelectOption?: (option: AlternativeOption) => void
}

export function AlternativesPanel({
  alternatives,
  originalFlight,
  onSelectOption,
}: AlternativesPanelProps) {
  const [selectedOptions, setSelectedOptions] = useState<AlternativeOption[]>([])
  const [compareMode, setCompareMode] = useState(false)

  const rebookingOptions = alternatives.filter((a) => a.type === 'rebooking')
  const refundOptions = alternatives.filter((a) => a.type === 'refund')
  const hotelOptions = alternatives.filter((a) => a.type === 'hotel')
  const transportOptions = alternatives.filter((a) => a.type === 'transport')
  const compensationOptions = alternatives.filter((a) => a.type === 'compensation')

  const handleSelectOption = (option: AlternativeOption) => {
    onSelectOption?.(option)
  }

  const handleCompare = (option: AlternativeOption) => {
    if (selectedOptions.find((o) => o.id === option.id)) {
      setSelectedOptions(selectedOptions.filter((o) => o.id !== option.id))
    } else {
      setSelectedOptions([...selectedOptions, option])
    }
  }

  const handleViewDetails = (option: AlternativeOption) => {
    // This would open a modal with full details
    console.log('View details:', option)
  }

  const getTabIcon = (type: string) => {
    switch (type) {
      case 'rebooking':
        return <Plane size={16} />
      case 'refund':
        return <RefreshCw size={16} />
      case 'hotel':
        return <Hotel size={16} />
      case 'transport':
        return <Car size={16} />
      case 'compensation':
        return <Euro size={16} />
      default:
        return null
    }
  }

  const recommendedOption = alternatives.find((a) => a.recommended)

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card variant="info" padding="lg">
        <div className="flex items-start gap-4">
          <AlertCircle size={24} className="text-info flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-text-primary mb-2">
              Alternative Options Available
            </h2>
            <p className="text-text-secondary mb-3">
              We found {alternatives.length} alternative options for your disrupted flight.
              {recommendedOption && ' Our recommended option is highlighted below.'}
            </p>
            {compareMode && selectedOptions.length > 0 && (
              <Badge variant="primary" className="gap-1">
                <Filter size={12} />
                Comparing {selectedOptions.length} options
              </Badge>
            )}
          </div>
        </div>
      </Card>

      {/* Compare Mode */}
      {compareMode && selectedOptions.length > 0 && (
        <CompareFlights
          options={selectedOptions}
          originalFlight={originalFlight}
          onClose={() => {
            setCompareMode(false)
            setSelectedOptions([])
          }}
        />
      )}

      {/* Options Tabs */}
      <Tabs defaultValue="rebooking" className="space-y-4">
        <TabsList>
          {rebookingOptions.length > 0 && (
            <TabsTrigger value="rebooking" className="gap-2">
              {getTabIcon('rebooking')}
              Rebooking ({rebookingOptions.length})
            </TabsTrigger>
          )}
          {refundOptions.length > 0 && (
            <TabsTrigger value="refund" className="gap-2">
              {getTabIcon('refund')}
              Refunds ({refundOptions.length})
            </TabsTrigger>
          )}
          {hotelOptions.length > 0 && (
            <TabsTrigger value="hotel" className="gap-2">
              {getTabIcon('hotel')}
              Hotels ({hotelOptions.length})
            </TabsTrigger>
          )}
          {transportOptions.length > 0 && (
            <TabsTrigger value="transport" className="gap-2">
              {getTabIcon('transport')}
              Transport ({transportOptions.length})
            </TabsTrigger>
          )}
          {compensationOptions.length > 0 && (
            <TabsTrigger value="compensation" className="gap-2">
              {getTabIcon('compensation')}
              Compensation
            </TabsTrigger>
          )}
        </TabsList>

        {/* Rebooking Options */}
        {rebookingOptions.length > 0 && (
          <TabsContent value="rebooking" className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-text-primary">
                Available Flights
              </h3>
              {rebookingOptions.length > 1 && (
                <button
                  onClick={() => setCompareMode(!compareMode)}
                  className="text-sm text-primary-500 hover:text-primary-600 font-medium"
                >
                  {compareMode ? 'Exit Compare Mode' : 'Compare Flights'}
                </button>
              )}
            </div>
            {rebookingOptions.map((option) => (
              <AlternativeCard
                key={option.id}
                option={option}
                onSelect={handleSelectOption}
                onViewDetails={handleViewDetails}
                onCompare={compareMode ? handleCompare : undefined}
                selected={selectedOptions.some((o) => o.id === option.id)}
              />
            ))}
          </TabsContent>
        )}

        {/* Refund Options */}
        {refundOptions.length > 0 && (
          <TabsContent value="refund" className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Refund & Voucher Options
            </h3>
            {refundOptions.map((option) => (
              <AlternativeCard
                key={option.id}
                option={option}
                onSelect={handleSelectOption}
                onViewDetails={handleViewDetails}
              />
            ))}
          </TabsContent>
        )}

        {/* Hotel Options */}
        {hotelOptions.length > 0 && (
          <TabsContent value="hotel" className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Accommodation Options
            </h3>
            {hotelOptions.map((option) => (
              <AlternativeCard
                key={option.id}
                option={option}
                onSelect={handleSelectOption}
                onViewDetails={handleViewDetails}
              />
            ))}
          </TabsContent>
        )}

        {/* Transport Options */}
        {transportOptions.length > 0 && (
          <TabsContent value="transport" className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Ground Transport Alternatives
            </h3>
            {transportOptions.map((option) => (
              <AlternativeCard
                key={option.id}
                option={option}
                onSelect={handleSelectOption}
                onViewDetails={handleViewDetails}
              />
            ))}
          </TabsContent>
        )}

        {/* Compensation */}
        {compensationOptions.length > 0 && (
          <TabsContent value="compensation" className="space-y-4">
            <CompensationInfo
              option={compensationOptions[0]}
              onClaim={handleSelectOption}
            />
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
