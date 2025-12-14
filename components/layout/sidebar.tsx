'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronLeft, ChevronRight, Command } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/lib/store/ui-store'
import { PRIMARY_NAV } from '@/lib/constants/navigation'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export function Sidebar() {
  const pathname = usePathname()
  const { sidebarCollapsed, toggleSidebar, setCommandPaletteOpen } = useUIStore()

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-bg-secondary border-r border-border transition-all duration-300 flex flex-col',
        sidebarCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-border shrink-0">
        <div
          className={cn(
            'flex items-center gap-3 transition-opacity duration-200',
            sidebarCollapsed ? 'opacity-0' : 'opacity-100'
          )}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500 text-white font-bold text-lg">
            TC
          </div>
          {!sidebarCollapsed && (
            <span className="font-semibold text-text-primary text-lg">
              Travel Copilot
            </span>
          )}
        </div>
        {sidebarCollapsed && (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500 text-white font-bold text-lg mx-auto">
            TC
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto">
        <TooltipProvider delayDuration={300}>
          {PRIMARY_NAV.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            const linkContent = (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150',
                  'hover:bg-bg-tertiary',
                  isActive
                    ? 'bg-primary-500 text-white hover:bg-primary-600'
                    : 'text-text-secondary hover:text-text-primary',
                  sidebarCollapsed && 'justify-center'
                )}
                aria-label={item.description || item.label}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!sidebarCollapsed && (
                  <span className="truncate">{item.label}</span>
                )}
                {!sidebarCollapsed && item.badge && item.badge > 0 && (
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-xs font-semibold text-white">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </Link>
            )

            // Show tooltip only when sidebar is collapsed
            if (sidebarCollapsed) {
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                  <TooltipContent side="right" className="font-medium">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              )
            }

            return linkContent
          })}
        </TooltipProvider>
      </nav>

      {/* Quick Actions Button */}
      <div className="shrink-0 border-t border-border p-2">
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                onClick={() => setCommandPaletteOpen(true)}
                className={cn(
                  'w-full justify-start gap-3 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-bg-tertiary',
                  sidebarCollapsed && 'justify-center px-2'
                )}
              >
                <Command className="h-5 w-5 flex-shrink-0" />
                {!sidebarCollapsed && (
                  <>
                    <span className="flex-1 text-left">Quick Actions</span>
                    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-bg-tertiary px-1.5 font-mono text-xs font-medium text-text-tertiary opacity-100">
                      <span className="text-xs">⌘</span>K
                    </kbd>
                  </>
                )}
              </Button>
            </TooltipTrigger>
            {sidebarCollapsed && (
              <TooltipContent side="right" className="font-medium">
                Quick Actions (⌘K)
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Toggle button */}
      <div className="absolute -right-3 top-20">
        <Button
          variant="secondary"
          size="icon"
          onClick={toggleSidebar}
          className="h-6 w-6 rounded-full shadow-md"
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
    </aside>
  )
}
