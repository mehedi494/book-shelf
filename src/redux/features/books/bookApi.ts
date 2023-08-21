import { api } from '@/redux/api/apiSlice';

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBook: builder.query({
      query: () => `/book/allbooks`,
    }),
    getSingleBook: builder.query({
      query: (id) => `/book/${id}`,
      providesTags: ['books'],
    }),
    addNewBook: builder.mutation({
      query: ({ token, data }) => ({
        url: '/book/add-new',
        method: 'POST',
        headers: { authorization: token },
        body: data,
      }),
      invalidatesTags: ['books'],
    }),
    editBook: builder.mutation({
      query: ({ token, data }) => ({
        url: '/book/update',
        method: 'PATCH',
        headers: { authorization: token },
        body: data,
      }),
      invalidatesTags: ['books'],
    }),
    deleteBook: builder.mutation({
      query: ({ token, id }) => ({
        url: `/book/?id=${id}`,
        method: 'DELETE',
        headers: { authorization: token },
      }),
    }),
  }),
});

export const {
  useGetAllBookQuery,
  useGetSingleBookQuery,
  useAddNewBookMutation,
  useEditBookMutation,
  useDeleteBookMutation,
} = bookApi;
