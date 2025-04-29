'use client';
import React from 'react';
import './batches.css';
import useGetData from '@/app/hooks/useGetData';
import axios from 'axios';
import { base_url } from '@/app/utils/api';

const  UpdateBatch = ({id}) => {

const {data , loading, error} = useGetData('/courses/');

const batch = useGetData(`/batches/${id}/`);
console.log(batch, 'batch data for update');




const submitHabdle = async(e) => {
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
		
	}

try {
	const resp = await axios.put(`${base_url}/batches/${id}/`, batch_data);
	console.log(resp,'updated data s');
	if(data.status === 201) {
		alert('Batch Updated successfully!');
	}


	
} catch (error) {
	console.log(error);
	alert('Something went wrong!');
	
}

}

if(batch.loading) {
    return <div>Loading...</div>;}

if(batch.error) {
    return <div>Error loading batch data</div>;}


    return (
        <div className="max-w-2xl bg-white border border-gray-500 rounded   mx-auto p-6">
            <form
			
			onSubmit={submitHabdle}
			className="space-y-6">
                <div className="space-y-8 bg-white p-8 rounded-lg">
                    <h2 className="text-2xl font-semibold text-gray-800">Update {batch?.data?.batch_name} Batch</h2>
                    
                    {/* Batch Name */}
                    <div className="space-y-1">
                        <label htmlFor="batch_name" className="block text-sm font-medium text-gray-700">
                            Batch Name
                        </label>
                        <input
                            id="batch_name"
							name='batch_name'
                            defaultValue={batch?.data?.batch_name}
                            type="text"
                            placeholder="e.g. WADP-B3"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                    </div>

                    {/* Batch Start Date */}
                    <div className="space-y-1">
                        <label htmlFor="batch_start_date" className="block text-sm font-medium text-gray-700">
                            Batch Start Date
                        </label>
                        <input
                            id="batch_start_date"
                            type="date"
                            defaultValue={batch?.data?.batch_start_date}
							name="batch_start_date"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                    </div>

                    {/* Status Dropdown */}
                    <div className="space-y-1">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                            Status
                        </label>
                        <select
                            id="status"
                            defaultValue={batch?.data?.status}
							name="status"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-800"
                        >
                            <option value="Ongoing">Ongoing</option>
                            <option value="Upcoming">Upcoming</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    {/* Course Dropdown (1-10) */}
                    <div className="space-y-1">
                        <label htmlFor="course" className="block text-sm font-medium text-gray-700">
                            Course
                        </label>
                     
                             <select
                            id="course"
							name='course'
                            defaultValue={batch?.data?.course}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
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
                                        <option key={c.id} value={c.id}>Course {c.course_name}</option>
                                    ))}
                                </>
                            )}
                        </select>
                   
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                        >
                            Update Batch
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default  UpdateBatch;