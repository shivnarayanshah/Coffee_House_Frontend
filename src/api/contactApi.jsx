import { mainApi } from "./mainApi.jsx";

export const contactApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    addContact: builder.mutation({
      query: ({ data }) => ({
        url: "/contact",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Contacts"],
    }),
    getAllContact: builder.query({
      query: () => ({
        url: "/api/contact",
        method: "GET",
      }),
      providesTags: ["Contacts"],
    }),
    deleteContact: builder.mutation({
      query: ({ token, id }) => ({
        url: `/api/contact/${id}`,
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["Contacts"],
    }),
  }),
});

export const {
  useAddContactMutation,
  useDeleteContactMutation,
  useGetAllContactQuery,
} = contactApi;
