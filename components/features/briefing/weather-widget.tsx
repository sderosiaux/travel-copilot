import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { Cloud, CloudRain, Sun, CloudSnow, Wind, Droplets } from 'lucide-react'
import type { DestinationInfo } from '@/data/destinations'

interface WeatherWidgetProps {
  destination: DestinationInfo
}

export function WeatherWidget({ destination }: WeatherWidgetProps) {
  const getWeatherIcon = (conditions: string) => {
    const lower = conditions.toLowerCase()
    if (lower.includes('rain')) return <CloudRain className="w-8 h-8 text-info" />
    if (lower.includes('snow')) return <CloudSnow className="w-8 h-8 text-info" />
    if (lower.includes('sunny') || lower.includes('clear')) return <Sun className="w-8 h-8 text-warning" />
    if (lower.includes('cloud')) return <Cloud className="w-8 h-8 text-text-secondary" />
    return <Cloud className="w-8 h-8 text-text-secondary" />
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Current Weather */}
          <div className="flex items-center gap-4 p-4 bg-bg-secondary rounded-lg">
            {getWeatherIcon(destination.weather.current.conditions)}
            <div className="flex-1">
              <p className="text-sm text-text-secondary">Current</p>
              <p className="text-3xl font-bold text-text-primary">
                {destination.weather.current.temperature}°C
              </p>
              <p className="text-sm text-text-secondary">
                {destination.weather.current.conditions}
              </p>
            </div>
            <div className="text-right text-sm text-text-secondary space-y-1">
              <div className="flex items-center gap-1 justify-end">
                <Droplets className="w-4 h-4" />
                <span>{destination.weather.current.humidity}%</span>
              </div>
              <div className="flex items-center gap-1 justify-end">
                <Wind className="w-4 h-4" />
                <span>{destination.weather.current.windSpeed} km/h</span>
              </div>
            </div>
          </div>

          {/* Forecast */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">7-Day Forecast</h4>
            <div className="space-y-2">
              {destination.weather.forecast.map((day, index) => (
                <div
                  key={day.date}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-bg-secondary transition-colors"
                >
                  <div className="w-20 text-sm font-medium text-text-secondary">
                    {formatDate(day.date)}
                  </div>
                  <div className="flex items-center gap-2 flex-1">
                    <div className="scale-75">{getWeatherIcon(day.conditions)}</div>
                    <p className="text-sm text-text-secondary flex-1">{day.conditions}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-text-primary font-semibold">{day.high}°</span>
                    <span className="text-text-tertiary">/</span>
                    <span className="text-text-secondary">{day.low}°</span>
                  </div>
                  {day.precipitation > 0 && (
                    <div className="flex items-center gap-1 text-xs text-info">
                      <Droplets className="w-3 h-3" />
                      <span>{day.precipitation}%</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
