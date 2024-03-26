"use client"
import {toast} from "@/components/ui/use-toast";

type ToastTypeProps = {
    variant: "default" | "destructive" | "success" | null | undefined;
    title: string;
    description: string
}

export const successToast = (message: string) => {
    baseToast({variant: 'success', title: 'Success', description: message})
}

export const errorToast = (message: string) => {
    baseToast({variant: 'destructive', title: 'Error', description: message})
}


export const baseToast = ({variant, title, description}: ToastTypeProps) => {
    toast({
        variant: variant,
        title: title,
        description: description
    });

}