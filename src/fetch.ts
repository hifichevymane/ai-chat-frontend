import axios from 'axios';

// export const api = ofetch.create({
//   baseURL: `${import.meta.env.VITE_BACKEND_API_URL}/api/v1`,

//   onRequest({ options }) {
//     const token = localStorage.getItem(AUTH_TOKEN_KEY);
//     if (!token) return;
//     options.headers.set('Authorization', `Bearer ${token}`);
//   },

//   onRequestError({ request, options, error }) {
//     console.error('[fetch request error]', request, options, error);
//   },

//   onResponseError({ request, options, response }) {
//     console.error(
//       '[fetch response error]',
//       request,
//       options,
//       response.status,
//       response.body
//     );

//     if (response.status !== 401) return;
//     localStorage.removeItem(AUTH_TOKEN_KEY);
//     location.href = '/login';
//   },
// });

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_API_URL}/api/v1`,
});
