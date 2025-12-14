'use client'

import { useState, useEffect } from 'react'
import { useSimStore } from '@/lib/store/sim-store'
import { mockSimOptions } from '@/data/sim'
import {
  SimCard,
  DataPlanCard,
  SetupInstructions,
  CoverageMap,
  SimComparison,
} from '@/components/features/sim'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { SimOption } from '@/types/sim'
import { Smartphone, Mail, Globe, Phone, ArrowLeft } from 'lucide-react'

export default function SimPage() {
  const { options, setOptions, selectedCountry, setSelectedCountry, selectedOption, setSelectedOption } = useSimStore()
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  useEffect(() => {
    // Load mock SIM data
    Object.entries(mockSimOptions).forEach(([country, opts]) => {
      setOptions(country, opts)
    })

    // Set default country
    if (!selectedCountry && Object.keys(mockSimOptions).length > 0) {
      setSelectedCountry(Object.keys(mockSimOptions)[0])
    }
  }, [setOptions, selectedCountry, setSelectedCountry])

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country)
    setSelectedOption(null)
  }

  const handleSelectOption = (option: SimOption) => {
    setSelectedOption(option)
    setIsDetailDialogOpen(true)
  }

  const currentOptions = selectedCountry ? options[selectedCountry.toLowerCase()] || [] : []
  const availableCountries = Object.keys(mockSimOptions)

  if (availableCountries.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Local SIM & eSIM Info
          </h1>
          <p className="text-text-secondary">
            Find the best SIM options for your destination
          </p>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Smartphone className="h-16 w-16 text-text-tertiary mb-4" />
            <p className="text-text-secondary">No SIM options available</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          Local SIM & eSIM Info
        </h1>
        <p className="text-text-secondary">
          Compare and choose the best mobile data option for your destination
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 max-w-xs">
          <label className="text-sm font-medium text-text-secondary mb-2 block">
            Select Country
          </label>
          <Select value={selectedCountry || ''} onValueChange={handleCountryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a country" />
            </SelectTrigger>
            <SelectContent>
              {availableCountries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country.charAt(0).toUpperCase() + country.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {currentOptions.length > 1 && (
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Badge variant="default">{currentOptions.length} options available</Badge>
          </div>
        )}
      </div>

      {currentOptions.length > 0 && (
        <>
          <Tabs defaultValue="options" className="w-full">
            <TabsList>
              <TabsTrigger value="options">Available Options</TabsTrigger>
              <TabsTrigger value="compare">Compare</TabsTrigger>
            </TabsList>

            <TabsContent value="options" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentOptions.map((option) => (
                  <SimCard
                    key={option.id}
                    option={option}
                    onSelect={handleSelectOption}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="compare" className="mt-6">
              <SimComparison options={currentOptions} />
            </TabsContent>
          </Tabs>
        </>
      )}

      {currentOptions.length === 0 && selectedCountry && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Smartphone className="h-16 w-16 text-text-tertiary mb-4" />
            <p className="text-text-secondary">
              No SIM options available for{' '}
              {selectedCountry.charAt(0).toUpperCase() + selectedCountry.slice(1)}
            </p>
          </CardContent>
        </Card>
      )}

      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedOption && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <DialogTitle className="text-2xl mb-2">
                      {selectedOption.name}
                    </DialogTitle>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-text-secondary">
                        {selectedOption.provider}
                      </span>
                      <Badge
                        variant={
                          selectedOption.type === 'esim' ? 'success' : 'default'
                        }
                      >
                        {selectedOption.type === 'esim' ? 'eSIM' : 'Physical SIM'}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsDetailDialogOpen(false)}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                <div>
                  <p className="text-text-secondary">{selectedOption.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-4">
                    Data Plans
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedOption.dataPlans.map((plan) => (
                      <DataPlanCard key={plan.id} plan={plan} />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CoverageMap coverage={selectedOption.coverage} />

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-text-primary mb-4">
                        Features
                      </h3>
                      <ul className="space-y-2">
                        {selectedOption.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm text-text-secondary"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-primary-600 mt-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <SetupInstructions instructions={selectedOption.setupInstructions} />

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-text-primary mb-4">
                      Support Contact
                    </h3>
                    <div className="space-y-3">
                      {selectedOption.supportContact.website && (
                        <div className="flex items-center gap-3">
                          <Globe className="h-5 w-5 text-primary-600" />
                          <a
                            href={selectedOption.supportContact.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:underline"
                          >
                            {selectedOption.supportContact.website}
                          </a>
                        </div>
                      )}
                      {selectedOption.supportContact.email && (
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-primary-600" />
                          <a
                            href={`mailto:${selectedOption.supportContact.email}`}
                            className="text-primary-600 hover:underline"
                          >
                            {selectedOption.supportContact.email}
                          </a>
                        </div>
                      )}
                      {selectedOption.supportContact.phone && (
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-primary-600" />
                          <a
                            href={`tel:${selectedOption.supportContact.phone}`}
                            className="text-primary-600 hover:underline"
                          >
                            {selectedOption.supportContact.phone}
                          </a>
                        </div>
                      )}
                      {selectedOption.supportContact.hours && (
                        <div className="text-sm text-text-secondary">
                          Hours: {selectedOption.supportContact.hours}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
