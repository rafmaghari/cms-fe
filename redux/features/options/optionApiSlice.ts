import {apiSlice} from "@/redux/services/apiSlice";
import {PaginationType} from "@/app/type/PaginationType";

export type LeaderOptionResponse = {
    data: OptionType[],
    meta: PaginationType
}

export type OptionType = {
    value: string
    label: string
}

const optionApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        retrieveOptionLeader: builder.query<LeaderOptionResponse, void>({
            query: () => '/api/leader-options'
        }),
        retrieveOptionOrganization: builder.query<LeaderOptionResponse, void>({
            query: () => '/api/organization-options'
        })
    })
});

export const {
    useRetrieveOptionLeaderQuery,
    useRetrieveOptionOrganizationQuery
} = optionApiSlice