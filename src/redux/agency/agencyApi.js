import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const agencyApi = createApi({
  reducerPath: "agencyApi",
  tagTypes: ["Users"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://frontend-test-assignment-api.abz.agency/api/v1",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (page = 1) => ({
        url: "/users",
        params: {
          page,
          count: 6,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.users.map(({ id }) => ({ type: "Users", id })),
              { type: "Users", id: "CARDS" },
            ]
          : [{ type: "Users", id: "CARDS" }],
    }),

    getPositions: builder.query({
      query: () => ({
        url: "/positions",
      }),
      transformResponse: (response) => response.positions,
    }),

    getToken: builder.query({
      query: () => ({
        url: "/token",
      }),
    }),

    addUser: builder.mutation({
      query: ({ token, formData }) => {
        return {
          method: "Post",
          url: "/users",
          body: formData,
          headers: {
            Token: token,
          },
        };
      },
      invalidatesTags: [{ type: "Users", id: "CARDS" }],
    }),
  }),
});

export const {
  useLazyGetTokenQuery,
  useGetPositionsQuery,
  useAddUserMutation,
  useLazyGetUsersQuery,
} = agencyApi;
