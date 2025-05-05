'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import useGetData from '@/app/hooks/useGetData';
import { base_url } from '@/app/utils/api';
import axios from 'axios';
import Swal from 'sweetalert2';

const AdmitCourse = () => {
  const {
    data: students,
    loading: studentsLoading,
    error: studentsError
  } = useGetData('/student-ref/');

  const {
    data: batches,
    loading: batchesLoading,
    error: batchesError
  } = useGetData('/batch-ref/');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const submitHandler = async (formData) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to admit this student?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, save it!',
      cancelButtonText: 'Cancel'
    });

    if (!result.isConfirmed) return;

    try {
      const resp = await axios.post(`${base_url}/admitted-courses/`, formData);
      if (resp.status === 201) {
        await Swal.fire('Success!', 'Student admitted successfully!', 'success');
      }
    } catch (error) {
      Swal.fire('Error', error?.message || 'Something went wrong!', 'error');
    }
  };

  return (
    <div className=" mx-auto py-8 bg-white ">
      <h2 className="text-2xl font-semibold mb-6 border-b border-gray-200 pb-4">Admit Student to Course</h2>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Student Select */}
          <div>
            <label htmlFor="student" className="block mb-1 font-medium text-gray-700">
              Student
            </label>
            <select
              id="student"
              {...register('student', { required: true })}
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none"
              disabled={studentsLoading || studentsError}
            >
              {studentsLoading ? (
                <option>Loading students...</option>
              ) : studentsError ? (
                <option>Error loading students</option>
              ) : (
                <>
                  <option value="">Select a student</option>
                  {students &&
                    students.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.user}
                      </option>
                    ))}
                </>
              )}
            </select>
            {errors.student && <span className="text-red-500">Student is required</span>}
          </div>

          {/* Batch Select */}
          <div>
            <label htmlFor="batch" className="block mb-1 font-medium text-gray-700">
              Batch
            </label>
            <select
              id="batch"
              {...register('batch', { required: true })}
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none"
              disabled={batchesLoading || batchesError}
            >
              {batchesLoading ? (
                <option>Loading batches...</option>
              ) : batchesError ? (
                <option>Error loading batches</option>
              ) : (
                <>
                  <option value="">Select a batch</option>
                  {batches &&
                    batches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.batch_name}
                      </option>
                    ))}
                </>
              )}
            </select>
            {errors.batch && <span className="text-red-500">Batch is required</span>}
          </div>

          {/* Payment Input */}
          <div>
            <label htmlFor="payment" className="block mb-1 font-medium text-gray-700">
              Payment Amount
            </label>
            <input
              id="payment"
              type="number"
              placeholder="Enter payment amount"
              {...register('payment', { required: true, min: 0 })}
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none"
            />
            {errors.payment && (
              <span className="text-red-500">payment  is required</span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            className="bg-black text-white cursor-pointer px-6 py-2 rounded  transition duration-200"
          >
            Admit Student
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdmitCourse;
