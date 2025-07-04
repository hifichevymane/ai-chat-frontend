import HomePage from '../pages/Home';
import { createFileRoute } from '@tanstack/react-router';
import { redirectToLoginIfNotAuthenticated } from '../utils/auth';

export const Route = createFileRoute('/')({
  component: HomePage,
  beforeLoad: redirectToLoginIfNotAuthenticated,
});
