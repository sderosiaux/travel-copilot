import { create } from 'zustand'

export interface CopilotAction {
  type: 'link' | 'button' | 'chip'
  label: string
  payload: any
}

export interface Message {
  id: string
  role: 'user' | 'copilot'
  content: string
  timestamp: Date
  actions?: CopilotAction[]
}

interface CopilotState {
  messages: Message[]
  isThinking: boolean
  suggestions: string[]

  sendMessage: (content: string) => Promise<void>
  clearMessages: () => void
  setSuggestions: (suggestions: string[]) => void
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void
  setThinking: (thinking: boolean) => void
}

export const useCopilotStore = create<CopilotState>((set, get) => ({
  messages: [],
  isThinking: false,
  suggestions: [
    'Show my upcoming trips',
    'What is my next flight?',
    'Create a new trip',
    'How do I file a claim?',
  ],

  sendMessage: async (content: string) => {
    const userMessage: Message = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      content,
      timestamp: new Date(),
    }

    set({ isThinking: true })
    get().addMessage(userMessage)

    // Import copilot engine dynamically to avoid circular deps
    const { processMessage } = await import('@/lib/copilot/engine')

    try {
      const response = await processMessage(content, get().messages)

      const copilotMessage: Message = {
        id: `msg-${Date.now()}-copilot`,
        role: 'copilot',
        content: response.content,
        timestamp: new Date(),
        actions: response.actions,
      }

      get().addMessage(copilotMessage)

      if (response.suggestions) {
        set({ suggestions: response.suggestions })
      }
    } catch (error) {
      const errorMessage: Message = {
        id: `msg-${Date.now()}-error`,
        role: 'copilot',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      }
      get().addMessage(errorMessage)
    } finally {
      set({ isThinking: false })
    }
  },

  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id: `msg-${Date.now()}-${message.role}`,
          timestamp: new Date(),
        },
      ],
    })),

  clearMessages: () => set({ messages: [] }),

  setSuggestions: (suggestions) => set({ suggestions }),

  setThinking: (thinking) => set({ isThinking: thinking }),
}))
