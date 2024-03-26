import {errorToast, successToast} from "@/app/lib/DefinedToast";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {User} from "@/app/type";
import {
    useDeleteUserMutation,
    useRetrieveUsersQuery,
    useStoreUserMutation,
    useUpdateUserMutation
} from "@/redux/features/user/userApiSlice";

const moduleName = 'User'

export const userFormSchema = z.object({
    first_name: z.string().min(3),
    last_name: z.string().min(3),
    joined_at: z.string(),
    phone_number: z.string(),
    email: z.string().email(),
    facebook_url: z.string().url(),
});

const userDefaultValue = {
    first_name: '',
    last_name: '',
    joined_at: '',
    phone_number: '',
    email: '',
    facebook_url: '',
}

export const useGroupManagement = (param = 1) => {
    const form = useForm({
        resolver: zodResolver(userFormSchema),
        defaultValues: userDefaultValue
    });

    const {
        data: userData,
        isLoading: isRetrievingLoading,
        refetch,
    } = useRetrieveUsersQuery(param)

    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<User | null>(null);
    const [storeUser, {isLoading: isStoringLoading}] = useStoreUserMutation();
    const [updateUser] = useUpdateUserMutation();
    const [deleteUser] = useDeleteUserMutation();

    const handleCreateOrUpdate = async (values: any, selected: any) => {
        try {
            const operation = selectedItem
                ? updateUser({...values, id: selected.id})
                : storeUser(values);
            await operation.unwrap();
            successToast(`${moduleName} has been saved successfully`);
            form.reset(userDefaultValue)
            refetch();
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
                refetch();
                form.reset(userDefaultValue)
            } catch (error) {
                errorToast('Something went wrong')
            }
        }
    };

    return {
        userData,
        isRetrievingLoading,
        isStoringLoading,
        handleCreateOrUpdate,
        form,
        open,
        setOpen,
        selectedItem,
        setSelectedItem,
        toggleOpen,
        handleDelete,
    }
}