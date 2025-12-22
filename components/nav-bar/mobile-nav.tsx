import React, {FC} from 'react'
import {INavLink} from "@/app/(main)/layout";
import {useLockBody} from "@/hooks/use-lock-body";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {Button, buttonVariants} from "@/components/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import LoginSignUpContent from "@/components/nav-bar/login-signUp-content";

interface MobileNavProps {
    items: INavLink[];
    children?: React.ReactNode;
}

const MobileNav: FC<MobileNavProps> = ({items, children}) => {

    useLockBody();

    return (
        <div className={cn("fixed inset-0 top-16 z-30 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 bg-black/50 lg:hidden")}>
            <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md border">
                <nav className="grid grid-flow-row auto-rows-auto text-sm">
                    {items.map((item: INavLink, index: number) => (
                        <Link
                            href={ item.disable ? '#' : item.href }
                            key={index}
                            className={cn("flex  w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                                item.disable && "cursor-not-allowed opacity-60")}
                        >
                            {item.title}
                        </Link>
                    ))}
                </nav>
                <div className="flex items-center justify-around gap-3">
                    <LoginSignUpContent />
                </div>
            </div>
        </div>
    )
}
export default MobileNav
