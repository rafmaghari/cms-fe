"use client";

import React, {useState} from "react";
import PageTitle from "@/app/components/common/PageTitle";
import {Input} from "@/components/ui/input";
import {PaginationData} from "@/app/components/common/PaginationData";
import GroupTable from "@/app/components/groups/GroupTable";
import {groupFormSchema, useGroupManagement} from "@/app/hooks/useGroupManagement";
import GroupForm from "@/app/components/groups/GroupForm";
import * as z from "zod";


export default function Page() {

    const [currentPage, setCurrentPage] = useState(1);

    const {
        groupData,
        isRetrievingLoading,
        leaderOption,
        isStoringLoading,
        handleCreateOrUpdate,
        form,
        open,
        setSelectedItem,
        selectedItem,
        toggleOpen,
        organizationOption,
        handleDelete,
        handleDeactivateGroup
    } = useGroupManagement(currentPage);


    const handleSubmit = async (values: z.infer<typeof groupFormSchema>) => {
        await handleCreateOrUpdate(values, selectedItem)
        toggleOpen()
    };

    return (
        <div className="flex flex-col gap-5  w-full">
            <PageTitle title="Groups"/>
            <div className="flex items-center justify-between">
                <div className="w-full md:w-1/2">
                    <Input
                        placeholder="Search group name"
                        type="search"
                        className={`rounded-md input-class border border-red-500' : ''}`}
                    />
                </div>
                <GroupForm isStoringLoading={isStoringLoading}
                           leaderOption={leaderOption}
                           organizationOption={organizationOption}
                           handleSubmit={handleSubmit}
                           toggleOpen={toggleOpen}
                           form={form}
                           open={open}
                           setSelectedItem={setSelectedItem}
                           deactivateGroup={handleDeactivateGroup}
                           selectedItem={selectedItem}
                />
            </div>
            <div className="flex flex-col gap-5 w-full">
                {groupData && (
                    <>
                        <div className="min-h-96">
                            <GroupTable
                                groupData={groupData}
                                isRetrievingLoading={isRetrievingLoading}
                                setSelectedItem={setSelectedItem}
                                toggleOpen={toggleOpen}
                                form={form}
                                handleDelete={handleDelete}
                            />
                        </div>
                        <PaginationData meta={groupData?.meta} onPageChange={setCurrentPage}/>
                    </>
                )}
            </div>

        </div>
    );
}
