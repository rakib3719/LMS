'use client';
import React, { useState } from 'react';
import Subheader from './Subheader';
import logo from '@/assets/images/logo2.png';
import Image from 'next/image';
import { FiSearch, FiBell, FiUser, FiSettings, FiMessageSquare, FiShoppingBag, FiLogOut } from 'react-icons/fi';
import { RiHistoryLine } from 'react-icons/ri';
import { AnimatePresence, motion } from 'framer-motion';

const Header = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    return (
        
        <>
            <div  className='bg-gray-900  border-b border-gray-100 sticky top-0  lg:top-8 items-center p-4'>
                <div className='flex items-center justify-between w-full'>
                    <section className='px-6'>
                        <div className="relative ml-6 lg:ml-0 max-w-md mx-auto">
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full bg-secondary py-2 pl-10 pr-4 rounded-full border border-gray-300 card-bg focus:outline-none focus:ring-1 focus:ring-yellow-300 focus:border-transparent"
                            />
                            <FiSearch className="absolute left-3  dark:text-black top-3 text-gray-400" />
                        </div>
                    </section>

                    <section className='flex items-center gap-4'>
                        {/* Notification Dropdown */}
                        <div className="relative">
                            <button 
                                onClick={() => {
                                    setIsNotificationOpen(!isNotificationOpen);
                                    if(isProfileOpen) setIsProfileOpen(false);
                                }}
                                className="p-2 bg-white cursor-pointer rounded-full hover:bg-gray-100 relative"
                            >
                                <FiBell className="text-xl text-black" />
                                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                            </button>
                            
                            <AnimatePresence>
                                {isNotificationOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute right-0 mt-2 w-72 bg-gray-900 rounded-md shadow-lg py-1 z-50 origin-top-right"
                                    >
                                        <div className="px-4 py-2 border-b border-gray-800">
                                            <h3 className="font-medium">Notifications</h3>
                                        </div>
                                        <div className="py-1">
                                            <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">New course available</a>
                                            <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Assignment deadline approaching</a>
                                            <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">New message received</a>
                                        </div>
                                        <div className="px-4 py-2 border-t text-center">
                                            <a href="#" className="text-sm text-blue-500">View all</a>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button 
                                onClick={() => {
                                    setIsProfileOpen(!isProfileOpen);
                                    if(isNotificationOpen) setIsNotificationOpen(false);
                                }}
                                className="flex cursor-pointer items-center gap-2"
                            >
                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                    <FiUser className="text-xl text-black" />
                                </div>
                            </button>
                            
                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute right-0 mt-2 w-56 bg-gray-900 rounded-md shadow-lg py-1 z-50 origin-top-right"
                                    >
                                        <div className="px-4 py-3 border-b">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                    <FiUser className="text-xl text-black" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">Rakib Hasan</p>
                                                    <p className="text-xs text-gray-500">email@gmail.com</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="py-1">
                                            <motion.a 
                                                whileHover={{ x: 4 }}
                                                href="#" className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 gap-2">
                                                <FiUser className="text-gray-500" />
                                                My Profile
                                            </motion.a>
                                            <motion.a 
                                                whileHover={{ x: 4 }}
                                                href="#" className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 gap-2">
                                                <RiHistoryLine className="text-gray-500" />
                                                Order History
                                            </motion.a>
                                            <motion.a 
                                                whileHover={{ x: 4 }}
                                                href="#" className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 gap-2">
                                                <FiSettings className="text-gray-500" />
                                                Account Settings
                                            </motion.a>
                                            <motion.a 
                                                whileHover={{ x: 4 }}
                                                href="#" className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 gap-2">
                                                <FiMessageSquare className="text-gray-500" />
                                                Messages
                                            </motion.a>
                                        </div>
                                        <div className="px-4 py-2 border-t">
                                            <motion.a 
                                                whileHover={{ x: 4 }}
                                                href="#" className="flex items-center text-sm hover:bg-gray-100 gap-2 text-red-500">
                                                <FiLogOut className="text-red-500" />
                                                Log Out
                                            </motion.a>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default Header;