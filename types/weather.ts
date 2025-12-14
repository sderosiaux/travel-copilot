export type WeatherCondition =
  | 'sunny'
  | 'partly-cloudy'
  | 'cloudy'
  | 'rainy'
  | 'stormy'
  | 'snowy'
  | 'foggy'
  | 'windy'

export type WeatherAlertLevel = 'info' | 'warning' | 'severe'

export interface WeatherForecast {
  id: string
  destination: string
  country: string
  current: CurrentWeather
  daily: DailyForecast[]
  alerts: WeatherAlert[]
  packingRecommendations: PackingRecommendation[]
  lastUpdated: string
}

export interface CurrentWeather {
  temperature: number
  feelsLike: number
  condition: WeatherCondition
  description: string
  humidity: number
  windSpeed: number
  windDirection: string
  pressure: number
  uvIndex: number
  visibility: number
}

export interface DailyForecast {
  date: string
  dayOfWeek: string
  high: number
  low: number
  condition: WeatherCondition
  description: string
  precipitation: number
  humidity: number
  windSpeed: number
  sunrise: string
  sunset: string
}

export interface WeatherAlert {
  id: string
  level: WeatherAlertLevel
  title: string
  description: string
  startDate: string
  endDate: string
  affectedAreas: string[]
}

export interface PackingRecommendation {
  category: 'clothing' | 'accessories' | 'protection' | 'gear'
  item: string
  reason: string
  priority: 'essential' | 'recommended' | 'optional'
}
