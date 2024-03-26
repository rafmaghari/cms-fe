import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    useDeleteOrganizationMutation,
    useRetrieveOrganizationQuery,
    useStoreOrganizationMutation,
    useUpdateOrganizationMutation,
} from "@/redux/features/organization/organizationApiSlice";
import {useRetrieveOptionLeaderQuery} from "@/redux/features/options/optionApiSlice";
import {errorToast, successToast} from "@/app/lib/DefinedToast";
import {useState} from "react";

const moduleName = "Organization"

export const organizationFormSchema = z.object({
    name: z.string().min(3),
    start_date: z.string(),
    leader_id: z.string(),
});

export const organizationDefaultValues = {
    id: '',
    name: '',
    start_date: new Date().toISOString().slice(0, 10),
    leader_id: ''
}

export type Organization = {
    id?: number;
    name: string;
    start_date: string;
    leader_id?: number;
    leader?: string;
    created_at: string;
    is_active: boolean
};

export const useOrganization = (params = 1) => {
    const form = useForm({
        resolver: zodResolver(organizationFormSchema),
        defaultValues: organizationDefaultValues
    });

    const [open, setOpen] = useState(false);
    const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);
    const [storeOrganization, {isLoading: isStoringLoading}] = useStoreOrganizationMutation();
    const [updateOrganization] = useUpdateOrganizationMutation();
    const [deleteOrganization] = useDeleteOrganizationMutation();
    const {
        data: organizationData,
        isLoading: isRetrievingLoading,
        refetch
    } = useRetrieveOrganizationQuery(params);
    const {data: leaderOption} = useRetrieveOptionLeaderQuery()

    const handleCreateOrUpdate = async (values: any, selected: any) => {
        try {
            const operation = selected
                ? updateOrganization({...values, id: selected.id})
                : storeOrganization(values);
            await operation.unwrap();
            successToast(`${moduleName} has been saved successfully`);
            form.reset(organizationDefaultValues)
            refetch();
            setSelectedOrganization(null)
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

    const handleDelete = async (organizationId: number) => {
        if (window.confirm(`Are you sure you want to delete this ${moduleName.toLowerCase()}?`)) {
            try {
                await deleteOrganization({id: organizationId}).unwrap();
                successToast(`${moduleName} has been deleted successfully`);
                refetch();
                form.reset(organizationDefaultValues)
            } catch (error) {
                errorToast('Something went wrong')
            }
        }
    };

    return {
        form,
        handleCreateOrUpdate,
        handleDelete,
        isStoringLoading,
        organizationData,
        isRetrievingLoading,
        leaderOption,
        open,
        setOpen,
        selectedOrganization,
        setSelectedOrganization
    };
};
