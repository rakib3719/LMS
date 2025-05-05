'use client';
import React from 'react';
import './batches.css';
import useGetData from '@/app/hooks/useGetData';
import axios from 'axios';
import { base_url } from '@/app/utils/api';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';


const CreateBatch = () => {
    const {data, loading, error} = useGetData('/course-ref/');

    const submitHandler = async (data) => {
      

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "Are You sure created this batch!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, save it!',
            cancelButtonText: 'Cancel'
          });
      
          if (!result.isConfirmed) return;

          console.log(data);
      

        try {
            const resp = await axios.post(`${base_url}/batches/`, data);
            if(resp.status === 201) {
             
 
                await Swal.fire(
                    ' successfully!',
                    'Batch created successfully!',
                    'success'
                  );
            }
        } catch (error) {
            console.log(error);
            Swal.fire(
                'Error',
                error?.message || 'Something went wrong!',
                'error'
              );
        }
    };



    const {
        register,
        handleSubmit,
       watch,
        formState: { errors },
      } = useForm()
    return (
        <div className=" mx-auto   bg-white ">
        <h2 className="text-2xl font-semibold mb-6 border-b border-gray-200 pb-4">Create New Batch</h2>
        <form onSubmit={ handleSubmit( submitHandler)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/* Batch Name */}
            <div>
              <label htmlFor="batch_name" className="block mb-1 font-medium text-gray-700">
                Batch Name
              </label>
              <input
                id="batch_name"
                {...register('batch_name', {required:true})}
                type="text"
                placeholder="e.g. WADP-B3"
                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none  "
           
              />
              {errors.batch_name && <span className='text-red-500'>Batch_Name Must be required</span>}
            </div>
      
            {/* Batch Start Date */}
            <div>
              <label htmlFor="batch_start_date" className="block mb-1 font-medium text-gray-700">
                Batch Start Date
              </label>
              <input
                id="batch_start_date"
                {...register('batch_start_date', {required:true})}
             
                type="date"
                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none  "
             
              />

                  {errors.batch_start_date && <span className='text-red-500'>Batch_Start_Date Must be required</span>}
            </div>
      
            {/* Status Dropdown */}
            <div>
              <label htmlFor="status" className="block mb-1 font-medium text-gray-700">
                Status
              </label>
              <select
                id="status"
        {...register('status', {required:true})}
                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none  "
            
              >
                <option value="Ongoing">Ongoing</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Completed">Completed</option>
              </select>
              {errors.status && <span className='text-red-500'>Status Must be required</span>}
            </div>
      
            {/* Course Dropdown */}
            <div>
              <label htmlFor="course" className="block mb-1 font-medium text-gray-700">
                Course
              </label>
              <select
                id="course"
                {...register('course', {required:true})}
                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none  "
                disabled={loading || error}
         
              >
                {loading ? (
                  <option>Loading courses...</option>
                ) : error ? (
                  <option>Error loading courses</option>
                ) : (
                  <>
                    <option value="">Select a course</option>
                    {data && data.map(c => (
                      <option key={c.id} value={c.id}>
                        Course {c.course_name}
                      </option>
                    ))}
                  </>
                )}
              </select>

              {errors.course && <span className='text-red-500'>Course Must be required</span>}
            </div>
          </div>
      
          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="bg-black cursor-pointer text-white px-6 py-2 rounded  transition duration-200"
            >
              Create Batch
            </button>
          </div>
        </form>
      </div>
      
    );
};

export default CreateBatch;