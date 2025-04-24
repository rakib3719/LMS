'use client';
import React from 'react';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const TopInstructors = () => {
  // Updated sample data array with emails
  const instructors = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: '/avatars/1.png',
      email: 'sarah@example.com',
      rating: 4.9,
      courses: 42
    },
    {
      id: 2,
      name: 'Michael Chen',
      avatar: '/avatars/2.png',
      email: 'michael@example.com',
      rating: 4.8,
      courses: 28
    },
    {
      id: 3,
      name: 'Emma Wilson',
      avatar: '/avatars/3.png',
      email: 'emma@example.com',
      rating: 4.7,
      courses: 35
    },
    {
      id: 4,
      name: 'David Kim',
      avatar: '/avatars/4.png',
      email: 'david@example.com',
      rating: 4.8,
      courses: 31
    },
    {
      id: 5,
      name: 'Lisa Rodriguez',
      avatar: '/avatars/5.png',
      email: 'lisa@example.com',
      rating: 4.6,
      courses: 19
    },
    {
      id: 6,
      name: 'James Peterson',
      avatar: '/avatars/6.png',
      email: 'james@example.com',
      rating: 4.7,
      courses: 24
    }
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  // Calculate pagination
  const totalPages = Math.ceil(instructors.length / itemsPerPage);
  const currentItems = instructors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-md mt-8 w-full">
      <h2 className="text-2xl font-bold text-gray-200 mb-6">Top Instructors</h2>
      
      {/* Scrollable container */}
      <div className="w-full overflow-x-auto touch-pan-x">
        {/* Table container with minimum width */}
        <div className="min-w-[600px]">
          {/* Table header */}
          <div className="grid grid-cols-12 gap-4 px-4 py-3 card-bg rounded-t-lg border-b border-gray-200 font-medium text-gray-500">
            <div className="col-span-2 min-w-[60px]">Profile</div>
            <div className="col-span-6 min-w-[250px]">Instructor</div>
            <div className="col-span-2 min-w-[100px]">Rating</div>
            <div className="col-span-2 min-w-[100px] text-right">Courses</div>
          </div>
          
          {/* Table body */}
          <div className="overflow-y-auto" style={{ maxHeight: '500px' }}>
            {currentItems.map((instructor) => (
              <div 
                key={instructor.id} 
                className="grid grid-cols-12 gap-4 px-4 py-4 items-center border-b border-gray-100 hover:bg-gray-800 transition-colors"
              >
                {/* Profile Picture */}
                <div className="col-span-2 flex items-center min-w-[60px]">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-medium">
                      {instructor.name.charAt(0)}
                    </span>
                  </div>
                </div>
                
                {/* Name and Email */}
                <div className="col-span-6 min-w-[250px]">
                  <p className="font-medium text-gray-800">{instructor.name}</p>
                  <p className="text-sm text-gray-500">{instructor.email}</p>
                </div>
                
                {/* Rating */}
                <div className="col-span-2 min-w-[100px]">
                  <div className="flex items-center bg-amber-500/10 px-3 py-1 rounded-full w-fit">
                    <FiStar className="text-amber-500 mr-1" />
                    <span className="text-amber-800 font-medium">{instructor.rating}</span>
                  </div>
                </div>
                
                {/* Courses */}
                <div className="col-span-2 text-right min-w-[100px]">
                  <p className="text-gray-700 font-medium">{instructor.courses}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 px-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="flex items-center px-3 py-1 rounded-md border border-gray-300 hover:bg-[#ffd300] disabled:opacity-50  transition-colors"
        >
          <FiChevronLeft className="mr-1 text-gray-200" /> Previous
        </button>
        
        <div className="flex space-x-1">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 rounded-md transition-colors ${
                currentPage === i + 1 
                  ? 'bg-primary text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="flex items-center px-3 py-1 rounded-md border border-gray-300 text-gray-600 disabled:opacity-50 hover:bg-[#ffd300] transition-colors"
        >
          Next <FiChevronRight className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default TopInstructors;