'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import {  FaChevronLeft, FaChevronRight, FaUpload } from 'react-icons/fa';


const  TeacherCalassSheduleTable = ({ data }) => {


  const [newData, setData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(newData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = newData.slice(indexOfFirstItem, indexOfLastItem);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
      let endPage = startPage + maxVisiblePages - 1;

      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = endPage - maxVisiblePages + 1;
      }

      for (let i = startPage; i <= endPage; i++) pages.push(i);
      if (startPage > 1) {
        pages.unshift('...');
        pages.unshift(1);
      }
      if (endPage < totalPages) {
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

 

  return (
    <div>

        <h1 className='text-2xl font-semibold'>Class Schedule</h1>
      <div className="container py-2 mx-auto sm:py-4 dark:text-gray-800">
   
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="dark:bg-gray-300">
              <tr className="text-left">
                <th className="p-3">Class No</th>
                <th className="p-3">Class Title</th>
                <th className="p-3">Batch</th>
                <th className="p-3">Teacher</th>
                <th className="p-3">Start Time</th>
                <th className="p-3"> Class Metarials</th>
             
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="border-b dark:border-gray-300 dark:bg-gray-50">
                  <td className="p-3">{item.class_no}</td>
                  <td className="p-3">{item.class_title}</td>
                  <td className="p-3">{item.batch}</td>
                  <td className="p-3">{item.teacher}</td>
                  <td className="p-3">{item.class_start}</td>
                  <td className="p-3">


                 <div className='flex gap-2'>
                 <Link
                                           href={`/dashboard/class-metarials/${item.id}/class-metarials-view`}
                                           className="p-2 bg-green-800 rounded text-white "
                                    
                                         >
                                           Class Metarials
                                         </Link>
    
                 </div>


                  </td>
                         {/* <td className=''>
                         <Link
                                           href={`/dashboard/upload-course-material/?id=${item.id}`}
                                           className="p-2 bg-green-800 rounded text-white "
                                           title="Edit"
                                         >
                                           <FaUpload />
                                         </Link>
                         </td> */}
                
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-6 space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded-md ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-black text-white'}`}
              >
                <FaChevronLeft />
              </button>

              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === 'number' && setCurrentPage(page)}
                  disabled={page === '...'}
                  className={`w-10 h-10 rounded-md ${
                    currentPage === page ? 'bg-black text-white font-bold' : 'bg-gray-200 hover:bg-gray-300'
                  } ${typeof page !== 'number' ? 'cursor-default' : ''}`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-md ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-black text-white'}`}
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherCalassSheduleTable;
