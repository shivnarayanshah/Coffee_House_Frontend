import { mainApi } from "./mainApi.jsx";

export const trainingApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTraining: builder.query({
      query: () => ({
        url: "/training",
        method: "GET",
      }),
      providesTags: ["Training"],
    }),
    addTraining: builder.mutation({
      query: ({ token, data }) => ({
        url: "/training",
        method: "POST",
        body: data,
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["Training"],
    }),
    deleteTraining: builder.mutation({
      query: ({ token, id }) => ({
        url: `/training/${id}`,
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["Training"],
    }),
  }),
});

export const {
  useAddTrainingMutation,
  useDeleteTrainingMutation,
  useGetAllTrainingQuery,
} = trainingApi;
