import { useState, useLayoutEffect, useEffect } from "react";
import { api } from "../fetch";
import User from "../interfaces/User";
import { AuthContext } from "../auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: user } = await api.get<User>('/auth/me');
        setUser(user);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  useLayoutEffect(() => {
    const requestInterceptor = api.interceptors.request.use((config) => {
      config.headers.Authorization = !config._retry && accessToken
        ? `Bearer ${accessToken}`
        : config.headers.Authorization;
      console.log(accessToken);
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

            return api(originalRequest);
          } catch (refreshError) {
            setAccessToken(null);
            setUser(null);
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
    <AuthContext.Provider value={{ accessToken, user, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
