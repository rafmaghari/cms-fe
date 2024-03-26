import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import {logout, setAuth} from '@/redux/features/authSlice';

const TYPE_MUTATION = 'mutation'

const fetchBaseQueryWithCSRF = fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_HOST}`,
    credentials: 'include', // Ensure this matches the credentials policy for CORS
    prepareHeaders: async (headers, { getState, endpoint, type }) => {

        if (type === TYPE_MUTATION) {
            await fetch(`${process.env.NEXT_PUBLIC_HOST}/sanctum/csrf-cookie`, {
                credentials: 'include',
            });
        }

        const getXSRFToken: any = document.cookie
            .split('; ')
            .find(row => row.startsWith('XSRF-TOKEN='))
            ?.split('=')[1];

        if (getXSRFToken) {
            headers.set('X-XSRF-TOKEN', decodeURIComponent(getXSRFToken));
        }

        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');

        return headers;
    },
});


// Enhanced base query without re-authentication logic, redirect on 401
const baseQueryWithRedirect: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    const result = await fetchBaseQueryWithCSRF(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        api.dispatch(logout());
        window.location.href = '/auth/signin';
    } else {
        api.dispatch(setAuth())
    }
    return result;
};

// Create an API slice with the simplified error handling logic
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithRedirect,
    endpoints: builder => ({})
});
