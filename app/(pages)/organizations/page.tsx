"use client";

import React, {useState} from "react";
import PageTitle from "@/app/components/common/PageTitle";
import {Input} from "@/components/ui/input";
import * as z from "zod";
import {organizationFormSchema, useOrganization} from "@/app/hooks/useOrganizationManagement";
import OrganizationTable from "@/app/components/organizations/OrganizationTable";
import {PaginationData} from "@/app/components/common/PaginationData";
import OrganizationForm from "@/app/components/organizations/OrganizationForm";


export default function Page() {
    const [currentPage, setCurrentPage] = useState(1);

    const {
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
    } = useOrganization(currentPage);

    const toggleOpen = () => setOpen(prev => !prev);

    const handleSubmit = async (values: z.infer<typeof organizationFormSchema>) => {
        await handleCreateOrUpdate(values, selectedOrganization)
        toggleOpen()
    };


    return (
        <div className="flex flex-col gap-5  w-full">
            <PageTitle title="Organizations"/>
            <div className="flex items-center justify-between">
                <div className="w-full md:w-1/2">
                    <Input
                        placeholder="Search organization name"
                        type="search"
                        className={`rounded-md input-class border border-red-500' : ''}`}
                    />
                </div>
                <OrganizationForm
                    isStoringLoading={isStoringLoading}
                    leaderOption={leaderOption}
                    handleSubmit={handleSubmit}
                    toggleOpen={toggleOpen}
                    form={form}
                    open={open}
                    setSelectedOrganization={setSelectedOrganization}
                />
            </div>
            <div className="flex flex-col gap-5 w-full">
                {organizationData && (
                    <>
                        <div className="min-h-96">
                            <OrganizationTable
                                organizationData={organizationData}
                                isRetrievingLoading={isRetrievingLoading}
                                setSelectedOrganization={setSelectedOrganization}
                                form={form}
                                handleDelete={handleDelete}
                                toggleOpen={toggleOpen}
                            />
                        </div>
                        <PaginationData meta={organizationData?.meta} onPageChange={setCurrentPage}/>
                    </>
                )}
            </div>

        </div>
    );
}
