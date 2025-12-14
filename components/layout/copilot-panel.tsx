'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minimize2, Send, Mic, Bot } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/lib/store/ui-store'
import { useCopilotStore } from '@/lib/store/copilot-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'

export function CopilotPanel() {
  const { copilotOpen, copilotMinimized, setCopilotOpen, minimizeCopilot } = useUIStore()
  const { messages, isThinking, suggestions, sendMessage } = useCopilotStore()
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (copilotOpen && !copilotMinimized) {
      inputRef.current?.focus()
    }
  }, [copilotOpen, copilotMinimized])

  const handleSend = async () => {
    if (!input.trim() || isThinking) return

    const message = input.trim()
    setInput('')
    await sendMessage(message)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
    inputRef.current?.focus()
  }

  // Minimized floating button
  if (copilotMinimized) {
    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          size="lg"
          onClick={() => setCopilotOpen(true)}
          className="h-14 w-14 rounded-full shadow-lg"
          aria-label="Open Copilot"
        >
          <Bot className="h-6 w-6" />
        </Button>
      </motion.div>
    )
  }

  // Full panel
  return (
    <AnimatePresence>
      {copilotOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed right-0 top-0 z-50 h-screen w-[360px] flex flex-col bg-bg-primary border-l border-border shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-bg-secondary">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500 text-white">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-text-primary">
                  Copilot
                </h2>
                <p className="text-xs text-text-tertiary">
                  Your travel assistant
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={minimizeCopilot}
                className="h-8 w-8"
                aria-label="Minimize"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCopilotOpen(false)}
                className="h-8 w-8"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-500 mb-4">
                  <Bot className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Welcome to Copilot
                </h3>
                <p className="text-sm text-text-secondary mb-6">
                  I'm here to help you with your travel needs. Ask me anything!
                </p>
                <div className="w-full space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-lg transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'flex gap-3',
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    {message.role === 'copilot' && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white flex-shrink-0">
                        <Bot className="h-4 w-4" />
                      </div>
                    )}
                    <div
                      className={cn(
                        'flex flex-col gap-1 max-w-[75%]',
                        message.role === 'user' && 'items-end'
                      )}
                    >
                      <div
                        className={cn(
                          'rounded-lg px-3 py-2',
                          message.role === 'user'
                            ? 'bg-primary-500 text-white'
                            : 'bg-bg-secondary text-text-primary'
                        )}
                      >
                        <p className="text-sm whitespace-pre-wrap">
                          {message.content}
                        </p>
                      </div>
                      {message.actions && message.actions.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {message.actions.map((action, idx) => (
                            <Badge
                              key={idx}
                              variant="primary"
                              className="cursor-pointer hover:bg-primary-600"
                            >
                              {action.label}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <span className="text-xs text-text-tertiary px-1">
                        {format(message.timestamp, 'HH:mm')}
                      </span>
                    </div>
                  </div>
                ))}
                {isThinking && (
                  <div className="flex gap-3 justify-start">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white flex-shrink-0">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-bg-secondary rounded-lg px-3 py-2">
                      <div className="flex gap-1">
                        <div className="h-2 w-2 rounded-full bg-text-tertiary animate-bounce" />
                        <div className="h-2 w-2 rounded-full bg-text-tertiary animate-bounce [animation-delay:0.2s]" />
                        <div className="h-2 w-2 rounded-full bg-text-tertiary animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input area */}
          <div className="border-t border-border px-4 py-3 bg-bg-secondary">
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  variant="ai"
                  disabled={isThinking}
                  className="resize-none"
                />
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => {}}
                aria-label="Voice input"
                className="flex-shrink-0"
              >
                <Mic className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                onClick={handleSend}
                disabled={!input.trim() || isThinking}
                aria-label="Send message"
                className="flex-shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
