'use client'

import { Search, ChevronRight, Bot } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/lib/store/ui-store'
import { useUserStore } from '@/lib/store/user-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { NotificationBell } from '@/components/features/notifications/notification-bell'
import { NotificationPanel } from '@/components/features/notifications/notification-panel'

interface HeaderProps {
  breadcrumbs?: Array<{ label: string; href?: string }>
}

export function Header({ breadcrumbs }: HeaderProps) {
  const { sidebarCollapsed, toggleCopilot } = useUIStore()
  const { user } = useUserStore()

  const experienceMode = user?.settings?.experienceMode || 'standard'
  const modeLabels = {
    essential: 'Essential',
    standard: 'Standard',
    expert: 'Expert',
  }

  const getUserInitials = () => {
    if (!user) return 'U'
    return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
  }

  return (
    <header
      className={cn(
        'fixed top-0 right-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border bg-bg-primary px-6 transition-all duration-300',
        sidebarCollapsed ? 'left-16' : 'left-64'
      )}
    >
      {/* Left section - Breadcrumbs */}
      <div className="flex items-center gap-2">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                {index > 0 && (
                  <ChevronRight className="h-4 w-4 text-text-tertiary" />
                )}
                {crumb.href ? (
                  <a
                    href={crumb.href}
                    className="text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-text-primary font-medium">
                    {crumb.label}
                  </span>
                )}
              </div>
            ))}
          </nav>
        )}
      </div>

      {/* Center section - Search */}
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
          <Input
            type="search"
            placeholder="Search trips, documents, flights..."
            className="pl-9 h-9"
          />
        </div>
      </div>

      {/* Right section - Actions */}
      <div className="flex items-center gap-3">
        {/* Mode indicator */}
        <Badge variant="default" className="hidden sm:inline-flex">
          {modeLabels[experienceMode]}
        </Badge>

        {/* Copilot toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleCopilot}
          aria-label="Toggle Copilot"
          className="relative"
        >
          <Bot className="h-5 w-5" />
        </Button>

        {/* Notifications */}
        <NotificationBell />

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-9 w-9 rounded-full p-0"
              aria-label="User menu"
            >
              <Avatar className="h-9 w-9">
                {user?.avatar && <AvatarImage src={user.avatar} alt={user.firstName} />}
                <AvatarFallback>{getUserInitials()}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">
                  {user ? `${user.firstName} ${user.lastName}` : 'Guest'}
                </p>
                <p className="text-xs text-text-secondary">
                  {user?.email || 'guest@example.com'}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-error">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Notification Panel */}
      <NotificationPanel />
    </header>
  )
}
