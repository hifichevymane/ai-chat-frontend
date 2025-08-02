import { useState, useLayoutEffect, useEffect } from "react";
import { api } from "../fetch";
import { AuthContext } from "../auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const handleBeforeUnload = () => api.post('/auth/invalidate-access-token');
    window.addEventListener('beforeunload', handleBeforeUnload);

    const fetchUser = async () => {
      try {
        const { data: { accessToken } } = await api.post<{ accessToken: string }>('/auth/refresh');
        setAccessToken(accessToken);
      } catch {
        setAccessToken(null);
      } finally {
        setIsPending(false);
      }
    };
    fetchUser();

    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

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

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, isPending }}>
      {children}
    </AuthContext.Provider>
  );
};
