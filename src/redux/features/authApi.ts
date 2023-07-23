import { api } from "../api/api";

const authApi = api.injectEndpoints({ 
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data ) => ({
        url: '/auth/v1/user-signup',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['authUser'],
    }),
    getUser: builder.query({
        query: (token) => `/auth/v1/getUser?token=${token}`,
        providesTags: ['authUser'],
      }),
    login: builder.mutation({
      query: (data ) => ({
        url: '/auth/v1/user-login',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['authUser'],
    }),
  }),
});

export const {
  useSignUpMutation,
  useGetUserQuery,
  useLoginMutation,
} = authApi;