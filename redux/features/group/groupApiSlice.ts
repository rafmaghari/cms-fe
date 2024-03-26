import {apiSlice} from "@/redux/services/apiSlice";
import {Group} from "@/app/hooks/useGroupManagement";
import {ApiResponse} from "@/app/type";

export type GroupResponse = ApiResponse<Group>

const basePath = '/api/groups'

const groupApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        retrieveGroup: builder.query<GroupResponse, number | undefined>({
            query: (param = 1) => {
                return `${basePath}?page=${param}`
            }
        }),
        storeGroup: builder.mutation({
            query: (payload: Group) => ({
                url: `${basePath}`,
                method: 'POST',
                body: payload
            })
        }),
        updateGroup: builder.mutation({
            query: (payload: Group) => ({
                url: `${basePath}/${payload.id}`,
                method: 'PUT',
                body: payload
            })
        }),
        deleteGroup: builder.mutation({
            query: ({id}) => ({
                url: `${basePath}/${id}`,
                method: 'DELETE',
            })
        }),
        deactivateGroup: builder.mutation({
            query: ({group_id}) => ({
                url: `${basePath}/deactivate`,
                method: 'POST',
                body: {group_id}
            })
        }),
    })
})

export const {
    useRetrieveGroupQuery,
    useStoreGroupMutation,
    useDeleteGroupMutation,
    useUpdateGroupMutation,
    useDeactivateGroupMutation
} = groupApiSlice