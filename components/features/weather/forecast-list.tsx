'use client'

import { Card, CardContent } from '@/components/ui/card'
import { WeatherIcon } from './weather-icon'
import type { DailyForecast } from '@/types/weather'
import { Droplets, Wind, Sun } from 'lucide-react'

interface ForecastListProps {
  forecasts: DailyForecast[]
}

export function ForecastList({ forecasts }: ForecastListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="space-y-3">
      {forecasts.map((forecast, index) => (
        <Card
          key={forecast.date}
          className="hover:shadow-md transition-shadow duration-200"
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="min-w-[100px]">
                  <div className="font-semibold text-text-primary">
                    {index === 0 ? 'Today' : forecast.dayOfWeek}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {formatDate(forecast.date)}
                  </div>
                </div>

                <WeatherIcon condition={forecast.condition} className="h-10 w-10 text-primary-600" />

                <div className="flex-1">
                  <div className="text-text-primary">{forecast.description}</div>
                  <div className="flex items-center gap-4 mt-1 text-sm text-text-secondary">
                    <div className="flex items-center gap-1">
                      <Droplets className="h-3 w-3" />
                      {forecast.precipitation}%
                    </div>
                    <div className="flex items-center gap-1">
                      <Wind className="h-3 w-3" />
                      {forecast.windSpeed} km/h
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-3">
                  <div className="text-text-secondary text-sm">
                    {Math.round(forecast.low)}°
                  </div>
                  <div className="text-2xl font-bold text-text-primary">
                    {Math.round(forecast.high)}°
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border-primary text-xs text-text-secondary">
              <div className="flex items-center gap-1">
                <Sun className="h-3 w-3" />
                <span>{forecast.sunrise}</span>
              </div>
              <span>→</span>
              <div className="flex items-center gap-1">
                <Sun className="h-3 w-3" />
                <span>{forecast.sunset}</span>
              </div>
              <span className="ml-auto">Humidity: {forecast.humidity}%</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
