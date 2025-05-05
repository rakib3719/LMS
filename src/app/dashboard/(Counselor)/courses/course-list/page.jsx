'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'

export default function Page () {
  const [loading, setLoading] = useState(true)
  const [courses, setCourses] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          'https://api.eduden.mrshakil.com/api/courses/'
        )
        setCourses(response.data)
      } catch (error) {
        console.error('Data fetching error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This course will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#111'
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `https://api.eduden.mrshakil.com/api/courses/${id}/`
          )
          setCourses(courses.filter(course => course.id !== id))
          Swal.fire('Deleted!', 'The course has been deleted.', 'success')
        } catch (err) {
          Swal.fire('Error!', 'Failed to delete course.', 'error')
        }
      }
    })
  }

  const filteredCourses = courses.filter(
    course =>
      course.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.course_category.toString().includes(searchTerm)
  )

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold mb-4'>Courses</h1>

        <input
          type='text'
          placeholder='Search by name or category...'
          className='mb-4 px-3 py-2 border border-gray-300 rounded-md w-full md:w-1/3 outline-none'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='overflow-x-auto mt-[2vh]'>
          <table className='min-w-full border border-gray-300'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='p-2 border border-black/20 text-nowrap text-center'>
                  ID
                </th>
                <th className='p-2 border border-black/20 text-nowrap text-center'>
                  Course Img
                </th>
                <th className='p-2 border border-black/20 text-nowrap'>
                  Course Name
                </th>
                <th className='p-2 border border-black/20 text-nowrap'>
                  Lectures
                </th>
                <th className='p-2 border border-black/20 text-nowrap'>
                  Projects
                </th>
                <th className='p-2 border border-black/20 text-nowrap'>
                  Assessments
                </th>
                <th className='p-2 border border-black/20 text-nowrap'>
                  Duration
                </th>
                <th className='p-2 border border-black/20 text-nowrap'>Fee</th>
                <th className='p-2 border border-black/20 text-nowrap'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map(course => (
                <tr key={course.id}>
                  <td className='p-2 border border-black/20 text-nowrap text-center'>
                    {course.id}
                  </td>
                  <td className='p-2 border border-black/20 text-nowrap text-center flex justify-center items-center'>
                    {course.course_thumbnail && (
                      <div>
                        <Image
                          src={course.course_thumbnail}
                          height={100}
                          width={100}
                          alt={course.course_name}
                          className='object-cover size-16 rounded'
                        />
                      </div>
                    )}
                  </td>
                  <td className='p-2 border border-black/20 text-nowrap'>
                    {course.course_name}
                  </td>
                  <td className='p-2 border border-black/20 text-nowrap text-center'>
                    {course.no_of_lectures}
                  </td>
                  <td className='p-2 border border-black/20 text-nowrap text-center'>
                    {course.no_of_projects}
                  </td>
                  <td className='p-2 border border-black/20 text-nowrap text-center'>
                    {course.no_of_assessments}
                  </td>
                  <td className='p-2 border border-black/20 text-nowrap text-center'>
                    {course.course_duration}
                  </td>
                  <td className='p-2 border border-black/20 text-nowrap text-center'>
                    {course.course_fee}
                  </td>
                  <td className='p-3 border border-black/20 text-nowrap r'>
                    <div className='flex gap-x-2 items-center justify-center'>
                      <a href='https://eduden.io/courses' target='_blank'>
                        <button className='text-blue-600 hover:scale-110 cursor-pointer'>
                          <FaEye />
                        </button>
                      </a>

                      <Link
                        href={`/dashboard/courses/course-list/${course.id}`}
                      >
                        <button className='text-green-600 hover:scale-110 cursor-pointer'>
                          <FaEdit />
                        </button>
                      </Link>
                      <button
                        className='text-red-600 hover:scale-110 cursor-pointer'
                        onClick={() => handleDelete(course.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCourses.length === 0 && (
                <tr>
                  <td colSpan='10' className='text-center p-4'>
                    No matching courses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
