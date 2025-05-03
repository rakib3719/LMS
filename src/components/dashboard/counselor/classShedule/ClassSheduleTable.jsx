'use client';
import { base_url } from '@/app/utils/api';
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaEye, FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Swal from 'sweetalert2';

const CalassSheduleTable = ({ data }) => {
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

  const deleteHandaler = async (id) => {
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
      const resp = await axios.delete(`${base_url}/class-schedules/${id}/`);
      if (resp.status === 204) {
        const newDataAfterDelete = newData.filter(item => item.id !== id);
        setData(newDataAfterDelete);
        await Swal.fire('Deleted!', 'Class Schedule record has been deleted.', 'success');
        
        if (currentItems.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error!', 'Something went wrong while deleting the record.', 'error');
    }
  };

  return (
    <div>
      <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
        <h2 className="mb-4 text-2xl font-semibold leading-tight">Class Schedule</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="dark:bg-gray-300">
              <tr className="text-left">
                <th className="p-3">Class No</th>
                <th className="p-3">Class Title</th>
                <th className="p-3">Batch</th>
                <th className="p-3">Teacher</th>
                <th className="p-3">Start Time</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id} className="border-b dark:border-gray-300 dark:bg-gray-50">
                  <td className="p-3">{item.class_no}</td>
                  <td className="p-3">{item.class_title}</td>
                  <td className="p-3">{item.batch}</td>
                  <td className="p-3">{item.teacher}</td>
                  <td className="p-3">{item.class_start}</td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/dashboard/class-schedule/${item.id}/view`}
                        className="p-2 bg-[#FBBD08] rounded text-black hover:bg-[#e6ac07]"
                        title="View"
                      >
                        <FaEye />
                      </Link>
                      <Link
                        href={`/dashboard/class-schedule/${item.id}/edit`}
                        className="p-2 bg-[#FBBD08] rounded text-black hover:bg-[#e6ac07]"
                        title="Edit"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => deleteHandaler(item.id)}
                        className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
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
                  onClick={() => typeof page === 'number' && setCurrentPage(page)}
                  disabled={page === '...'}
                  className={`w-10 h-10 rounded-md ${
                    currentPage === page ? 'bg-[#FBBD08] font-bold' : 'bg-gray-200 hover:bg-gray-300'
                  } ${typeof page !== 'number' ? 'cursor-default' : ''}`}
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

export default CalassSheduleTable;
