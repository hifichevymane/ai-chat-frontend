import HomePage from '../pages/Home';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomePage,
  beforeLoad: ({ context }) => {
    if (context.auth.isPending) return;
    if (!context.auth.accessToken) {
      throw redirect({ to: "/login" });
    }
  },
});
