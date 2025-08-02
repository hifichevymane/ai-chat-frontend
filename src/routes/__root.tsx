import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import type { AuthContextState } from '../auth';
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

interface RouterContext {
  auth: AuthContextState;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
