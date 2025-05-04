'use client'
import React, { useEffect, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import Swal from 'sweetalert2'
import axios from 'axios'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

const page = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      course_name: '',
      short_summary: '',
      course_duration: '',
      no_of_lectures: '',
      no_of_projects: '',
      no_of_assessments: '',
      course_curriculum: '',
      course_tools: '',
      course_fee: '',
      course_category: '',
      is_available: true,
      course_thumbnail: null,
      who_can_join: [''],
      course_overview: [{ title: '', description: '' }],
      course_benefits: [{ title: '', des: '' }]
    }
  })

  const {
    fields: whoFields,
    append: whoAppend,
    remove: whoRemove
  } = useFieldArray({ control, name: 'who_can_join' })
  const {
    fields: overviewFields,
    append: overviewAppend,
    remove: overviewRemove
  } = useFieldArray({ control, name: 'course_overview' })
  const {
    fields: benefitsFields,
    append: benefitsAppend,
    remove: benefitsRemove
  } = useFieldArray({ control, name: 'course_benefits' })

  const [loading, setLoading] = useState(false)
  const [courseCategoryData, setCourseCategoryData] = useState(false)

  // get course category
  useEffect(() => {
    const fetchCourseCategory = async () => {
      try {
        const res = await axios.get(
          'https://api.eduden.mrshakil.com/api/course-category-ref/'
        )
        setCourseCategoryData(res.data)
      } catch (error) {
        console.error('Error fetching course data:', error)
      } finally {
      }
    }
    fetchCourseCategory()
  }, [])

  console.log(courseCategoryData)

  const onSubmit = async data => {
    setLoading(true)
    try {
      const confirm = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to create this course?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, create it!',
        cancelButtonText: 'Cancel', 
        confirmButtonColor : "#111"
      })
  
      if (!confirm.isConfirmed) {
        setLoading(false)
        return
      }
  
      const formData = new FormData()
      for (const key in data) {
        if (key === 'course_thumbnail' && data[key][0]) {
          formData.append(key, data[key][0])
        } else if (Array.isArray(data[key]) || typeof data[key] === 'object') {
          formData.append(key, JSON.stringify(data[key]))
        } else {
          formData.append(key, data[key])
        }
      }
  
      const response = await axios.post(
        'https://api.eduden.mrshakil.com/api/courses/',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      )
  
      Swal.fire('Success!', 'Course created successfully', 'success')
      console.log(response)
      reset()
    } catch (err) {
      Swal.fire('Error', 'Something went wrong!', 'error')
    } finally {
      setLoading(false)
    }
  }
  

  return (
    <section>
      <h2 className='mb-[5vh] text-2xl font-semibold text-gray-700'>
        Create New Course
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=' space-y-6 bg-white rounded outline-none '
      >
        <div className='grid grid-cols-2 gap-x-5 '>
          {/* Text Inputs */}
          <div>
            <label className='block font-medium text-gray-700 mb-1'>
              Course Name
            </label>
            <input
              {...register('course_name', { required: true })}
              placeholder='Course Name'
              className='w-full px-4 py-2 border border-black/20 outline-none '
            />
          </div>

          {/* Thumbnail Upload */}
          <div>
            <label className='block font-medium text-gray-700 mb-1'>
              Course Thumbnail
            </label>
            <input
              type='file'
              className='w-full px-4 py-2 border border-black/20 outline-none '
              {...register('course_thumbnail')}
            />
          </div>
        </div>

        <div>
          <label className='block font-medium text-gray-700 mb-1'>
            Short Summary
          </label>
          <textarea
            placeholder='Write short summary about course'
            {...register('short_summary', { required: true })}
            rows='3'
            className='w-full px-4 py-2 border border-black/20 outline-none'
          />
        </div>

        <div className='grid md:grid-cols-3 gap-4'>
          <div>
            <label className='block font-medium text-gray-700 mb-1'>
              Course Duration
            </label>
            <input
              {...register('course_duration')}
              placeholder='Course Duration'
              className='w-full px-3 py-2 border border-black/20 rounded outline-none'
            />
          </div>
          <div>
            <label className='block font-medium text-gray-700 mb-1'>
              No. of Lectures
            </label>
            <input
              type='number'
              placeholder='No. of Lectures'
              {...register('no_of_lectures')}
              className='w-full px-3 py-2 border border-black/20 rounded outline-none'
            />
          </div>
          <div>
            <label className='block font-medium text-gray-700 mb-1'>
              No. of Projects
            </label>
            <input
              type='number'
              placeholder='No. of Projects'
              {...register('no_of_projects')}
              className='w-full px-3 py-2 border border-black/20 rounded outline-none'
            />
          </div>
          <div>
            <label className='block font-medium text-gray-700 mb-1'>
              No. of Assessments
            </label>
            <input
              type='number'
              placeholder='No. of Assessments'
              {...register('no_of_assessments')}
              className='w-full px-3 py-2 border border-black/20 rounded outline-none'
            />
          </div>
          <div>
            <label className='block font-medium text-gray-700 mb-1'>
              Course Fee
            </label>
            <input
              type='number'
              placeholder='Course Fee'
              {...register('course_fee')}
              className='w-full px-3 py-2 border border-black/20 rounded outline-none'
            />
          </div>
          {/* <div>
            <label className='block font-medium text-gray-700 mb-1'>
              Course Category ID
            </label>
            <input
              type='number'
              placeholder='Course Category ID'
              {...register('course_category')}
              className='w-full px-3 py-2 border border-black/20 rounded outline-none'
            />
          </div> */}
          <div>
            <label
              htmlFor='course_category'
              className='block mb-1 font-medium text-gray-700'
            >
              Course
            </label>
            <select
              {...register('course_category', { required: true })}
              className='w-full px-3 py-2 border border-black/20 rounded outline-none  '
            >
              <option value=''>Select a course</option>
              {courseCategoryData &&
                courseCategoryData.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.category_name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Curriculum & Tools */}
        <div>
          <label className='block font-medium text-gray-700 mb-1'>
            Course Curriculum
          </label>
          <textarea
            {...register('course_curriculum')}
            placeholder='Course Curriculum'
            rows='2'
            className='w-full px-4 py-2 border border-black/20 rounded outline-none'
          />
        </div>

        <div className='grid grid-cols-2 gap-x-5 items-center'>
          <div>
            <label className='block font-medium text-gray-700 mb-1'>
              Course Tools
            </label>
            <input
              {...register('course_tools')}
              placeholder='Course Tools eg: figma , vs code'
              className='w-full px-3 py-2 border border-black/20 rounded outline-none'
            />
          </div>

          {/* is_available */}
          <div>
            <label className='block font-medium text-gray-700 mb-1'>
              Is Available
            </label>
            <select
              {...register('is_available')}
              className='w-full px-3 py-2 border border-black/20 rounded outline-none'
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
        </div>

        {/* who_can_join */}
        <div>
          <label className='block font-medium text-gray-700 mb-2'>
            Who Can Join
          </label>
          {whoFields.map((field, index) => (
            <div
              key={field.id}
              className='border border-black/20 p-3 rounded outline-none  space-y-2 mb-2'
            >
              <input
                {...register(`who_can_join.${index}`)}
                className='w-full px-3 py-2 border border-black/20 rounded outline-none'
              />

              <div className='text-right'>
                <button
                  type='button'
                  onClick={() => whoRemove(index)}
                  className='text-red-500 flex items-center gap-x-2 cursor-pointer'
                >
                  <AiOutlineMinus /> Remove
                </button>
              </div>
            </div>
          ))}
          <button
            type='button'
            onClick={() => whoAppend('')}
            className='text-blue-600 flex items-center gap-1 mb-4 cursor-pointer'
          >
            <AiOutlinePlus /> Add Entry
          </button>
        </div>

        {/* course_overview */}
        <div>
          <label className='block font-medium text-gray-700 mb-2'>
            Course Overview
          </label>
          {overviewFields.map((field, index) => (
            <div
              key={field.id}
              className='border border-black/20 p-3 rounded outline-none mb-3 space-y-2'
            >
              <input
                {...register(`course_overview.${index}.title`)}
                placeholder='Title'
                className='w-full px-3 py-2 border border-black/20 rounded outline-none'
              />
              <textarea
                {...register(`course_overview.${index}.description`)}
                placeholder='Description'
                rows='2'
                className='w-full px-3 py-2 border border-black/20 rounded outline-none'
              />
              <button
                type='button'
                onClick={() => overviewRemove(index)}
                className='text-red-500 cursor-pointer flex gap-x-2  items-center'
              >
                <AiOutlineMinus /> Remove
              </button>
            </div>
          ))}
          <button
            type='button'
            onClick={() => overviewAppend({ title: '', description: '' })}
            className='text-blue-600 flex items-center gap-1 cursor-pointer'
          >
            <AiOutlinePlus /> Add Overview
          </button>
        </div>

        {/* course_benefits */}
        <div>
          <label className='block font-medium text-gray-700 mb-2'>
            Course Benefits
          </label>
          {benefitsFields.map((field, index) => (
            <div
              key={field.id}
              className='border border-black/20 p-3 rounded outline-none mb-3 space-y-2'
            >
              <input
                {...register(`course_benefits.${index}.title`)}
                placeholder='Title'
                className='w-full px-3 py-2 border border-black/20 rounded outline-none'
              />
              <textarea
                {...register(`course_benefits.${index}.des`)}
                placeholder='Description'
                rows='2'
                className='w-full px-3 py-2 border border-black/20 rounded outline-none'
              />
              <button
                type='button'
                onClick={() => benefitsRemove(index)}
                className='text-red-500 cursor-pointer flex gap-x-2  items-center'
              >
                <AiOutlineMinus /> Remove
              </button>
            </div>
          ))}
          <button
            type='button'
            onClick={() => benefitsAppend({ title: '', des: '' })}
            className='text-blue-600 flex items-center gap-1 cursor-pointer'
          >
            <AiOutlinePlus /> Add Benefit
          </button>
        </div>

        <button
          type='submit'
          className={`px-6 my-[5vh] bg-[#111] text-white py-3 rounded outline-none cursor-pointer ${loading ? "opacity-40 disabled" : ""}`}
        >
          {
            loading ? "Creating ...." : " Create Course"
          }
        </button>
      </form>
    </section>
  )
}

export default page
