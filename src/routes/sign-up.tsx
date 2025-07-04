import SignUpPage from '../pages/SignUp';
import { createFileRoute } from '@tanstack/react-router';
import { redirectToHomeIfAuthenticated } from '../utils/auth';

export const Route = createFileRoute('/sign-up')({
  component: SignUpPage,
  beforeLoad: redirectToHomeIfAuthenticated,
});
