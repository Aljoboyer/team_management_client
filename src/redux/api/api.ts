import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//https://team-management-server.vercel.app

// http://localhost:5000

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://team-management-server.vercel.app' }),
  tagTypes: ['authUser', 'getTeams'],
  endpoints: () => ({}),
});