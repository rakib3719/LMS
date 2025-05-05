'use client';
import useGetData from '@/app/hooks/useGetData';
import { base_url } from '@/app/utils/api';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UpdateAssignCourse = ({id}) => {


    const {data, loading, error} = useGetData('/teachers/');
    const [teacher_id, setTeacher_id] = useState('')
    const [teacher_Value, setTeacherValue] = useState('')
    const storeBatches = useGetData('/batches/');
    const [loader, setLoader] = useState(false)
    const batches = storeBatches?.data;
    const existingAssinCourse = useGetData(`/assign-courses/${id}`)
    const tId = existingAssinCourse?.data?.teacher;

    console.log(existingAssinCourse?.data, 'existing course');

    useEffect(() => {
        if(!loading && data && tId){
            const teacher = data.find(s => s.id === tId);

   
            if(teacher) {
                setTeacher_id(teacher. teacher_id);
                setTeacherValue( teacher?.id)
        
            }
        }
    }, [loading, data, tId]); 

    const submitHandle = async (e) => {
        setLoader(true)
        e.preventDefault();
        const formData = {
            teacher: e.target.teacher.value,
            batch: e.target.batch.value,
       
        };
        console.log(formData);
       try {
        const resp = await axios.put(`${base_url}/assign-courses/${id}/`, formData);
 
        console.log(resp, 'this is response');
               setLoader(false)
        alert('Sucessfully Update')
       } catch (error) {
        alert(error?.message)
       }

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
        <div className=" bg-white  rounded  py-6">
            <form onSubmit={submitHandle} className="space-y-6">
                <div className="space-y-8 bg-white p-8 rounded-lg">
                    <h2 className="text-2xl font-semibold text-gray-800">Update Assign course</h2>
                    
                    {/* Student Dropdown */}
                    <div className="space-y-1">
                        <label htmlFor="student" className="block text-sm font-medium text-gray-700">
                         Teacher
                        </label>
                        <select
                            id="teacher"
                            name='teacher'
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                            disabled={loading || error}
                        >
                            {loading ? (
                                <option>Loading Teacher Id...</option>
                            ) : error ? (
                                <option>Error loading Stduents Id</option>
                            ) : (
                                <>
                                    <option value={teacher_Value}>{teacher_id}</option>
                                    {data && data.map(t => (
                                        <option key={t.id} value={t.id}> {t.teacher_id}</option>
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
                            {storeBatches?.loading ? (
                                <option>Loading Batch Batch...</option>
                            ) : storeBatches?.error ? (
                                <option>Error loading Batch</option>
                            ) : (
                                <>
                                    <option value={existingAssinCourse?.data?.batch}>{existingAssinCourse?.data?.batch_deatils?.batch_name}</option>
                                    {batches && batches.map(b => (
                                        <option key={b.id} value={b.id}> {b.batch_name}</option>
                                    ))}
                                </>
                            )}
                        </select>
                    </div>

              

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className=" cursor-pointer bg-black text-white font-medium py-2 px-4 rounded-md focus:outline-none "
                        >
                       Update Assign course
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UpdateAssignCourse;