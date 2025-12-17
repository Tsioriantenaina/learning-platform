import React from 'react'
import Image from "next/image";

const Element = () => {
    return (
        <div className='bg-radial-[at_50%_50%] from-white via-sky-50 to-white to-100% min-h-screen'>
            <div className="w-full bg-fuchsia-50 p-6 flex flex-col md:flex-row items-center pt-5 pb-10 pl-10">
                <div className="md:w-1/2 text-center md:text-left py-10">
                    <h3 className="text-blue-600 font-semibold text-lg mb-2">Fast-track you learning</h3>
                    <h2 className="text-gray-800 font-bold text-5xl mb-4">Learn By Doing</h2>
                    <p className="text-gray-600">Learn programming skills, from absolute beginner to advanced mastery. We create project-based courses to help you learn professionally and become a complete developer</p>
                </div>

                <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
                    <Image src="/assets/images/two.png" alt="learning by doing" width={500} height={400} className="rounded-lg" />
                </div>
            </div>

            <div className="w-full bg-blue-50 p-6 flex flex-col md:flex-row items-center pt-5 pb-10 pl-10">
                <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
                    <Image src="/assets/images/one.png" alt="learning by doing" width={500} height={400} className="rounded-lg" />
                </div>
                <div className="md:w-1/2 text-center md:text-left py-10">
                    <h3 className="text-green-600 font-semibold text-lg mb-2">Step-by-step lessons</h3>
                    <h2 className="text-gray-800 font-bold text-5xl mb-4">Put Your Learning Into Practice</h2>
                    <p className="text-gray-600">Apply your learning with real-world projects and gain the skills you need to take your career to the next level.</p>
                </div>
            </div>
        </div>
    )
}
export default Element
