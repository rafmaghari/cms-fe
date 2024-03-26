"use client"
import Image from "next/image";
import {useToast} from "@/components/ui/use-toast";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useRouter} from "next/navigation";
import {useLoginMutation} from "@/redux/features/authApiSlice";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {LoadingSpinner} from "@/components/ui/Spinner";
import AppLogo from "@/app/components/common/AppLogo";


const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3),
});


const Page = () => {
    const appName = process.env.NEXT_PUBLIC_APP_NAME

    const {toast} = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: 'hpci@admin.com',
            password: 'password',

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
        <div className="mt-80">
            <AppLogo height={100} width={100} />
            <div className="flex justify-center items-center">
                <div
                    className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="flex flex-wrap items-center">
                        <div className="hidden w-full xl:block xl:w-1/2">
                            <div className="py-17.5 px-26 text-center">
                                <p className="text-2xl 2xl:px-10 mb-10">Welcome</p>
                                <Image src="/assets/svg/login.svg" alt="Login" width={500} height={500} />
                                <span className="mt-15 inline-block"></span>
                            </div>
                        </div>

                        <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2 py-16">
                            <div className="w-full p-4 xl:p-10">
                                <h2 className="mb-9 text-2xl  text-black dark:text-white sm:text-title-xl2">
                                    Sign In to {appName}
                                </h2>

                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                                        <div className="mb-4">
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
                                        </div>

                                        <div className="mb-6">
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
                                        </div>

                                        <div className="mb-5">
                                            <Button type="submit" className="w-full cursor-pointer rounded-lg border bg-gray-900 px-4 py-7 text-white transition hover:bg-opacity-50">
                                                {isLoading ? <LoadingSpinner />  : 'Signin'}
                                            </Button>
                                        </div>
                                    </form>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Page;

const inputClass = `block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`
