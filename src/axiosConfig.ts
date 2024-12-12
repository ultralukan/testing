import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query";
import Cookies from 'js-cookie';
import axios from "axios";

const url = process.env.NEXT_PUBLIC_API_ADDRESS;

export const baseQuery = fetchBaseQuery({
  baseUrl: url,
  prepareHeaders: (headers) => {
    const access_token = Cookies.get('access_token');

    if (access_token) {
      headers.set('Content-Type', 'application/json');
      headers.set('Authorization', `Bearer ${access_token}`);
    }

    return headers;
  },
});

const refreshAccessToken = async () => {
    const refresh_token = Cookies.get('refresh_token');
    if(refresh_token) {
      try {
        const response = await axios.post(
            `${url}/refresh`,
            { refresh_token: refresh_token}
        );
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        Cookies.set('access_token', response.data.access_token, { expires: 1 });
        Cookies.set('refresh_token', response.data.refresh_token, { expires: 7 });
      } catch (e) {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        window.open('/login', '_self');
      }
    }
  };

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error) {
      if (result.error.status === 401 && api.endpoint !== "login") {
        await refreshAccessToken();
        result = await baseQuery(args, api, extraOptions);
      }
    }
    return result;
};