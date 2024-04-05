import {apiSlice} from "@/redux/services/apiSlice";
import {ApiResponse} from "@/app/type";
import {Event} from "@/app/hooks/useAttendanceManagement";

export type EventResponse = ApiResponse<Event>

const basePath = `/api/events`

const eventApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        retrieveCurrentEvents: builder.query<EventResponse, void>({
            query: () => {
                return `${basePath}/current`
            }
        })
    })
})

export const {
    useRetrieveCurrentEventsQuery
} = eventApiSlice