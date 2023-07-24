import { api } from "../api/api";

const authApi = api.injectEndpoints({ 
  endpoints: (builder) => ({
    createTeam: builder.mutation({
      query: (data ) => ({
        url: '/admin/v1/create-team',
        method: 'POST',
        body: data,
      }),
    }),

  }),
});

export const {
  useCreateTeamMutation,
} = authApi;