import { api } from "@/redux/api/apiSlice";

const bookApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getBook: builder.query({
            query:()=>'/book/allbooks'
        })
    })
})

export const { useGetBookQuery } = bookApi;