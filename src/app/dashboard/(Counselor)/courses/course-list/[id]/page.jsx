'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Swal from 'sweetalert2'
import { FaMinus, FaPlus } from 'react-icons/fa'

export default function EditCoursePage () {
  const { id } = useParams()
  const [courseData, setCourseData] = useState(null)
  const [courseThumbnail, setCourseThumbnail] = useState(null)
  const [loading, setLoading] = useState(false)
  const [courseOverview, setCourseOverview] = useState([])
  const [whoCanJoin, setWhoCanJoin] = useState([])
  const [courseBenefits, setCourseBenefits] = useState([])

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `https://api.eduden.mrshakil.com/api/courses/${id}/`
        )
        setCourseData(res.data)
        setCourseOverview(res.data.course_overview || [])
        setWhoCanJoin(res.data.who_can_join || [])
        setCourseBenefits(res.data.course_benefits || [])
      } catch (err) {
        console.error('Failed to fetch course:', err)
      }
    }
    fetchCourse()
  }, [id])

  const handleAddField = (setter, defaultValue) => {
    setter(prev => [...prev, defaultValue])
  }

  const handleRemoveField = (index, setter) => {
    setter(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const confirmed = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to update the course?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      confirmButtonColor: '#111'
    })

    if (!confirmed.isConfirmed) return

    setLoading(true)

    const formData = new FormData()

    for (let key in courseData) {
      if (
        key !== 'course_thumbnail' &&
        key !== 'course_overview' &&
        key !== 'who_can_join' &&
        key !== 'course_benefits'
      ) {
        formData.append(key, courseData[key])
      }
    }

    if (courseThumbnail) {
      formData.append('course_thumbnail', courseThumbnail)
    }

    formData.append('course_overview', JSON.stringify(courseOverview))
    formData.append('who_can_join', JSON.stringify(whoCanJoin))
    formData.append('course_benefits', JSON.stringify(courseBenefits))

    try {
      await axios.put(
        `https://api.eduden.mrshakil.com/api/courses/${id}/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      Swal.fire('Success', 'Course updated successfully!', 'success')
      setLoading(false)
    } catch (err) {
      console.error('Failed to update course', err)
      Swal.fire('Error', 'Failed to update course', 'error')
      setLoading(false)
    }
  }

  if (!courseData) return <p>Loading...</p>

  return (
    <>
      <h2 className='text-2xl font-bold mb-[3vh] text-gray-700 '>Update Course</h2>
      <form onSubmit={handleSubmit} className='space-y-6 '>
        <div>
          <label className='block font-medium text-gray-700 mb-1'>
            Course Name
          </label>
          <input
            type='text'
            className='w-full px-3 py-2 border border-black/20 rounded outline-none'
            value={courseData.course_name}
            onChange={e =>
              setCourseData({ ...courseData, course_name: e.target.value })
            }
          />
        </div>

        <div>
          <label className='block font-medium text-gray-700 mb-1'>
            Short Summary
          </label>
          <textarea
            className='w-full px-3 py-2 border border-black/20 rounded outline-none'
            value={courseData.short_summary}
            onChange={e =>
              setCourseData({ ...courseData, short_summary: e.target.value })
            }
          />
        </div>

        <div className='grid grid-cols-4 gap-x-5 gap-y-5'>
          <div>
            <label className='block font-medium text-green-800 mb-1'>
              Course Thumbnail
            </label>
            <input
              className='w-full px-3 py-2 border border-black/20 rounded outline-none'
              type='file'
              onChange={e => setCourseThumbnail(e.target.files[0])}
            />
          </div>
          <div>
            <label className='block font-medium text-gray-700 mb-1'>
              No. of Lectures
            </label>
            <input
              type='number'
              className='w-full px-3 py-2 border border-black/20 rounded outline-none'
              value={courseData.no_of_lectures || ''}
              onChange={e =>
                setCourseData({ ...courseData, no_of_lectures: e.target.value })
              }
            />
          </div>

          <div>
            <label className='block font-medium text-gray-700 mb-1'>
              No. of Projects
            </label>
            <input
              type='number'
              className='w-full px-3 py-2 border border-black/20 rounded outline-none'
              value={courseData.no_of_projects || ''}
              onChange={e =>
                setCourseData({ ...courseData, no_of_projects: e.target.value })
              }
            />
          </div>

          <div>
            <label className='block font-medium text-gray-700 mb-1'>
              No. of Assessments
            </label>
            <input
              type='number'
              className='w-full px-3 py-2 border border-black/20 rounded outline-none'
              value={courseData.no_of_assessments || ''}
              onChange={e =>
                setCourseData({
                  ...courseData,
                  no_of_assessments: e.target.value
                })
              }
            />
          </div>

          <div>
            <label className='block font-medium text-gray-700 mb-1'>
              Course Fee
            </label>
            <input
              type='number'
              className='w-full px-3 py-2 border border-black/20 rounded outline-none'
              value={courseData.course_fee || ''}
              onChange={e =>
                setCourseData({ ...courseData, course_fee: e.target.value })
              }
            />
          </div>

          <div>
            <label className='block font-medium text-gray-700 mb-1'>
              Is Available
            </label>
            <select
              className='w-full px-3 py-2 border border-black/20 rounded outline-none'
              value={courseData.is_available ? 'yes' : 'no'}
              onChange={e =>
                setCourseData({
                  ...courseData,
                  is_available: e.target.value === 'yes'
                })
              }
            >
              <option value='true'>Yes</option>
              <option value='false'>No</option>
            </select>
          </div>

          <div>
            <label className='block font-medium text-gray-700 mb-1'>
              Course Duration
            </label>
            <input
              type='text'
              className='w-full px-3 py-2 border border-black/20 rounded outline-none'
              value={courseData.course_duration || ''}
              onChange={e =>
                setCourseData({
                  ...courseData,
                  course_duration: e.target.value
                })
              }
            />
          </div>
        </div>

        <div>
          <label className='block font-medium text-gray-700 mb-1'>
            Who Can Join
          </label>
          {whoCanJoin.map((item, i) => (
            <div key={i} className='my-2 border border-black/20 rounded p-5 '>
              <input
                type='text'
                className='w-full px-3 py-2 border border-black/20 rounded outline-none'
                value={item}
                onChange={e => {
                  const updated = [...whoCanJoin]
                  updated[i] = e.target.value
                  setWhoCanJoin(updated)
                }}
              />
              <button
                type='button'
                onClick={() => handleRemoveField(i, setWhoCanJoin)}
                className='text-red-600 cursor-pointer mt-1 '
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type='button'
            onClick={() => handleAddField(setWhoCanJoin, '')}
            className='text-green-600 cursor-pointer flex gap-x-1 items-center'
          >
            <span>
              {' '}
              <FaPlus />{' '}
            </span>{' '}
            Add who can join
          </button>
        </div>

        <div>
          <label className='block font-medium text-gray-700 mb-1'>
            Course Overview
          </label>
          {courseOverview.map((item, i) => (
            <div
              key={i}
              className='space-y-2 border border-black/20 rounded p-5 my-2'
            >
              <input
                type='text'
                className='w-full px-3 py-2 border border-black/20 rounded outline-none'
                placeholder='Title'
                value={item.title}
                onChange={e => {
                  const updated = [...courseOverview]
                  updated[i].title = e.target.value
                  setCourseOverview(updated)
                }}
              />
              <textarea
                className='w-full px-3 py-2 border border-black/20 rounded outline-none'
                placeholder='Description'
                value={item.description}
                onChange={e => {
                  const updated = [...courseOverview]
                  updated[i].description = e.target.value
                  setCourseOverview(updated)
                }}
              />
              <button
                type='button'
                onClick={() => handleRemoveField(i, setCourseOverview)}
                className='text-red-600 cursor-pointer'
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type='button'
            onClick={() =>
              handleAddField(setCourseOverview, {
                title: '',
                description: ''
              })
            }
            className='text-green-600 cursor-pointer flex gap-x-1 items-center'
          >
            <span>
              {' '}
              <FaPlus />{' '}
            </span>{' '}
            Add Overview
          </button>
        </div>

        <div>
          <label className='block font-medium text-gray-700 mb-1'>
            Course Tools
          </label>
          <input
            type='text'
            className='w-full px-3 py-2 border border-black/20 rounded outline-none'
            value={courseData.course_tools || ''}
            onChange={e =>
              setCourseData({ ...courseData, course_tools: e.target.value })
            }
          />
        </div>

        <div>
          <label className='block font-medium text-gray-700 mb-1'>
            Course Curriculum
          </label>
          <textarea
            className='w-full px-3 py-2 border border-black/20 rounded outline-none'
            value={courseData.course_curriculum || ''}
            onChange={e =>
              setCourseData({
                ...courseData,
                course_curriculum: e.target.value
              })
            }
          />
        </div>

        <div>
          <label className='block font-medium text-gray-700 mb-1'>
            Course Benefits
          </label>
          {courseBenefits.map((item, i) => (
            <div
              key={i}
              className='space-y-2 border border-black/20 rounded p-5 my-2'
            >
              <input
                type='text'
                className='w-full px-3 py-2 border border-black/20 rounded outline-none'
                placeholder='Title'
                value={item.title}
                onChange={e => {
                  const updated = [...courseBenefits]
                  updated[i].title = e.target.value
                  setCourseBenefits(updated)
                }}
              />
              <textarea
                className='w-full px-3 py-2 border border-black/20 rounded outline-none'
                placeholder='Description'
                value={item.des}
                onChange={e => {
                  const updated = [...courseBenefits]
                  updated[i].des = e.target.value
                  setCourseBenefits(updated)
                }}
              />
              <button
                type='button'
                onClick={() => handleRemoveField(i, setCourseBenefits)}
                className='text-red-600 cursor-pointer'
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type='button'
            onClick={() =>
              handleAddField(setCourseBenefits, {
                title: '',
                des: ''
              })
            }
            className='text-green-600 cursor-pointer flex gap-x-1 items-center'
          >
            <span>
              {' '}
              <FaPlus />{' '}
            </span>{' '}
            Add Benefit
          </button>
        </div>

        <button
          type='submit'
          className={`px-6 my-[5vh] bg-[#111] text-white py-3 rounded outline-none cursor-pointer ${
            loading ? 'opacity-40 disabled' : ''
          }`}
        >
          {loading ? 'Updating ....' : 'Update Course'}
        </button>
      </form>
    </>
  )
}
