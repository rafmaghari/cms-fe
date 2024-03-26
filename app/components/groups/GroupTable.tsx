import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import Loading from "@/app/components/common/Loading";
import {DropdownMenuCheckboxes} from "@/app/components/common/DropdownMenu";
import {GroupResponse} from "@/redux/features/group/groupApiSlice";

type Props = {
    groupData: GroupResponse
    isRetrievingLoading: boolean
    setSelectedItem: any
    toggleOpen: any
    form: any
    handleDelete: any
}

const GroupTable = ({groupData, isRetrievingLoading, setSelectedItem, toggleOpen, form, handleDelete}: Props) => {
    if (isRetrievingLoading) {
        return <Loading className="my-48"/>;
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Leader</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Deactivated At</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {groupData?.data.map((group) => (
                    <TableRow key={group.id}>
                        <TableCell className="font-medium">{group.name}</TableCell>
                        <TableCell className="font-medium">{group.leader || '-'}</TableCell>
                        <TableCell className="font-medium">{group.organization || '-'}</TableCell>
                        <TableCell className="font-medium">{group.deactivated_at}</TableCell>
                        <TableCell className="font-medium">{group.created_at}</TableCell>
                        <TableCell className="font-medium">
                            <DropdownMenuCheckboxes onSelect={(action: string) => {
                                setSelectedItem(group);
                                form.reset({
                                    name: group.name,
                                    deactivated_at: group.deactivated_at,
                                    leader_id: group?.leader_id?.toString() || '',
                                    organization_id: group?.organization_id?.toString() || '',
                                });
                                if (action === 'update') {
                                    toggleOpen();
                                } else {
                                    handleDelete(group?.id);
                                }
                            }}/>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default GroupTable