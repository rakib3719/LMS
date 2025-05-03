'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

import CommonBtn from '../../../../components/commonUtilites/CommonBtn'
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
  const [courses, setCourses] = useState([])
  const [open, setOpen] = useState(false)
  const candidateType = watch('candidate_type')

  // get course data
  useEffect(() => {
    axios
      .get('https://api.eduden.mrshakil.com/api/course-category-ref/')
      .then(res => setCourses(res.data))
      .catch(err => console.error(err))
  }, [])

  console.log(courses)





const onSubmit = async data => {
  const confirmResult = await Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to submit this form?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#111',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, submit it!',
  });

  if (!confirmResult.isConfirmed) {
    return // user clicked "Cancel"
  }

  setLoading(true);
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value) {
      if (key === 'picture') {
        formData.append(key, value[0]);
      } else if (key === 'interested_course') {
        formData.append(key, value);
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
      'https://api.eduden.mrshakil.com/api/students-enquiry/',
      formData
    );

    Swal.fire({
      icon: 'success',
      title: 'Submitted!',
      text: 'Your inquiry has been sent.',
      confirmButtonColor: '#5cb85c'
    });

    reset();
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Submission Failed',
      text: err.response?.data?.message || 'Something went wrong!',
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
          Student Inquery Form
        </h2>
        <CommonBtn
          text='Student List'
          icon={MdArrowForwardIos}
          link='/dashboard/student-enquiry/student-enquiry-list'
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
        {/* <div>
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
        </div> */}

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
                placeholder='Company Name'
                type='text'
                {...register('company_name')}
                className='w-full border border-gray-200 rounded p-2 outline-none text-sm text-black/80'
              />
            </div>
            <div>
              <label className='block mb-1 font-medium'>Department</label>
              <input
                placeholder='Department'
                type='text'
                {...register('department')}
                className='w-full border border-gray-200 rounded p-2 outline-none text-sm text-black/80'
              />
            </div>
            <div>
              <label className='block mb-1 font-medium'>Designation</label>
              <input
                placeholder='Designation'
                type='text'
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

        {/* interested_course  */}
        <div className='relative'>
          <label className='block mb-1 font-medium'>Interested Courses</label>
          <div
            onClick={() => setOpen(!open)}
            className='cursor-pointer w-full border border-gray-200 rounded p-2 text-sm text-black/80 bg-white'
          >
            Select Interested Courses
          </div>

          {open && (
            <div className='absolute z-10 mt-1 w-full max-h-60 overflow-y-auto bg-white border border-gray-200 rounded shadow'>
              {courses.length > 0 ? (
                courses.map((course, i) => (
                  <label
                    key={course.id || i}
                    className='flex items-center space-x-2 px-4 py-2 hover:bg-gray-50'
                  >
                    <input
                      type='checkbox'
                      value={course.category_name}
                      {...register('interested_course', {
                        required: 'At least one course is required'
                      })}
                      className='accent-black'
                    />
                    <span className='text-sm'>{course.category_name}</span>
                  </label>
                ))
              ) : (
                <p className='px-4 py-2 text-sm text-gray-500'>
                  Loading courses...
                </p>
              )}
            </div>
          )}

          {errors.interested_course && (
            <p className='text-red-600 text-sm mt-1'>
              {errors.interested_course.message}
            </p>
          )}
        </div>

        {/* how know  */}
        <div>
          <label className='block mb-1 font-medium'>How Know</label>
          <input
            type='text'
            placeholder='How to know'
            {...register('how_know', { required: 'How to Know is required' })}
            className='w-full border border-gray-200 rounded p-2 outline-none text-sm text-black/80'
          />
          {errors.how_know && (
            <p className='text-red-600 text-sm'>{errors.how_know.message}</p>
          )}
        </div>

        {/* any comment  */}

        <div>
          <label className='block mb-1 font-medium'>Any Comment</label>
          <input
            type='text'
            placeholder='Any comment'
            {...register('any_comment', {
              required: 'Any comment is required'
            })}
            className='w-full border border-gray-200 rounded p-2 outline-none text-sm text-black/80'
          />
          {errors.any_comment && (
            <p className='text-red-600 text-sm'>{errors.any_comment.message}</p>
          )}
        </div>

        {/* expected_joining_date */}
        <div>
          <label className='block mb-1 font-medium'>Expected Joining Date</label>
          <input
            type='date'
            placeholder='Expected Joining Date'
            {...register('expected_joining_date', {
              required: 'Expected joining is required'
            })}
            className='w-full border border-gray-200 rounded p-2 outline-none text-sm text-black/80'
          />
          {errors.expected_joining_date && (
            <p className='text-red-600 text-sm'>
              {errors.expected_joining_date.message}
            </p>
          )}
        </div>
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
          {loading ? 'Submitting...' : 'Submit Enquiry'}
        </button>
      </div>
    </div>
  )
}

export default StudentAdmission
