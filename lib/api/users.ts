import type { User, UserPreferences, UserSettings } from '@/types'
import { mockApiCall, ApiError } from './client'
import { carlosMartinez, marcusThompson } from '@/data'

// Simulated user database
const users = new Map<string, User>([
  [carlosMartinez.id, carlosMartinez],
  [marcusThompson.id, marcusThompson],
])

export async function getUser(userId: string): Promise<User> {
  const user = users.get(userId)

  if (!user) {
    throw new ApiError('User not found', 404, 'USER_NOT_FOUND')
  }

  return mockApiCall(user)
}

export async function getUserByEmail(email: string): Promise<User> {
  const user = Array.from(users.values()).find(u => u.email === email)

  if (!user) {
    throw new ApiError('User not found', 404, 'USER_NOT_FOUND')
  }

  return mockApiCall(user)
}

export async function updateUser(
  userId: string,
  updates: Partial<Omit<User, 'id' | 'createdAt' | 'preferences' | 'settings'>>
): Promise<User> {
  const user = users.get(userId)

  if (!user) {
    throw new ApiError('User not found', 404, 'USER_NOT_FOUND')
  }

  const updatedUser: User = {
    ...user,
    ...updates,
    updatedAt: new Date().toISOString(),
  }

  users.set(userId, updatedUser)

  return mockApiCall(updatedUser)
}

export async function updatePreferences(
  userId: string,
  preferences: Partial<UserPreferences>
): Promise<User> {
  const user = users.get(userId)

  if (!user) {
    throw new ApiError('User not found', 404, 'USER_NOT_FOUND')
  }

  const updatedUser: User = {
    ...user,
    preferences: {
      ...user.preferences,
      ...preferences,
    },
    updatedAt: new Date().toISOString(),
  }

  users.set(userId, updatedUser)

  return mockApiCall(updatedUser)
}

export async function updateSettings(
  userId: string,
  settings: Partial<UserSettings>
): Promise<User> {
  const user = users.get(userId)

  if (!user) {
    throw new ApiError('User not found', 404, 'USER_NOT_FOUND')
  }

  const updatedUser: User = {
    ...user,
    settings: {
      ...user.settings,
      ...settings,
    },
    updatedAt: new Date().toISOString(),
  }

  users.set(userId, updatedUser)

  return mockApiCall(updatedUser)
}
