'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MoreHorizontal, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MOBILE_NAV, MOBILE_MORE_ITEMS } from '@/lib/constants/navigation'

export function MobileNav() {
  const pathname = usePathname()
  const [moreOpen, setMoreOpen] = useState(false)

  return (
    <>
      {/* More menu overlay */}
      {moreOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMoreOpen(false)}
        />
      )}

      {/* More menu sheet */}
      <div
        className={cn(
          'fixed bottom-16 left-0 right-0 z-50 bg-bg-primary border-t border-border rounded-t-2xl transition-transform duration-300 md:hidden',
          moreOpen ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">More</h3>
            <button
              onClick={() => setMoreOpen(false)}
              className="p-2 rounded-lg hover:bg-bg-secondary text-text-secondary"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {MOBILE_MORE_ITEMS.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMoreOpen(false)}
                  className={cn(
                    'flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-150',
                    'hover:bg-bg-secondary',
                    isActive
                      ? 'bg-primary-500/10 text-primary-500'
                      : 'text-text-secondary hover:text-text-primary'
                  )}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-xs font-medium text-center">
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bottom tab bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t border-border bg-bg-primary">
        <div className="flex items-center justify-around px-2 py-2">
          {MOBILE_NAV.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-150 min-w-[60px]',
                  'hover:bg-bg-secondary',
                  isActive
                    ? 'text-primary-500'
                    : 'text-text-secondary hover:text-text-primary'
                )}
                aria-label={item.label}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            )
          })}

          {/* More button */}
          <button
            onClick={() => setMoreOpen(!moreOpen)}
            className={cn(
              'flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-150 min-w-[60px]',
              'hover:bg-bg-secondary',
              moreOpen
                ? 'text-primary-500'
                : 'text-text-secondary hover:text-text-primary'
            )}
            aria-label="More options"
          >
            <MoreHorizontal className="h-5 w-5" />
            <span className="text-xs font-medium">More</span>
          </button>
        </div>
      </nav>
    </>
  )
}
