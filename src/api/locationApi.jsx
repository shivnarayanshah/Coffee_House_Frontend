import { mainApi } from "./mainApi.jsx";

export const locationApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllLocation: builder.query({
      query: () => ({
        url: "/location",
        method: "GET",
      }),
      providesTags: ["Location"],
    }),
    addLocation: builder.mutation({
      query: ({ token, data }) => ({
        url: "/location",
        method: "POST",
        body: data,
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["Location"],
    }),
    deleteLocation: builder.mutation({
      query: ({ token, id }) => ({
        url: `/location/${id}`,
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["Location"],
    }),
  }),
});

export const {
  useAddLocationMutation,
  useDeleteLocationMutation,
  useGetAllLocationQuery,
} = locationApi;
