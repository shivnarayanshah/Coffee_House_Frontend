import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import dotenv from "dotenv";
dotenv.config();
export const BASE_URL = process.env.MAIN_API_URL;

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
  }),
  endpoints: (builder) => ({}),
});
