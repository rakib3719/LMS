'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import axios from 'axios'
import CommonBtn from '@/components/commonUtilites/CommonBtn'
import { MdArrowForwardIos } from 'react-icons/md'

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const [loading, setLoading] = useState(false)

  const onSubmit = async data => {
    const result = await Swal.fire({
      title: 'Confirm Submission',
      text: 'Are you sure you want to submit this form?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Submit',
      confirmButtonColor: '#111'
    })

    if (result.isConfirmed) {
      setLoading(true)
      try {
        const formData = new FormData()
        for (const key in data) {
          if (key === 'picture') {
            formData.append('picture', data.picture[0]) 
          } else {
            formData.append(key, data[key])
          }
        }

        await axios.post(
          'https://api.eduden.mrshakil.com/api/register/counselor/',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        Swal.fire('Success!', 'Counselor registered successfully!', 'success')
        reset()
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
        Swal.fire('Error!', 'Something went wrong. Please try again.', 'error')
      }
    }
  }

  return (
    <section>
      <div className='flex justify-between items-center mb-[5vh] border-b pb-5 border-black/10 '>
        <h2 className='text-xl font-medium  text-black/80'>
          Create Counselor Form
        </h2>
        <CommonBtn
          text='Counselor List'
          icon={MdArrowForwardIos}
          link='/dashboard/create-counselor/counselor-list'
        />
      </div>

      {/* Form Grid */}
      <form id='counselorForm' className='grid grid-cols-4 gap-4'>
        <div>
          <label>Full Name</label>
          <input
            type='text'
            placeholder='Full Name'
            {...register('full_name', { required: 'Full name is required' })}
            className='w-full border border-black/20  p-2 rounded outline-none'
          />
          {errors.full_name && (
            <p className='text-red-500 text-sm'>{errors.full_name.message}</p>
          )}
        </div>

        <div>
          <label>Email</label>
          <input
            type='email'
            placeholder='Email'
            {...register('email', { required: 'Email is required' })}
            className='w-full border border-black/20  p-2 rounded outline-none'
          />
          {errors.email && (
            <p className='text-red-500 text-sm'>{errors.email.message}</p>
          )}
        </div>

        <div className=''>
          <label>Upload Picture</label>
          <input
            type='file'
            accept='image/*'
            {...register('picture', { required: 'Picture is required' })}
            className='w-full border border-black/20 p-2 rounded outline-none'
          />
          {errors.picture && (
            <p className='text-red-500 text-sm'>{errors.picture.message}</p>
          )}
        </div>

        <div>
          <label>Contact Number</label>
          <input
            type='text'
            placeholder='Contact Number'
            {...register('contact_number', {
              required: 'Contact number is required'
            })}
            className='w-full border border-black/20  p-2 rounded outline-none'
          />
          {errors.contact_number && (
            <p className='text-red-500 text-sm'>
              {errors.contact_number.message}
            </p>
          )}
        </div>

        <div>
          <label>WhatsApp Number</label>
          <input
            type='text'
            placeholder='Whatsapp Number'
            {...register('whatsapp_number', {
              required: 'WhatsApp number is required'
            })}
            className='w-full border border-black/20  p-2 rounded outline-none'
          />
          {errors.whatsapp_number && (
            <p className='text-red-500 text-sm'>
              {errors.whatsapp_number.message}
            </p>
          )}
        </div>

        <div>
          <label>Address</label>
          <input
            type='text'
            placeholder='Address'
            {...register('address', { required: 'Address is required' })}
            className='w-full border border-black/20  p-2 rounded outline-none'
          />
          {errors.address && (
            <p className='text-red-500 text-sm'>{errors.address.message}</p>
          )}
        </div>

        <div>
          <label>Date of Birth</label>
          <input
            type='date'
            placeholder='Date of birth'
            {...register('date_of_birth', {
              required: 'Date of birth is required'
            })}
            className='w-full border border-black/20  p-2 rounded outline-none'
          />
          {errors.date_of_birth && (
            <p className='text-red-500 text-sm'>
              {errors.date_of_birth.message}
            </p>
          )}
        </div>

        <div>
          <label>Gender</label>
          <select
            {...register('gender', { required: 'Gender is required' })}
            className='w-full border border-black/20  p-2 rounded outline-none'
          >
            <option value=''>Select</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select>
          {errors.gender && (
            <p className='text-red-500 text-sm'>{errors.gender.message}</p>
          )}
        </div>

        <div>
          <label>Designation</label>
          <input
            type='text'
            placeholder='Designation'
            {...register('designation', {
              required: 'Designation is required'
            })}
            className='w-full border border-black/20  p-2 rounded outline-none'
          />
          {errors.designation && (
            <p className='text-red-500 text-sm'>{errors.designation.message}</p>
          )}
        </div>
      </form>

      {/* Submit Button Outside of Form */}
      <div className='mt-6'>
        <button
          type='button'
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
          className={`bg-[#111] text-white px-6 py-2 rounded cursor-pointer ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Creating...' : 'Create Counselor'}
        </button>
      </div>
    </section>
  )
}

export default Page
