'use client';
import { base_url } from '@/app/utils/api';
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const BatchesTable = ({ data }) => {

    const [newData, setData] = useState(data)
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
          // Filter out the deleted item from the data
          const newDataAfterDelete = newData.filter(item => item.id !== id);
          setData(newDataAfterDelete);
          
          await Swal.fire({
            title: "Deleted!",
            text: "Batch has been deleted successfully.",
            icon: "success"
          });
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
      <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
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
              {newData &&
                newData.map((item) => (
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
                          className="p-2 rounded bg-[#FBBD08] text-black hover:bg-[#e6ac07] transition-colors"
                          title="Details"
                        >
                          <FaEye />
                        </Link>
                        <Link
                          href={`/dashboard/batches/${item.id}/update-batch`}
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
        </div>
      </div>
    </div>
  );
};

export default BatchesTable;