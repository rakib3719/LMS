'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import Link from 'next/link'
import { PiArrowCircleUpRightDuotone, PiGraduationCapFill } from 'react-icons/pi'
import { FaWhatsapp } from 'react-icons/fa'
import { LuCake } from "react-icons/lu";


const ITEMS_PER_PAGE = 5

const Page = () => {
  const [entries, setEntries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchEntries = async () => {
      setLoading(true)
      try {
        const res = await axios.get('https://api.eduden.mrshakil.com/api/students-enquiry')
        setEntries(res.data)
      } catch (error) {
        console.error('Error fetching entries:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEntries()
  }, [])

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#111',
    })

    if (result.isConfirmed) {
      try {
        await axios.delete(`https://api.eduden.mrshakil.com/api/students-enquiry/${id}/`)
        setEntries((prev) => prev.filter((entry) => entry.id !== id))
        Swal.fire('Deleted!', 'The entry has been deleted.', 'success')
      } catch (error) {
        console.error('Error deleting entry:', error)
        Swal.fire('Error!', 'Failed to delete. Try again.', 'error')
      }
    }
  }

  const filteredEntries = searchTerm
    ? entries.filter((entry) => entry.id?.toString().includes(searchTerm))
    : entries

  const totalPages = Math.ceil(filteredEntries.length / ITEMS_PER_PAGE)
  const currentEntries = filteredEntries.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <div>
      <div className='flex justify-between items-center flex-wrap gap-4'>
        <h2 className='text-xl font-medium text-black/80'>
          Registered Student Enquiry List
        </h2>
        <input
          type='text'
          placeholder='Search by ID'
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setCurrentPage(1)
          }}
          className='border border-gray-300 rounded px-3 py-1 text-sm'
        />
      </div>

      {loading ? (
        <p className='mt-5'>Loading entries...</p>
      ) : (
        <div className='overflow-x-auto  mt-[5vh]'>
          <table className='min-w-full bg-white border text-sm '>
            <thead className='bg-gray-100 text-left text-gray-700'>
              <tr>
                <th className='p-3 border'>ID</th>
                <th className='p-3 border'>Name</th>
                <th className='p-3 border'>Email</th>
                <th className='p-3 border'>Contact / WhatsApp</th>
                <th className='p-3 border'>Address</th>
                <th className='p-3 border'>Candidate Type</th>
                <th className='p-3 border '>Details</th>
                <th className='p-3 border'> Admission / DOB</th>
                <th className='p-3 border'>Course</th>
                <th className='p-3 border'>Know From</th>
                <th className='p-3 border'>Comments</th>
                <th className='p-3 border'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentEntries.length > 0 ? (
                currentEntries.map((entry) => (
                  <tr key={entry.id} className='hover:bg-gray-50'>
                    <td className='p-3 border text-nowrap'>{entry.id}</td>
                    <td className='p-3 border font-medium'>{entry.full_name}</td>
                    <td className='p-3 border text-nowrap' >{entry.email}</td>
                    <td className='p-3 border text-nowrap'>
                      <p className='flex items-center gap-1'>
                        <PiArrowCircleUpRightDuotone /> {entry.contact_number}
                      </p>
                      <p className='flex items-center gap-1'>
                        <FaWhatsapp /> {entry.whatsapp_number}
                      </p>
                    </td>
                    <td className='p-3 border'>{entry.address}</td>
                    <td className='p-3 border'>{entry.candidate_type}</td>
                    <td className='p-3 border text-nowrap'>
                      {entry.candidate_type === 'Student' ? (
                        <>
                          <p>Institute: {entry.institute_name}</p>
                          <p>Department: {entry.department_name}</p>
                          <p>Passing Year: {entry.passing_year}</p>
                        </>
                      ) : (
                        <>
                          <p>Company: {entry.company_name}</p>
                          <p>Department: {entry.department}</p>
                          <p>Designation: {entry.designation}</p>
                        </>
                      )}
                    </td>
                    <td className='p-3 border text-nowrap'>
                      <p className='flex gap-x-2 items-center'><span><LuCake></LuCake></span> {entry.date_of_birth}</p>
                      <p className='flex gap-x-2 items-center'><span><PiGraduationCapFill ></PiGraduationCapFill ></span> {entry.expected_joining_date}</p>
                    </td>

                    <td className='p-3 border text-nowrap'>{entry.interested_course}</td>
                    <td className='p-3 border text-nowrap'>{entry.how_know}</td>
                    <td className='p-3 border text-nowrap'>{entry.any_comment}</td>
                    <td className='p-3 border whitespace-nowrap'>
                      <div className='flex flex-col gap-2'>
                        <button
                          onClick={() => handleDelete(entry.id)}
                          className='bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-xs cursor-pointer'
                        >
                          Delete
                        </button>
                        <Link
                          href={`/dashboard/student-enquiry/student-enquiry-list/${entry.id}`}
                          className='bg-green-600 text-white px-3 py-1 rounded text-xs text-center'
                        >
                          Update
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='10' className='text-center p-4'>
                    No entries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className='flex justify-center items-center gap-2 mt-6'>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? 'bg-[#111] text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Page
