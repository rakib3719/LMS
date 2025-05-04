'use client';
import { base_url } from '@/app/utils/api';
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaEye, FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AdmittedCoursesTable = ({ data }) => {
  const [newData, setData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  
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
      const resp = await axios.delete(`${base_url}/admitted-courses/${id}/`);
      if (resp.status === 204) {
        const newDataAfterDelete = newData.filter(item => item.id !== id);
        setData(newDataAfterDelete);
        
        await Swal.fire(
          'Deleted!',
          'Admitted Courses record has been deleted.',
          'success'
        );
        
        // Reset to first page if current page becomes empty
        if (currentItems.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      }
    } catch (error) {
      console.error(error);
      await Swal.fire(
        'Error!',
        'Something went wrong while deleting the record.',
        'error'
      );
    }
  };

  return (
    <div>
      <div className="container py-2 mx-auto sm:py-4 dark:text-gray-800">
        <h2 className="mb-4 text-2xl font-semibold leading-tight"></h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <colgroup>
              <col />
              <col />
              <col />
              <col />
              <col />
              <col />
              <col className="w-24" />
            </colgroup>
            <thead className="dark:bg-gray-300">
              <tr className="text-left">
                <th className="p-3">Student ID</th>
                <th className="p-3">Batch</th>
                <th className="p-3">Course Fee</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Due</th>
                <th className="p-3">Admission Date</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50"
                >
                  <td className="p-3">
                    <p>{item.student}</p>
                  </td>
                  <td className="p-3">
                    <p>{item.batch_details?.batch_name}</p>
                  </td>
                  <td className="p-3">
                    <p>{item.course_fee}</p>
                  </td>
                  <td className="p-3">
                    <p>{item.payment}</p>
                  </td>
                  <td className="p-3">
                    <p>{item.due}</p>
                  </td>
                  <td className="p-3">
                    <p>{item.admission_date}</p>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/dashboard/batches/${item.batch}/batch-details`}
                        className="p-2 rounded bg-black text-white transition-colors"
                        title="View Batch"
                      >
                        <FaEye />
                      </Link>
                      <Link
                        href={`/dashboard/admitted-courses/${item.id}/update-admit-course`}
                        className="p-2 rounded  bg-green-700 text-white  transition-colors"
                        title="Update"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => deleteHandler(item.id)}
                        className="p-2 cursor-pointer rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
              className={`p-2 rounded-md ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-black text-white'}`}
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdmittedCoursesTable;