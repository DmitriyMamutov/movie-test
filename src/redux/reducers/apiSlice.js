import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  tagTypes: ["Movies"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/" }),
  endpoints: (build) => ({
    getMovies: build.query({
      query: () => "movies",
       providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Movies", id })),
              { type: "Movies", id: "LIST" },
            ]
          : [{ type: "Movies", id: "LIST" }],
    }),
    getMovieById: build.query({
      query: (id) => `movies/${id}`,
      invalidatesTags: [{ type: "Movies", id: "LIST" }],
    }),
    searchMovie: build.query({
      query: (query) => `movies?q=${query}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Movies", id })),
              { type: "Movies", id: "LIST" },
            ]
          : [{ type: "Movies", id: "LIST" }],
    }),
    deleteMovie: build.mutation({
      query: (id) => ({
        url: `movies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Movies", id: "LIST" }],
    }),
    updateMovie: build.mutation({
      query: (body) => ({
        url: `movies/${body.id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Movies", id: "LIST" }],

    }),
    addMovie: build.mutation({
      query: (body) => ({
        url: "movies",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Movies", id: "LIST" }],
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetMovieByIdQuery,
  useSearchMovieQuery,
  useDeleteMovieMutation,
  useUpdateMovieMutation,
  useAddMovieMutation,
} = apiSlice;
