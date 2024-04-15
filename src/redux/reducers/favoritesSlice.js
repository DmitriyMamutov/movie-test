import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const favoritesSlice = createApi({
  reducerPath: "favoritesSlice",
  tagTypes: ["Favorites"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/" }),
  endpoints: (build) => ({
    getFavorites: build.query({
      query: () => "favorites",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Favorites", id })),
              { type: "Favorites", id: "LIST" },
            ]
          : [{ type: "Favorites", id: "LIST" }],
    }),
    deleteFavorite: build.mutation({
      query: (id) => ({
        url: `favorites/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Favorites", id: "LIST" }],
    }),
    addFavorite: build.mutation({
      query: (body) => ({
        url: "favorites",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Favorites", id: "LIST" }]
    }),
  }),
});

export const {
  useGetFavoritesQuery,
  useDeleteFavoriteMutation,
  useAddFavoriteMutation,
} = favoritesSlice;
