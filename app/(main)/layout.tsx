import React, {ReactNode} from 'react'
import Footer from "@/components/footer";
import MainNav from "@/components/nav-bar/main-nav";

export interface INavLink {
    title: string;
    href: string;
    disable?: boolean;
}

const navLinks: INavLink[] = [
    {
        title: "Features",
        href: "/features",
    },
    {
        title: "Pricing",
        href: "/pricing",
    },
    {
        title: "Blog",
        href: "/blog",
    },
    {
        title: "Documentation",
        href: "/documentation",
    },
];

const MainLayout = ({ children } : { children : ReactNode}) => {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="z-40 bg-background/60 backdrop-blur-md fixed top-0 left-0 right-0 border-b">
                <div className="container flex h-20 items-center justify-between mx-auto py-4 px-4 sm:px-6">
                    <MainNav items={navLinks} />
                </div>
            </header>
            <main className="container mx-auto px-4 mt-20">
                {children}
            </main>
            <Footer />
        </div>
    )
}
export default MainLayout
