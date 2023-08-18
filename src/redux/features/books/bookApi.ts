import { api } from '@/redux/api/apiSlice';

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBook: builder.query({
      query: () => '/book/allbooks',
    }),
        getSingleBook: builder.query({
          query:(id)=>`/book/${id}`
      })
  }),
});

export const {  useGetAllBookQuery,useGetSingleBookQuery } = bookApi;
