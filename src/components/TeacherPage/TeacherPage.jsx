'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import './teacherPage.css'
import Swal from 'sweetalert2'

export default function TeacherPage () {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const [loading, setLoading] = useState(false)



  const onSubmit = async data => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to register this teacher?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#111',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, register S!',
    })
  
    if (!result.isConfirmed) return
  
    setLoading(true)
  
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'picture') {
          formData.append(key, value[0])
        } else {
          formData.append(key, value)
        }
      })
  
      const response = await axios.post(
        'https://api.eduden.mrshakil.com/api/register/teacher/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      )
  
      await Swal.fire({
        title: 'Success!',
        text: 'Teacher registered successfully!',
        icon: 'success',
      })
  
      reset()
    } catch (error) {
      console.error(error)
      const message = error?.response?.data?.message || 'Something went wrong'
  
      Swal.fire({
        title: 'Error!',
        text: `Error: ${message}`,
        icon: 'error',
      })
    } finally {
      setLoading(false)
    }
  }
  

  

  return (
    <section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-5 space-x-10 grid grid-cols-3 '
      >
        <div>
          <label
            htmlFor='picture'
            className='block mb-1 font-medium text-black/80'
          >
            Picture
          </label>
          <input
            id='picture'
            type='file'
            accept='image/*'
            {...register('picture', { required: 'Picture is required' })}
            className='edn__tp__input'
          />
          {errors.picture && (
            <p className='text-red-500'>{errors.picture.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor='full_name'
            className='block mb-1 font-medium text-black/80'
          >
            Full Name
          </label>
          <input
            id='full_name'
            placeholder='Full Name'
            type='text'
            {...register('full_name', { required: 'Full name is required' })}
            className='edn__tp__input'
          />
          {errors.full_name && (
            <p className='text-red-500'>{errors.full_name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor='email'
            className='block mb-1 font-medium text-black/80'
          >
            Email
          </label>
          <input
            id='email'
            placeholder='Email'
            type='email'
            {...register('email', { required: 'Email is required' })}
            className='edn__tp__input'
          />
          {errors.email && (
            <p className='text-red-500'>{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor='contact_number'
            className='block mb-1 font-medium text-black/80'
          >
            Contact Number
          </label>
          <input
            id='contact_number'
            placeholder='Contact Number'
            type='text'
            {...register('contact_number', {
              required: 'Contact number is required'
            })}
            className='edn__tp__input'
          />
          {errors.contact_number && (
            <p className='text-red-500'>{errors.contact_number.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor='whatsapp_number'
            className='block mb-1 font-medium text-black/80'
          >
            WhatsApp Number
          </label>
          <input
            id='whatsapp_number'
            placeholder='Whats app Number'
            type='text'
            {...register('whatsapp_number', {
              required: 'whatsApp number is required'
            })}
            className='edn__tp__input'
          />
          {errors.whatsapp_number && (
            <p className='text-red-500'>{errors.whatsapp_number.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor='address'
            className='block mb-1 font-medium text-black/80'
          >
            Address
          </label>
          <input
            id='address'
            placeholder='Address'
            type='text'
            {...register('address', { required: 'Address is required' })}
            className='edn__tp__input'
          />
          {errors.address && (
            <p className='text-red-500'>{errors.address.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor='date_of_birth'
            className='block mb-1 font-medium text-black/80'
          >
            Date of Birth
          </label>
          <input
            id='date_of_birth'
            type='date'
            {...register('date_of_birth', {
              required: 'Date of birth is required'
            })}
            className='edn__tp__input'
          />
          {errors.date_of_birth && (
            <p className='text-red-500'>{errors.date_of_birth.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor='gender'
            className='block mb-1 font-medium text-black/80'
          >
            Gender
          </label>
          <select
            id='gender'
            {...register('gender', { required: 'Gender is required' })}
            className='edn__tp__input'
          >
            <option value=''>Select Gender</option>
            <option value='Female'>Female</option>
            <option value='Male'>Male</option>
          </select>
          {errors.gender && (
            <p className='text-red-500'>{errors.gender.message}</p>
          )}
        </div>


        <div>
          <label
            htmlFor='designation'
            className='block mb-1 font-medium text-black/80'
          >
            Designation
          </label>
          <input
            id='designation'
            placeholder='Designation'
            type='text'
            {...register('designation', {
              required: 'Designation is required'
            })}
            className='edn__tp__input'
          />
          {errors.designation && (
            <p className='text-red-500'>{errors.designation.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor='joining_date'
            className='block mb-1 font-medium text-black/80'
          >
            Joining Date
          </label>
          <input
            id='joining_date'
            type='date'
            {...register('joining_date', {
              required: 'Joining date is required'
            })}
            className='edn__tp__input'
          />
          {errors.joining_date && (
            <p className='text-red-500'>{errors.joining_date.message}</p>
          )}
        </div>

        <div className='col-span-3 mt-[5vh]'>
          <button
            type='submit'
            disabled={loading}
            className='w-full md:w-[200px] p-2 bg-[#111] cursor-pointer text-white rounded outline-none'
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </section>
  )
}
