import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import Loading from "@/app/components/common/Loading";
import {DropdownMenuCheckboxes} from "@/app/components/common/DropdownMenu";
import {OrganizationResponse} from "@/redux/features/organization/organizationApiSlice";

type Props = {
    organizationData: OrganizationResponse
    isRetrievingLoading: boolean
    setSelectedOrganization: any
    form: any
    handleDelete: any
    toggleOpen: any
}

const OrganizationTable = ({organizationData, isRetrievingLoading, setSelectedOrganization, form, handleDelete, toggleOpen}: Props) => {
    if (isRetrievingLoading) {
        return <Loading className="my-48"/>;
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Leader</TableHead>
                    <TableHead>Is Active</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {organizationData?.data.map((organization) => (
                    <TableRow key={organization.id}>
                        <TableCell className="font-medium">{organization.name}</TableCell>
                        <TableCell className="font-medium">{organization.start_date}</TableCell>
                        <TableCell className="font-medium">{organization.leader || '-'}</TableCell>
                        <TableCell className="font-medium">{organization.is_active ? 'Active' : 'Inactive'}</TableCell>
                        <TableCell className="font-medium">{organization.created_at}</TableCell>
                        <TableCell className="font-medium">
                            <DropdownMenuCheckboxes onSelect={(action: string) => {
                                setSelectedOrganization(organization);
                                form.reset({
                                    name: organization.name,
                                    start_date: organization.start_date,
                                    leader_id: organization?.leader_id?.toString() || '',
                                });
                                if (action === 'update') {
                                    toggleOpen();
                                } else {
                                    handleDelete(organization?.id);
                                }
                            }}/>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default OrganizationTable