import { mainApi } from "./mainApi.jsx";

export const searchApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    searchAll: builder.query({
      query: (keywords) => ({
        url: `/search?keyword=${keywords}`,
        method: "GET",
      }),
      providesTags: ["Search"],
    }),
  }),
});

export const { useSearchAllQuery } = searchApi;
