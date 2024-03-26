"use client"
import React, {useState} from "react";
import * as z from "zod";
import {useGroupManagement, userFormSchema} from "@/app/hooks/useUserManagement";
import PageTitle from "@/app/components/common/PageTitle";
import {Input} from "@/components/ui/input";
import {PaginationData} from "@/app/components/common/PaginationData";
import UserTable from "@/app/components/users/UserTable";

const Page = () => {

    const [currentPage, setCurrentPage] = useState(1);

    const {
        form,
        handleCreateOrUpdate,
        handleDelete,
        isStoringLoading,
        userData,
        isRetrievingLoading,
        open,
        setOpen,
        selectedItem,
        setSelectedItem
    } = useGroupManagement(currentPage);

    const toggleOpen = () => setOpen(prev => !prev);

    const handleSubmit = async (values: z.infer<typeof userFormSchema>) => {
        await handleCreateOrUpdate(values, selectedItem)
        toggleOpen()
    };


    return (
        <div className="flex flex-col gap-5  w-full">
            <PageTitle title="Users"/>
            <div className="flex items-center justify-between">
                <div className="w-full md:w-1/2">
                    <Input
                        placeholder="Search organization name"
                        type="search"
                        className={`rounded-md input-class border border-red-500' : ''}`}
                    />
                </div>
                {/*<UserForm*/}
                {/*    isStoringLoading={isStoringLoading}*/}
                {/*    leaderOption={leaderOption}*/}
                {/*    handleSubmit={handleSubmit}*/}
                {/*    toggleOpen={toggleOpen}*/}
                {/*    form={form}*/}
                {/*    open={open}*/}
                {/*    setSelectedOrganization={setSelectedOrganization}*/}
                {/*/>*/}
            </div>
            <div className="flex flex-col gap-5 w-full">
                {userData && (
                    <>
                        <div className="min-h-96">
                            <UserTable
                                userData={userData}
                                isRetrievingLoading={isRetrievingLoading}
                                setSelectedItem={setSelectedItem}
                                form={form}
                                handleDelete={handleDelete}
                                toggleOpen={toggleOpen}
                            />
                        </div>
                        <PaginationData meta={userData?.meta} onPageChange={setCurrentPage}/>
                    </>
                )}
            </div>

        </div>
    );
};

export default Page;