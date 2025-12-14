'use client'

import { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/lib/store/ui-store'
import { useUserStore } from '@/lib/store/user-store'
import { Sidebar } from './sidebar'
import { Header } from './header'
import { CopilotPanel } from './copilot-panel'
import { MobileNav } from './mobile-nav'
import { CommandPalette } from './command-palette'
import { OfflineIndicator } from '@/components/features/offline'

interface AppShellProps {
  children: React.ReactNode
  breadcrumbs?: Array<{ label: string; href?: string }>
}

export function AppShell({ children, breadcrumbs }: AppShellProps) {
  const { sidebarCollapsed, theme } = useUIStore()
  const { user } = useUserStore()

  const experienceMode = user?.settings?.experienceMode || 'standard'

  // Handle theme changes
  useEffect(() => {
    const root = document.documentElement
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
    const appliedTheme = theme === 'system' ? systemTheme : theme

    if (appliedTheme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  // Handle experience mode changes
  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-mode', experienceMode)
  }, [experienceMode])

  return (
    <div className="relative min-h-screen bg-bg-primary">
      {/* Sidebar - hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Header */}
      <Header breadcrumbs={breadcrumbs} />

      {/* Main content */}
      <main
        className={cn(
          'min-h-screen pt-16 pb-16 md:pb-0 transition-all duration-300',
          sidebarCollapsed ? 'md:pl-16' : 'md:pl-64'
        )}
      >
        <div className="h-full p-6 lg:p-8">{children}</div>
      </main>

      {/* Mobile navigation */}
      <MobileNav />

      {/* Copilot panel */}
      <CopilotPanel />

      {/* Command palette */}
      <CommandPalette />

      {/* Offline indicator */}
      <OfflineIndicator />
    </div>
  )
}
