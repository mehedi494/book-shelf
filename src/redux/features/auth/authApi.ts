import { api } from '@/redux/api/apiSlice';

interface ILoging {
  email: string;
  password: string;
}
const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data: ILoging) => ({
        url: '/user/login',
        method: 'POST',
        body: data,
      }),
    }),
    createUser: builder.mutation({
      query: (token:string ) => ({
        url: '/user',
        method: 'GET',
        // headers:authorization': localStorage?.getItem('accessToken'),
        headers: { authorization: token },
      }),
    }),
    getMeUser: builder.mutation({
      query: (token:string ) => ({
        url: '/user',
        method: 'GET',
        // headers:authorization': localStorage?.getItem('accessToken'),
        headers: { authorization: token },
      }),
    }),
    /* getSingleBook: builder.query({
          query:(id)=>`/book/${id}`
      }) */
  }),
});

export const { useLoginUserMutation, useGetMeUserMutation } = authApi;
