import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {LoadingSpinner} from "@/components/ui/Spinner";
import React from "react";
import {userDefaultValue} from "@/app/hooks/useUserManagement";

type Props = {
    isStoringLoading: boolean;
    handleSubmit: any;
    toggleOpen: () => void;
    form: any;
    open: boolean
    setSelectedItem: any
}

const UserForm = ({
                      isStoringLoading,
                      handleSubmit,
                      toggleOpen,
                      form,
                      open,
                      setSelectedItem
                  }: Props) => {
    return (
        <div>
            <Dialog open={open}>
                <DialogTrigger asChild>
                    <Button onClick={() => toggleOpen()} variant="outline" className="w-fit">Add User</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>User</DialogTitle>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)}>
                            <div className="py-4">
                                <FormField
                                    control={form.control}
                                    name="first_name"
                                    render={({field}) => {
                                        const hasError = form.formState.errors.first_name;
                                        return (
                                            <FormItem className="mb-2">
                                                <FormLabel>First Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="First Name"
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
                                    name="last_name"
                                    render={({field}) => {
                                        const hasError = form.formState.errors.last_name;
                                        return (
                                            <FormItem className="mb-2">
                                                <FormLabel>Last Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Last Name"
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
                                    name="joined_at"
                                    render={({field}) => {
                                        const hasErrorStartDate = form.formState.errors.joined_at;
                                        return (
                                            <FormItem className="mb-2">
                                                <FormLabel>Joined At</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Start Date"
                                                        type="date"
                                                        {...field}
                                                        value={field.value || ''}
                                                        className={`input-class ${hasErrorStartDate ? 'border border-red-500' : ''}`}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        );
                                    }}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone_number"
                                    render={({field}) => {
                                        const hasError = form.formState.errors.phone_number;
                                        return (
                                            <FormItem className="mb-2">
                                                <FormLabel>Phone Number</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Phone Number"
                                                        type="name"
                                                        {...field}
                                                        value={field.value || ''}
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
                                    name="email"
                                    render={({field}) => {
                                        const hasError = form.formState.errors.email;
                                        return (
                                            <FormItem className="mb-2">
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Email"
                                                        type="email"
                                                        {...field}
                                                        value={field.value || ''}
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
                                    name="facebook_url"
                                    render={({field}) => {
                                        const hasError = form.formState.errors.facebook_url;
                                        return (
                                            <FormItem className="mb-2">
                                                <FormLabel>Facebook Url</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Facebook Url"
                                                        type="text"
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
                                    name="others"
                                    render={({field}) => {
                                        const hasError = form.formState.errors.others;
                                        return (
                                            <FormItem className="mb-2">
                                                <FormLabel>Notes</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Others"
                                                        type="text"
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
                                <div className="my-5">
                                    <Button type="submit"
                                            className="w-full cursor-pointer rounded-lg border bg-gray-900 px-4 py-7 text-white transition hover:bg-opacity-50">
                                        {isStoringLoading ? <LoadingSpinner/> : 'Save'}
                                    </Button>
                                </div>
                                <button onClick={() => {
                                    toggleOpen()
                                    form.reset(userDefaultValue)
                                    setSelectedItem(null)
                                }}
                                        className="underline text-sm w-full text-center"
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

export default UserForm;