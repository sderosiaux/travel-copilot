'use client'

import { useEffect, useState } from 'react'
import { useUserStore } from '@/lib/store/user-store'

type Theme = 'light' | 'dark' | 'system'

export function useTheme() {
  const user = useUserStore((state) => state.user)
  const updateSettings = useUserStore((state) => state.updateSettings)
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')

  const theme = user?.settings.theme ?? 'system'

  useEffect(() => {
    const root = document.documentElement

    // Remove previous theme classes
    root.classList.remove('light', 'dark')

    const applyTheme = (isDark: boolean) => {
      const newResolvedTheme = isDark ? 'dark' : 'light'
      root.classList.add(newResolvedTheme)
      setResolvedTheme(newResolvedTheme)
    }

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      applyTheme(mediaQuery.matches)

      const listener = (e: MediaQueryListEvent) => applyTheme(e.matches)
      mediaQuery.addEventListener('change', listener)

      return () => mediaQuery.removeEventListener('change', listener)
    } else {
      applyTheme(theme === 'dark')
    }
  }, [theme])

  const setTheme = (newTheme: Theme) => {
    updateSettings({ theme: newTheme })
  }

  return {
    theme,
    resolvedTheme,
    setTheme,
  }
}
