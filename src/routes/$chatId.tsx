import ChatPage from '../pages/Chat'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$chatId')({
  component: ChatPage,
})
