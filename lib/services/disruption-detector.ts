import type { Flight } from '@/types'
import type { Disruption } from '@/types/disruption'

export interface DisruptionDetectionResult {
  hasDisruptions: boolean
  disruptions: Array<{
    type: Disruption['type']
    severity: Disruption['severity']
    flightId: string
    title: string
    message: string
    details: string
  }>
}

/**
 * Detects disruptions across all flights
 */
export function detectDisruptions(flights: Flight[]): DisruptionDetectionResult {
  const disruptions: DisruptionDetectionResult['disruptions'] = []

  flights.forEach((flight) => {
    // Check for cancellations
    if (flight.status === 'cancelled') {
      disruptions.push({
        type: 'cancellation',
        severity: 'critical',
        flightId: flight.id,
        title: 'Flight Cancelled',
        message: `Flight ${flight.flightNumber} from ${flight.origin} to ${flight.destination} has been cancelled`,
        details: 'We recommend rebooking your flight as soon as possible. Tap to view alternative options.',
      })
    }

    // Check for delays
    if (flight.status === 'delayed') {
      const delay = calculateDelay(flight)
      const severity = getDelaySeverity(delay)

      disruptions.push({
        type: 'delay',
        severity,
        flightId: flight.id,
        title: `Flight Delayed ${formatDelay(delay)}`,
        message: `Flight ${flight.flightNumber} is delayed by ${formatDelay(delay)}`,
        details: `New departure time: ${flight.departure.estimated || flight.departure.scheduled}`,
      })
    }

    // Check for gate changes
    const gateChange = checkGateChange(flight)
    if (gateChange) {
      disruptions.push({
        type: 'gate_change',
        severity: 'medium',
        flightId: flight.id,
        title: 'Gate Change',
        message: `Gate changed from ${gateChange.old} to ${gateChange.new}`,
        details: `Flight ${flight.flightNumber} now departing from gate ${gateChange.new}`,
      })
    }

    // Check for terminal changes
    const terminalChange = checkTerminalChange(flight)
    if (terminalChange) {
      disruptions.push({
        type: 'terminal_change',
        severity: 'high',
        flightId: flight.id,
        title: 'Terminal Change',
        message: `Terminal changed from ${terminalChange.old} to ${terminalChange.new}`,
        details: `Flight ${flight.flightNumber} now departing from Terminal ${terminalChange.new}. Allow extra time to reach the new terminal.`,
      })
    }
  })

  // Check for connection risks between flights
  const connectionRisks = checkConnectionRisks(flights)
  disruptions.push(...connectionRisks)

  return {
    hasDisruptions: disruptions.length > 0,
    disruptions,
  }
}

/**
 * Checks a single flight for disruptions
 */
export function checkFlightStatus(flight: Flight): DisruptionDetectionResult['disruptions'][0] | null {
  if (flight.status === 'cancelled') {
    return {
      type: 'cancellation',
      severity: 'critical',
      flightId: flight.id,
      title: 'Flight Cancelled',
      message: `Flight ${flight.flightNumber} has been cancelled`,
      details: 'Contact airline for rebooking options.',
    }
  }

  if (flight.status === 'delayed') {
    const delay = calculateDelay(flight)
    return {
      type: 'delay',
      severity: getDelaySeverity(delay),
      flightId: flight.id,
      title: `Flight Delayed`,
      message: `${formatDelay(delay)} delay`,
      details: `New departure: ${flight.departure.estimated || flight.departure.scheduled}`,
    }
  }

  return null
}

/**
 * Checks for tight connections between flights
 */
export function checkConnectionRisks(
  flights: Flight[]
): DisruptionDetectionResult['disruptions'] {
  const risks: DisruptionDetectionResult['disruptions'] = []

  // Sort flights by departure time
  const sortedFlights = [...flights].sort(
    (a, b) =>
      new Date(a.departure.scheduled).getTime() -
      new Date(b.departure.scheduled).getTime()
  )

  // Check consecutive flights for connection time
  for (let i = 0; i < sortedFlights.length - 1; i++) {
    const currentFlight = sortedFlights[i]
    const nextFlight = sortedFlights[i + 1]

    // Only check if landing airport matches departure airport
    if (currentFlight.destination === nextFlight.origin) {
      const connectionTime = calculateConnectionTime(currentFlight, nextFlight)
      const minimumConnectionTime = 90 // 90 minutes minimum connection time

      if (connectionTime < minimumConnectionTime) {
        const severity = getConnectionRiskSeverity(connectionTime, minimumConnectionTime)

        risks.push({
          type: 'missed_connection',
          severity,
          flightId: nextFlight.id,
          title: 'Tight Connection Warning',
          message: `Only ${Math.round(connectionTime)} minutes between flights`,
          details: `Connection time at ${currentFlight.destination} may be insufficient. Recommended minimum: ${minimumConnectionTime} minutes.`,
        })
      }
    }
  }

  return risks
}

/**
 * Calculates delay in minutes
 */
function calculateDelay(flight: Flight): number {
  const scheduled = new Date(flight.departure.scheduled).getTime()
  const estimated = flight.departure.estimated
    ? new Date(flight.departure.estimated).getTime()
    : scheduled

  return Math.max(0, Math.round((estimated - scheduled) / 60000))
}

/**
 * Determines severity based on delay length
 */
function getDelaySeverity(delayMinutes: number): Disruption['severity'] {
  if (delayMinutes >= 180) return 'critical' // 3+ hours
  if (delayMinutes >= 120) return 'high' // 2-3 hours
  if (delayMinutes >= 60) return 'medium' // 1-2 hours
  return 'low' // < 1 hour
}

/**
 * Formats delay duration
 */
function formatDelay(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}min`
  }
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}min` : `${hours}h`
}

/**
 * Checks for gate changes
 */
function checkGateChange(flight: Flight): { old: string; new: string } | null {
  // This would typically compare with historical data
  // For now, we'll return null (no gate change detected)
  // In production, you'd compare flight.departure.gate with previous stored value
  return null
}

/**
 * Checks for terminal changes
 */
function checkTerminalChange(flight: Flight): { old: string; new: string } | null {
  // This would typically compare with historical data
  // For now, we'll return null (no terminal change detected)
  // In production, you'd compare flight.departure.terminal with previous stored value
  return null
}

/**
 * Calculates connection time between two flights in minutes
 */
function calculateConnectionTime(firstFlight: Flight, secondFlight: Flight): number {
  const arrival = new Date(firstFlight.arrival.estimated || firstFlight.arrival.scheduled).getTime()
  const departure = new Date(secondFlight.departure.scheduled).getTime()

  return Math.round((departure - arrival) / 60000)
}

/**
 * Determines severity based on connection time
 */
function getConnectionRiskSeverity(
  connectionTime: number,
  minimumTime: number
): Disruption['severity'] {
  const gap = minimumTime - connectionTime

  if (connectionTime < 45) return 'critical' // Less than 45 minutes
  if (gap > 30) return 'high' // More than 30 minutes short
  if (gap > 0) return 'medium' // Slightly under minimum
  return 'low'
}

/**
 * Gets the overall severity of a disruption
 */
export function getDisruptionSeverity(disruption: Partial<Disruption>): Disruption['severity'] {
  // Priority order for disruption types
  const typeSeverityMap: Record<Disruption['type'], number> = {
    cancellation: 4,
    missed_connection: 3,
    terminal_change: 3,
    delay: 2,
    gate_change: 1,
    aircraft_change: 1,
    other: 0,
  }

  // If disruption has explicit severity, use it
  if (disruption.severity) {
    return disruption.severity
  }

  // Otherwise, determine based on type
  if (disruption.type) {
    const score = typeSeverityMap[disruption.type]
    if (score >= 4) return 'critical'
    if (score >= 3) return 'high'
    if (score >= 2) return 'medium'
  }

  return 'low'
}
