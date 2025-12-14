'use client'

import { useEffect, useState } from 'react'
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Tabs, TabsContent, TabsList, TabsTrigger, Textarea } from '@/components/ui'
import { FlightMealSelector, PreorderConfirmation } from '@/components/features/meals'
import { useMealsStore } from '@/lib/store/meals-store'
import { useFlightStore } from '@/lib/store/flight-store'
import { mockMeals } from '@/data/meals'
import type { Meal, MealPreorder } from '@/types/meals'
import { Utensils, Plane, AlertCircle, CheckCircle } from 'lucide-react'

export default function MealsPage() {
  const [mounted, setMounted] = useState(false)
  const [selectedFlightId, setSelectedFlightId] = useState<string>('')
  const [selectedTravelerId, setSelectedTravelerId] = useState<string>('')
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null)
  const [specialRequests, setSpecialRequests] = useState('')
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  const {
    flightServices,
    preorders,
    setFlightServices,
    setPreorders,
    addPreorder,
    getFlightService,
    getPreorderByTraveler,
    canPreorder,
  } = useMealsStore()

  const { flights, setFlights } = useFlightStore()

  // Initialize data
  useEffect(() => {
    setMounted(true)
    setFlightServices(mockMeals.flightMealServices)
    setPreorders(mockMeals.mealPreorders)

    // Load flights if not already loaded
    if (flights.length === 0) {
      const { mockFlights } = require('@/data/flights')
      setFlights(Object.values(mockFlights))
    }
  }, [setFlightServices, setPreorders, setFlights, flights.length])

  // Auto-select first flight
  useEffect(() => {
    if (flightServices.length > 0 && !selectedFlightId) {
      setSelectedFlightId(flightServices[0].flightId)
    }
  }, [flightServices, selectedFlightId])

  // Get available travelers for selected flight
  const selectedFlight = flights.find((f) => f.id === selectedFlightId)
  const travelers = selectedFlight
    ? Object.entries(selectedFlight.seats).map(([id, seat]) => ({ id, seat }))
    : []

  // Auto-select first traveler
  useEffect(() => {
    if (travelers.length > 0 && !selectedTravelerId) {
      setSelectedTravelerId(travelers[0].id)
    }
  }, [travelers, selectedTravelerId])

  const currentService = selectedFlightId ? getFlightService(selectedFlightId) : null
  const currentPreorder = selectedFlightId && selectedTravelerId
    ? getPreorderByTraveler(selectedFlightId, selectedTravelerId)
    : null
  const canMakePreorder = selectedFlightId ? canPreorder(selectedFlightId) : false

  const handleMealSelect = (meal: Meal) => {
    setSelectedMeal(meal)
    setShowConfirmDialog(true)
  }

  const handleConfirmPreorder = () => {
    if (!selectedMeal || !selectedFlightId || !selectedTravelerId) return

    const newPreorder: MealPreorder = {
      id: `preorder-${Date.now()}`,
      flightId: selectedFlightId,
      travelerId: selectedTravelerId,
      mealId: selectedMeal.id,
      meal: selectedMeal,
      orderDate: new Date().toISOString(),
      specialRequests: specialRequests.trim() || undefined,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    addPreorder(newPreorder)
    setShowConfirmDialog(false)
    setShowSuccessDialog(true)
    setSelectedMeal(null)
    setSpecialRequests('')
  }

  if (!mounted) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-text-tertiary">Loading...</p>
        </div>
      </div>
    )
  }

  if (flightServices.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-text-primary flex items-center gap-3">
              <Utensils className="h-8 w-8 text-accent-primary" />
              Meal Pre-order
            </h1>
            <p className="text-text-secondary mt-2">
              Pre-order your in-flight meals for upcoming flights
            </p>
          </div>

          <Card>
            <CardContent className="py-12 text-center">
              <AlertCircle className="h-12 w-12 text-icon-tertiary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                No flights available for meal pre-order
              </h3>
              <p className="text-text-secondary">
                Meal pre-order will be available for your upcoming flights
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-text-primary flex items-center gap-3">
            <Utensils className="h-8 w-8 text-accent-primary" />
            Meal Pre-order
          </h1>
          <p className="text-text-secondary mt-2">
            Pre-order your in-flight meals for upcoming flights
          </p>
        </div>

        {/* Flight & Traveler Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Select Flight & Traveler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Flight Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">Flight</label>
                <Select value={selectedFlightId} onValueChange={setSelectedFlightId}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {flightServices.map((service) => (
                      <SelectItem key={service.flightId} value={service.flightId}>
                        <div className="flex items-center gap-2">
                          <Plane className="h-4 w-4" />
                          <span>{service.flightNumber} - {service.route}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Traveler Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">Traveler</label>
                <Select
                  value={selectedTravelerId}
                  onValueChange={setSelectedTravelerId}
                  disabled={travelers.length === 0}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {travelers.map((traveler) => (
                      <SelectItem key={traveler.id} value={traveler.id}>
                        {traveler.id.replace(/-/g, ' ').replace(/^./, (c) => c.toUpperCase())} (Seat {traveler.seat})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList>
            <TabsTrigger value="browse">Browse Meals</TabsTrigger>
            <TabsTrigger value="my-orders">My Orders ({preorders.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {currentPreorder ? (
              <Card className="border-green-500 bg-green-50">
                <CardContent className="py-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-900">You have already pre-ordered a meal</p>
                      <p className="text-sm text-green-700 mt-1">
                        Check the "My Orders" tab to view your selection
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : !canMakePreorder ? (
              <Card className="border-red-500 bg-red-50">
                <CardContent className="py-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-900">Pre-order deadline has passed</p>
                      <p className="text-sm text-red-700 mt-1">
                        Meal selection is no longer available for this flight
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : null}

            {currentService && (
              <FlightMealSelector
                service={currentService}
                selectedMealId={selectedMeal?.id}
                onMealSelect={handleMealSelect}
                disabled={!!currentPreorder || !canMakePreorder}
              />
            )}
          </TabsContent>

          <TabsContent value="my-orders" className="space-y-4">
            {preorders.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Utensils className="h-12 w-12 text-icon-tertiary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    No meal pre-orders yet
                  </h3>
                  <p className="text-text-secondary">
                    Browse available meals and make your selection
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {preorders.map((preorder) => {
                  const flight = flights.find((f) => f.id === preorder.flightId)
                  const travelerName = preorder.travelerId
                    .replace(/-/g, ' ')
                    .replace(/^./, (c) => c.toUpperCase())

                  return (
                    <PreorderConfirmation
                      key={preorder.id}
                      preorder={preorder}
                      flightNumber={flight?.flightNumber || 'Unknown'}
                      travelerName={travelerName}
                    />
                  )
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Confirmation Dialog */}
        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Meal Pre-order</DialogTitle>
              <DialogDescription>
                Review your meal selection and add any special requests
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {selectedMeal && (
                <Card>
                  <CardContent className="pt-6">
                    <h4 className="font-semibold text-text-primary">{selectedMeal.name}</h4>
                    <p className="text-sm text-text-secondary mt-1">{selectedMeal.description}</p>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">
                  Special Requests (Optional)
                </label>
                <Textarea
                  placeholder="e.g., No sauce, extra vegetables, etc."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex items-center gap-3">
                <Button onClick={handleConfirmPreorder} className="flex-1">
                  Confirm Pre-order
                </Button>
                <Button variant="ghost" onClick={() => setShowConfirmDialog(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Success Dialog */}
        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Pre-order Confirmed
              </DialogTitle>
              <DialogDescription>
                Your meal has been successfully pre-ordered
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-text-secondary">
                You can view your pre-order details in the "My Orders" tab
              </p>
              <Button onClick={() => setShowSuccessDialog(false)} className="w-full">
                Done
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
