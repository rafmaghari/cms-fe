import {apiSlice} from "@/redux/services/apiSlice";
import {PaginationType} from "@/app/type/PaginationType";

export type OptionResponse = {
    data: OptionType[],
    meta: PaginationType
}

export type OptionType = {
    value: string
    label: string
}

const optionApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        retrieveOptionLeader: builder.query<OptionResponse, void>({
            query: () => '/api/leader-options'
        }),
        retrieveOptionOrganization: builder.query<OptionResponse, void>({
            query: () => '/api/organization-options'
        }),
        retrieveOptionGroup: builder.query<OptionResponse, void>({
            query: () => '/api/group-options'
        })
    })
});

export const {
    useRetrieveOptionLeaderQuery,
    useRetrieveOptionOrganizationQuery,
    useRetrieveOptionGroupQuery
} = optionApiSlice