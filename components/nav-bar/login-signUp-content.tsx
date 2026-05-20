import React from 'react'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {Button, buttonVariants} from "@/components/ui/button";

const LoginSignUpContent = () => {
    return (
        <>
            <Link href="/login" className={cn(buttonVariants({size: "sm"}), "px-4")}>Login</Link>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="px-4 cursor-pointer">Sign Up</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-4">
                    <DropdownMenuItem className="cursor-pointer">
                        <Link href="/register/student">Student register</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                        <Link href="/register/instructor">instructor register</Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
export default LoginSignUpContent
