import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import Link from "next/link";
import Menu from "./component/account-menu";
import { auth } from "@/auth";

async function Layout({ tabs }) {
    const session = await auth();
    const user = session?.user;
    return (
        <section className="relative pb-16">
            {/*end container*/}
            <div className="container relative mt-10">
                <div className="lg:flex">
                    <div className="lg:w-1/4 md:px-3">
                        <div className="relative">
                            <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
                                <div className="profile-pic text-center mb-5">
                                    <input
                                        id="pro-img"
                                        name="profile-image"
                                        type="file"
                                        className="hidden"
                                    />
                                    <div>
                                        <div className="relative size-28 mx-auto">
                                            <Image
                                                src={
                                                    user?.profile_picture ||
                                                    "/assets/images/profile.jpg"
                                                }
                                                className="rounded-full shadow dark:shadow-gray-800 ring-4 ring-slate-50 dark:ring-slate-800"
                                                id="profile-banner"
                                                alt="profile-image"
                                                width={112}
                                                height={112}
                                            />
                                            <label
                                                className="absolute inset-0 cursor-pointer"
                                                htmlFor="pro-img"
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <h5 className="text-lg font-semibold">
                                                {user?.first_name}{" "}
                                                {user?.last_name}
                                            </h5>
                                            <p className="text-slate-400">
                                                {user?.email}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t border-gray-100 dark:border-gray-700">
                                    <Menu />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-3/4 md:px-3 mt-[30px] lg:mt-0">
                        {tabs}
                    </div>
                </div>
                {/*end grid*/}
            </div>
            {/*end container*/}
        </section>
    );
}

export default Layout;
