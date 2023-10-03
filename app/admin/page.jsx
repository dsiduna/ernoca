'use client'

import Image from "next/image"
import { redirect, useRouter } from 'next/navigation'
import logo from "../assets/logo.png"
import { useState } from "react"

export default function Admin() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    const onLogin = () => {
        console.log("here")
        router.push('/admin/cars')
    }
    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 max-w-[380px]">
                <Image
                    src={logo}
                    alt="internet services"
                    width={120}
                    height={120}
                    className=' py-4   hover:opacity-75 cursor-pointer'
                />
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
                            Admin Login
                        </h1>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                        </div>
                        {isLoading ? (
                            <div>
                                Loading
                            </div>
                        ) : (
                            <button onClick={onLogin} type="submit" className="w-full bg-gray-800 hover:bg-gray-600 text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
};