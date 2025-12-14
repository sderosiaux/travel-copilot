'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui'
import { useCopilotStore } from '@/lib/store/copilot-store'
import { CopilotMessage } from './copilot-message'
import { CopilotInput } from './copilot-input'
import { CopilotSuggestions } from './copilot-suggestions'
import { ThinkingIndicator } from './thinking-indicator'
import type { CopilotAction } from '@/lib/store/copilot-store'

export function CopilotChat() {
  const router = useRouter()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messages = useCopilotStore((state) => state.messages)
  const isThinking = useCopilotStore((state) => state.isThinking)
  const suggestions = useCopilotStore((state) => state.suggestions)
  const sendMessage = useCopilotStore((state) => state.sendMessage)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isThinking])

  const handleSend = async (message: string) => {
    await sendMessage(message)
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSend(suggestion)
  }

  const handleActionClick = (action: CopilotAction) => {
    if (action.type === 'link' && action.payload?.route) {
      router.push(action.payload.route)
    } else if (action.type === 'button') {
      // Handle button actions
      console.log('Button action:', action.payload)
    }
  }

  return (
    <Card className="flex flex-col h-[600px] overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="mb-4">
              <div className="h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✈️</span>
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Welcome to Travel Copilot
              </h3>
              <p className="text-sm text-text-secondary max-w-md">
                I'm here to help you manage your trips, check flight status, file claims, and
                more. Ask me anything!
              </p>
            </div>
          </div>
        ) : (
          <div className="py-4">
            {messages.map((message) => (
              <CopilotMessage
                key={message.id}
                message={message}
                onActionClick={handleActionClick}
              />
            ))}
            {isThinking && <ThinkingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {messages.length === 0 && (
        <div className="border-t border-border">
          <CopilotSuggestions
            suggestions={suggestions}
            onSuggestionClick={handleSuggestionClick}
            disabled={isThinking}
          />
        </div>
      )}

      <CopilotInput onSend={handleSend} disabled={isThinking} />
    </Card>
  )
}
