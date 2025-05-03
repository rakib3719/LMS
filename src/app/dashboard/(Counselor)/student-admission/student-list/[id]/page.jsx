'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useParams, useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

const Page = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm()

  const [loading, setLoading] = useState(false)
  const [initialData, setInitialData] = useState(null)
  const candidateType = watch('candidate_type')

  const params = useParams()
  const studentId = params.id
  const router = useRouter()

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(
          `https://api.eduden.mrshakil.com/api/students/${studentId}/`
        )
        setInitialData(res.data)

        Object.entries(res.data).forEach(([key, value]) => {
          if (key !== 'picture') {
            setValue(key, value)
          }
        })
      } catch (err) {
        console.error('Failed to fetch student data:', err)
      }
    }

    if (studentId) fetchStudent()
  }, [studentId, setValue])

  const onSubmit = async data => {
    setLoading(true)
    const formData = new FormData()

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'picture') {
        if (value && value.length > 0) {
          formData.append(key, value[0])
        }
      } else {
        formData.append(key, value)
      }
    })

    // Remove unused fields based on candidate type
    if (data.candidate_type === 'Student') {
      formData.delete('company_name')
      formData.delete('department')
      formData.delete('designation')
    } else if (data.candidate_type === 'Job Holder') {
      formData.delete('institute_name')
      formData.delete('department_name')
      formData.delete('passing_year')
      formData.delete('guardian_phone_number')
    }

    // SweetAlert confirmation
    const result = await Swal.fire({
      title: 'want to update this student?',
      text: 'You will not be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'No, cancel',
      confirmButtonColor: '#111',
    })

    if (result.isConfirmed) {
      try {
        const res = await axios.patch(
          `https://api.eduden.mrshakil.com/api/students/${studentId}/`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        console.log('Update success:', res.data)
        Swal.fire('Updated!', 'The student has been updated.', 'success')
        router.push('/dashboard/student-admission/student-list')
      } catch (error) {
        console.error('Update failed:', error)
        Swal.fire(
          'Failed!',
          'There was an error updating the student.',
          'error'
        )
      } finally {
        setLoading(false)
      }
    } else {
      setLoading(false)
      console.log('Update was canceled.')
    }
  }

  if (!initialData) return <p>Loading student data...</p>

  return (
    <div>
      <div className='flex justify-between items-center mb-[5vh] border-b pb-5 border-black/10'>
        <h2 className='text-2xl font-semibold text-black/80'>
          Edit Student Information
        </h2>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        encType='multipart/form-data'
        className='grid grid-cols-1 md:grid-cols-4 gap-6'
      >
        <div>
          <label className='block mb-1 font-medium'>Full Name</label>
          <input
            type='text'
            {...register('full_name')}
            className='w-full border border-gray-200 rounded p-2 text-sm outline-none'
          />
        </div>

        <div>
          <label className='block mb-1 font-medium'>Email</label>
          <input
            type='email'
            readOnly
            {...register('email')}
            className='w-full border border-gray-200 rounded p-2 text-sm outline-none'
          />
        </div>

        <div>
          <label className='block mb-1 font-medium'>Phone Number</label>
          <input
            type='text'
            {...register('contact_number')}
            className='w-full border border-gray-200 rounded p-2 text-sm outline-none'
          />
        </div>

        <div>
          <label className='block mb-1 font-medium'>Whatsapp Number</label>
          <input
            type='text'
            {...register('whatsapp_number')}
            className='w-full border border-gray-200 rounded p-2 text-sm outline-none'
          />
        </div>

        <div>
          <label className='block mb-1 font-medium'>Candidate Type</label>
          <select
            {...register('candidate_type')}
            className='w-full border border-gray-200 rounded p-2 text-sm outline-none'
          >
            <option value='Student'>Student</option>
            <option value='Job Holder'>Job Holder</option>
          </select>
        </div>

        {candidateType === 'Student' && (
          <>
            <div>
              <label className='block mb-1 font-medium'>Institute Name</label>
              <input
                type='text'
                {...register('institute_name')}
                className='w-full border border-gray-200 rounded p-2 text-sm outline-none'
              />
            </div>

            <div>
              <label className='block mb-1 font-medium'>Department Name</label>
              <input
                type='text'
                {...register('department_name')}
                className='w-full border border-gray-200 rounded p-2 text-sm outline-none'
              />
            </div>

            <div>
              <label className='block mb-1 font-medium'>Passing Year</label>
              <input
                type='text'
                {...register('passing_year')}
                className='w-full border border-gray-200 rounded p-2 text-sm outline-none'
              />
            </div>

            <div>
              <label className='block mb-1 font-medium'>Guardian Phone</label>
              <input
                type='text'
                {...register('guardian_phone_number')}
                className='w-full border border-gray-200 rounded p-2 text-sm outline-none'
              />
            </div>
          </>
        )}

        {candidateType === 'Job Holder' && (
          <>
            <div>
              <label className='block mb-1 font-medium'>Company Name</label>
              <input
                type='text'
                {...register('company_name')}
                className='w-full border border-gray-200 rounded p-2 text-sm outline-none'
              />
            </div>

            <div>
              <label className='block mb-1 font-medium'>Department</label>
              <input
                type='text'
                {...register('department')}
                className='w-full border border-gray-200 rounded p-2 text-sm outline-none'
              />
            </div>

            <div>
              <label className='block mb-1 font-medium'>Designation</label>
              <input
                type='text'
                {...register('designation')}
                className='w-full border border-gray-200 rounded p-2 text-sm outline-none'
              />
            </div>
          </>
        )}

        <div className='md:col-span-2'>
          <label className='block mb-1 font-medium'>Profile Picture</label>

          {/* Preview Current Image */}
          {initialData?.picture && (
            <div className='mb-2'>
              <img
                src={initialData.picture}
                alt='Current'
                className='h-20 w-20 object-cover rounded border'
              />
              <p className='text-sm text-gray-500 mt-1'>
                Current profile picture
              </p>
            </div>
          )}

          {/* File Upload */}
          <input
            type='file'
            accept='image/*'
            {...register('picture')}
            className='w-full border border-gray-200 rounded p-2 text-sm outline-none'
          />
        </div>

        <div className='col-span-full'>
          <button
            type='submit'
            disabled={loading}
            className='bg-[#111] text-white px-6 py-2 rounded disabled:opacity-20 cursor-pointer'
          >
            {loading ? 'Updating...' : 'Update Student'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Page
