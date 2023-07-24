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
      query: () => '/admin/v1/get-team',
      providesTags: ['getTeams'],
    }),

  }),
});

export const {
  useCreateTeamMutation,
  useGetAllTeamsQuery,
} = authApi;