'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

export default function EditTeacherPage () {
  const { id } = useParams()
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    teacher_id: '',
    full_name: '',
    email: '',
    designation: '',
    contact_number: '',
    whatsapp_number: '',
    address: '',
    date_of_birth: '',
    joining_date: '',
    picture: '',
    created_at: '',
    created_by: '',
    gender: '',
    user: '',
    id: ''
  })

  console.log(formData)

  // Fetch the data for the teacher
  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const res = await axios.get(
          `https://api.eduden.mrshakil.com/api/teachers/${id}/`
        )
        setFormData({
          ...res.data
        })
        setPreviewImage(res.data.picture)
      } catch (error) {
        console.error('Error fetching teacher:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTeacher()
  }, [id])

  // Handle form field changes dynamically
  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle file upload for picture
  const handleFileChange = e => {
    const file = e.target.files[0]
    setFormData(prev => ({
      ...prev,
      picture: file
    }))
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setPreviewImage(reader.result)
      reader.readAsDataURL(file)
    }
  }

  // form submission to update the teacher data

  const handleSubmit = async e => {
    e.preventDefault()
  
    // Show confirmation alert before update
    const confirmResult = await Swal.fire({
      title: 'Are you sure?',
      text: 'want to update this teacher\'s information?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#111',
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'Cancel',
    })
  
    if (!confirmResult.isConfirmed) return
  
    const form = new FormData()
  
    for (const key in formData) {
      if (key !== 'picture') {
        form.append(key, formData[key])
      }
    }
  
    if (formData.picture instanceof File) {
      form.append('picture', formData.picture)
    } else if (!formData.picture) {
      form.append('picture', '')
    }
  
    try {
      await axios.patch(
        `https://api.eduden.mrshakil.com/api/teachers/${id}/`,
        form,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      )
  
      // Show success alert
      await Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Teacher information has been updated.',
        confirmButtonText: 'OK',
      })
  
      router.push('/dashboard/teacher/teacher-list')
    } catch (error) {
      console.error('Failed to update teacher:', error)
      Swal.fire('Error', 'Failed to update teacher information.', 'error')
    }
  }
  


  if (loading) return <p className='text-center mt-10'>Loading...</p>

  return (
    <div className=''>
      <h2 className='text-2xl font-bold mb-6'>Edit Teacher</h2>
      <form
        onSubmit={handleSubmit}
        className='grid grid-cols-1 md:grid-cols-4 gap-5'
      >
        {/* Picture Upload */}
        <div className=''>
          <div className=''>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Picture
            </label>
            <input
              type='file'
              className='border p-2 rounded w-full outline-none'
              accept='image/*'
              onChange={handleFileChange}
            />
            {/* <div>
              {previewImage && (
                <img
                  src={previewImage}
                  alt='Preview'
                  className='mt-2 h-24 w-24 object-cover rounded'
                />
              )}
            </div> */}
          </div>
        </div>
        {/* Teacher ID */}
        {/* <div>
          <label className='block  text-sm font-medium text-gray-700 mb-1'>
            Teacher ID
          </label>
          <input
            name='teacher_id'
            value={formData.teacher_id}
            onChange={handleChange}
            placeholder='Teacher ID'
            className='border p-2 rounded w-full outline-none'
            required
          />
        </div> */}

        {/* User */}
        {/* <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            User
          </label>
          <input
            name='user'
            value={formData.user}
            onChange={handleChange}
            placeholder='User'
            className='border p-2 rounded w-full outline-none'
            required
          />
        </div> */}

        {/* Full Name */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Full Name
          </label>
          <input
            name='full_name'
            value={formData.full_name}
            onChange={handleChange}
            placeholder='Full Name'
            className='border p-2 rounded w-full outline-none'
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Email
          </label>
          <input
            name='email'
            value={formData.email}
            readOnly
            onChange={handleChange}
            placeholder='Email'
            type='email'
            className='border p-2 rounded w-full outline-none'
            required
          />
        </div>

        {/* Designation */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Designation
          </label>
          <input
            name='designation'
            value={formData.designation}
            onChange={handleChange}
            placeholder='Designation'
            className='border p-2 rounded w-full outline-none'
          />
        </div>

        {/* Contact Number */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Contact Number
          </label>
          <input
            name='contact_number'
            value={formData.contact_number}
            onChange={handleChange}
            placeholder='Contact Number'
            className='border p-2 rounded w-full outline-none'
          />
        </div>

        {/* WhatsApp Number */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            WhatsApp Number
          </label>
          <input
            name='whatsapp_number'
            value={formData.whatsapp_number}
            onChange={handleChange}
            placeholder='WhatsApp Number'
            className='border p-2 rounded w-full outline-none'
          />
        </div>

        {/* Address */}
        <div className=''>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Address
          </label>
          <input
            name='address'
            value={formData.address}
            onChange={handleChange}
            placeholder='Address'
            className='border p-2 rounded w-full outline-none '
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Date of Birth
          </label>
          <input
            type='date'
            name='date_of_birth'
            value={formData.date_of_birth}
            onChange={handleChange}
            className='border p-2 rounded w-full outline-none'
          />
        </div>

        {/* Joining Date */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Joining Date
          </label>
          <input
            type='date'
            name='joining_date'
            value={formData.joining_date}
            onChange={handleChange}
            className='border p-2 rounded w-full outline-none'
          />
        </div>

        {/* Gender */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Gender
          </label>
          <select
            name='gender'
            value={formData.gender}
            onChange={handleChange}
            className='border p-2 rounded w-full outline-none'
          >
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select>
        </div>
        {/* Submit Button */}
        <div className=' flex justify-start mt-4'>
          <button
            type='submit'
            className='bg-[#111] cursor-pointer text-white px-6 py-2 rounded'
          >
            Update Teacher
          </button>
        </div>
      </form>
    </div>
  )
}
