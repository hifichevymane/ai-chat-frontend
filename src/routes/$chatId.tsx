import ChatPage from '../pages/Chat';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/$chatId')({
  component: ChatPage,
  beforeLoad: ({ context }) => {
    if (context.auth.isPending) return;
    if (!context.auth.accessToken) {
      throw redirect({ to: "/login" });
    }
  },
});
