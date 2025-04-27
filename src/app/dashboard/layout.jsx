
'use client';

import "../../app/globals.css";

import Sidebar from "../../components/dashboard/Sidebar";
import Subheader from "../../components/dashboard/Subheader";

import { FaDiceThree, FaTimes } from "react-icons/fa";
import useAuthToken from "../hooks/useAuthToken";
import { useEffect } from "react";
// import Header from "@/components/dashboard/Header";




export default function RootLayout({ children }) {
    // const [showMenu, setShowMenu] = useState(true);

    // const toggleMenu = () => {
    //     setShowMenu(!showMenu);
    // };

//    useEffect(()=>{

// const {token} = useAuthToken()
// console.log(token, 'token from layout');

//    },[])

    return (
        <html lang="en">
            <body >
                <div className="relative" >
                    <Subheader />

                    {/* Mobile Menu Toggle Button */}
                    {/* <button 
                        // onClick={toggleMenu}
                        className="fixed lg:hidden z-50 top-6 left-4 p-2 rounded-full bg-white shadow-md"
                    >
                        {showMenu ? (
                            <FaTimes className="text-gray-700 text-lg" />
                        ) : (
                            <FaDiceThree className="text-gray-700 text-lg" />
                        )}
                    </button> */}

                    <section className="flex">
                        {/* Sidebar with Animation */}
                        {/* <AnimatePresence> */}
                        
                                
                                    <Sidebar />
                           
                          
                        {/* </AnimatePresence> */}

                        {/* Overlay for mobile */}
                        {/* <AnimatePresence>
                            {showMenu && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={toggleMenu}
                                    className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
                                />
                            )}
                        </AnimatePresence> */}

                        <div className="w-full min-h-screen  main-bg ">
                            {/* <Header /> */}
                            <div className="mt-12 ">
                                {children}
                            </div>
                        </div>
                    </section>
                </div>
            </body>
        </html>
    );
}