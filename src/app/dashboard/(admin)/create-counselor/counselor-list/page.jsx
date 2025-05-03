'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { MdAddIcCall, MdOutlineEmail } from 'react-icons/md'
import { FaWhatsapp } from 'react-icons/fa'
import { CiLocationOn } from 'react-icons/ci'
import Link from 'next/link'

const page = () => {
  const [counselors, setCounselors] = useState([])
  const [searchId, setSearchId] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchCounselors = async () => {
    try {
      const res = await axios.get(
        'https://api.eduden.mrshakil.com/api/counselors/'
      )
      setCounselors(res.data)
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  const handleDelete = async id => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this entry!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#111'
    })

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `https://api.eduden.mrshakil.com/api/counselors/${id}/`
        )
        Swal.fire('Deleted!', 'The counselor has been removed.', 'success')
        fetchCounselors()
      } catch (err) {
        console.error(err)
        Swal.fire('Error', 'Failed to delete counselor.', 'error')
      }
    }
  }

  useEffect(() => {
    fetchCounselors()
  }, [])

  console.log(counselors)

  const filteredCounselors = counselors.filter(c =>
    c.counselor_id.toLowerCase().includes(searchId.toLowerCase())
  )

  return (
    <div className='p-6'>
      <div className='mb-4 flex justify-between items-center'>
        <h2 className='text-xl font-semibold'>Counselor List</h2>
        <input
          type='text'
          placeholder='Search by Counselor ID'
          value={searchId}
          onChange={e => setSearchId(e.target.value)}
          className='border border-gray-300 p-2 rounded w-72 outline-none'
        />
      </div>

      {loading ? (
        <p>Loading counselors...</p>
      ) : (
        <div className='overflow-auto mt-[5vh]'>
          <table className='min-w-full border border-gray-200'>
            <thead>
              <tr className='bg-gray-100 text-left'>
                <th className='p-2 border text-nowrap text-gray-700'>Image</th>
                <th className='p-2 border text-nowrap text-gray-700'>
                  Full Name
                </th>
                <th className='p-2 border text-nowrap text-gray-700'>
                  Contact Info
                </th>
                <th className='p-2 border text-nowrap text-gray-700'>Phone</th>
                <th className='p-2 border text-nowrap text-gray-700'>
                  Designation
                </th>
                <th className='p-2 border text-nowrap text-gray-700'>
                  Date of Birth
                </th>
                <th className='p-2 border text-nowrap text-gray-700'>Gender</th>
                <th className='p-2 border text-nowrap text-gray-700'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCounselors.length === 0 ? (
                <tr>
                  <td colSpan='7' className='p-4 text-center'>
                    No counselor found.
                  </td>
                </tr>
              ) : (
                filteredCounselors.map(c => (
                  <tr key={c.counselor_id} className='hover:bg-gray-50'>
                    <td className='p-2 border text-nowrap'>
                      <img
                        src={c.picture}
                        alt={c.full_name}
                        className='w-10 h-10 rounded object-cover'
                      />
                    </td>
                    <td className='p-2 border text-nowrap'>
                      <div>
                        <p>{c.full_name}</p>
                        <p className='text-sm'> {c.counselor_id}</p>
                      </div>
                    </td>
                    <td className='p-2 border text-nowrap'>
                      <div>
                        <p className='flex gap-x-2 items-center'>
                          <span>
                            {' '}
                            <MdOutlineEmail></MdOutlineEmail>{' '}
                          </span>{' '}
                          {c.email}
                        </p>
                        <p className='flex gap-x-2 items-center'>
                          <span>
                            {' '}
                            <CiLocationOn></CiLocationOn>{' '}
                          </span>{' '}
                          {c.address}
                        </p>
                      </div>
                      <div> </div>
                    </td>
                    <td className='p-2 border text-nowrap'>
                      <div>
                        <p className='flex gap-x-2 items-center'>
                          {' '}
                          <span>
                            {' '}
                            <MdAddIcCall />{' '}
                          </span>{' '}
                          {c.contact_number}
                        </p>
                        <p className='flex gap-x-2 items-center'>
                          {' '}
                          <span>
                            {' '}
                            <FaWhatsapp />{' '}
                          </span>{' '}
                          {c.whatsapp_number}
                        </p>
                      </div>
                    </td>

                    <td className='p-2 border text-nowrap'>{c.designation}</td>
                    <td className='p-2 border text-nowrap'>
                      {c.date_of_birth}
                    </td>
                    <td className='p-2 border text-nowrap'>{c.gender}</td>
                    <td className='p-2 border text-nowrap'>
                      <div>
                        <div className='mb-2'>
                          <button
                            onClick={() => handleDelete(c.id)}
                            className='bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 cursor-pointer'
                          >
                            Delete
                          </button>
                        </div>
                        <div>
                          <Link href={`/dashboard/create-counselor/counselor-list/${c.id}`}>
                            <button className='bg-green-500 text-white px-3 py-1 rounded text-sm  cursor-pointer'>
                              Update
                            </button>
                          </Link>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default page
