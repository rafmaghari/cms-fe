import {apiSlice} from "@/redux/services/apiSlice";
import {ApiResponse} from "@/app/type";
import {Attendance} from "@/app/hooks/useAttendanceManagement";

export type AttendanceResponse = ApiResponse<Attendance>

const basePath = `/api/attendances`

const attendanceApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        retrieveAttendance: builder.query<AttendanceResponse, number | undefined>({
            query: (param: 1) => {
                return `${basePath}?page=${param}`
            }
        }),
        storeAttendance: builder.mutation({
            query: (payload: Attendance) => ({
                url: `${basePath}`,
                method: 'POST',
                body: payload
            })
        }),
    })
})

export const {
    useRetrieveAttendanceQuery,
    useStoreAttendanceMutation
} = attendanceApiSlice