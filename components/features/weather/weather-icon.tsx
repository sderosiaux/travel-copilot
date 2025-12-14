'use client'

import {
  Cloud,
  CloudRain,
  CloudSnow,
  Sun,
  Wind,
  CloudDrizzle,
} from 'lucide-react'
import type { WeatherCondition } from '@/types/weather'

interface WeatherIconProps {
  condition: WeatherCondition
  className?: string
}

export function WeatherIcon({ condition, className = 'h-6 w-6' }: WeatherIconProps) {
  const icons: Record<WeatherCondition, React.ReactNode> = {
    sunny: <Sun className={className} />,
    'partly-cloudy': <Cloud className={className} />,
    cloudy: <Cloud className={className} />,
    rainy: <CloudRain className={className} />,
    stormy: <CloudRain className={className} />,
    snowy: <CloudSnow className={className} />,
    foggy: <Cloud className={className} />,
    windy: <Wind className={className} />,
  }

  return <>{icons[condition]}</>
}
