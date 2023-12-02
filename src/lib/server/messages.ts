import type { RequestEvent } from '@sveltejs/kit'

export interface MessageManager {
  addMessage: (message: Message) => void
  addErrorMessage: (body: string) => void
  addSuccessMessage: (body: string) => void
  getMessages: () => Message[]
  consumeMessages: () => Message[]
}

export interface Message {
  type: 'error' | 'success' | 'warning' | 'info'
  body: string
}

export function createMessageManager(event: RequestEvent): MessageManager {
  const { session } = event.locals

  session.messages ??= []

  function addMessage(message: Message) {
    session.messages?.push(message)
  }

  function addErrorMessage(body: string) {
    addMessage({ type: 'error', body })
  }

  function addSuccessMessage(body: string) {
    addMessage({ type: 'success', body })
  }

  function getMessages() {
    return session.messages ?? []
  }

  function consumeMessages() {
    const consumed = getMessages()
    session.messages = []
    return consumed
  }

  return {
    addMessage,
    addErrorMessage,
    addSuccessMessage,
    getMessages,
    consumeMessages,
  }
}
