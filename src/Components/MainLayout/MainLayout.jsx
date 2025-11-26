import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import NavbarComponent from '../Navbar/Navbar'

export default function MainLayout() {
    return (
        <>

            <NavbarComponent />

            <aside id="logo-sidebar"
                className="fixed top-0 left-0 z-40 hidden md:block  md:w-[30%] lg:w-[20%] h-screen pt-20 transition-transform -translate-x-full bg-sidebar border-r border-gray-200 sm:translate-x-0 "
                aria-label="Sidebar"
            >
                
            </aside>

            <div className=" overflow-auto min-h-screen bg-background  md:ml-64 lg:mr-64">
                <div className=" w-[80%] md:w-[80%] lg:w-[80%] xl:w-[60%] mx-auto  mt-22 dark:border-gray-700 ">
                    <Outlet />
                </div>
            </div> 

            <aside
                id="logo-sidebar"
                className="fixed top-0 right-0 hidden lg:block z-40  lg:w-[20%]  h-screen pt-20 transition-transform -translate-x-full bg-sidebar border-r border-gray-200 sm:translate-x-0"
                aria-label="Sidebar"
            >
                
            </aside>

        </>
    )
}
