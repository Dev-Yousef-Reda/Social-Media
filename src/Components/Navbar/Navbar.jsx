// import React, { useContext, useState } from 'react'
// import { data, Link, useNavigate } from 'react-router-dom'
// import { authorizationContext } from '../Context/AuthorizationContextProvider/AuthorizationContextProvider'
// import useUserData from './useUserData';

// export default function Navbar() {

//     const { clearToken } = useContext(authorizationContext)
//     const [showSubMenu, setShowSubMenu] = useState(false)

//     function handleSignOut() {
//         clearToken()
//         localStorage.clear()
//     }

//     const { data, isLoading } = useUserData()

//     return (
//         <>
//             <nav className="fixed top-0 z-50 w-screen bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
//                 <div className="px-3 py-3 lg:px-5 lg:pl-3">
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center justify-start rtl:justify-end">
//                             <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
//                                 <span className="sr-only">Open sidebar</span>
//                                 <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                                     <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
//                                 </svg>
//                             </button>
//                             <Link to="/" className="flex ms-2 md:me-24">
//                                 <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 me-3" alt="FlowBite Logo" />
//                                 <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Home</span>
//                             </Link>
//                         </div>
//                         <div className="flex items-center">
//                             <div className="flex items-center ms-3">
//                                 <div onClick={() => setShowSubMenu(!showSubMenu)}>
//                                     <button
//                                         type="button"
//                                         className="cursor-pointer flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
//                                         data-dropdown-toggle="dropdown-user">
//                                         <span className="sr-only">Open user menu</span>
//                                         <img className="size-12 rounded-full"
//                                             src={isLoading ? "https://flowbite.com/docs/images/people/profile-picture-5.jpg" : data?.photo}
//                                             alt="user photo" />
//                                     </button>
//                                 </div>

//                                 <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-sm shadow-sm dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
//                                     <div className="px-4 py-3" role="none">
//                                         <p className="text-sm text-gray-900 dark:text-white" role="none">
//                                             {data?.name}
//                                         </p>
//                                         <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
//                                             {data?.email}
//                                         </p>
//                                     </div>
//                                     <ul className="py-1" role="none">
//                                         <li>
//                                             <Link to="/profile"
//                                                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300
//                                                 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
//                                                 Profile
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <Link
//                                                 to="/settings"
//                                                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300
//                                                 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem" >
//                                                 Settings
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <Link
//                                                 to="/login"
//                                                 onClick={handleSignOut}
//                                                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300
//                                                 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem" >
//                                                 Sign out
//                                             </Link>
//                                         </li>
//                                     </ul>
//                                 </div>

//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </nav>

//         </>
//     )
// }


import {
    Avatar,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
} from "flowbite-react";

import React, { useContext, useState } from 'react'
import { data, Link, useNavigate } from 'react-router-dom'
import { authorizationContext } from '../Context/AuthorizationContextProvider/AuthorizationContextProvider'
import useUserData from './useUserData';


export default function NavbarComponent() {

    const { clearToken } = useContext(authorizationContext)

    function handleSignOut() {
        clearToken()
        localStorage.clear()
    }
    const { data, isLoading } = useUserData()

    return (
        <Navbar fluid rounded className="fixed  right-0 left-0 z-50 border-b-2 border-white bg-secondary! text-secondary-foreground ">
            <Link to="/" >
                <span className="self-center whitespace-nowrap text-xl font-semibold text-secondary-foreground ">Home</span>
            </Link>
            <div className="flex md:order-2">
                <Dropdown
                    className=" bg-secondary! "
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar
                            className="cursor-pointer"
                            alt="User settings"
                            img={isLoading ? "https://flowbite.com/docs/images/people/profile-picture-5.jpg" : data?.photo}
                            rounded
                            size="md" />
                    }
                >
                    <DropdownHeader>
                        <span className="block text-sm"> {data?.name}</span>
                        <span className="block truncate text-sm font-medium">  {data?.email}</span>
                    </DropdownHeader>

                    <DropdownDivider />

                    <DropdownItem className="p-0 text-secondary-foreground! hover:bg-accent! hover:text-accent-foreground! " >
                        <Link className="w-full py-2 text-secondary-foreground! hover:bg-accent! hover:text-accent-foreground! " to='profile' > Profile </Link>
                    </DropdownItem>
                    <DropdownItem className="p-0 text-secondary-foreground! hover:bg-accent! hover:text-accent-foreground! ">
                        <Link className="w-full py-2 text-secondary-foreground! hover:bg-accent! hover:text-accent-foreground! " to='/settings' > Settings </Link>
                    </DropdownItem>
                    <DropdownItem className="p-0 py-2 text-secondary-foreground! hover:bg-accent! hover:text-accent-foreground! ">
                        <Link className="w-full text-secondary-foreground! hover:bg-accent! hover:text-accent-foreground! " onClick={handleSignOut} to='/login' >Sign Out </Link>
                    </DropdownItem>
                </Dropdown>
            </div>
        </Navbar>
    );
}