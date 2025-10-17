"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    FigmaIcon,
    GithubIcon,
    InstagramIcon,
    TwitchIcon,
    TwitterIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { z } from "zod";
import { motion } from "framer-motion";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});

const Login05Page = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data);
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-pink-50 flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8">
                {/* ---- Left Side (Login) ---- */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center"
                >
                    <p className="text-3xl font-semibold text-gray-800 mb-6">
                        Login
                    </p>

                    {/* Social Icons */}
                    <div className="flex items-center gap-3">
                        {[GithubIcon, InstagramIcon, TwitterIcon, FigmaIcon, TwitchIcon].map(
                            (Icon, i) => (
                                <Button
                                    key={i}
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full h-10 w-10 hover:bg-blue-50 transition"
                                >
                                    <Icon className="h-[18px] w-[18px]" />
                                </Button>
                            )
                        )}
                    </div>

                    <div className="my-6 w-full flex items-center justify-center overflow-hidden">
                        <Separator />
                        <span className="text-sm px-2">OR</span>
                        <Separator />
                    </div>

                    {/* Login Form */}
                    <Form {...form}>
                        <form
                            className="w-full space-y-4"
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="Enter your email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter your password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 transition"
                            >
                                Continue with Email
                            </Button>
                        </form>
                    </Form>

                    <div className="mt-6 space-y-3 text-center text-sm text-gray-600">
                        <Link to="#" className="underline hover:text-blue-600">
                            Forgot your password?
                        </Link>
                        <p>
                            Don’t have an account?
                            <Link
                                to="#"
                                className="ml-1 underline hover:text-blue-600"
                            >
                                Create account
                            </Link>
                        </p>
                    </div>
                </motion.div>

                {/* ---- Right Side (Register Info) ---- */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-center"
                >
                    <section className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-3">
                            Register
                        </h2>
                        <p className="text-gray-600 text-sm leading-relaxed mb-6">
                            Registering for this site allows you to access your order
                            status and history. Just fill in the fields below, and we'll
                            get a new account set up for you in no time. We will only ask
                            you for information necessary to make the purchase process
                            faster and easier.
                        </p>

                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                            Register
                        </Button>
                    </section>
                </motion.div>
            </div>
        </div>
    );
};

export default Login05Page;
