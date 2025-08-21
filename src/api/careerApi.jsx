import { mainApi } from "./mainApi.jsx";

export const careerApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCareer: builder.query({
      query: () => ({
        url: "/career",
        method: "GET",
      }),
      providesTags: ["Career"],
    }),
    addCareer: builder.mutation({
      query: ({ token, data }) => ({
        url: "/career",
        method: "POST",
        body: data,
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["Career"],
    }),
    deleteCareer: builder.mutation({
      query: ({ token, id }) => ({
        url: `/career/${id}`,
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["Career"],
    }),
  }),
});

export const {
  useAddCareerMutation,
  useDeleteCareerMutation,
  useGetAllCareerQuery,
} = careerApi;
