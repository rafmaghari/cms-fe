"use client"
import Head from 'next/head';
import Nav from "@/app/components/common/Nav";
import useSidebarToggle from "@/app/hooks/useSideBarToggle";

export default function Home() {
    const { isSidebarOpen } = useSidebarToggle();

    return (
        <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Head>
                <title>Admin Panel</title>
            </Head>


            {/* Sidebar and Content */}
            <div className="flex">
                {/* Sidebar */}
                <aside
                    className={`dark:bg-gray-700 lg:w-64 lg:min-h-screen ${
                        isSidebarOpen ? 'block' : 'hidden'
                    } lg:block lg:w-64 bg-gray-200 dark:bg-gray-700`}
                >
                    {/* Sidebar content */}
                    <ul className="py-4">
                        <li className="pl-4">Dashboard</li>
                        <li className="pl-4">Settings</li>
                    </ul>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-4 min-h-screen">
                    <div className="container mx-auto">
                        {/* Page content */}
                        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
                        <p>Welcome to the admin dashboard!</p>
                    </div>
                </main>
            </div>
        </div>
    );
}
