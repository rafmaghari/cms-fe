import {errorToast, successToast} from "@/app/lib/DefinedToast";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {User} from "@/app/type";
import {useDeleteUserMutation, useRetrieveUsersQuery, useUpdateUserMutation} from "@/redux/features/user/userApiSlice";
import {useRetrieveOptionGroupQuery} from "@/redux/features/options/optionApiSlice";
import {useRetrieveCurrentEventsQuery} from "@/redux/features/event/eventApiSlice";
import {useStoreAttendanceMutation} from "@/redux/features/attendance/attendanceApiSlice";

const moduleName = 'Attendance'

export const attendanceSchema = z.object({
    user_ids: z.array(z.number()),
    event_id: z.string().min(1),
});

export type Attendance = {
    id?: number;
    user_ids: number[];
    event_id: number
}

export type Event = {
    id?: number;
    organization_id: number;
    name: string
}

export const attendanceDefaultValue = {
    user_ids: [],
    present_at: '',
    event_id: ''
}


export const useAttendanceManagement = (param = 1) => {
    const form = useForm({
        resolver: zodResolver(attendanceSchema),
        defaultValues: attendanceDefaultValue
    });

    const {data: userData,} = useRetrieveUsersQuery(param)
    const {data: eventData,} = useRetrieveCurrentEventsQuery()
    const {data: groupData,} = useRetrieveOptionGroupQuery()

    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<User | null>(null);
    const [storeAttendance, {isLoading: isStoringLoading}] = useStoreAttendanceMutation();
    const [updateUser] = useUpdateUserMutation();
    const [deleteUser] = useDeleteUserMutation();

    const handleCreateOrUpdate = async (values: any, selected: any) => {
        try {
            const operation = selectedItem
                ? updateUser({...values, id: selected.id})
                : storeAttendance(values);
            await operation.unwrap();
            successToast(`${moduleName} has been saved successfully`);
            form.reset(attendanceDefaultValue)
            setSelectedItem(null)
        } catch (error: any) {
            if (error.status === 422 && error.data.errors) {
                const errors = error.data.errors;
                const errorMessages = Object.keys(errors).map((key) => errors[key].join(' ')).join('\n');
                errorToast(errorMessages)
            } else {
                errorToast('Something went wrong')
            }
        }
    };

    const toggleOpen = () => setOpen(prev => !prev);

    const handleDelete = async (groupId: number) => {
        if (window.confirm(`Are you sure you want to delete this ${moduleName.toLowerCase()}?`)) {
            try {
                await deleteUser({id: groupId}).unwrap();
                successToast(`${moduleName} has been deleted successfully`);
                form.reset(attendanceDefaultValue)
            } catch (error) {
                errorToast('Something went wrong')
            }
        }
    };

    return {
        userData,
        isStoringLoading,
        handleCreateOrUpdate,
        form,
        open,
        setOpen,
        selectedItem,
        setSelectedItem,
        toggleOpen,
        handleDelete,
        groupData,
        eventData
    }
}