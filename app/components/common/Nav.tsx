"use client"
import {MdDarkMode} from "react-icons/md";
import {CiLight} from "react-icons/ci";
import {useState} from "react";
import useSidebarToggle from "@/app/hooks/useSideBarToggle";

const Nav = () => {
    const { isSidebarOpen, toggleSidebar } = useSidebarToggle();
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode)
        document.body.classList.toggle('dark');
    };

    return (
        <nav className="bg-white dark:bg-gray-800 shadow sticky inset-x-0 top-0 z-30 w-full transition-all">
            {/* Navbar content */}
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <span className="font-bold text-xl dark:text-indigo-50">Admin Panel</span>
                    </div>
                    <div className="flex items-center">
                        {/* Hamburger Icon */}
                        <button
                            onClick={toggleSidebar}
                            className="lg:hidden focus:outline-none">
                            ☰
                        </button>
                        <button
                            onClick={toggleDarkMode}
                            className="text-2xl">
                            {!isDarkMode  ? <MdDarkMode /> : <CiLight className="text-white font-bold" />}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Nav;