import { mainApi } from "./mainApi.jsx";
export const serviceApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    addService: builder.mutation({
      query: ({ token, data }) => ({
        url: "/service",
        method: "POST",
        body: data,
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["Service"],
    }),
    getAllService: builder.query({
      query: () => ({
        url: "/service",
        method: "GET",
      }),
      providesTags: ["Service"],
    }),
    deleteService: builder.mutation({
      query: ({ token, id }) => ({
        url: `/service/${id}`,
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["Service"],
    }),
  }),
});

export const {
  useAddServiceMutation,
  useDeleteServiceMutation,
  useGetAllServiceQuery,
} = serviceApi;
