"use client"
import {useEffect, useState} from "react";
import {Nav} from "@/components/ui/nav";

import {ChevronRight, LayoutDashboard, UsersRound} from "lucide-react";
import {Button} from "@/components/ui/button";

import {useWindowWidth} from "@react-hook/window-size";
import {useAppSelector} from "@/redux/hooks";
import AppLogo from "@/app/components/common/AppLogo";
import {CgOrganisation} from "react-icons/cg";
import {GrGroup} from "react-icons/gr";
import {FaRegCalendarCheck} from "react-icons/fa6";

export default function SideNavbar() {
    const {isAuthenticated} = useAppSelector(state => state.auth)
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const onlyWidth = useWindowWidth();
    const mobileWidth = isClient ? onlyWidth < 768 : true; // Default to true or based on your SSR strategy

    function toggleSidebar() {
        setIsCollapsed(!isCollapsed);
    }

    return (
        <div className={`relative min-w-[80px] border-r px-5  pb-10 pt-8`}>
            <AppLogo height={75} width={75}/>
            {isClient && !mobileWidth && (
                <div className="absolute right-[-20px] top-7">
                    <Button
                        onClick={toggleSidebar}
                        variant="secondary"
                        className=" rounded-full p-2"
                    >
                        <ChevronRight/>
                    </Button>
                </div>
            )}
            <Nav
                isCollapsed={mobileWidth ? true : isCollapsed}
                links={[
                    {
                        title: "Dashboard",
                        href: "/dashboard",
                        icon: LayoutDashboard,
                        variant: "default"
                    },
                    {
                        title: "Users",
                        href: "/users",
                        icon: UsersRound,
                        variant: "ghost"
                    },
                    {
                        title: "Organizations",
                        href: "/organizations",
                        icon: CgOrganisation,
                        variant: "ghost"
                    },
                    {
                        title: "Groups",
                        href: "/groups",
                        icon: GrGroup,
                        variant: "ghost"
                    },
                    {
                        title: "Attendance",
                        href: "/attendances",
                        icon: FaRegCalendarCheck,
                        variant: "ghost"
                    }
                ]}
            />
        </div>
    );
}
