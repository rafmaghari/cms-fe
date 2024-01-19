'use client';


import {useRetrieveUserQuery} from "@/redux/features/authApiSlice";
import {LoadingSpinner} from "@/components/ui/Spinner";

export default function Dashboard() {
    const { data: user, isLoading, isFetching } = useRetrieveUserQuery();

    const config = [
        {
            label: 'Name',
            value: user?.name,
        },
        {
            label: 'Email',
            value: user?.email,
        },
    ];

    if (isLoading || isFetching) {
        return (
            <div className='flex justify-center my-8'>
                <LoadingSpinner />
            </div>
        );
    }


    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <ul role='list' className='divide-y divide-gray-100'>
                {config.map(({label, value}) => (
                    <li key={label} className='flex justify-between gap-x-6 py-5'>
                        <div>
                            <p className='text-sm font-semibold leading-6 text-gray-900'>
                                {label}
                            </p>
                        </div>
                        <div>
                            <p className='text-sm font-semibold leading-6 text-gray-900'>
                                {value}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

