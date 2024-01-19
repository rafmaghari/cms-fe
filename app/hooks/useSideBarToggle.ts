import { useState } from 'react';

const useSidebarToggle = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    return {
        isSidebarOpen,
        toggleSidebar,
    };
};

export default useSidebarToggle;
