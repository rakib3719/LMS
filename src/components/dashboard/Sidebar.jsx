'use client';

import React, { useState } from 'react';
import logo from '@/assets/images/logo.png';
// import logo from '../../assets/images/logo.png'

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

import { IoIosCloseCircleOutline, IoMdClose } from "react-icons/io";
import {
  FiHome, FiUsers, FiBook, FiSettings, FiFileText,
  FiBarChart2, FiCalendar, FiMail, FiChevronDown, FiChevronRight
} from 'react-icons/fi';
import { TbUserQuestion } from "react-icons/tb";
import { CgFileDocument } from "react-icons/cg";
import { MdAssignmentAdd, MdMenu, MdOutlineMenuOpen, MdOutlineQuiz, MdPayment } from 'react-icons/md';
import { BsStack } from "react-icons/bs";
import { FaChalkboardTeacher, FaRegistered, FaRegRegistered, FaRegUser } from 'react-icons/fa';
import { PiStackPlusFill, PiUsersFour } from "react-icons/pi";
import { AiOutlineSchedule } from "react-icons/ai";
import { IoFolderOpenOutline, IoPersonAdd } from "react-icons/io5";
import { GrCertificate } from "react-icons/gr";


const Sidebar = () => {
  const [expandedMenus, setExpandedMenus] = useState({});
  const [activeMenu, setActiveMenu] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [showMenuPc, setShowMenuPc] = useState(false)

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  }

  const toggleMenuPc = () => {
    setShowMenuPc(!showMenuPc)
  }


  // counselor menu


  const superAdminMenu = [

    {
      menuName: "Create Counselor",
      link: "/dashboard/create-counselor",
      icon: <IoPersonAdd className="text-lg" />,
    }
  ]


  const counselorMenu =

    [
      {
        menuName: "Dashboard",
        link: "/dashboard",
        icon: <FiHome className="text-lg" />,
      },
      {
        menuName: "Student Admission",
        link: "/dashboard/student-admission",
        icon: <FiUsers className="text-lg" />,

      },
      {
        menuName: "Student Enquiry",
        link: "/dashboard/student-enquiry",
        icon: <TbUserQuestion className="text-lg" />,

      },
      {
        menuName: "Student Attendance",
        link: "/dashboard/student-attendance",
        icon: <CgFileDocument className="text-lg" />,

      },

      {
        menuName: "Teacher",
        link: "/dashboard/teacher",
        icon: <FaChalkboardTeacher className="text-lg" />,
      },
      {
        menuName: "Courses",
        link: "/dashboard/courses",
        icon: <BsStack className="text-lg" />,
      },
      {
        menuName: "Batches",
        link: "/dashboard/batches",
        icon: <PiUsersFour className="text-lg" />,

      },

      {
        menuName: "Admitted Courses",
        link: "/dashboard/admitted-courses",
        icon: <PiStackPlusFill className="text-lg" />,

      },

      {
        menuName: "Assigned Course",
        link: "/dashboard/assigned-course",
        icon: <BsStack className="text-lg" />,
  
      },
      {
        menuName: "Class Schedule",
        link: "/dashboard/class-schedule",
        icon: <AiOutlineSchedule className="text-lg" />,

      },

      
      {
        menuName: "My Profile",
        link: "/dashboard/my-profile",
        icon: <FaRegUser className="text-lg" />,
      }
    ];


    // teacher menu
  const teacherMenu =

  [
    {
      menuName: "Dashboard",
      link: "/dashboard",
      icon: <FiHome className="text-lg" />,
    },
    {
      menuName: "Assigned Course",
      link: "/dashboard/assigned-course",
      icon: <BsStack className="text-lg" />,

    },
    {
      menuName: "Quiz",
      link: "/dashboard/quiz",
      icon: <MdOutlineQuiz className="text-lg" />,

    },
    {
      menuName: "Assignment",
      link: "/dashboard/assignment",
      icon: <MdAssignmentAdd className="text-lg" />,

    },

    {
      menuName: "Course Material",
      link: "/dashboard/course-material",
      icon: <IoFolderOpenOutline className="text-lg" />,
    },
    
    {
      menuName: "My Profile",
      link: "/dashboard/my-profile",
      icon: <FaRegUser className="text-lg" />,
    }
   

  ];

  // stduentmenu
  const studentMenu =

    [
      {
        menuName: "Dashboard",
        link: "/dashboard",
        icon: <FiHome className="text-lg" />,
      },
      {
        menuName: "Class Schedule",
        link: "/dashboard/class-schedule",
        icon: <AiOutlineSchedule  className="text-lg" />,

      },
      {
        menuName: "Admitted Courses",
        link: "/dashboard/admitted-courses",
        icon: <BsStack className="text-lg" />,

      },
      {
        menuName: "Course Materials",
        link: "/dashboard/course-material",
        icon: <IoFolderOpenOutline className="text-lg" />,

      },
  
      {
        menuName: "My Quiz",
        link: "/dashboard/my-quiz",
        icon: <MdOutlineQuiz  className="text-lg" />,
      },
      {
        menuName: "My Certificate",
        link: "/dashboard/my-certificate",
        icon: <GrCertificate className="text-lg" />,
      },
      {
        menuName: "Payment History",
        link: "/dashboard/payment-history",
        icon: <MdPayment className="text-lg" />,

      },
      {
        menuName: "My Attendance",
        link: "/dashboard/my-attendance",
        icon: <CgFileDocument className="text-lg" />,

      },
      
      {
        menuName: "My Profile",
        link: "/dashboard/my-profile",
        icon: <FaRegUser className="text-lg" />,
      }
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


      <div className='fixed top-[25px]    left-4 z-50 lg:hidden '>
        {
          showMenu ? (
            <IoMdClose className="text-gray-700 text-2xl cursor-pointer" onClick={toggleMenu} />
          ) : (
            <MdMenu className="text-gray-700 text-2xl  cursor-pointer" onClick={toggleMenu} />
          )
        }
      </div>



      <div className={`hidden lg:block fixed duration-700 top-60 z-50  ${!showMenuPc ? 'left-[24vw] 2xl:left-[19vw]' : 'left-0'}`}>

        {!showMenuPc ? <IoIosCloseCircleOutline

          onClick={toggleMenuPc}
          className='text-2xl duration-700 text-gray-400 cursor-pointer' />

          :
          <MdOutlineMenuOpen

            onClick={toggleMenuPc}
            className='text-2xl duration-700 text-gray-400 cursor-pointer' />}
      </div>


      {/* Mobile Menu Toggle Button */}



      {/* mock */}

      {/* <div className='hidden lg:block w-[250px]  absolute'>

    </div> */}
      <div className={`fixed top-16  ${showMenuPc ? '-ml-[25vw] 2xl:-ml-[20vw] duration-700' : 'ml-0 duration-700'} lg:sticky  text-white bg-white w-[250px] sm:w-[300px] mt-4 lg:mt-0 lg:w-[25vw] 2xl:w-[20vw] h-screen p-6 lg:top-0 overflow-y-auto shadow-lg transition-all duration-300 ease-in-out ${showMenu ? 'translate-x-0 min-h-screen ' : '-translate-x-full'} lg:translate-x-0`}>
        {/* Logo Section */}
        {/* <div className={`fixed top-16 ${showMenuPc ? '-ml-[250px] duration-700' : 'ml-0 duration-700'} lg:sticky bg-white w-[250px] h-screen p-6 lg:top-0 overflow-y-auto shadow-lg transition-all duration-300 ease-in-out ${showMenu ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}> */}


        <section className='px-2 mb-2'>
          <Image
            alt='logo'
            src={logo}
            height={40}
            width={100}
            className='h-auto   w-auto'
          />
        </section>



        <nav className="flex  flex-col mt-10 space-y-1">



          {/* counselor */}
          <div className='border-b pb-4'> 
            
        
            {counselorMenu.map((item) => (
              <div key={item.menuName} className="mb-1">
              <Link   href={item.link}>
              
              <motion.div
                  onClick={() => item.link ? toggleSubmenu(item.link) : null}
                  className={`flex text-[#00000099] items-center justify-between p-2 rounded-lg cursor-pointer
                  ${activeMenu === item.link ? 'bg-black hover:text-white text-white' : 'hover:bg-[black] hover:text-white'}
                `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div 
                    className="flex items-center gap-3"
                    onClick={() => !item.submenu && setActiveMenu(item.link)}
                  >
                    <span className={`${activeMenu === item.link ? 'text-white' : ''}`}>
                      {item.icon}
                    </span>
                    <span className="text-base font-medium">{item.menuName}</span>
                  </div>


                </motion.div></Link>

              </div>
            ))}
          </div>

          {/* teacher */}
          <div>
          {teacherMenu.map((item) => (
              <div key={item.menuName} className="mb-1">
              <Link   href={item.link}>
              
              <motion.div
                  onClick={() => item.link ? toggleSubmenu(item.link) : null}
                  className={`flex text-[#00000099] items-center justify-between p-2 rounded-lg cursor-pointer
                  ${activeMenu === item.link ? 'bg-black hover:text-white text-white' : 'hover:bg-[black] hover:text-white'}
                `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className="flex items-center gap-3"
                    onClick={() => !item.submenu && setActiveMenu(item.link)}
                  >
                    <span className={`${activeMenu === item.link ? 'text-white' : ''}`}>
                      {item.icon}
                    </span>
                    <span className="text-base font-medium">{item.menuName}</span>
                  </div>


                </motion.div></Link>

              </div>
            ))}


          </div>


{/* super admin */}
<div>
          {superAdminMenu.map((item) => (
              <div key={item.menuName} className="mb-1">
              <Link   href={item.link}>
              
              <motion.div
                  onClick={() => item.link ? toggleSubmenu(item.link) : null}
                  className={`flex text-[#00000099] items-center justify-between p-2 rounded-lg cursor-pointer
                  ${activeMenu === item.link ? 'bg-black hover:text-white text-white' : 'hover:bg-[black] hover:text-white'}
                `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className="flex items-center gap-3"
                    onClick={() => !item.submenu && setActiveMenu(item.link)}
                  >
                    <span className={`${activeMenu === item.link ? 'text-white' : ''}`}>
                      {item.icon}
                    </span>
                    <span className="text-base font-medium">{item.menuName}</span>
                  </div>


                </motion.div></Link>

              </div>
            ))}


          </div>



          {/* stduent */}
          {/* <div>
          {studentMenu.map((item) => (
              <div key={item.menuName} className="mb-1">
              <Link   href={item.link}>
              
              <motion.div
                  onClick={() => item.link ? toggleSubmenu(item.link) : null}
                  className={`flex text-[#00000099] items-center justify-between p-2 rounded-lg cursor-pointer
                  ${activeMenu === item.link ? 'bg-black hover:text-white text-white' : 'hover:bg-[black] hover:text-white'}
                `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link href={item.link}
                    className="flex items-center gap-3"
                    onClick={() => !item.submenu && setActiveMenu(item.link)}
                  >
                    <span className={`${activeMenu === item.link ? 'text-white' : ''}`}>
                      {item.icon}
                    </span>
                    <span className="text-base font-medium">{item.menuName}</span>
                  </Link>


                </motion.div></Link>

              </div>
            ))}


          </div> */}

          <div>

          </div>






        </nav>
      </div>
    </div>

  );
};

export default Sidebar;