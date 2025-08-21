import { mainApi } from "./mainApi.jsx";

export const userApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/users/register",
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/users/login",
        method: "POST",
        body: data,
      }),
    }),
    getUserById: builder.query({
      query: ({ id, token }) => ({
        url: `/users/${id}`,
        headers: {
          Authorization: token,
        },
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUserByIdQuery,
} = userApi;
