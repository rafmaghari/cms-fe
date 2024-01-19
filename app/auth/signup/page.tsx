"use client"
import {useRegisterMutation} from "@/redux/features/authApiSlice";
import {useRouter} from "next/navigation";
import * as z from 'zod'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form,FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {LoadingSpinner} from "@/components/ui/Spinner";
import {useToast} from "@/components/ui/use-toast";

type InputProps = {
    name: string;
    email: string
    password: string
    password_confirmation: string
}

const formSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(3),
    password_confirmation: z.string(),
}).refine((data: InputProps): boolean => {
    return data.password === data.password_confirmation
}, {
    message: "Password doest not match",
    path: ["password_confirmation"]
})


export default function SignUp() {
    const {toast} = useToast();
    const form = useForm<z.infer<typeof  formSchema>>({
       resolver: zodResolver(formSchema),
       defaultValues: {
           email: '',
           name: '',
           password: '',
           password_confirmation: '',

       }
    })
    const router: AppRouterInstance = useRouter();
    const [register, {isLoading}] = useRegisterMutation()

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        const {name, email, password, password_confirmation} = values;

        register({name, email, password, password_confirmation}).unwrap()
        .then(() => {
            toast({
                variant: "success",
                title: 'Success',
                description: 'Account successfully created.'
            })
            router.push('/auth/signin')
        }).catch((e) => {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Something went wrong.'
            })
        })
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <Form {...form}>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm md:max-w-lg">
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => {
                                const hasError = form.formState.errors.name;
                                return (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Name"
                                                type="text"
                                                {...field}
                                                className={`${inputClass} ${hasError ? 'border border-red-500' : ''}`}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                );
                            }}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => {
                                const hasError = form.formState.errors.email;
                                return (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Email"
                                                type="email"
                                                {...field}
                                                className={`${inputClass} ${hasError ? 'border border-red-500' : ''}`}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                );
                            }}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => {
                                const hasError = form.formState.errors.password;
                                return (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Password"
                                                type="password"
                                                {...field}
                                                className={`${inputClass} ${hasError ? 'border border-red-500' : ''}`}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                );
                            }}
                        />

                        <FormField
                            control={form.control}
                            name="password_confirmation"
                            render={({field}) => {
                                const hasError = form.formState.errors.password_confirmation;
                                return (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Confirm Password"
                                                type="password"
                                                {...field}
                                                className={`${inputClass} ${hasError ? 'border border-red-500' : ''}`}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                );
                            }}
                        />

                        <Button type="submit" className="w-full">
                            {isLoading ? <LoadingSpinner />  : 'Register'}
                        </Button>
                    </form>
                </div>
            </Form>
        </div>
    )
}

const inputClass = `block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`
