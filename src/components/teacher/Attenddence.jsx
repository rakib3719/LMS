'use client'
import useGetData from '@/app/hooks/useGetData';
import React, { useState } from 'react';
import { FaClipboardCheck } from 'react-icons/fa';
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import { base_url } from '@/app/utils/api';
import Swal from 'sweetalert2';

const Attenddence = ({id}) => {
    const {data:student, isLoading, error:err} = useGetData(`/students`);
    const {data , loading, error} = useGetData(`/admitted-courses/?batch=${id}`);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [stData, setStData] = useState({})
 
    const [attendences, setAttendDence] = useState({
        attendances: []
    })

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

    if(loading || isLoading){
        return <h1>Loading...</h1>
    }

    if(error || err){
        return <h1>Something went wrong!</h1>
    }

    const submitAttendece = async() => {


         const result = await Swal.fire({
              title: "Are you sure?",
              text: "Are You sure submit this attendence",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, Save it!"
            });
        
            if (!result.isConfirmed) return;

            console.log(attendences, 'age ekbar dkehi ');


        try {
            const resp =await axios.post(`${base_url}/student-attendances/${id}/submit-attendance/`, attendences)
            console.log(resp, 'submit korar por ki ase dekhi');
    
            if(resp.status === 201 || resp.status === 207){
    
           Swal.fire({
                          title: "Success",
                          text: "Attendence submision done",
                          icon: "success"
                        });
                
            }
        } catch (error) {
            
            Swal.fire({
                title: "error",
                text: error?.message || 'Something went wrong!!!',
                icon: "error"
              });
        }



        
    }

    const admittedStudentIds = data?.map(item => item.student); 
    const matchedStudents = student?.filter(s => admittedStudentIds.includes(s.id));

    const handeler = async(item) => {
        setStData(item)
        setModalIsOpen(true)
    }

    const handleAttendanceSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const status = formData.get("status");
        const remark = formData.get("remark");

        const newAttendance = {
            student_id: stData.id,
            attendance_status: status,
            remarks: remark
        };

        setAttendDence(prev => {
        
            const existingIndex = prev.attendances.findIndex(
                a => a.student_id === stData.id
            );
            
            if (existingIndex >= 0) {
            
                const updatedAttendances = [...prev.attendances];
                updatedAttendances[existingIndex] = newAttendance;
                return {
                    ...prev,
                    attendances: updatedAttendances
                };
            } else {
                // Add new attendance
                return {
                    ...prev,
                    attendances: [...prev.attendances, newAttendance]
                };
            }
        });

        setModalIsOpen(false);
    }
   
    return (
        <div>
            <h1 className='text-2xl font-semibold py-4'>Attendence</h1>

            <button 
                onClick={submitAttendece}
                className='btn px-4 ml-auto cursor-pointer flex justify-end mb-8 pb-4 py-3 bg-black text-white rounded'
            >
                Submit Attendence
            </button>

            <table className="min-w-full text-sm">
                <colgroup>
                    <col />
                    <col />
                    <col />
                    <col />
                    <col className="w-24" />
                </colgroup>
                <thead className="dark:bg-gray-300">
                    <tr className="text-left">
                        <th className="p-3">Student Id</th>
                        <th className="p-3">Student Name</th>
                        <th className="p-3">Student Email</th>
                        <th className="p-3">Contact Number</th>
                        <th className="p-3 text-right">Attendence</th>
                    </tr>
                </thead>
                <tbody>
                    {data && matchedStudents?.map((item) => (
                        <tr
                            key={item?.id}
                            className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50"
                        >
                            <td className="p-3">
                                <p>{item?.user}</p>
                            </td>
                            <td className="p-3">
                                <p>{item?.full_name}</p>
                            </td>
                            <td className="p-3">
                                <p>{item?.email}</p>
                            </td>
                            <td className="p-3">
                                <p>{item?.contact_number}</p>
                            </td>
                            <td className="p-3">
                                <div className="flex justify-end gap-2">
                                    <button onClick={() => {handeler(item)}}>
                                        <FaClipboardCheck className="text-xl cursor-pointer" />
                                    </button>
                                    <span className={`text-sm font-medium ${
                                        attendences.attendances.find(a => a.student_id === item.id)?.attendance_status === 'Present' 
                                            ? 'text-green-600' 
                                            : 'text-red-500'
                                    }`}>
                                        {attendences.attendances.find(a => a.student_id === item.id)?.attendance_status || ''}
                                    </span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <AnimatePresence>
                {modalIsOpen && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={overlayVariants}
                        className="fixed inset-0 flex justify-center items-center z-50"
                    >
                        <motion.div
                            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg"
                            initial={{ y: "100vh" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100vh" }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold text-black">Mark Attendance</h2>
                            </div>

                            <form
                                onSubmit={handleAttendanceSubmit}
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
                                        defaultValue={
                                            attendences.attendances.find(a => a.student_id === stData.id)?.attendance_status || ""
                                        }
                                    >
                                        <option value="">Select status</option>
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
                                        defaultValue={
                                            attendences.attendances.find(a => a.student_id === stData.id)?.remarks || ""
                                        }
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
                                        Submit
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

export default Attenddence;