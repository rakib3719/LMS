'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import Swal from 'sweetalert2'

const Page = () => {
  const params = useParams()
  const id = params?.id
  const router = useRouter()

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    contact_number: '',
    whatsapp_number: '',
    address: '',
    date_of_birth: '',
    gender: '',
    designation: '',
    picture: ''
  })

  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchCounselor = async () => {
    try {
      const res = await axios.get(
        `https://api.eduden.mrshakil.com/api/counselors/${id}/`
      )
      setFormData(res.data)
    } catch (error) {
      console.error('Failed to fetch counselor', error)
    }
  }

  useEffect(() => {
    if (id) fetchCounselor()
  }, [id])

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = e => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to update this counselor?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
    })

    if (confirm.isConfirmed) {
      try {
        const data = new FormData()
        data.append('full_name', formData.full_name)
        data.append('email', formData.email)
        data.append('contact_number', formData.contact_number)
        data.append('whatsapp_number', formData.whatsapp_number)
        data.append('address', formData.address)
        data.append('date_of_birth', formData.date_of_birth)
        data.append('gender', formData.gender)
        data.append('designation', formData.designation)

        if (formData.picture instanceof File) {
          data.append('picture', formData.picture)
        }

        setLoading(true)

        for (let [key, value] of data.entries()) {
          console.log(key, value)
        }

        await axios.patch(
          `https://api.eduden.mrshakil.com/api/counselors/${id}/`,
          data,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )

        Swal.fire('Updated!', 'Counselor updated successfully.', 'success')
        router.push('/dashboard/create-counselor/counselor-list')
      } catch (error) {
        console.error(error)
        Swal.fire('Error!', 'Update failed. Please try again.', 'error')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} encType='multipart/form-data' className='p-6'>
      <h2 className='text-2xl font-bold mb-4'>Update Counselor</h2>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <div>
          <label>Full Name</label>
          <input
            type='text'
            name='full_name'
            value={formData.full_name}
            onChange={handleChange}
            className='p-2 border rounded w-full'
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className='p-2 border rounded w-full'
          />
        </div>

        <div>
          <label>Contact Number</label>
          <input
            type='text'
            name='contact_number'
            value={formData.contact_number}
            onChange={handleChange}
            className='p-2 border rounded w-full'
          />
        </div>

        <div>
          <label>WhatsApp Number</label>
          <input
            type='text'
            name='whatsapp_number'
            value={formData.whatsapp_number}
            onChange={handleChange}
            className='p-2 border rounded w-full'
          />
        </div>

        <div className=''>
          <label>Address</label>
          <input
            type='text'
            name='address'
            value={formData.address}
            onChange={handleChange}
            className='p-2 border rounded w-full'
          />
        </div>

        <div>
          <label>Date of Birth</label>
          <input
            type='date'
            name='date_of_birth'
            value={formData.date_of_birth}
            onChange={handleChange}
            className='p-2 border rounded w-full'
          />
        </div>

        <div>
          <label>Gender</label>
          <select
            name='gender'
            value={formData.gender}
            onChange={handleChange}
            className='p-2 border rounded w-full'
          >
            <option value=''>Select Gender</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select>
        </div>

        <div>
          <label>Designation</label>
          <input
            type='text'
            name='designation'
            value={formData.designation}
            onChange={handleChange}
            className='p-2 border rounded w-full'
          />
        </div>

        <div>
        <label>Update Picture</label>
          <input
            type='file'
            name='picture'
            className='p-2 border rounded w-full'
            accept='image/*'
            onChange={e =>
              setFormData(prev => ({
                ...prev,
                picture: e.target.files[0]
              }))
            }
          />
        </div>
      </div>

      <button
        type='submit'
        disabled={loading}
        className={`mt-6 px-4 py-2 rounded text-white ${
          loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#111]'
        }`}
      >
        {loading ? 'Updating...' : 'Update Counselor'}
      </button>
    </form>
  )
}

export default Page
