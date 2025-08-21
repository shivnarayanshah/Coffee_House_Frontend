import { mainApi } from "./mainApi.jsx";

export const faqApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFaq: builder.query({
      query: () => ({
        url: "/faqs",
        method: "GET",
      }),
      providesTags: ["Faqs"],
    }),
    addFaq: builder.mutation({
      query: ({ token, data }) => ({
        url: "/faqs",
        method: "POST",
        body: data,
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["Faqs"],
    }),
    deleteFaq: builder.mutation({
      query: ({ token, id }) => ({
        url: `/faqs/${id}`,
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["Faqs"],
    }),
  }),
});

export const { useAddFaqMutation, useDeleteFaqMutation, useGetAllFaqQuery } =
  faqApi;
