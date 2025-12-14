'use client'

import { useState, FormEvent } from 'react'
import { Send, Mic } from 'lucide-react'
import { Button, Input } from '@/components/ui'

interface CopilotInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}

export function CopilotInput({ onSend, disabled = false }: CopilotInputProps) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSend(message.trim())
      setMessage('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 border-t border-border">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask me anything about your trips..."
        disabled={disabled}
        className="flex-1"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled={disabled}
        className="shrink-0"
        title="Voice input (coming soon)"
      >
        <Mic className="h-4 w-4" />
      </Button>
      <Button
        type="submit"
        size="icon"
        disabled={disabled || !message.trim()}
        className="shrink-0"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  )
}
