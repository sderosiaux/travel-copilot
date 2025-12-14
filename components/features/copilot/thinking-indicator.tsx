'use client'

export function ThinkingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-2">
      <div className="flex gap-1">
        <span
          className="h-2 w-2 rounded-full bg-primary-500 animate-bounce"
          style={{ animationDelay: '0ms', animationDuration: '1.4s' }}
        />
        <span
          className="h-2 w-2 rounded-full bg-primary-500 animate-bounce"
          style={{ animationDelay: '150ms', animationDuration: '1.4s' }}
        />
        <span
          className="h-2 w-2 rounded-full bg-primary-500 animate-bounce"
          style={{ animationDelay: '300ms', animationDuration: '1.4s' }}
        />
      </div>
      <span className="ml-2 text-sm text-text-secondary">Thinking...</span>
    </div>
  )
}
