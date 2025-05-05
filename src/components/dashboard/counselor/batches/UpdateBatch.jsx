'use client';
import React from 'react';
import './batches.css';
import useGetData from '@/app/hooks/useGetData';
import axios from 'axios';
import { base_url } from '@/app/utils/api';
import Swal from 'sweetalert2';

const UpdateBatch = ({ id }) => {
  const { data: courses, loading, error } = useGetData('/course-ref/');
  const batch = useGetData(`/batches/${id}/`);

  const submitHandler = async (e) => {
    e.preventDefault();
    const batch_name = e.target.batch_name.value;
    const batch_start_date = e.target.batch_start_date.value;
    const status = e.target.status.value;
    const course = e.target.course.value;

    const batch_data = {
      batch_name,
      batch_start_date,
      status,
      course,
    };

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to update this batch?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
    });

    if (!result.isConfirmed) return;

    try {
      const resp = await axios.put(`${base_url}/batches/${id}/`, batch_data);
      if (resp.status === 200 || resp.status === 201) {
        await Swal.fire('Updated!', 'Batch updated successfully!', 'success');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', error?.message || 'Something went wrong!', 'error');
    }
  };

  if (batch.loading || !batch.data) return <div>Loading...</div>;
  if (batch.error) return <div>Error loading batch data</div>;

  return (
    <div className=" mx-auto py-8 bg-white">
      <h2 className="text-2xl font-semibold mb-6 border-b border-gray-200 pb-4">
        Update Batch - {batch.data.batch_name}
      </h2>
      <form onSubmit={submitHandler}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Batch Name */}
          <div>
            <label htmlFor="batch_name" className="block mb-1 font-medium text-gray-700">
              Batch Name
            </label>
            <input
              id="batch_name"
              name="batch_name"
              defaultValue={batch.data.batch_name}
              type="text"
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none"
            
            />
          </div>

          {/* Batch Start Date */}
          <div>
            <label htmlFor="batch_start_date" className="block mb-1 font-medium text-gray-700">
              Batch Start Date
            </label>
            <input
              id="batch_start_date"
              name="batch_start_date"
              defaultValue={batch.data.batch_start_date}
              type="date"
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none"
         
            />
          </div>

          {/* Status Dropdown */}
          <div>
            <label htmlFor="status" className="block mb-1 font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              name="status"
              defaultValue={batch.data.status}
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none"
          
            >
              <option value="Ongoing">Ongoing</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Course Dropdown */}
          <div>
            <label htmlFor="course" className="block mb-1 font-medium text-gray-700">
              Course
            </label>
            <select
              id="course"
              name="course"
              defaultValue={batch.data.course}
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none"
              disabled={loading || error}
           
            >
              {loading ? (
                <option>Loading courses...</option>
              ) : error ? (
                <option>Error loading courses</option>
              ) : (
                <>
                  <option value="">Select a course</option>
                  {courses && courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      Course {c.course_name}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            className="bg-black cursor-pointer text-white px-6 py-2 rounded transition duration-200"
          >
            Update Batch
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBatch;
