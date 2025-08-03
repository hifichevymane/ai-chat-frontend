import { useState, useLayoutEffect, useEffect } from "react";
import { api } from "../fetch";
import { AuthContext } from "../auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [shouldLogoutOnBeforeUnload, setShouldLogoutOnBeforeUnload] = useState<boolean>(false);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const { data: { accessToken } } = await api.post<{ accessToken: string }>('/auth/refresh');
        setAccessToken(accessToken);
      } catch {
        setAccessToken(null);
      } finally {
        setIsPending(false);
      }
    };
    fetchAccessToken();
  }, []);

  const handleLogoutOnBeforeUnload = () => api.post('/auth/logout');
  const handleInvalidateAccessTokenOnBeforeUnload = () => api.post('/auth/invalidate-access-token');

  useEffect(() => {
    if (shouldLogoutOnBeforeUnload) {
      window.removeEventListener('beforeunload', handleInvalidateAccessTokenOnBeforeUnload);
      window.addEventListener('beforeunload', handleLogoutOnBeforeUnload);
    } else if (accessToken) {
      window.removeEventListener('beforeunload', handleLogoutOnBeforeUnload);
      window.addEventListener('beforeunload', handleInvalidateAccessTokenOnBeforeUnload);
    }

    return () => {
      window.removeEventListener('beforeunload', handleInvalidateAccessTokenOnBeforeUnload);
      window.removeEventListener('beforeunload', handleLogoutOnBeforeUnload);
    };
  }, [shouldLogoutOnBeforeUnload, accessToken]);

  useLayoutEffect(() => {
    const requestInterceptor = api.interceptors.request.use((config) => {
      config.headers.Authorization = !config._retry && accessToken
        ? `Bearer ${accessToken}`
        : config.headers.Authorization;
      return config;
    });

    return () => {
      api.interceptors.request.eject(requestInterceptor);
    };
  }, [accessToken]);

  useLayoutEffect(() => {
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && originalRequest.url !== '/auth/refresh') {
          try {
            const { data: { accessToken } } = await api.post<{ accessToken: string }>('/auth/refresh');
            setAccessToken(accessToken);
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            originalRequest._retry = true;

            return api(originalRequest);
          } catch (refreshError) {
            setAccessToken(null);
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const value = { accessToken, setAccessToken, isPending, setShouldLogoutOnBeforeUnload };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
