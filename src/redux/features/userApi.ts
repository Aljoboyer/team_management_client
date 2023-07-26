import { api } from "../api/api";

const userApi = api.injectEndpoints({ 
  endpoints: (builder) => ({
    statusChange: builder.mutation({
      query: (data ) => ({
        url: '/user/v1/status-change',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['getTeams'],
    }),
    getIndividualTeam: builder.query({
      query: (id) => `/user/v1/individual-team-data?id=${id}`,
      providesTags: ['getTeams'],
    }),

  }),
});

export const {
  useStatusChangeMutation,
  useGetIndividualTeamQuery,
} = userApi;