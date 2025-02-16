import { ofetch } from 'ofetch';

export const api = ofetch.create({
  baseURL: 'http://localhost:8000/api/v1',

  onRequestError({ request, options, error }) {
    console.error("[fetch request error]", request, options, error);
  },

  onResponseError({ request, options, response }) {
    console.error(
      "[fetch response error]",
      request,
      options,
      response.status,
      response.body
    );
  },
});
