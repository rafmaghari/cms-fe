import { apiSlice} from "@/redux/services/apiSlice";

type User = {
    name: string,
    email: string,
}

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        retrieveUser: builder.query<User, void>({
            query: () => '/me'
        }),
        login: builder.mutation({
            query: ({ email, password}) => ({
                url: '/auth/login',
                method: 'POST',
                body: {email, password}
            })
        }),
        register: builder.mutation({
            query: ({ name, email, password, password_confirmation}) => ({
                url: '/auth/register',
                method: 'POST',
                body: { name, email, password, password_confirmation}
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            })
        })
    })
})

export const {
    useRetrieveUserQuery,
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation
} = authApiSlice