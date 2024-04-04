import {PaginationType} from "@/app/type/PaginationType";

export type User = {
    id?: number;
    name: string
    first_name: string
    last_name: string
    full_name?: string
    phone_number: string
    email: string
    facebook_url: string
    joined_at?: Date
    created_by?: number
    others: string,
    group_name?: string,
    group_id?: number
}

export type ApiResponse<T> = {
    data: T[];
    meta: PaginationType;
};