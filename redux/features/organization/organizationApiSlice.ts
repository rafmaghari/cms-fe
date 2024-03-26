import {apiSlice} from "@/redux/services/apiSlice";
import {Organization} from "@/app/hooks/useOrganizationManagement";
import {ApiResponse} from "@/app/type";

export type OrganizationResponse = ApiResponse<Organization>

const basePath = '/api/organizations'

const organizationApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        retrieveOrganization: builder.query<OrganizationResponse, number | undefined>({
            query: (param = 1, filter = '') => {
                return `${basePath}/?page=${param}`
            }
        }),
        storeOrganization: builder.mutation({
            query: (payload: Organization) => ({
                url: `${basePath}`,
                method: 'POST',
                body: payload
            })
        }),
        updateOrganization: builder.mutation({
            query: (payload: Organization) => ({
                url: `${basePath}/${payload.id}`,
                method: 'PUT',
                body: payload
            })
        }),
        deleteOrganization: builder.mutation({
            query: ({id}) => ({
                url: `${basePath}/${id}`,
                method: 'DELETE',
            })
        }),
    })
})

export const {
    useRetrieveOrganizationQuery,
    useStoreOrganizationMutation,
    useDeleteOrganizationMutation,
    useUpdateOrganizationMutation
} = organizationApiSlice