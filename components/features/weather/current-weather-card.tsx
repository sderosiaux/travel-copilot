'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { WeatherIcon } from './weather-icon'
import type { CurrentWeather } from '@/types/weather'
import { Droplets, Wind, Thermometer, Eye } from 'lucide-react'

interface CurrentWeatherCardProps {
  current: CurrentWeather
  destination: string
}

export function CurrentWeatherCard({ current, destination }: CurrentWeatherCardProps) {
  return (
    <Card className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-primary-200">
      <CardHeader>
        <CardTitle className="text-text-primary">Current Weather in {destination}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <WeatherIcon condition={current.condition} className="h-16 w-16 text-primary-600" />
            <div>
              <div className="text-5xl font-bold text-text-primary">
                {Math.round(current.temperature)}°C
              </div>
              <div className="text-text-secondary">
                Feels like {Math.round(current.feelsLike)}°C
              </div>
              <div className="text-text-primary mt-1">{current.description}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-primary-600" />
            <div>
              <div className="text-xs text-text-secondary">Humidity</div>
              <div className="text-sm font-semibold text-text-primary">{current.humidity}%</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Wind className="h-5 w-5 text-primary-600" />
            <div>
              <div className="text-xs text-text-secondary">Wind</div>
              <div className="text-sm font-semibold text-text-primary">
                {current.windSpeed} km/h {current.windDirection}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-primary-600" />
            <div>
              <div className="text-xs text-text-secondary">Pressure</div>
              <div className="text-sm font-semibold text-text-primary">{current.pressure} hPa</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary-600" />
            <div>
              <div className="text-xs text-text-secondary">Visibility</div>
              <div className="text-sm font-semibold text-text-primary">{current.visibility} km</div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-bg-secondary rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">UV Index</span>
            <span className="font-semibold text-text-primary">
              {current.uvIndex} - {current.uvIndex <= 2 ? 'Low' : current.uvIndex <= 5 ? 'Moderate' : current.uvIndex <= 7 ? 'High' : 'Very High'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
