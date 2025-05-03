'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import useGetData from '@/app/hooks/useGetData';
import axios from 'axios';
import Swal from 'sweetalert2';
import { base_url } from '@/app/utils/api';

const CreateClassSchedule = () => {
  const { data: teachers, loading: teachersLoading, error: teachersError } = useGetData('/teachers/');
  const { data: batches, loading: batchesLoading, error: batchesError } = useGetData('/batches/');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (formData) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to create this class schedule?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Save it!',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;

    try {
      const response = await axios.post(`${base_url}/class-schedules/`, formData);
      if (response.status === 201) {
        await Swal.fire('Saved!', 'Class schedule has been created.', 'success');
        reset();
      }
    } catch (error) {
      Swal.fire('Error!', error?.message || 'Something went wrong.', 'error');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white">
      <h2 className="text-2xl font-semibold mb-6 border-b border-gray-200 pb-4">
        Create Class Schedule
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <label htmlFor="class_no" className="block mb-1 font-medium text-gray-700">Class Number</label>
            <input
              id="class_no"
              type="number"
              {...register('class_no', { required: 'Class number is required' })}
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none"
              placeholder="e.g. 1"
            />
            {errors.class_no && <span className="text-red-500 text-sm">{errors.class_no.message}</span>}
          </div>

          <div>
            <label htmlFor="class_title" className="block mb-1 font-medium text-gray-700">Class Title</label>
            <input
              id="class_title"
              type="text"
              {...register('class_title', { required: 'Class title is required' })}
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none"
              placeholder="e.g. Introduction to React"
            />
            {errors.class_title && <span className="text-red-500 text-sm">{errors.class_title.message}</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label htmlFor="class_date" className="block mb-1 font-medium text-gray-700">Class Date</label>
            <input
              id="class_date"
              type="date"
              {...register('class_date', { required: 'Class date is required' })}
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none"
            />
            {errors.class_date && <span className="text-red-500 text-sm">{errors.class_date.message}</span>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="class_start" className="block mb-1 font-medium text-gray-700">Start Time</label>
              <input
                id="class_start"
                type="time"
                {...register('class_start', { required: 'Start time is required' })}
                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none"
              />
              {errors.class_start && <span className="text-red-500 text-sm">{errors.class_start.message}</span>}
            </div>
            <div>
              <label htmlFor="class_end" className="block mb-1 font-medium text-gray-700">End Time</label>
              <input
                id="class_end"
                type="time"
                {...register('class_end', { required: 'End time is required' })}
                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none"
              />
              {errors.class_end && <span className="text-red-500 text-sm">{errors.class_end.message}</span>}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label htmlFor="batch" className="block mb-1 font-medium text-gray-700">Batch</label>
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

          <div>
            <label htmlFor="teacher" className="block mb-1 font-medium text-gray-700">Teacher</label>
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
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="bg-black cursor-pointer text-white px-6 py-2 rounded transition duration-200"
          >
            Save Schedule
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateClassSchedule;
