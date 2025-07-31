import axios from 'axios';

declare module "axios" {
  export interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_API_URL}/api/v1`,
  withCredentials: true,
});
