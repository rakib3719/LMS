'use client'
import useGetData from '@/app/hooks/useGetData';
import React, { useState, useEffect } from 'react';
import { FaClipboardCheck, FaTrash, FaEdit } from 'react-icons/fa';
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import { base_url } from '@/app/utils/api';
import Swal from 'sweetalert2';

const ViewAttendence = ({id}) => {
    const {data: attendanceData, loading, error} = useGetData(`/student-attendances/?class_schedule=${id}`);
    const {data: studentsData} = useGetData(`/students/`);
    const [attendances, setAttendances] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedAttendance, setSelectedAttendance] = useState(null);
    console.log(studentsData, );
    
   
    useEffect(() => {
        if (attendanceData && studentsData) {
            const mergedData = attendanceData.map(attendance => {
                const student = studentsData.find(s => s.id === attendance.student);
                return {
                    ...attendance,
                    studentInfo: student ? {
                        user: student.user,
                        full_name: student.full_name,
                        email: student.email,
                        contact_number: student.contact_number
                    } : null
                };
            });
            setAttendances(mergedData);
        }
    }, [attendanceData, studentsData]);

    console.log(attendanceData, 'attendce data');

    const overlayVariants = {
        visible: {
          opacity: 1,
          transition: {
            when: "beforeChildren",
            duration: 0.3,
            delayChildren: 0.4
          }
        },
        hidden: {
          opacity: 0,
          transition: {
            when: "afterChildren",
            duration: 0.3,
            delay: 0.4
          }
        }
    };

    if(loading){
        return <h1>Loading...</h1>
    }

    if(error){
        return <h1>Something went wrong!</h1>
    }

    const handleDelete = async (attendanceId) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (!result.isConfirmed) return;

        try {
            await axios.delete(`${base_url}/student-attendances/${attendanceId}/`);
            // Remove from local state instead of refetching
            setAttendances(prev => prev.filter(item => item.id !== attendanceId));
            await Swal.fire(
                'Deleted!',
                'Attendance record has been deleted.',
                'success'
            );
        } catch (error) {
            Swal.fire(
                'Error!',
                error?.message || 'Failed to delete attendance.',
                'error'
            );
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const status = formData.get("status");
        const remark = formData.get("remark");

        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to update this attendance record?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!"
        });

        if (!result.isConfirmed) return;

        try {
            // Update in local state first for immediate UI feedback
            setAttendances(prev => prev.map(item => {
                if (item.id === selectedAttendance.id) {
                    return {
                        ...item,
                        attendance_status: status,
                        remarks: remark
                    };
                }
                return item;
            }));

            // Then make API call
            await axios.patch(`${base_url}/student-attendances/${selectedAttendance.id}/`, {
                attendance_status: status,
                remarks: remark
            });

            await Swal.fire(
                'Updated!',
                'Attendance record has been updated.',
                'success'
            );
            setModalIsOpen(false);
        } catch (error) {
            // Revert if API call fails
            setAttendances(prev => prev.map(item => {
                if (item.id === selectedAttendance.id) {
                    return selectedAttendance;
                }
                return item;
            }));
            Swal.fire(
                'Error!',
                error?.message || 'Failed to update attendance.',
                'error'
            );
        }
    };

    const openEditModal = (attendance) => {
        setSelectedAttendance(attendance);
        setModalIsOpen(true);
    };
   
    return (
        <div>
            <h1 className='text-2xl font-semibold py-4'>Attendance Records</h1>

            <table className="min-w-full text-sm">
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
                        <th className="p-3">Student ID</th>
                        <th className="p-3">Name</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Remarks</th>
                        <th className="p-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {attendances?.map((item) => (
                        <tr
                            key={item?.id}
                            className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50"
                        >
                            <td className="p-3">
                                <p>{item.studentInfo?.user || item.student}</p>
                            </td>
                            <td className="p-3">
                                <p>{item.studentInfo?.full_name || 'N/A'}</p>
                            </td>
                            <td className="p-3">
                                <p>{item.studentInfo?.email || 'N/A'}</p>
                            </td>
                            <td className="p-3">
                                <span className={`text-sm font-medium ${
                                    item.attendance_status === 'Present' 
                                        ? 'text-green-600' 
                                        : 'text-red-500'
                                }`}>
                                    {item.attendance_status}
                                </span>
                            </td>
                            <td className="p-3">
                                <p>{item?.remarks || '-'}</p>
                            </td>
                            <td className="p-3">
                                <div className="flex justify-end gap-2">
                                    <button 
                                        onClick={() => openEditModal(item)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        <FaEdit className="text-xl cursor-pointer" />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(item.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaTrash className="text-xl cursor-pointer" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <AnimatePresence>
                {modalIsOpen && selectedAttendance && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={overlayVariants}
                        className="fixed inset-0 flex justify-center items-center z-50 "
                    >
                        <motion.div
                            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg"
                            initial={{ y: "100vh" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100vh" }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold text-black">Update Attendance</h2>
                                {selectedAttendance.studentInfo && (
                                    <p className="text-sm text-gray-600">
                                        Student: {selectedAttendance.studentInfo.full_name} ({selectedAttendance.studentInfo.user})
                                    </p>
                                )}
                            </div>

                            <form
                                onSubmit={handleUpdate}
                                className="space-y-4"
                            >
                                <div>
                                    <label htmlFor="status" className="block mb-1 text-black">
                                        Attendance Status
                                    </label>
                                    <select
                                        name="status"
                                        id="status"
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
                                        required
                                        defaultValue={selectedAttendance.attendance_status}
                                    >
                                        <option value="Present">Present</option>
                                        <option value="Absent">Absent</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="remark" className="block mb-1 text-black">
                                        Remarks (optional)
                                    </label>
                                    <input
                                        type="text"
                                        name="remark"
                                        id="remark"
                                        placeholder="e.g. Sick, Late..."
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
                                        defaultValue={selectedAttendance.remarks}
                                    />
                                </div>

                                <div className="flex justify-end gap-2 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setModalIsOpen(false)}
                                        className="px-4 py-2 rounded border border-gray-400 text-black"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 rounded bg-black text-white"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ViewAttendence;