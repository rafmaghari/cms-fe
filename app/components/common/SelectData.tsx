import * as React from "react"
import {ChangeEventHandler} from "react"
import {OptionType} from "@/redux/features/options/optionApiSlice";

type SelectDataProps = {
    className: string
    placeholder: string
    value: any,
    items: OptionType[],
    onChange: ChangeEventHandler<HTMLSelectElement> | undefined
    onBlur: ChangeEventHandler<HTMLSelectElement> | undefined
    name: string
}


export function SelectData({
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
            className={`${className}`}
        >
            {placeholder && <option value="">{placeholder}</option>}
            {items.map(option => (
                <option key={option.value} value={String(option.value)}>
                    {option.label}
                </option>
            ))}
        </select>
    )
}
