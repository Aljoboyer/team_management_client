import { api } from "../api/api";

const authApi = api.injectEndpoints({ 
  endpoints: (builder) => ({
    createTeam: builder.mutation({
      query: (data ) => ({
        url: '/admin/v1/create-team',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['getTeams'],
    }),
    getAllTeams: builder.query({
      query: (token) =>({
        url: '/admin/v1/get-team',
        method: 'GET',
        headers: {
          'x-access-token': token,
        },
      }),
      providesTags: ['getTeams'],
    }),
    getAllUser: builder.query({
      query: () => '/admin/v1/get-all-user',
    }),
    inviteToTeam: builder.mutation({
      query: (data ) => ({
        url: '/admin/v1/send-invitation',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['getTeams'],
    }),
  }),
});

export const {
  useCreateTeamMutation,
  useGetAllTeamsQuery,
  useGetAllUserQuery,
  useInviteToTeamMutation,
} = authApi;