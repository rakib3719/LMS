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

  // Keep everything else the same except the JSX inside return
return (
    <div className="bg-white     min-h-screen text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl overflow-hidden ">
          {/* Header */}
          <div className="p-6 border-b border-yellow-500 flex justify-between items-center">
            <div>
              <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                data?.status === 'Ongoing'
                  ? 'bg-green-500 text-white'
                  : 'bg-yellow-500 text-black'
              }`}>
                {data?.status}
              </span>
              <h2 className="mt-2 text-3xl font-bold text-white">{data?.batch_name}</h2>
            </div>
            <div className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold">
              {data?.course_details?.course_category}
            </div>
          </div>
  
          {/* Image */}
          <div className="relative h-80 w-full">
            <Image
              src={data?.course_details?.course_thumbnail}
              alt={data?.course_details?.course_name}
              fill
              className="object-cover rounded-2xl shadow"
              priority
            />
          </div>
          <div className="px-6 py-4 text-sm text-gray-900">
            Batch Started: {new Date(data?.batch_start_date).toLocaleDateString()}
          </div>
  
          {/* Course Info */}
          <div className="p-6 space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-black">{data?.course_details?.course_name}</h1>

              <div className="grid py-4 grid-cols-2 md:grid-cols-4 gap-4">
              {[
                ['Lectures', data?.course_details?.no_of_lectures],
                ['Projects', data?.course_details?.no_of_projects],
                ['Assessments', data?.course_details?.no_of_assessments],
                ['Duration', data?.course_details?.course_duration],
              ].map(([label, value], i) => (
                <div key={i} className="bg-white p-4 rounded-lg border border-gray-900">
                  <p className="text-sm text-gray-900">{label}</p>
                  <p className="text-2xl font-bold text-gray-900 ">{value}</p>
                </div>
              ))}
            </div>


              <p className="mt-2 text-gray-900">{data?.course_details?.short_summary}</p>
            </div>
  
            {/* Stats */}
      
  
            {/* Fee */}
            <div className="bg-yellow-500 text-black p-6 rounded-lg text-center">
              <p className="text-sm font-medium">Course Fee</p>
              <p className="text-4xl font-extrabold mt-2">
                ৳{data?.course_details?.course_fee?.toLocaleString()}
              </p>
            </div>
  
            {/* Who can join */}
            <div>
              <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Who can join?</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                {data?.course_details?.who_can_join?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
  
            {/* Overview */}
            <div>
              <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Course Overview</h2>
              {data?.course_details?.course_overview?.map((overview, idx) => (
                <div key={idx} className="space-y-4 bg-[#1f1f1f] p-4 rounded-lg border border-gray-700">
                  {Object.entries(overview).map(([key, value]) =>
                    key !== 'Summary' ? (
                      <div key={key}>
                        <h3 className="text-lg font-semibold text-white">{key}</h3>
                        <p className="text-gray-300">{value}</p>
                      </div>
                    ) : null
                  )}
                  {overview.Summary && (
                    <div className="bg-[#2a2a2a] p-3 rounded-md">
                      <h3 className="text-lg font-semibold text-white">Summary</h3>
                      <p className="text-gray-300">{overview.Summary}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
  
            {/* Tools */}
            {data?.course_details?.course_tools && (
              <div>
                <h2 className="text-2xl font-semibold text-yellow-400 mb-2">Tools & Technologies</h2>
                <div className="inline-block bg-yellow-600 text-black px-4 py-2 rounded-full text-sm">
                  {data?.course_details?.course_tools}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default BatchDetails;