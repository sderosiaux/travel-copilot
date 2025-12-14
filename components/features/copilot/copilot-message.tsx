'use client'

import { format } from 'date-fns'
import { Avatar, AvatarFallback, Button } from '@/components/ui'
import type { Message } from '@/lib/store/copilot-store'
import { cn } from '@/lib/utils'

interface CopilotMessageProps {
  message: Message
  onActionClick?: (action: any) => void
}

export function CopilotMessage({ message, onActionClick }: CopilotMessageProps) {
  const isUser = message.role === 'user'

  return (
    <div
      className={cn(
        'flex gap-3 px-4 py-3 animate-in fade-in slide-in-from-bottom-2 duration-300',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarFallback className="bg-primary-500 text-white text-xs">
            AI
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          'flex flex-col gap-2 max-w-[80%]',
          isUser ? 'items-end' : 'items-start'
        )}
      >
        <div
          className={cn(
            'rounded-2xl px-4 py-2.5 text-sm',
            isUser
              ? 'bg-primary-500 text-white'
              : 'bg-bg-secondary text-text-primary border border-border'
          )}
        >
          {message.content}
        </div>

        {message.actions && message.actions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {message.actions.map((action, index) => (
              <Button
                key={index}
                variant={action.type === 'link' ? 'link' : 'secondary'}
                size="sm"
                onClick={() => onActionClick?.(action)}
                className="text-xs"
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}

        <span className="text-xs text-text-tertiary px-1">
          {format(new Date(message.timestamp), 'HH:mm')}
        </span>
      </div>

      {isUser && (
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarFallback className="bg-accent-500 text-white text-xs">
            You
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}
