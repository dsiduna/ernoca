'use client'
import { useMediaQuery } from 'react-responsive'
import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import logo from '../../assets/logo.png';
import Image from 'next/image';
import { UserAuth } from '../../components/context/AuthContext';

export default function AdminLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const { user } = UserAuth();

    useEffect(() => {
        if (!user) {
            router.push('/admin');
        }
    }, [user]);

    return (
        <>
            {(pathname === '/admin' || pathname === '/admin/logout') ? (
                <React.Fragment>
                    {children}
                </React.Fragment>
            ) : (
                <React.Fragment>
                    {user &&
                        <section className="flex flex-col md:flex-row h-full">
                            {/* Sidebar */}
                            {!isMobile && (
                                <aside className="bg-gray-200 w-1/5">
                                    <Image
                                        src={logo}
                                        alt="internet services"
                                        width={200}
                                        height={200}
                                        className='pl-12 py-6 hover:opacity-75'
                                        placeholder='blur'
                                        priority
                                    />
                                    <nav className="flex flex-col p-4">
                                        <Link href="/admin/cars">
                                            <div className={`rounded-2xl py-2 px-4 ${pathname === '/admin/products' ? 'bg-gray-900 text-white' : 'hover:bg-gray-300'}`}>
                                                Cars
                                            </div>
                                        </Link>
                                        <Link href="/admin/accessories">
                                            <div className={`rounded-2xl py-2 px-4 ${pathname === '/admin/services' ? 'bg-gray-900 text-white' : 'hover:bg-gray-300'}`}>
                                                Accessories
                                            </div>
                                        </Link>
                                        <Link href="/admin/for-approvals">
                                            <div className={`rounded-2xl py-2 px-4 ${pathname === '/admin/services' ? 'bg-gray-900 text-white' : 'hover:bg-gray-300'}`}>
                                                Pending Approval
                                            </div>
                                        </Link>
                                        <Link href="/admin/logout">
                                            <div className="rounded-2xl py-2 px-4 hover:bg-gray-300">
                                                Logout
                                            </div>
                                        </Link>
                                    </nav>
                                </aside>
                            )}

                            {/* Main Content */}
                            <main className={`${isMobile ? 'w-full' : 'w-3/4'} p-4`}>
                                {children}
                            </main>
                        </section>
                    }
                </React.Fragment>
            )}
        </>
    );
}