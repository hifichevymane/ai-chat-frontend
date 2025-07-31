import SignUpPage from '../pages/SignUp';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/sign-up')({
  component: SignUpPage,
  beforeLoad: ({ context }) => {
    if (context.auth.accessToken) {
      throw redirect({ to: "/" });
    }
  },
});
