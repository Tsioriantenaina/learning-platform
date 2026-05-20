"use client";
import { credentialLogin } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { SubmitEvent, useState } from "react";

const LoginWithCredential = () => {
    const [error, setError] = useState<string>("");

    const onSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);
            const response = await credentialLogin(formData);
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "Something went wrong");
        }
    };
    return (
        <form onSubmit={onSubmit}>
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="m@example.com"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        {/* <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link> */}
                    </div>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        required
                    />
                </div>
                <Button type="submit" className="w-full">
                    Login
                </Button>
            </div>
            <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?
                <br />
                <Link href="/register/student" className="underline">
                    Student
                </Link>{" "}
                or{" "}
                <Link href="/register/instructor" className="underline">
                    Instructor
                </Link>{" "}
                Register
            </div>
        </form>
    );
};

export default LoginWithCredential;
