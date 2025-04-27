import React from 'react';
import welcome from '../../../assets/images/dashboard/welcome.png';
import Image from 'next/image';
// import Summury from './Summury';
// import TopInstructors from './TopInstructors';
// import Summury2 from './Summury2';
// import TopCoursesCategories from './TopCoursesCategories';
// import RecentCourse from './RecentCourse';

const AdminHme = () => {
    return (
        <div className=' px-3 md:px-8 container mx-auto'>
           {/* welcome section */}

           <section className='flex py-4 md:py-0 rounded-2xl bg-premium-dark justify-between items-center container mx-auto px-8'>

            <div>
            <h1 className='md:text-2xl font-semibold'>
            Welcome Back! Edu Den

            </h1>
            <p className='text-xs md:text-lg'>Learning Management System Dashboard.</p>
            </div>

            <div>
                <Image alt='img' src={welcome}/>

            </div>

           </section>

           {/* <Summury/> */}

{/*      
           <RecentCourse/> */}

        </div>
    );
};

export default AdminHme;