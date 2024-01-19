"use client"
import {useLoginMutation} from "@/redux/features/authApiSlice";
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
    email: string
    password: string
}

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3),
});



export default function SignUp() {
    const {toast} = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',

        }
    })
    const router: AppRouterInstance = useRouter();
    const [login, {isLoading}] = useLoginMutation()

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        const {email, password} = values;

        login({email, password}).unwrap()
            .then(() => {
                toast({
                    variant: "success",
                    title: 'Success',
                    description: 'Account successfully created.'
                })
                router.push('/dashboard')
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


                        <Button type="submit" className="w-full">
                            {isLoading ? <LoadingSpinner />  : 'Login'}
                        </Button>
                    </form>
                </div>
            </Form>
        </div>
    )
}

const inputClass = `block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`
