"use client";

import React, {useState} from "react";
import PageTitle from "@/app/components/common/PageTitle";
import {attendanceSchema, useAttendanceManagement} from "@/app/hooks/useAttendanceManagement";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import * as z from "zod";
import {SelectEvent} from "@/app/components/attendances/SelectEvent";
import {Button} from "@/components/ui/button";
import {LoadingSpinner} from "@/components/ui/Spinner";


export default function Page() {
    const [currentPage, setCurrentPage] = useState(1);
    const {
        userData,
        eventData,
        form,
        handleCreateOrUpdate,
        selectedItem,
        toggleOpen,
        isStoringLoading
    } = useAttendanceManagement(currentPage)


    const handleSubmit = async (values: z.infer<typeof attendanceSchema>) => {
        console.log(values, 'value')
        await handleCreateOrUpdate(values, selectedItem)
        toggleOpen()
    };

    const handleCheckboxChange = (userId: any) => {
        const currentSelection: number[] = form.getValues("user_ids");
        if (currentSelection.includes(userId)) {
            // @ts-ignore
            form.setValue("user_ids", currentSelection.filter((id: number) => id !== userId));
        } else {
            // @ts-ignore
            form.setValue("user_ids", [...currentSelection, userId]);
        }
    };

    return (
        <div className="flex flex-col gap-5  w-full">
            <PageTitle title="Attendance"/>
            <p className="font-semibold text-xl">Who&apos;s present?</p>
            <div className="flex items-center justify-between">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <FormField
                            control={form.control}
                            name="event_id"
                            render={({field}) => {
                                const hasErrorLeaderId = form.formState.errors.event_id;
                                return (
                                    <FormItem className="mb-2">
                                        <FormLabel>Event</FormLabel>
                                        <FormControl>
                                            <SelectEvent
                                                name={field.name}
                                                value={field.value || ''}
                                                onChange={field.onChange}
                                                onBlur={field.onBlur}
                                                className={`py-3 px-2 input-class ${hasErrorLeaderId ? 'border border-red-500' : ''}`}
                                                placeholder="Select Event"
                                                items={eventData}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                );
                            }}
                        />
                        <FormField
                            control={form.control}
                            name="user_ids"
                            render={({field}) => {
                                const hasErrorUserId = form.formState.errors.user_ids;
                                return (
                                    <FormItem className="mb-2">
                                        <FormLabel>Users</FormLabel>
                                        <FormControl
                                            className={`py-3 px-2 ${hasErrorUserId ? 'border border-red-500' : ''}`}>
                                            <>
                                                {userData?.data.map((user) => (
                                                    <div key={user.id}>
                                                        <input
                                                            type="checkbox"
                                                            id={`user-${user.id}`}
                                                            name="user_ids"
                                                            value={user.id}
                                                            checked={(field.value as any).includes(user.id)}
                                                            onChange={() => handleCheckboxChange(user.id)}
                                                        />
                                                        <label htmlFor={`user-${user.id}`} className="ml-2">
                                                            {user.full_name}
                                                        </label>
                                                    </div>
                                                ))}
                                            </>
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
                    </form>
                </Form>
            </div>
        </div>
    );
}
