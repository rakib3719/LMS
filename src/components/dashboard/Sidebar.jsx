'use client';

import React, { useState } from 'react';
import logo from '@/assets/images/logo2.png';
import Image from 'next/image';
import { IoIosCloseCircleOutline, IoMdClose } from "react-icons/io";

import { 
  FiHome, FiUsers, FiBook, FiSettings, FiFileText, 
  FiBarChart2, FiCalendar, FiMail, FiChevronDown, FiChevronRight 
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { MdMenu, MdOutlineMenuOpen } from 'react-icons/md';

const Sidebar = () => {
  const [expandedMenus, setExpandedMenus] = useState({});
  const [activeMenu, setActiveMenu] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [showMenuPc, setShowMenuPc]= useState(false)
 
  const toggleMenu = () => {
    setShowMenu(!showMenu);}

    const toggleMenuPc = ()=>{
      setShowMenuPc(!showMenuPc)
    }




  // Menu configuration array
  const menuItems = [
    {
      menuName: "Dashboard",
      link: "/dashboard",
      icon: <FiHome className="text-lg" />,
    },
    {
      menuName: "Students",
      link: "/students",
      icon: <FiUsers className="text-lg" />,
      submenu: [
        { menuName: "All Students", link: "/students/all" },
        { menuName: "Admissions", link: "/students/admissions" },
        { menuName: "Attendance", link: "/students/attendance" },
      ],
    },
    {
      menuName: "Teachers",
      link: "/teachers",
      icon: <FiBook className="text-lg" />,
      submenu: [
        { menuName: "All Teachers", link: "/teachers/all" },
        { menuName: "Assign Classes", link: "/teachers/assign" },
      ],
    },
    {
      menuName: "Courses",
      link: "/courses",
      icon: <FiFileText className="text-lg" />,
      submenu: [
        { menuName: "All Courses", link: "/courses/all" },
        { menuName: "Categories", link: "/courses/categories" },
        { menuName: "Add New", link: "/courses/new" },
      ],
    },
    {
      menuName: "Reports",
      link: "/reports",
      icon: <FiBarChart2 className="text-lg" />,
    },
    {
      menuName: "Calendar",
      link: "/calendar",
      icon: <FiCalendar className="text-lg" />,
    },
    {
      menuName: "Messages",
      link: "/messages",
      icon: <FiMail className="text-lg" />,
    },
    {
      menuName: "Settings",
      link: "/settings",
      icon: <FiSettings className="text-lg" />,
      submenu: [
        { menuName: "System Settings", link: "/settings/system" },
        { menuName: "User Management", link: "/settings/users" },
        { menuName: "Permissions", link: "/settings/permissions" },
      ],
    },
  ];

  const toggleSubmenu = (menuName) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
    setActiveMenu(menuName === activeMenu ? '' : menuName);
  };

  return (

   <div>


    <div className='fixed top-[25px]  left-4 z-50 lg:hidden '>
  {
    showMenu ? (
      <IoMdClose className="text-gray-700 text-2xl cursor-pointer" onClick={toggleMenu} />
    ) : (
      <MdMenu className="text-gray-700 text-2xl  cursor-pointer" onClick={toggleMenu} />
    )
  }
    </div>


    <div className={`hidden lg:block fixed duration-700 top-60 z-50  ${!showMenuPc? 'left-60' : 'left-0'}`}>
{  !showMenuPc ?  <IoIosCloseCircleOutline 
    
    onClick={toggleMenuPc}
    className='text-2xl duration-700 text-gray-400 cursor-pointer'/>

    :
    <MdOutlineMenuOpen
    
    onClick={toggleMenuPc}
    className='text-2xl duration-700 text-gray-400 cursor-pointer'/>}
    </div>


    {/* Mobile Menu Toggle Button */}
    


    {/* mock */}

    {/* <div className='hidden lg:block w-[250px]  absolute'>

    </div> */}
       <div className={`fixed top-16  ${showMenuPc ? '-ml-[250px] duration-700' : 'ml-0 duration-700'} lg:sticky  text-white bg-gray-900 w-[250px] h-screen p-6 lg:top-0 overflow-y-auto shadow-lg transition-all duration-300 ease-in-out ${showMenu ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        {/* Logo Section */}
        {/* <div className={`fixed top-16 ${showMenuPc ? '-ml-[250px] duration-700' : 'ml-0 duration-700'} lg:sticky bg-white w-[250px] h-screen p-6 lg:top-0 overflow-y-auto shadow-lg transition-all duration-300 ease-in-out ${showMenu ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}> */}


        <section className='px-6 mb-8'>
          <Image 
            alt='logo' 
            src={logo} 
            height={40} 
            width={100}  
            className='h-auto mt-4 lg:mt-8 w-auto'
          />
        </section>

     

        <nav className="flex  flex-col mt-6 lg:mt-16 space-y-1">


          {menuItems.map((item) => (
            <div key={item.menuName} className="mb-1">
              <motion.div
                onClick={() => item.submenu ? toggleSubmenu(item.menuName) : null}
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer
                  ${activeMenu === item.menuName ? 'bg-blue-50 hover:text-blue-500 text-blue-600' : 'hover:bg-blue-50 hover:text-blue-500'}
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div 
                  className="flex items-center gap-3"
                  onClick={() => !item.submenu && setActiveMenu(item.menuName)}
                >
                  <span className={`${activeMenu === item.menuName ? 'text-blue-500' : 'text-gray-600'}`}>
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium">{item.menuName}</span>
                </div>
                
                {item.submenu && (
                  <motion.span 
                    className="text-gray-400"
                    animate={{ rotate: expandedMenus[item.menuName] ? 0 : -90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiChevronDown />
                  </motion.span>
                )}
              </motion.div>

              <AnimatePresence>
                {item.submenu && expandedMenus[item.menuName] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: 1,
                      height: "auto",
                      transition: { 
                        opacity: { duration: 0.4 },
                        height: { duration: 0.7, ease: [0.04, 0.62, 0.23, 0.98] } 
                      }
                    }}
                    exit={{ 
                      opacity: 0,
                      height: 0,
                      transition: { 
                        opacity: { duration: 0.2 },
                        height: { duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] } 
                      }
                    }}
                    className="overflow-hidde"
                  >
                    <div className="ml-8 mt-1 space-y-1">
                      {item.submenu.map((subItem, index) => (
                        <motion.a
                          key={subItem.menuName}
                          href={subItem.link}
                        className="block py-2 px-3 text-sm  hover:text-blue-500 rounded-lg hover:bg-blue-50 text-gray-600"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ 
                            opacity: 1, 
                            x: 0,
                            transition: { 
                              delay: 0.1 * index,
                              duration: 0.5 
                            }
                          }}
                          whileHover={{ x: 4 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {subItem.menuName}
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>
      </div>
   </div>
 
  );
};

export default Sidebar;