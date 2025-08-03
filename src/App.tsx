import { RouterProvider } from "@tanstack/react-router";
import { useAuth } from "./hooks";
import { AuthProvider } from "./components/AuthProvider";
import { router } from "./router";

function InnerApp() {
  const auth = useAuth();
  const context = { auth };

  if (auth.isPending) {
    return <div>Loading...</div>;
  }

  return <RouterProvider router={router} context={context} />;
}

export default function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
}
