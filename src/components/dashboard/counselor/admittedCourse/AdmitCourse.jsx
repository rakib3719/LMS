'use client';
import useGetData from '@/app/hooks/useGetData';
import { base_url } from '@/app/utils/api';
import axios from 'axios';
import React from 'react';

const AdmitCourse = () => {


    const {data, loading, error} = useGetData('/students/');
    const storeBatches = useGetData('/batches/');
    const batches = storeBatches?.data;


    const submitHandle = async (e) => {
        e.preventDefault();
        const formData = {
            student: e.target.student.value,
            batch: e.target.batch.value,
            payment: e.target.payment.value
        };
        console.log(formData);
        const resp = await axios.post(`${base_url}/admitted-courses/`, formData);
        console.log(resp, 'this is response');

// try {

//     const resp = await axios.post(`${base_url}/admitted-courses/`, formData);
//     console.log(resp?.status, 'this is response');

//     if(resp.status === 201){
//         alert('Created successfully')
//     }

    
// } catch (error) {
//     alert(error?.message)
// }



    };

    return (
        <div className="max-w-2xl bg-white border border-gray-500 rounded mx-auto p-6">
            <form onSubmit={submitHandle} className="space-y-6">
                <div className="space-y-8 bg-white p-8 rounded-lg">
                    <h2 className="text-2xl font-semibold text-gray-800">Admit Student to Course</h2>
                    
                    {/* Student Dropdown */}
                    <div className="space-y-1">
                        <label htmlFor="student" className="block text-sm font-medium text-gray-700">
                            Student
                        </label>
                        <select
                            id="student"
							name='student'
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                            disabled={loading || error}
                        >
                            {loading ? (
                                <option>Loading Stduents Id...</option>
                            ) : error ? (
                                <option>Error loading Stduents Id</option>
                            ) : (
                                <>
                                    <option value="">Select a Stduent</option>
                                    {data && data.map(s => (
                                        <option key={s.id} value={s.id}> {s.student_id}</option>
                                    ))}
                                </>
                            )}
                        </select>
                    </div>

                    {/* Batch Dropdown */}
                    <div className="space-y-1">
                        <label htmlFor="batch" className="block text-sm font-medium text-gray-700">
                            Batch
                        </label>
                        <select
                            id="batch"
							name='batch'
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                            disabled={batches?.loading || error}
                        >
                            {batches?.loading ? (
                                <option>Loading Batch Batch...</option>
                            ) : batches?.error ? (
                                <option>Error loading Batch</option>
                            ) : (
                                <>
                                    <option value="">Select a Batch</option>
                                    {batches && batches.map(b => (
                                        <option key={b.id} value={b.id}> {b.batch_name}</option>
                                    ))}
                                </>
                            )}
                        </select>
                    </div>

                    {/* Payment Input */}
                    <div className="space-y-1">
                        <label htmlFor="payment" className="block text-sm font-medium text-gray-700">
                            Payment Amount
                        </label>
                        <input
                            id="payment"
                            name="payment"
                            type="number"
                            placeholder="Enter payment amount"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                        >
                            Admit Course
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AdmitCourse;