'use client'

import { useState, useEffect } from 'react'
import { useWeatherStore } from '@/lib/store/weather-store'
import { mockWeatherForecasts } from '@/data/weather'
import {
  CurrentWeatherCard,
  ForecastList,
  WeatherAlerts,
  PackingRecommendations,
} from '@/components/features/weather'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Cloud } from 'lucide-react'

export default function WeatherPage() {
  const { forecasts, setForecasts, selectedDestination, setSelectedDestination } =
    useWeatherStore()
  const [selectedForecastId, setSelectedForecastId] = useState<string | null>(null)

  useEffect(() => {
    // Load mock weather data
    const forecastArray = Object.values(mockWeatherForecasts)
    setForecasts(forecastArray)
    if (forecastArray.length > 0 && !selectedForecastId) {
      setSelectedForecastId(forecastArray[0].id)
      setSelectedDestination(forecastArray[0].destination)
    }
  }, [setForecasts, setSelectedDestination, selectedForecastId])

  const selectedForecast = selectedForecastId
    ? forecasts[selectedForecastId]
    : Object.values(forecasts)[0]

  const handleDestinationChange = (forecastId: string) => {
    setSelectedForecastId(forecastId)
    const forecast = forecasts[forecastId]
    if (forecast) {
      setSelectedDestination(forecast.destination)
    }
  }

  const forecastList = Object.values(forecasts)

  if (forecastList.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Weather Forecast
          </h1>
          <p className="text-text-secondary">
            View weather forecasts for your destinations
          </p>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Cloud className="h-16 w-16 text-text-tertiary mb-4" />
            <p className="text-text-secondary">No weather forecasts available</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Weather Forecast
          </h1>
          <p className="text-text-secondary">
            Plan ahead with detailed weather forecasts and packing recommendations
          </p>
        </div>
      </div>

      <div className="max-w-xs">
        <label className="text-sm font-medium text-text-secondary mb-2 block">
          Select Destination
        </label>
        <Select
          value={selectedForecastId || ''}
          onValueChange={handleDestinationChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose a destination" />
          </SelectTrigger>
          <SelectContent>
            {forecastList.map((forecast) => (
              <SelectItem key={forecast.id} value={forecast.id}>
                {forecast.destination}, {forecast.country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedForecast && (
        <>
          <CurrentWeatherCard
            current={selectedForecast.current}
            destination={selectedForecast.destination}
          />

          {selectedForecast.alerts.length > 0 && (
            <WeatherAlerts alerts={selectedForecast.alerts} />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-text-primary">
                  7-Day Forecast
                </h2>
                <p className="text-sm text-text-secondary">
                  Detailed daily weather predictions
                </p>
              </div>
              <ForecastList forecasts={selectedForecast.daily} />
            </div>

            <div>
              <PackingRecommendations
                recommendations={selectedForecast.packingRecommendations}
              />
            </div>
          </div>

          <div className="text-xs text-text-tertiary text-center">
            Last updated:{' '}
            {new Date(selectedForecast.lastUpdated).toLocaleString('en-GB', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </div>
        </>
      )}
    </div>
  )
}
