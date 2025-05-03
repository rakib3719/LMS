'use client';
import React from 'react';
import useGetData from '@/app/hooks/useGetData';
import axios from 'axios';
import { base_url } from '@/app/utils/api';
import Swal from 'sweetalert2';

const UpdateClassShedule = ({ id }) => {
    const { data: batches, loading: batchesLoading, error: batchesError } = useGetData('/batches/');
    const { data: teachers, loading: teachersLoading, error: teachersError } = useGetData('/teachers/');
    const { data: schedule, loading: SheduleLoading, error: SheduleError } = useGetData(`/class-schedules/${id}/`);

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = {
      
            batch: e.target.batch.value,
            teacher: e.target.teacher.value
        };

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to update this class schedule?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!',
            cancelButtonText: 'Cancel'
        });

        if (!result.isConfirmed) return;

        try {
            const resp = await axios.put(`${base_url}/class-schedules/${id}/`, formData);
            if (resp.status === 200) {
                await Swal.fire(
                    'Updated!',
                    'Class Schedule updated successfully!',
                    'success'
                );
            }
        } catch (error) {
            console.error(error);
            Swal.fire(
                'Error',
                error?.message || 'Something went wrong!',
                'error'
            );
        }
    };

    if (SheduleLoading || !schedule) return <div>Loading...</div>;
    if (SheduleError) return <div>Error loading schedule data</div>;

    return (
        <div className=" mx-auto py-8 bg-white rounded">
            <h2 className="text-2xl font-semibold mb-6 border-b border-gray-200 pb-4">
                Update Class Schedule - {schedule.class_title}
            </h2>
            <form onSubmit={submitHandler}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    {/* Class Number */}
                    <div>
                        <label htmlFor="class_no" className="block mb-1 font-medium text-gray-700">
                            Class Number
                        </label>
                        <input
                            id="class_no"
                            name="class_no"
                            type="number"
                            defaultValue={schedule.class_no}
                            placeholder="e.g. 5"
                            className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none"
                            required
                        />
                    </div>

                    {/* Class Title */}
                    <div>
                        <label htmlFor="class_title" className="block mb-1 font-medium text-gray-700">
                            Class Title
                        </label>
                        <input
                            id="class_title"
                            name="class_title"
                            type="text"
                            defaultValue={schedule.class_title}
                            placeholder="e.g. Introduction to Programming"
                            className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none"
                            required
                        />
                    </div>

                    {/* Class Date */}
                    <div>
                        <label htmlFor="class_date" className="block mb-1 font-medium text-gray-700">
                            Class Date
                        </label>
                        <input
                            id="class_date"
                            name="class_date"
                            type="date"
                            defaultValue={schedule.class_date}
                            className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none"
                            required
                        />
                    </div>

                    {/* Class Start Time */}
                    <div>
                        <label htmlFor="class_start" className="block mb-1 font-medium text-gray-700">
                            Start Time
                        </label>
                        <input
                            id="class_start"
                            name="class_start"
                            type="time"
                            defaultValue={schedule.class_start}
                            className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none"
                            required
                        />
                    </div>

                    {/* Class End Time */}
                    <div>
                        <label htmlFor="class_end" className="block mb-1 font-medium text-gray-700">
                            End Time
                        </label>
                        <input
                            id="class_end"
                            name="class_end"
                            type="time"
                            defaultValue={schedule.class_end}
                            className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none"
                            required
                        />
                    </div>

                    {/* Batch Selection */}
                    <div>
                        <label htmlFor="batch" className="block mb-1 font-medium text-gray-700">
                            Batch
                        </label>
                        <select
                            id="batch"
                            name="batch"
                            defaultValue={schedule.batch}
                            className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none"
                            disabled={batchesLoading || batchesError}
                            required
                        >
                            {batchesLoading ? (
                                <option>Loading batches...</option>
                            ) : batchesError ? (
                                <option>Error loading batches</option>
                            ) : (
                                <>
                                    <option value="">Select a batch</option>
                                    {batches && batches.map(b => (
                                        <option key={b.id} value={b.id}>{b.batch_name}</option>
                                    ))}
                                </>
                            )}
                        </select>
                    </div>

                    {/* Teacher Selection */}
                    <div>
                        <label htmlFor="teacher" className="block mb-1 font-medium text-gray-700">
                            Teacher
                        </label>
                        <select
                            id="teacher"
                            name="teacher"
                            defaultValue={schedule.teacher}
                            className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none"
                            disabled={teachersLoading || teachersError}
                            required
                        >
                            {teachersLoading ? (
                                <option>Loading teachers...</option>
                            ) : teachersError ? (
                                <option>Error loading teachers</option>
                            ) : (
                                <>
                                    <option value="">Select a teacher</option>
                                    {teachers && teachers.map(t => (
                                        <option key={t.id} value={t.id}>{t.teacher_id}</option>
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
                        Update Class Schedule
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateClassShedule;