import ChatPage from '../pages/Chat';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/$chatId')({
  component: ChatPage,
  beforeLoad: ({ context: { auth } }) => {
    if (!auth.isPending && !auth.accessToken) {
      throw redirect({ to: "/login" });
    }
  },
});
