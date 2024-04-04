import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import Loading from "@/app/components/common/Loading";
import {DropdownMenuCheckboxes} from "@/app/components/common/DropdownMenu";
import {UserResponse} from "@/redux/features/user/userApiSlice";
import {User} from "@/app/type";

type Props = {
    userData: UserResponse
    isRetrievingLoading: boolean
    setSelectedItem: any
    form: any
    handleDelete: any
    toggleOpen: any
}

const UserTable = ({userData, isRetrievingLoading, setSelectedItem, form, handleDelete, toggleOpen}: Props) => {
    if (isRetrievingLoading) {
        return <Loading className="my-48"/>;
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Facebook Url</TableHead>
                    <TableHead>Joined At</TableHead>
                    <TableHead>Notes</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {userData?.data.map((user: User) => (
                    <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.full_name}</TableCell>
                        <TableCell className="font-medium">{user.email}</TableCell>
                        <TableCell className="font-medium">{user.phone_number}</TableCell>
                        <TableCell className="font-medium">{user.facebook_url}</TableCell>
                        <TableCell
                            className="font-medium">  {user.joined_at ? new Date(user.joined_at).toDateString() : '-'}</TableCell>
                        <TableCell>{user.others}</TableCell>
                        <TableCell className="font-medium">
                            <DropdownMenuCheckboxes onSelect={(action: string) => {
                                setSelectedItem(user);
                                form.reset({
                                    id: user.id,
                                    first_name: user.first_name,
                                    last_name: user.last_name,
                                    phone_number: user.phone_number,
                                    facebook_url: user.facebook_url,
                                    email: user.email,
                                    joined_at: user.joined_at,
                                    others: user.others,
                                });
                                if (action === 'update') {
                                    toggleOpen();
                                } else {
                                    handleDelete(user?.id);
                                }
                            }}/>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default UserTable