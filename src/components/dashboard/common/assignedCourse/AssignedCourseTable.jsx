'use client';
import useGetData from '@/app/hooks/useGetData';
import { base_url } from '@/app/utils/api';
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaEye, FaUser, FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AssignedCourseTable = ({ data }) => {
  const [newData, setData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate total pages
  const totalPages = Math.ceil(newData.length / itemsPerPage);
  
  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = newData.slice(indexOfFirstItem, indexOfLastItem);


  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
      let endPage = startPage + maxVisiblePages - 1;
      
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = endPage - maxVisiblePages + 1;
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
   
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

  const deleteHandler = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (!result.isConfirmed) return;

    try {
      const resp = await axios.delete(`${base_url}/assign-courses/${id}/`);
      if (resp.status === 204) {
        const newDataAfterDelete = newData.filter(item => item.id !== id);
        setData(newDataAfterDelete);
        
        await Swal.fire(
          'Deleted!',
          'Admission record has been deleted.',
          'success'
        );
        
        // Reset to first page if current page becomes empty
        if (currentItems.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire(
        'Error!',
        'Something went wrong while deleting the record.',
        'error'
      );
    }
  };

  return (
    <div>
      <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
        <h2 className="mb-4 text-2xl font-semibold leading-tight"></h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <colgroup>
              <col />
              <col />
              <col />
              <col />
              <col className="w-24" />
              <col />
            </colgroup>
            <thead className="dark:bg-gray-300">
              <tr className="text-left">
                <th className="p-3">Teacher ID</th>
                <th className="p-3">Batch Name</th>
                <th className="p-3">Batch Start Date</th>
                <th className="p-3">Course Name</th>
                <th className="p-3 text-right">Action</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50"
                >
                  <td className="p-3">
                    <p>{item.teacher}</p>
                  </td>
                  <td className="p-3">
                    <p>{item?.batch_deatils?.batch_name}</p>
                  </td>
                  <td className="p-3">
                    <p>{item?.batch_deatils?.batch_start_date}</p>
                  </td>
                  <td className="p-3">
                    <p>{item?.course_details?.course_name}</p>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/dashboard/batches/${item.batch}/batch-details`}
                        className="p-2 rounded bg-[#FBBD08] text-black hover:bg-[#e6ac07] transition-colors"
                        title="View Batch"
                      >
                        <FaEye />
                      </Link>
                      <Link
                        href={`/dashboard/batches/${item.id}/batch-details`}
                        className="p-2 rounded bg-[#FBBD08] text-black hover:bg-[#e6ac07] transition-colors"
                        title="View Teacher"
                      >
                        <FaUser />
                      </Link>
                      <Link
                        href={`/dashboard/assigned-course/${item.id}/update-assign-course`}
                        className="p-2 rounded bg-[#FBBD08] text-black hover:bg-[#e6ac07] transition-colors"
                        title="Update"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => deleteHandler(item.id)}
                        className="p-2 rounded cursor-pointer bg-red-500 text-white hover:bg-red-600 transition-colors"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 font-semibold rounded-md ${
                        item.batch_deatils?.status === 'ongoing'
                          ? 'bg-[#FFC59121] text-[#AE8201]'
                          : item.batch_deatils?.status === 'completed'
                          ? 'bg-[#0892361A] text-[#089236]'
                          : 'bg-[#E302020D] text-[#E35102]'
                      }`}
                    >
                      <span>{item.batch_deatils?.status}</span>
                    </span>
                  </td>
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
                className={`p-2 rounded-md ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-[#FBBD08] hover:bg-[#e6ac07]'}`}
              >
                <FaChevronLeft />
              </button>

              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === 'number' ? setCurrentPage(page) : null}
                  className={`w-10 h-10 rounded-md ${currentPage === page ? 'bg-[#FBBD08] font-bold' : 'bg-gray-200 hover:bg-gray-300'} ${typeof page !== 'number' ? 'cursor-default' : ''}`}
                  disabled={page === '...'}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-md ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-[#FBBD08] hover:bg-[#e6ac07]'}`}
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

export default AssignedCourseTable;