import {
    useDeactivateGroupMutation,
    useDeleteGroupMutation,
    useRetrieveGroupQuery,
    useStoreGroupMutation,
    useUpdateGroupMutation
} from "@/redux/features/group/groupApiSlice";
import {
    useRetrieveOptionLeaderQuery,
    useRetrieveOptionOrganizationQuery
} from "@/redux/features/options/optionApiSlice";
import {errorToast, successToast} from "@/app/lib/DefinedToast";
import {organizationDefaultValues} from "@/app/hooks/useOrganizationManagement";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";

const moduleName = 'Group'

export const groupFormSchema = z.object({
    name: z.string().min(3),
    leader_id: z.string(),
    organization_id: z.string(),
});

export type Group = {
    id?: number;
    name: string;
    leader_id?: number;
    leader?: string;
    organization?: string;
    organization_id?: number;
    deactivated_at?: string
    created_at?: string;
}

const groupDefaultValue = {
    id: '',
    name: '',
    deactivated_at: '',
    organization_id: '',
    leader_id: ''
}

export const useGroupManagement = (param = 1) => {
    const form = useForm({
        resolver: zodResolver(groupFormSchema),
        defaultValues: groupDefaultValue
    });

    const {
        data: groupData,
        isLoading: isRetrievingLoading,
        refetch,
    } = useRetrieveGroupQuery(param)

    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Group | null>(null);
    const [storeGroup, {isLoading: isStoringLoading}] = useStoreGroupMutation();
    const [updateGroup] = useUpdateGroupMutation();
    const [deleteGroup] = useDeleteGroupMutation();
    const [deactivateGroup] = useDeactivateGroupMutation();

    const {data: leaderOption} = useRetrieveOptionLeaderQuery()
    const {data: organizationOption} = useRetrieveOptionOrganizationQuery()

    const handleCreateOrUpdate = async (values: any, selected: any) => {
        try {
            const operation = selectedItem
                ? updateGroup({...values, id: selected.id})
                : storeGroup(values);
            await operation.unwrap();
            successToast(`${moduleName} has been saved successfully`);
            form.reset(organizationDefaultValues)
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
                await deleteGroup({id: groupId}).unwrap();
                successToast(`${moduleName} has been deleted successfully`);
                refetch();
                form.reset(groupDefaultValue)
            } catch (error) {
                errorToast('Something went wrong')
            }
        }
    };

    const handleDeactivateGroup = async () => {
        if (window.confirm(`Are you sure you want to deactivate this ${moduleName.toLowerCase()}?`)) {
            try {
                await deactivateGroup({group_id: selectedItem?.id}).unwrap();
                successToast(`${moduleName} has been deactivated successfully`);
                refetch();
                form.reset(groupDefaultValue)
                toggleOpen()
            } catch (error) {
                errorToast('Something went wrong')
            }
        }
    }


    return {
        groupData,
        isRetrievingLoading,
        leaderOption,
        storeGroup,
        isStoringLoading,
        handleCreateOrUpdate,
        form,
        open,
        setOpen,
        selectedItem,
        setSelectedItem,
        toggleOpen,
        organizationOption,
        handleDelete,
        handleDeactivateGroup
    }
}