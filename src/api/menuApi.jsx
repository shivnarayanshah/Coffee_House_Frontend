import { mainApi } from "./mainApi.jsx";

export const menuApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMenu: builder.query({
      query: () => ({
        url: "/menu",
        method: "GET",
      }),
      providesTags: ["Menu"],
    }),
    addMenu: builder.mutation({
      query: ({ token, data }) => ({
        url: "/menu",
        method: "POST",
        body: data,
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["Menu"],
    }),
    deleteMenu: builder.mutation({
      query: ({ token, id }) => ({
        url: `/menu/${id}`,
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["Menu"],
    }),
    updateMenu: builder.mutation({
      query: ({ token, id, data }) => ({
        url: `/menu/${id}`,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["Menu"],
    }),
  }),
});

export const {
  useAddMenuMutation,
  useDeleteMenuMutation,
  useGetAllMenuQuery,
  useUpdateMenuMutation,
} = menuApi;
