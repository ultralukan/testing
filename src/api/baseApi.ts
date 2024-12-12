import {createApi} from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../axiosConfig";

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: () => ({}),
});