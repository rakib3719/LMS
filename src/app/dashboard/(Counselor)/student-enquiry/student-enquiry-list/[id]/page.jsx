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
  const [courseList, setCourseList] = useState([]);
  const candidateType = watch('candidate_type')

  const params = useParams()
  const studentId = params.id
  const router = useRouter()

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(
          `https://api.eduden.mrshakil.com/api/students-enquiry/${studentId}/`
        );
        const data = res.data;
        setInitialData(data)
        // Set all form values
        for (const key in data) {
          if (key === 'interested_course') {
            const courses = data[key]?.split(',').map((c) => c.trim()) || [];
            setCourseList(courses);
            setValue('interested_course', courses);
          } else {
            
            setValue(key, data[key]);
          }
        }
      } catch (error) {
        console.error('Failed to fetch student data:', error);
      }
    };

    if (studentId) {
      fetchStudent();
    }
  }, [studentId, setValue]);



const onSubmit = async data => {
  const confirmResult = await Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to update this student information?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#111',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, update it!',
    cancelButtonText: 'Cancel'
  });

  if (!confirmResult.isConfirmed) {
    return; // user canceled
  }

  setLoading(true);
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === 'picture') {
      if (value && value.length > 0) {
        formData.append(key, value[0]);
      }
    } else {
      formData.append(key, value);
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
    const res = await axios.patch(
      `https://api.eduden.mrshakil.com/api/students-enquiry/${studentId}/`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: 'Student updated successfully!',
      confirmButtonColor: '#3085d6'
    });

    router.push('/dashboard/student-enquiry/student-enquiry-list');
  } catch (error) {
    console.error('Update failed:', error);
    Swal.fire({
      icon: 'error',
      title: 'Update Failed',
      text: 'Failed to update student.',
      confirmButtonColor: '#d33'
    });
  } finally {
    setLoading(false);
  }
};


  console.log(initialData)
  if (!initialData) return <p>Loading student data...</p>

  return (
    <div>
      <div className='flex justify-between items-center mb-[5vh] border-b pb-5 border-black/10'>
        <h2 className='text-2xl font-semibold text-black/80'>
          Edit Enquiry Student Information
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
            placeholder='Phone Number'
            {...register('contact_number')}
            className='w-full border border-gray-200 rounded p-2 text-sm outline-none'
          />
        </div>

        <div>
          <label className='block mb-1 font-medium'>Whatsapp Number</label>
          <input
            type='text'
            placeholder='Whatsapp Number'
            {...register('whatsapp_number')}
            className='w-full border border-gray-200 rounded p-2 text-sm outline-none'
          />
        </div>

        {/* Interested Courses */}
        <div>
          <label className='block font-medium mb-2'>Interested Courses</label>
          <div className='flex flex-wrap gap-3'>
            {courseList.map((course, index) => (
              <label key={index} className='inline-flex items-center gap-2'>
                <input
                  type='checkbox'
                  value={course}
                  {...register('interested_course')}
                  defaultChecked
                />
                {course}
              </label>
            ))}
          </div>
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
                placeholder='Institute Name'
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
                placeholder='Passing Year'
                {...register('passing_year')}
                className='w-full border border-gray-200 rounded p-2 text-sm outline-none'
              />
            </div>

            <div>
              <label className='block mb-1 font-medium'>Guardian Phone</label>
              <input
                type='text'
                placeholder='Guardian Phone'
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
                placeholder='Company Name'
                {...register('company_name')}
                className='w-full border border-gray-200 rounded p-2 text-sm outline-none'
              />
            </div>

            <div>
              <label className='block mb-1 font-medium'>Department</label>
              <input
                type='text'
                placeholder='Department Name'
                {...register('department')}
                className='w-full border border-gray-200 rounded p-2 text-sm outline-none'
              />
            </div>

            <div>
              <label className='block mb-1 font-medium'>Designation</label>
              <input
                type='text'
                placeholder='Designation'
                {...register('designation')}
                className='w-full border border-gray-200 rounded p-2 text-sm outline-none'
              />
            </div>
          </>
        )}

        <div className='col-span-full'>
          <button
            type='submit'
            disabled={loading}
            className='bg-[#111] text-white px-6 py-2 rounded disabled:opacity-20'
          >
            {loading ? 'Updating...' : 'Update Enquiry'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Page
