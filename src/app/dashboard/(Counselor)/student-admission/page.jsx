'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

import CommonBtn from "../../../../components/commonUtilites/CommonBtn"
import { MdArrowForwardIos } from 'react-icons/md'
import Swal from 'sweetalert2'

const StudentAdmission = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm()

  const [loading, setLoading] = useState(false)
  const candidateType = watch('candidate_type')



  const onSubmit = async data => {
    const confirmResult = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to register this student?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#111',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, register',
      cancelButtonText: 'Cancel'
    });
  
    if (!confirmResult.isConfirmed) return; // User cancelled
  
    setLoading(true);
    const formData = new FormData();
  
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        if (key === 'picture') {
          formData.append(key, value[0]);
        } else {
          formData.append(key, value);
        }
      }
    });
  
    if (data.candidate_type === 'Student') {
      formData.delete('company_name');
      formData.delete('department');
      formData.delete('designation');
    } else if (data.candidate_type === 'Job Holder') {
      formData.delete('institute_name');
      formData.delete('department_name');
      formData.delete('passing_year');
      formData.delete('guardian_phone_number');
    }
  
    try {
      const res = await axios.post(
        'https://api.eduden.mrshakil.com/api/register/student/',
        formData
      );
      console.log('Success:', res.data);
  
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'The student has been registered successfully.',
        confirmButtonColor: '#3085d6'
      });
  
      reset();
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'Something went wrong during registration.',
        confirmButtonColor: '#d33'
      });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className=''>
     
      <div className='flex justify-between items-center mb-[5vh] border-b pb-5 border-black/10 '>
        <h2 className='text-2xl font-semibold  text-black/80'>
          Student Registration Form
        </h2>
        <CommonBtn
          text='Student List'
          icon={MdArrowForwardIos}
          link='/dashboard/student-admission/student-list'
        ></CommonBtn>
      </div>

      <form
        encType='multipart/form-data'
        className='grid grid-cols-1 md:grid-cols-4 gap-6'
      >
        {/* Full Name */}
        <div>
          <label className='block mb-1 font-medium'>Full Name</label>
          <input
            type='text'
            {...register('full_name', { required: 'Full name is required' })}
            placeholder='Full Name'
            className='w-full border border-gray-200 rounded p-2 outline-none text-sm text-black/80'
          />
          {errors.full_name && (
            <p className='text-red-600 text-sm'>{errors.full_name.message}</p>
          )}
        </div>

        {/* Picture */}
        <div>
          <label className='block mb-1 font-medium'>Upload Picture</label>
          <input
            type='file'
            accept='image/*'
            {...register('picture')}
            className='w-full border border-gray-200 rounded p-2 outline-none text-sm text-black/80'
          />
          {errors.picture && (
            <p className='text-red-600 text-sm'>{errors.picture.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className='block mb-1 font-medium'>Email</label>
          <input
            type='email'
            placeholder='Valid Email'
            {...register('email', { required: 'Email is required' })}
            className='w-full border border-gray-200 rounded p-2 outline-none text-sm text-black/80'
          />
          {errors.email && (
            <p className='text-red-600 text-sm'>{errors.email.message}</p>
          )}
        </div>

        {/* DOB */}
        <div>
          <label className='block mb-1 font-medium'>Date of Birth</label>
          <input
            type='date'
            {...register('date_of_birth', {
              required: 'Date of birth is required'
            })}
            className='w-full border border-gray-200 rounded p-2 outline-none text-sm text-black/80'
          />
          {errors.date_of_birth && (
            <p className='text-red-600 text-sm'>
              {errors.date_of_birth.message}
            </p>
          )}
        </div>

        {/* Contact Number */}
        <div>
          <label className='block mb-1 font-medium'>Contact Number</label>
          <input
            type='text'
            placeholder='Contact Number'
            {...register('contact_number', {
              required: 'Contact number is required'
            })}
            className='w-full border border-gray-200 rounded p-2 outline-none text-sm text-black/80'
          />
          {errors.contact_number && (
            <p className='text-red-600 text-sm'>
              {errors.contact_number.message}
            </p>
          )}
        </div>

        {/* WhatsApp Number */}
        <div>
          <label className='block mb-1 font-medium'>WhatsApp Number</label>
          <input
            type='text'
            placeholder='WhatsApp Number'
            {...register('whatsapp_number', {
              required: 'whats App is required'
            })}
            className='w-full border border-gray-200 rounded p-2 outline-none text-sm text-black/80'
          />
          {errors.whatsapp_number && (
            <p className='text-red-600 text-sm'>
              {errors.whatsapp_number.message}
            </p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className='block mb-1 font-medium'>Address</label>
          <input
            type='text'
            placeholder='Address'
            {...register('address', { required: 'Address is required' })}
            className='w-full border border-gray-200 rounded p-2 outline-none text-sm text-black/80'
          />
          {errors.address && (
            <p className='text-red-600 text-sm'>{errors.address.message}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className='block mb-1 font-medium'>Gender</label>
          <select
            {...register('gender', { required: 'Gender is required' })}
            className='w-full border border-gray-200 rounded p-2 outline-none text-sm text-black/80'
          >
            <option value=''>Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          {errors.gender && (
            <p className='text-red-600 text-sm'>{errors.gender.message}</p>
          )}
        </div>

        {/* Candidate Type */}
        <div>
          <label className='block mb-1 font-medium'>Candidate Type</label>
          <select
            {...register('candidate_type', {
              required: 'Candidate type is required'
            })}
            className='w-full border border-gray-200 rounded p-2 outline-none text-sm text-black/80'
          >
            <option value='Student'>Student</option>
            <option value='Job Holder'>Job Holder</option>
          </select>
          {errors.candidate_type && (
            <p className='text-red-600 text-sm'>
              {errors.candidate_type.message}
            </p>
          )}
        </div>

        {/* Job Holder Fields */}
        {candidateType === 'Job Holder' && (
          <>
            <div>
              <label className='block mb-1 font-medium'>Company Name</label>
              <input
                type='text'
                 placeholder='Company Name'
                {...register('company_name')}
                className='w-full border border-gray-200 rounded p-2 outline-none text-sm text-black/80'
              />
            </div>
            <div>
              <label className='block mb-1 font-medium'>Department</label>
              <input
                type='text'
                placeholder='Department'
                {...register('department')}
                className='w-full border border-gray-200 rounded p-2 outline-none text-sm text-black/80'
              />
            </div>
            <div>
              <label className='block mb-1 font-medium'>Designation</label>
              <input
                type='text'
                placeholder='Designation'
                {...register('designation')}
                className='w-full border border-gray-200 rounded p-2 outline-none text-sm text-black/80'
              />
            </div>
          </>
        )}

        {/* Student Fields */}
        {candidateType === 'Student' && (
          <>
            <div>
              <label className='block mb-1 font-medium'>Institute Name</label>
              <input
                type='text'
                placeholder='Institute Name'
                {...register('institute_name')}
                className='w-full border border-gray-200 rounded p-2 outline-none text-sm text-black/80'
              />
            </div>
            <div>
              <label className='block mb-1 font-medium'>Department Name</label>
              <input
                type='text'
                placeholder='Department Name'
                {...register('department_name')}
                className='w-full border border-gray-200 rounded p-2 outline-none text-sm text-black/80'
              />
            </div>
            <div>
              <label className='block mb-1 font-medium'>Passing Year</label>
              <input
                type='text'
                placeholder='Passing Year'
                {...register('passing_year')}
                className='w-full border border-gray-200 rounded p-2 outline-none text-sm text-black/80'
              />
            </div>
            <div>
              <label className='block mb-1 font-medium'>
                Guardian Phone Number
              </label>
              <input
                type='text'
                placeholder='Guardian Phone Number'
                {...register('guardian_phone_number')}
                className='w-full border border-gray-200 rounded p-2 outline-none text-sm text-black/80'
              />
            </div>
          </>
        )}
      </form>
      {/* Submit Button */}
      <div className='flex items-start mt-[3vh]'>
        <button
          type='submit'
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
          className={`${
            loading ? 'bg-gray-200 cursor-not-allowed' : 'bg-[#111]'
          } text-white px-6 py-2 rounded transition cursor-pointer`}
        >
          {loading ? 'Submitting...' : 'Submit Registration'}
        </button>
      </div>
    </div>
  )
}

export default StudentAdmission
