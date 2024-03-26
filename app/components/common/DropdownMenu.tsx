"use client"

import * as React from "react"

import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {FaEllipsisVertical} from "react-icons/fa6";


type Props = {
    onSelect: any
}

export function DropdownMenuCheckboxes({onSelect}: Props) {

    const handleSelectMenu = (action: string): void => {
        onSelect(action);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    className="bg-transparent text-black hover:bg-transparent hover:outline-0 cursor-pointer focus:border-none">
                    <FaEllipsisVertical className="text-xl font-bold"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={() => handleSelectMenu('update')}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSelectMenu('delete')}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
