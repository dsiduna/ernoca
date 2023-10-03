'use client'

import { usePathname } from "next/navigation";
import NavBar from "./NavBar";
import Footer from "./Footer";


const LayoutProvider = ({
    children,
}) => {
    const pathname = usePathname();
    return (

        <>
            {(pathname !== "/admin" &&
                pathname !== "/admin/cars" &&
                pathname !== "/admin/accessories" &&
                pathname !== "/admin/logout")
                ? (
                    <>
                        <NavBar />
                        <main className='container'>
                            {children}
                        </main>
                        <Footer />
                    </>
                ) : (
                    <>
                        {children}
                    </>
                )}
        </>
    )
};

export default LayoutProvider

