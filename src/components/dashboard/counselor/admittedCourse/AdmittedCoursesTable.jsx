'use client'
import useGetData from '@/app/hooks/useGetData';
import { base_url } from '@/app/utils/api';
import axios from 'axios';
import Link from 'next/link';
import React, { use } from 'react';

const AdmittedCoursesTable = ({data}) => {
  



const deleteHandaler = async(id) => {

alert('Sure to??????????')



try {
    const resp = await axios.delete(`${base_url}/admitted-courses/${id}/`);
    if(resp.status === 204) {

  


        alert('Batch deleted successfully!');
      
    }
    console.log(resp, 'delete');
} catch (error) {
    console.error(error);
    alert('Something went wrong!');
    
}

}



    return (
        <div>

         
<div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
                <h2 className="mb-4 text-2xl font-semibold leading-tight"></h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-xs">
                        <colgroup>
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                            <col className="w-24" />
                        </colgroup>
                        <thead className="dark:bg-gray-300">
                            <tr className="text-left">
                                <th className="p-3">student Id</th>
                                <th className="p-3">Batch</th>
                                <th className="p-3">Course Fee</th>
                                <th className="p-3">Payment</th>
                                <th className="p-3">Due</th>
                                <th className="p-3 text-right">Admission Date</th>
                                <th className="p-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                data && data.map((item) => (
                                    <tr key={item.id} className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                    <td className="p-3">
                                        <p>{item.student}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{item.batch_details?.batch_name}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{item.course_fee}</p>
                                  
                                    </td>
                                    <td className="p-3">
                                        <p>{item.payment}</p>
                                  
                                    </td>
                                    <td className="p-3">
                                        <p>{item.due}</p>
                                  
                                    </td>
                                    <td className="p-3">
                                        <p>{item.admission_date}</p>
                                  
                                    </td>
                                    <td className="p-3 text-center">
                                        <Link
                                        href={`/dashboard/batches/${item.batch}/batch-details`}
                                        className='border text-white cursor-pointer py-2 rounded  bg-amber-400 '>View Batch</Link>
                                        <Link
                                        href={`/dashboard/batches/${item.id}/update-batch`}
                                        className='border text-white cursor-pointer py-2 rounded  bg-amber-400 '>Update</Link>
                                        <button
                                        onClick={()=> deleteHandaler(item.id)}
                                        className='border text-white py-2 cursor-pointer rounded  bg-amber-400 '>
                                            delete
                                        



                                        </button>
                                    </td>
                                  
                                </tr>
                                ))
                            }
                           
                           
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default AdmittedCoursesTable;