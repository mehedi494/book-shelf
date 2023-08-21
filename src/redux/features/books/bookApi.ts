import { api } from '@/redux/api/apiSlice';

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBook: builder.query({
      query: () => `/api/v1/book/allbooks`,
    }),
    getSingleBook: builder.query({
      query: (id) => `/api/v1/book/${id}`,
      providesTags: ['books',"comments"],
    }),
    addNewBook: builder.mutation({
      query: ({ token, data }) => ({
        url: '/api/v1/book/add-new',
        method: 'POST',
        headers: { authorization: token },
        body: data,
      }),
      invalidatesTags: ['books'],
    }),
    editBook: builder.mutation({
      query: ({ token, data }) => ({
        url: '/api/v1/book/update',
        method: 'PATCH',
        headers: { authorization: token },
        body: data,
      }),
      invalidatesTags: ['books'],
    }),
    deleteBook: builder.mutation({
      query: ({ token, id }) => ({
        url: `/api/v1/book/?id=${id}`,
        method: 'DELETE',
        headers: { authorization: token },
        
      }),
      invalidatesTags:['books'],
    }),
    commentBook: builder.mutation({
      query: ({ token, payload }) => ({
        url: `/api/v1/book/comment`,
        method: 'PATCH',
        headers: { authorization: token },
        body: payload,
      }),
      invalidatesTags:['comments']
    }),
    topTenBooks: builder.query({
      query: () => `/api/v1/book/allbooks?sortBy=createdAt&&sortOrder=desc`,
      providesTags: ['books'],
    }),
    
  }),
});

export const {
  useGetAllBookQuery,
  useGetSingleBookQuery,
  useAddNewBookMutation,
  useEditBookMutation,
  useDeleteBookMutation,
  useCommentBookMutation,
  useTopTenBooksQuery
} = bookApi;
