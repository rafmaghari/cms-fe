import {apiSlice} from "@/redux/services/apiSlice";
import {ApiResponse, User} from "@/app/type";

export type UserResponse = ApiResponse<User>

const basePath = `/api/users`

const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        retrieveUsers: builder.query<UserResponse, number | undefined>({
            query: (param = 1) => {
                return `/api/users?page=${param}`
            }
        }),
        storeUser: builder.mutation({
            query: (payload: User) => ({
                url: basePath,
                method: 'POST',
                body: payload
            })
        }),
        updateUser: builder.mutation({
            query: (payload: User) => ({
                url: `${basePath}/${payload.id}`,
                method: 'PUT',
                body: payload
            })
        }),
        deleteUser: builder.mutation({
            query: ({id}) => ({
                url: `${basePath}/${id}`,
                method: 'DELETE',
            })
        })
    })
});

export const {
    useRetrieveUsersQuery,
    useStoreUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = userApiSlice