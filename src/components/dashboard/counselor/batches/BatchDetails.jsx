'use client';
import useGetData from '@/app/hooks/useGetData';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react';

const BatchDetails = () => {
    const params = useParams();
    const { id } = params;

    const {data, loading, error} = useGetData(`/batches/${id}/`);

    if(loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-2xl font-semibold">Loading...</h1> 
            </div>
        )
    }

    if(error) {
        console.log('Error of get batches data', error);
        return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-2xl text-red-600">Something went wrong!</h1>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Main Card */}
            <div className="bg-white rounded-lg  overflow-hidden">
                {/* Header Section */}
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <div>
                        <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                            data?.status === 'Ongoing' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                            {data?.status}
                        </span>
                        <h2 className="mt-2 text-2xl font-bold text-gray-800">{data?.batch_name}</h2>
                    </div>
                    <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-lg">
                        <p className="font-semibold">{data?.course_details?.course_category}</p>
                    </div>
                </div>

                {/* Course Thumbnail */}
                <div className="p-6">
                    <div className="relative h-96 w-full rounded-lg overflow-hidden">
                        <Image 
                            src={data?.course_details?.course_thumbnail}
                            alt={data?.course_details?.course_name}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                        Batch Started: {new Date(data?.batch_start_date).toLocaleDateString()}
                    </p>
                </div>

                {/* Course Details */}
                <div className="p-6 space-y-6">
                    {/* Course Title */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{data?.course_details?.course_name}</h1>
                        <p className="mt-2 text-gray-600">{data?.course_details?.short_summary}</p>
                    </div>

                    {/* Course Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Lectures</p>
                            <p className="text-2xl font-bold">{data?.course_details?.no_of_lectures}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Projects</p>
                            <p className="text-2xl font-bold">{data?.course_details?.no_of_projects}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Assessments</p>
                            <p className="text-2xl font-bold">{data?.course_details?.no_of_assessments}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Duration</p>
                            <p className="text-2xl font-bold">{data?.course_details?.course_duration}</p>
                        </div>
                    </div>

                    {/* Course Fee */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-500">Course Fee</p>
                        <p className="text-3xl font-bold text-blue-700">
                            ৳{data?.course_details?.course_fee?.toLocaleString()}
                        </p>
                    </div>

                    {/* Who Can Join */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Who can join?</h2>
                        <ul className="space-y-2 list-disc pl-5">
                            {data?.course_details?.who_can_join?.map((item, index) => (
                                <li key={index} className="text-gray-700">{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Course Overview */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Course Overview</h2>
                        {data?.course_details?.course_overview?.map((overview, index) => (
                            <div key={index} className="space-y-4">
                                {Object.entries(overview).map(([key, value]) => (
                                    key !== 'Summary' && (
                                        <div key={key}>
                                            <h3 className="text-lg font-medium text-gray-800">{key}</h3>
                                            <p className="text-gray-600">{value}</p>
                                        </div>
                                    )
                                ))}
                                {overview.Summary && (
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="text-lg font-medium text-gray-800">Summary</h3>
                                        <p className="text-gray-600">{overview.Summary}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Course Tools */}
                    {data?.course_details?.course_tools && (
                        <div>
                            <h2 className="text-2xl font-semibold mb-4">Tools & Technologies</h2>
                          
                                    <div  className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                                  { data?.course_details?.course_tools}
                                    </div>
                           
                            </div>
                       
                    )}
                </div>
            </div>
        </div>
    );
};

export default BatchDetails;