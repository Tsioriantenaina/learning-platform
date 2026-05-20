"use client";

import React, { FC, useEffect, useState } from "react";
import { INavLink } from "@/app/(main)/layout";
import Link from "next/link";
import Logo from "@/components/Logo";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MobileNav from "@/components/nav-bar/mobile-nav";
import { Menu, X } from "lucide-react";
import LoginSignUpContent from "@/components/nav-bar/login-signUp-content";
import { useSession, signOut } from "next-auth/react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

interface MainNavProps {
    items: INavLink[];
    children?: React.ReactNode;
}

const MainNav: FC<MainNavProps> = ({ items, children }) => {
    const { data: session, status } = useSession();

    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return; // Do nothing while loading
    }, [session, status]);

    return (
        <>
            <div className="flex gap-6 items-center lg:gap-10">
                <Link href="/">
                    <Logo />
                </Link>
                {items.length > 0 ? (
                    <nav className="hidden gap-6 lg:flex">
                        {items?.map((item: INavLink, index: number) => (
                            <Link
                                href={item.disable ? "#" : item.href}
                                key={index}
                                className={cn(
                                    "flex items-center text-lg font-medium transition-colors duration-200 hover:text-foreground/60 sm:text-sm",
                                    item.disable &&
                                        "text-gray-500 cursor-not-allowed hover:text-gray-500",
                                )}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                ) : null}

                {showMobileMenu && items.length > 0 && (
                    <MobileNav items={items}>{children}</MobileNav>
                )}
            </div>

            <nav className="flex items-center gap-3">
                {session ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="cursor-pointer">
                                <AvatarImage
                                    src={
                                        session.user?.profile_picture ||
                                        "https://i.pravatar.cc"
                                    }
                                    alt="profile"
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 mt-4">
                            <DropdownMenuItem
                                className="cursor-pointer"
                                asChild
                            >
                                <Link href="/account">Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                asChild
                            >
                                <Link href="/account/enrolled-courses">
                                    My Courses
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                asChild
                            >
                                <Link href="/account/testimonials">
                                    Testimonials & certificates
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                asChild
                            >
                                <Link
                                    href=""
                                    onClick={(e) => {
                                        e.preventDefault();
                                        signOut({ callbackUrl: "/" });
                                    }}
                                >
                                    Logout
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <div className="items-center gap-3 hidden lg:flex">
                        <LoginSignUpContent />
                    </div>
                )}
                <button
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                    className="lg:hidden"
                >
                    {showMobileMenu ? <X /> : <Menu />}
                </button>
            </nav>
        </>
    );
};
export default MainNav;
