'use client'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { MdAddIcCall } from 'react-icons/md'
import Swal from 'sweetalert2'

export default function Page () {
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const teachersPerPage = 5

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(
          'https://api.eduden.mrshakil.com/api/teachers/'
        )
        setTeachers(response.data)
      } catch (error) {
        console.error('Data fetching error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTeachers()
  }, [])

  const handleDelete = async id => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#111',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    })

    if (!result.isConfirmed) return

    try {
      await axios.delete(`https://api.eduden.mrshakil.com/api/teachers/${id}/`)
      setTeachers(prev => prev.filter(t => t.id !== id))
      Swal.fire('Deleted!', 'Teacher has been removed.', 'success')
    } catch (error) {
      console.error('Delete failed:', error)
      Swal.fire('Error', 'Failed to delete teacher.', 'error')
    }
  }

  const filteredTeachers = teachers.filter(teacher =>
    teacher.teacher_id?.toString().toLowerCase().includes(searchQuery.toLowerCase())
  )

  const indexOfLast = currentPage * teachersPerPage
  const indexOfFirst = indexOfLast - teachersPerPage
  const currentTeachers = filteredTeachers.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(filteredTeachers.length / teachersPerPage)

  const paginate = pageNumber => setCurrentPage(pageNumber)

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-medium text-black/80'>Teacher List</h2>
        <input
          type='text'
          placeholder='Search by Teacher ID'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='border border-gray-300 rounded px-3 py-1 text-sm'
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="overflow-x-auto mt-[5vh]">
            <table className="min-w-full border border-gray-200 text-sm text-left">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-2 border">Image</th>
                  <th className="p-2 border">Name & ID</th>
                  <th className="p-2 border">Designation</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">DOB / Join Date</th>
                  <th className="p-2 border">Phone / WhatsApp</th>
                  <th className="p-2 border">Address</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentTeachers.map(teacher => (
                  <tr key={teacher.id} className="border-t hover:bg-gray-50">
                    <td className="p-2 border">
                      {teacher.picture && (
                        <Image
                          src={teacher.picture}
                          alt={teacher.full_name}
                          width={60}
                          height={60}
                          className="rounded-full object-cover"
                        />
                      )}
                    </td>
                    <td className="p-2 border">
                      <div className="font-semibold">{teacher.full_name}</div>
                      <div className="text-gray-500 text-xs">ID: {teacher.teacher_id}</div>
                    </td>
                    <td className="p-2 border">{teacher.designation}</td>
                    <td className="p-2 border">{teacher.email}</td>
                    <td className="p-2 border">
                      <div>DOB: {teacher.date_of_birth}</div>
                      <div>Join: {teacher.joining_date}</div>
                    </td>
                    <td className="p-2 border">
                      <div className='flex gap-x-2 items-center'> <span><MdAddIcCall /></span>  {teacher.contact_number}</div>
                      <div className='flex gap-x-2 items-center'> <span> <FaWhatsapp /> </span>  {teacher.whatsapp_number}</div>
                    </td>
                    <td className="p-2 border">{teacher.address}</td>
                    <td className="p-2 border space-x-2">
                      <Link href={`/dashboard/teacher/teacher-list/${teacher.id}`}>
                        <button className='bg-green-600 text-white px-3 py-1 rounded cursor-pointer'>
                          Update
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(teacher.id)}
                        className='bg-red-600 text-white px-3 py-1 rounded cursor-pointer'
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className='flex justify-center mt-4 space-x-2'>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`px-3 py-1 rounded border ${
                    currentPage === i + 1 ? 'bg-black text-white' : 'bg-white'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
