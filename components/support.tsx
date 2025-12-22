import React from 'react'
import Image from "next/image";

const Support = () => {
    return (
        <div className="text-black py-5 px-4 md:px-16">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center space-y-12 md:space-y-0 md:space-x-8">
                <div className="flex-1">
                    <h2 className="mt-5 text-3xl font-bold leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:leading-tight font-poppins">
                        <span className="relative inline-flex sm:inline">
                            <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
                            <span className="relative">Not Sure Where</span>
                        </span>
                    </h2>
                    <p className="text-black leading-relaxed my-8">I am founder of Learning Platform And Best Selling Online Instructor Around The World My lite&#39;s mission is to help novice and professional software engineers increase their skills, make more money, and ultimately change their lives for the better.</p>
                    <div className="flex flex-wrap gap-4">
                        <a href="#" className="bg-fuchsia-500 font-semibold px-6 py-3 rounded-lg text-white shadow hover:bg-fuchsia-800 transition ease-in-out duration-300">Contact Us</a>
                        <a href="#" className="bg-gray-700 font-semibold px-6 py-3 rounded-lg text-white shadow hover:bg-gray-900 transition ease-in-out duration-300">Call Us for Support</a>
                    </div>
                </div>
                <div className="flex-1 flex justify-center">
                    <Image src="/assets/images/support1.png" alt="support" width={500} height={400} className="rounded-lg" />
                </div>
            </div>

        </div>
    )
}
export default Support
