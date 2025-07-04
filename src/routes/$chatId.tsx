import ChatPage from '../pages/Chat'
import { createFileRoute } from '@tanstack/react-router'
import { redirectToLoginIfNotAuthenticated } from '../utils/auth'

export const Route = createFileRoute('/$chatId')({
  component: ChatPage,
  beforeLoad: redirectToLoginIfNotAuthenticated,
})
