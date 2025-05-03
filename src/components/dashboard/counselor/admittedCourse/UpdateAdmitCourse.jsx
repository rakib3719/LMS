'use client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useGetData from '@/app/hooks/useGetData';
import { base_url } from '@/app/utils/api';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateAdmitCourse = ({ id }) => {
  const {
    data: students,
    loading: studentsLoading,
    error: studentsError,
  } = useGetData('/students/');

  const {
    data: batches,
    loading: batchesLoading,
    error: batchesError,
  } = useGetData('/batches/');

  const {
    data: existingData,
    loading: existingLoading,
    error: existingError,
  } = useGetData(`/admitted-courses/${id}/`);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Prefill the form once data is loaded
  useEffect(() => {
    if (!existingLoading && existingData) {
      reset({
        student: existingData.student,
        batch: existingData.batch,
        payment: existingData.payment || '',
      });
    }
  }, [existingLoading, existingData, reset]);

  const onSubmit = async (formData) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to update this admission?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'Cancel',
    });

    if (!confirm.isConfirmed) return;

    try {
      const updatedData = {
        student: formData.student,
        batch: formData.batch,
        ...(formData.payment && { payment: formData.payment }),
      };

      const resp = await axios.put(`${base_url}/admitted-courses/${id}/`, updatedData);
      if (resp.status === 200 || resp.status === 204) {
        await Swal.fire('Updated!', 'Admission updated successfully.', 'success');
      }
    } catch (error) {
      Swal.fire('Error', error?.message || 'Something went wrong!', 'error');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white">
      <h2 className="text-2xl font-semibold mb-6 border-b border-gray-200 pb-4">Update Student Admission</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                        {s.student_id}
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
              {...register('payment', { min: 0 })}
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none"
            />
            {errors.payment && <span className="text-red-500">Payment amount reqired</span>}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            className={`bg-black text-white px-6 py-2 rounded transition duration-200 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Updating...' : 'Update Admission'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateAdmitCourse;
