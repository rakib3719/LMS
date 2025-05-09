'use client'
import useGetData from '@/app/hooks/useGetData';
import React from 'react';
import Link from 'next/link';
import { FaClipboardCheck, FaCalendarAlt, FaClock } from 'react-icons/fa';

const StudentAttendancePage = () => {
  const { data, loading, error } = useGetData(`/class-schedules/`);



  const convertTo12HourFormat = (time24) => {
    const [hourStr, minute] = time24.split(':');
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12; 
    return `${hour}:${minute} ${ampm}`;
  };
  
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-xl font-semibold">Loading....</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex shadow justify-center items-center h-screen">
        <h1 className="text-xl font-semibold text-red-600">Something went wrong!</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Class Attendance</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data?.map((schedule) => (
          <div 
            key={schedule.id}
            className="bg-white rounded-lg  shadow overflow-hidden duration-300 border-l-4 border-[#1111]"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center mb-2">
                    <FaCalendarAlt className="text-green-600 mr-2" />
                    <span className="font-bold text-gray-700">
                      {new Date(schedule.class_date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">
                    {schedule.class_title}
                  </h2>
                  
                  <div className="flex items-center text-gray-600">
                    <FaClock className="mr-2" />
                    <span>Starts at: {convertTo12HourFormat(schedule.class_start)}</span>
                  </div>
                </div>
                
                <Link 
                  href={`/dashboard/student-attendance/${schedule.id}/student-attendance`}
                  className="flex items-center justify-center p-3 bg-black text-white rounded-full transition-colors duration-300"
                  title="Mark Attendance"
                >
                  <FaClipboardCheck className="text-xl" />
                </Link>
              
              </div>
            <div className='flex justify-end'>
            <Link 
                  href={`/dashboard/student-attendance/${schedule.id}/view-attendance`}
                  className="flex   p-3 bg-black text-white rounded-full transition-colors duration-300"
                  title="Mark Attendance"
                >
                  <FaClipboardCheck className="text-xl" />
                </Link>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentAttendancePage;