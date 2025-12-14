import { create } from 'zustand'
import type { TimeZone, WorldClock, MeetingSchedule, TimeConversion } from '@/types/timezone'

interface TimezoneState {
  worldClock: WorldClock | null
  selectedTimezones: TimeZone[]
  meetings: MeetingSchedule[]
  conversions: TimeConversion[]
  isLoading: boolean
  error: string | null

  // Actions
  setWorldClock: (worldClock: WorldClock) => void
  addTimezone: (timezone: TimeZone) => void
  removeTimezone: (timezoneId: string) => void
  updateTimezone: (timezoneId: string, updates: Partial<TimeZone>) => void
  setSelectedTimezones: (timezones: TimeZone[]) => void

  // Meetings
  setMeetings: (meetings: MeetingSchedule[]) => void
  addMeeting: (meeting: MeetingSchedule) => void
  updateMeeting: (meetingId: string, updates: Partial<MeetingSchedule>) => void
  deleteMeeting: (meetingId: string) => void

  // Conversions
  addConversion: (conversion: TimeConversion) => void
  clearConversions: () => void

  // State management
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void

  // Helpers
  getCurrentTime: (timezone: string) => Date
  calculateTimeDifference: (tz1: string, tz2: string) => number
  getTimeInTimezone: (date: Date, timezone: string) => string
}

export const useTimezoneStore = create<TimezoneState>((set, get) => ({
  worldClock: null,
  selectedTimezones: [],
  meetings: [],
  conversions: [],
  isLoading: false,
  error: null,

  // Actions
  setWorldClock: (worldClock) => set({ worldClock, isLoading: false, error: null }),

  addTimezone: (timezone) =>
    set((state) => {
      // Update world clock if it exists
      if (state.worldClock) {
        const updatedTimezones = [...state.worldClock.timezones, timezone]
        return {
          worldClock: {
            ...state.worldClock,
            timezones: updatedTimezones,
            updatedAt: new Date().toISOString(),
          },
          selectedTimezones: [...state.selectedTimezones, timezone],
        }
      }
      return {
        selectedTimezones: [...state.selectedTimezones, timezone],
      }
    }),

  removeTimezone: (timezoneId) =>
    set((state) => {
      if (state.worldClock) {
        const updatedTimezones = state.worldClock.timezones.filter((tz) => tz.id !== timezoneId)
        return {
          worldClock: {
            ...state.worldClock,
            timezones: updatedTimezones,
            updatedAt: new Date().toISOString(),
          },
          selectedTimezones: state.selectedTimezones.filter((tz) => tz.id !== timezoneId),
        }
      }
      return {
        selectedTimezones: state.selectedTimezones.filter((tz) => tz.id !== timezoneId),
      }
    }),

  updateTimezone: (timezoneId, updates) =>
    set((state) => {
      if (state.worldClock) {
        const updatedTimezones = state.worldClock.timezones.map((tz) =>
          tz.id === timezoneId ? { ...tz, ...updates } : tz
        )
        return {
          worldClock: {
            ...state.worldClock,
            timezones: updatedTimezones,
            updatedAt: new Date().toISOString(),
          },
          selectedTimezones: state.selectedTimezones.map((tz) =>
            tz.id === timezoneId ? { ...tz, ...updates } : tz
          ),
        }
      }
      return {
        selectedTimezones: state.selectedTimezones.map((tz) =>
          tz.id === timezoneId ? { ...tz, ...updates } : tz
        ),
      }
    }),

  setSelectedTimezones: (timezones) => set({ selectedTimezones: timezones }),

  // Meetings
  setMeetings: (meetings) => set({ meetings, isLoading: false, error: null }),

  addMeeting: (meeting) =>
    set((state) => ({
      meetings: [...state.meetings, meeting],
    })),

  updateMeeting: (meetingId, updates) =>
    set((state) => ({
      meetings: state.meetings.map((meeting) =>
        meeting.id === meetingId
          ? { ...meeting, ...updates, updatedAt: new Date().toISOString() }
          : meeting
      ),
    })),

  deleteMeeting: (meetingId) =>
    set((state) => ({
      meetings: state.meetings.filter((meeting) => meeting.id !== meetingId),
    })),

  // Conversions
  addConversion: (conversion) =>
    set((state) => ({
      conversions: [...state.conversions, conversion],
    })),

  clearConversions: () => set({ conversions: [] }),

  // State management
  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  // Helpers
  getCurrentTime: (timezone: string) => {
    return new Date()
  },

  calculateTimeDifference: (tz1: string, tz2: string) => {
    // This is a simplified calculation
    // In production, use a library like date-fns-tz or luxon
    const now = new Date()
    const offset1 = new Date(now.toLocaleString('en-US', { timeZone: tz1 })).getTime()
    const offset2 = new Date(now.toLocaleString('en-US', { timeZone: tz2 })).getTime()
    return (offset2 - offset1) / (1000 * 60 * 60)
  },

  getTimeInTimezone: (date: Date, timezone: string) => {
    return date.toLocaleString('en-US', {
      timeZone: timezone,
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    })
  },
}))
