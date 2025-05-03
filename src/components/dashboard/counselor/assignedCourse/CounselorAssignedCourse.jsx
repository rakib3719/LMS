'use client';
import React, { useState } from 'react';
import useGetData from '@/app/hooks/useGetData';
import Link from 'next/link';
import AssignedCourseTable from '../../common/assignedCourse/AssignedCourseTable';
import { FaPlus, FaSearch } from 'react-icons/fa';

const CounselorAssignedCourse = () => {
    const [filter, setFilter] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [searchType, setSearchType] = useState('batch'); 
    const [activeSearch, setActiveSearch] = useState('');

    const buildApiUrl = () => {
        let params = new URLSearchParams();
        if (filter) params.append('status', filter);
        if (activeSearch) {
            if (searchType === 'batch') {
                params.append('batch_name', activeSearch);
            } else {
                params.append('course_name', activeSearch);
            }
        }
        return `/assign-courses/?${params.toString()}`;
    };

    const { data, loading, error } = useGetData(buildApiUrl());

    const filterHandler = (e) => {
        setFilter(e.target.value);
    };

    const handleSearch = () => {
        setActiveSearch(searchInput);
    };

    const handleSearchTypeChange = (e) => {
        setSearchType(e.target.value);
        setActiveSearch('');
        setSearchInput('');
    };

    if (loading) {
        return <div className="flex justify-center items-center h-64"><h1>Loading...</h1></div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-64"><h1>Something went wrong!</h1></div>;
    }

    return (
        <div className="p-4">
            <div className="mb-6">
                <Link 
                    href={'/dashboard/assign-course/'} 
                    className='bg-[#FBBD08] hover:bg-[#e6ac07] text-black px-4 py-2 rounded-lg flex items-center gap-2 w-fit'
                >
                    <FaPlus /> Assign Course
                </Link>
            </div>

            <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4'>
                <h1 className='text-2xl font-semibold'>Assigned Courses</h1>
                
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search Input with Dropdown Button */}
                    <div className="relative flex">
                        {/* Search Type Dropdown */}
                        <select
                            onChange={handleSearchTypeChange}
                            value={searchType}
                            className="bg-[#F0F1F2] border border-gray-300 text-gray-700 p-2 rounded-l-lg focus:ring-2 focus:ring-[#FBBD08] focus:border-[#FBBD08] outline-none"
                        >
                            <option value="batch">Search by Batch</option>
                            <option value="course">Search by Course</option>
                        </select>
                        
                        {/* Search Input */}
                        <input
                            type="text"
                            placeholder={searchType === 'batch' ? 'Enter batch name...' : 'Enter course name...'}
                            className="p-2 border border-gray-300 focus:ring-2 focus:ring-[#FBBD08] focus:border-[#FBBD08] w-full outline-none"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        
                        {/* Search Button */}
                        <button
                            onClick={handleSearch}
                            className="bg-black text-white px-4 rounded-r-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#FBBD08] flex items-center gap-2"
                        >
                            <FaSearch /> Search
                        </button>
                    </div>
                    
                    {/* Status Filter Dropdown */}
                    <select
                        onChange={filterHandler}
                        value={filter}
                        className="p-2 border border-gray-300 bg-[#F0F1F2] text-gray-900 rounded-lg focus:ring-2 focus:ring-[#FBBD08] focus:border-[#FBBD08] outline-none"
                    >
                        <option value="">All Status</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                        <option value="upcoming">Upcoming</option>
                    </select>
                </div>
            </div>

            <AssignedCourseTable data={data || []} />
        </div>
    );
};

export default CounselorAssignedCourse;