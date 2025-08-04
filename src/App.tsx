import { RouterProvider } from "@tanstack/react-router";
import { useAuth } from "./hooks";
import { router } from "./router";

import { AuthProvider } from "./components/AuthProvider";
import LoadingPlaceholder from "./components/LoadingPlaceholder";

function InnerApp() {
  const auth = useAuth();
  const context = { auth };

  return (
    <>
      <LoadingPlaceholder isLoading={auth.isPending} minDuration={500} />
      <RouterProvider router={router} context={context} />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
}
