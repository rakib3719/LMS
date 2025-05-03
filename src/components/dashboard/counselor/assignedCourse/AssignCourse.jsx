'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import useGetData from '@/app/hooks/useGetData';
import { base_url } from '@/app/utils/api';
import axios from 'axios';
import Swal from 'sweetalert2';

const AssignCourse = () => {
  const {
    data: teachers,
    loading: teachersLoading,
    error: teachersError,
  } = useGetData('/teachers/');

  const {
    data: batches,
    loading: batchesLoading,
    error: batchesError,
  } = useGetData('/batches/');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const submitHandler = async (formData) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to assign this teacher to the batch?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, assign it!',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;

    try {
      const resp = await axios.post(`${base_url}/assign-courses/`, formData);
      if (resp.status === 201) {
        await Swal.fire('Assigned!', 'Course assigned successfully.', 'success');
        reset();
      }
    } catch (error) {
      Swal.fire('Error', error?.message || 'Something went wrong!', 'error');
    }
  };

  return (
    <div className="mx-auto py-8 bg-white">
      <h2 className="text-2xl font-semibold mb-6 border-b border-gray-200 pb-4">
        Assign Course to Teacher
      </h2>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Teacher Select */}
          <div>
            <label htmlFor="teacher" className="block mb-1 font-medium text-gray-700">
              Teacher
            </label>
            <select
              id="teacher"
              {...register('teacher', { required: true })}
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none"
              disabled={teachersLoading || teachersError}
            >
              {teachersLoading ? (
                <option>Loading teachers...</option>
              ) : teachersError ? (
                <option>Error loading teachers</option>
              ) : (
                <>
                  <option value="">Select a teacher</option>
                  {teachers &&
                    teachers.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.teacher_id}
                      </option>
                    ))}
                </>
              )}
            </select>
            {errors.teacher && <span className="text-red-500">Teacher is required</span>}
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
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            className="bg-black text-white cursor-pointer px-6 py-2 rounded transition duration-200"
          >
            Assign Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssignCourse;
