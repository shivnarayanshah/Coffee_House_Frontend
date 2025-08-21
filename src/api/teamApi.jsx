import { mainApi } from "./mainApi.jsx";

export const teamApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTeam: builder.query({
      query: () => ({
        url: "/team",
        method: "GET",
      }),
      providesTags: ["Team"],
    }),
    addTeamMember: builder.mutation({
      query: ({ token, data }) => ({
        url: "/team",
        method: "POST",
        body: data,
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["Team"],
    }),
    deleteTeamMember: builder.mutation({
      query: ({ token, id }) => ({
        url: `/team/${id}`,
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["Team"],
    }),
  }),
});

export const {
  useAddTeamMemberMutation,
  useDeleteTeamMemberMutation,
  useGetAllTeamQuery,
} = teamApi;
