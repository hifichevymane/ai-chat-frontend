import HomePage from '../pages/Home';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomePage,
  beforeLoad: ({ context: { auth } }) => {
    if (!auth.isPending && !auth.accessToken) {
      throw redirect({ to: "/login" });
    }
  },
});
