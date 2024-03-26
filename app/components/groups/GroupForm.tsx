import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {SelectData} from "@/app/components/common/SelectData";
import {LoadingSpinner} from "@/components/ui/Spinner";
import {organizationDefaultValues} from "@/app/hooks/useOrganizationManagement";
import React from "react";
import {LeaderOptionResponse} from "@/redux/features/options/optionApiSlice";

type Props = {
    isStoringLoading: boolean;
    leaderOption: LeaderOptionResponse | undefined;
    organizationOption: any,
    handleSubmit: any;
    toggleOpen: () => void;
    form: any;
    open: boolean
    setSelectedItem: any,
    deactivateGroup: any
    selectedItem: any
}

const GroupForm = ({isStoringLoading, leaderOption, handleSubmit, toggleOpen, form, open, setSelectedItem, organizationOption, deactivateGroup, selectedItem}: Props) => {
    return (
        <div>
            <Dialog open={open}>
                <DialogTrigger asChild>
                    <Button onClick={() => toggleOpen()} variant="outline" className="w-fit">Add Group</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Group</DialogTitle>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)}>
                            <div className="py-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({field}) => {
                                        const hasError = form.formState.errors.name;
                                        return (
                                            <FormItem className="mb-2">
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Name"
                                                        type="name"
                                                        {...field}
                                                        value={field.value}
                                                        className={`input-class ${hasError ? 'border border-red-500' : ''}`}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        );
                                    }}
                                />
                                <FormField
                                    control={form.control}
                                    name="leader_id"
                                    render={({field}) => {
                                        const hasErrorLeaderId = form.formState.errors.leader_id;
                                        return (
                                            <FormItem className="mb-2">
                                                <FormLabel>Leader</FormLabel>
                                                <FormControl>
                                                    <SelectData
                                                        name={field.name}
                                                        value={field.value || ''}
                                                        onChange={field.onChange}
                                                        onBlur={field.onBlur}
                                                        className={`py-3 px-2 input-class ${hasErrorLeaderId ? 'border border-red-500' : ''}`}
                                                        placeholder="Select Leader"
                                                        items={leaderOption?.data || []}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        );
                                    }}
                                />
                                <FormField
                                    control={form.control}
                                    name="organization_id"
                                    render={({field}) => {
                                        const hasErrorOrganizationId = form.formState.errors.organization_id;
                                        return (
                                            <FormItem className="mb-2">
                                                <FormLabel>Leader</FormLabel>
                                                <FormControl>
                                                    <SelectData
                                                        name={field.name}
                                                        value={field.value || ''}
                                                        onChange={field.onChange}
                                                        onBlur={field.onBlur}
                                                        className={`py-3 px-2 input-class ${hasErrorOrganizationId ? 'border border-red-500' : ''}`}
                                                        placeholder="Select Organization"
                                                        items={organizationOption?.data || []}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        );
                                    }}
                                />
                                <div className="my-5">
                                    <Button type="submit"
                                            className="w-full cursor-pointer rounded-lg border bg-gray-900 px-4 py-7 text-white transition hover:bg-opacity-50">
                                        {isStoringLoading ? <LoadingSpinner/> : 'Save'}
                                    </Button>
                                </div>
                                {selectedItem && (
                                    <button
                                        onClick={() => deactivateGroup()}
                                        className="underline py-4 text-red-500 text-sm w-full text-center"
                                        type="button">Deactivate
                                    </button>
                                )}
                                <button onClick={() => {
                                    toggleOpen()
                                    form.reset(organizationDefaultValues)
                                    setSelectedItem(null)
                                }}
                                        className="underline text-sm py-4 w-full text-center"
                                        type="button">Cancel
                                </button>


                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default GroupForm;