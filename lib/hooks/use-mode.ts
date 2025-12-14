'use client'

import { useEffect } from 'react'
import { useUserStore } from '@/lib/store/user-store'

type ExperienceMode = 'essential' | 'standard' | 'expert'

export function useMode() {
  const user = useUserStore((state) => state.user)
  const updateSettings = useUserStore((state) => state.updateSettings)

  const mode = user?.settings.experienceMode ?? 'standard'

  useEffect(() => {
    const root = document.documentElement

    // Remove all mode attributes
    root.removeAttribute('data-mode')

    // Set the current mode
    root.setAttribute('data-mode', mode)
  }, [mode])

  const setMode = (newMode: ExperienceMode) => {
    updateSettings({ experienceMode: newMode })
  }

  const getModeConfig = () => {
    const configs = {
      essential: {
        name: 'Essential',
        description: 'Simplified interface with only the most important features',
        features: [
          'Larger text and buttons',
          'Clear visual hierarchy',
          'Reduced complexity',
          'Essential features only',
        ],
        padding: '1.25rem',
        gap: '1.5rem',
        text: '1.125rem',
      },
      standard: {
        name: 'Standard',
        description: 'Balanced experience with all core features',
        features: [
          'Full feature set',
          'Comfortable spacing',
          'Standard layouts',
          'All capabilities available',
        ],
        padding: '1rem',
        gap: '1rem',
        text: '1rem',
      },
      expert: {
        name: 'Expert',
        description: 'Dense layout with advanced features and more information',
        features: [
          'Compact interface',
          'Advanced features',
          'More data visible',
          'Power user tools',
        ],
        padding: '0.75rem',
        gap: '0.75rem',
        text: '0.875rem',
      },
    }
    return configs[mode]
  }

  return {
    mode,
    setMode,
    getModeConfig,
  }
}
