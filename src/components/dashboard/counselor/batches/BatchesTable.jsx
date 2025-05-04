'use client';
import { base_url } from '@/app/utils/api';
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaEye, FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Swal from 'sweetalert2';

const BatchesTable = ({ data }) => {
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

  const deleteHandler = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (!result.isConfirmed) return;

    try {
      const resp = await axios.delete(`${base_url}/batches/${id}/`);
      if (resp.status === 204) {
        const newDataAfterDelete = newData.filter(item => item.id !== id);
        setData(newDataAfterDelete);
        
        await Swal.fire({
          title: "Deleted!",
          text: "Batch has been deleted successfully.",
          icon: "success"
        });

        if (currentItems.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong while deleting the batch.",
        icon: "error"
      });
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
              <col className="w-24" />
            </colgroup>
            <thead className="dark:bg-gray-300 ">
              <tr className="text-left">
                <th className="p-3">Batch Name</th>
                <th className="p-3">Batch Started Date</th>
                <th className="p-3">Course Duration</th>
                <th className="p-3">No Of Lectures</th>
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
                    <p>{item.batch_name}</p>
                  </td>
                  <td className="p-3">
                    <p>{item.batch_start_date}</p>
                  </td>
                  <td className="p-3">
                    <p>{item.course_details?.course_duration}</p>
                  </td>
                  <td className="p-3">
                    <p>{item.course_details?.no_of_lectures}</p>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/dashboard/batches/${item.id}/batch-details`}
                        className="p-2 rounded bg-black text-white transition-colors"
                        title="Details"
                      >
                        <FaEye />
                      </Link>
                      <Link
                        href={`/dashboard/batches/${item.id}/update-batch`}
                        className="p-2 rounded bg-green-800 text-white transition-colors"
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
                  <td className="p-3 text-right">
                    <span
                      className={`px-3 py-1 font-semibold rounded-md ${
                        item.status === 'ongoing'
                          ? 'bg-[#FFC59121] text-[#AE8201]'
                          : item.status === 'completed'
                          ? 'bg-[#0892361A] text-[#089236]'
                          : 'bg-[#E302020D] text-[#E35102]'
                      }`}
                    >
                      <span>{item.status}</span>
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
                className={`p-2 rounded-md ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-200'}`}
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
                className={`p-2 rounded-md ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-200 text-white'}`}
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

export default BatchesTable;