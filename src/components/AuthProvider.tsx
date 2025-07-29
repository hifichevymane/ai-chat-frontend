import { useState, useLayoutEffect, useEffect } from "react";
import { api } from "../fetch";
import User from "../interfaces/User";
import { AuthContext } from "../auth";
import { useNavigate } from "@tanstack/react-router";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: user } = await api.get('/auth/me');
      setUser(user);
    };
    fetchUser();
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

        if (error.response.status === 401) {
          try {
            const { data: { token } } = await api.post<{ token: string }>('/auth/refresh');
            setAccessToken(token);

            originalRequest.headers.Authorization = `Bearer ${token}`;
            originalRequest._retry = true;

            const { data: user } = await api.get('/auth/me');
            setUser(user);

            return api(originalRequest);
          } catch {
            setAccessToken(null);
            setUser(null);
            navigate({ to: '/login' });
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ accessToken, user }}>
      {children}
    </AuthContext.Provider>
  );
};
