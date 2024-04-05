import * as React from "react"
import {ChangeEventHandler} from "react"
import {EventResponse} from "@/redux/features/event/eventApiSlice";

type SelectDataProps = {
    className: string
    placeholder: string
    value: any,
    items: EventResponse | undefined,
    onChange: ChangeEventHandler<HTMLSelectElement> | undefined
    onBlur: ChangeEventHandler<HTMLSelectElement> | undefined
    name: string
}


export function SelectEvent({
                                name,
                                className,
                                value,
                                onChange,
                                onBlur,
                                placeholder,
                                items,
                            }: SelectDataProps) {
    return (
        <select
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            className={`${className} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        >
            {placeholder && <option value="">{placeholder}</option>}
            {items?.data.map(option => (
                <option key={option.id} value={option.id}>
                    {option.name} - {option.event_date}
                </option>
            ))}
        </select>
    )
}
