import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import dotenv from "dotenv";
dotenv.config();

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.MAIN_API_URL}/api`,
  }),
  endpoints: (builder) => ({}),
});
