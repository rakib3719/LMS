'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineMail } from 'react-icons/ai'
import { MdAddCall } from 'react-icons/md'
import { FaWhatsapp } from 'react-icons/fa'
import { CiLocationOn } from 'react-icons/ci'

const Page = () => {
  const [entries, setEntries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const entriesPerPage = 5

  useEffect(() => {
    const fetchEntries = async () => {
      setLoading(true)
      try {
        const res = await axios.get(
          'https://api.eduden.mrshakil.com/api/students/'
        )
        setEntries(res.data)
      } catch (error) {
        console.error('Error fetching entries:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchEntries()
  }, [])

  const handleDelete = async id => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!' ,
      confirmButtonColor: '#111',
    })

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `https://api.eduden.mrshakil.com/api/students/${id}/`
        )
        setEntries(prev => prev.filter(entry => entry.id !== id))
        Swal.fire('Deleted!', 'Student has been deleted.', 'success')
      } catch (error) {
        console.error('Error deleting entry:', error)
        Swal.fire('Error', 'Failed to delete. Try again.', 'error')
      }
    }
  }

  const filteredEntries = searchTerm
  ? entries.filter(entry => {
      const user = entry.user?.toString().trim().toLowerCase()
      const searchValue = searchTerm.trim().toLowerCase()

      console.log('Entry:', entry) 
      console.log('Student ID:', user)
      console.log('Search Term:', searchValue)


      return user && user === searchValue
    })
  : entries




  const indexOfLastEntry = currentPage * entriesPerPage
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage
  const currentEntries = filteredEntries.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  )
  const totalPages = Math.ceil(filteredEntries.length / entriesPerPage)

  return (
    <div>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-medium text-black/80'>
          Registered Student List
        </h2>
        <input
          type='text'
          placeholder='Search by student ID'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className='border border-gray-300 rounded px-3 py-1 text-sm'
        />
      </div>

      {loading ? (
        <p>Loading entries...</p>
      ) : filteredEntries.length === 0 ? (
        <p>No entries found.</p>
      ) : (
        <div className='overflow-auto mt-[5vh]'>
          <table className='min-w-full table-auto border border-gray-200 text-sm'>
            <thead className='bg-gray-100 text-left'>
              <tr>
                <th className='p-2 border text-nowrap'>Picture</th>
                <th className='p-2 border text-nowrap'>Full Name</th>
                <th className='p-2 border text-nowrap'> Conatact Info</th>
                <th className='p-2 border text-nowrap'>Candidate Info</th>
                <th className='p-2 border text-nowrap'>Admission Date</th>
                <th className='p-2 border text-nowrap'>DOB</th>
                <th className='p-2 border text-nowrap'>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentEntries.map(entry => (
                <tr key={entry.id} className='border-t'>
                  <td className='p-2 border text-nowrap'>
                    {entry?.picture && (
                      <Image
                        src={entry.picture}
                        width={50}
                        height={50}
                        alt='Profile'
                        className='rounded-full object-cover'
                      />
                    )}
                  </td>
                  <td className='p-2 border text-nowrap'>
                    {entry.full_name}
                    <br />
                    <span className='text-gray-500 text-xs'>{entry.user}</span>
                  </td>
                  <td className='p-2 border text-nowrap'>
                    <p className='flex gap-x-2 items-center'>
                      {' '}
                      <span>
                        <AiOutlineMail />
                      </span>{' '}
                      {entry.email}
                    </p>
                    <p className='flex gap-x-2 items-center'>
                      {' '}
                      <span>
                        {' '}
                        <MdAddCall />{' '}
                      </span>{' '}
                      {entry.contact_number}
                    </p>
                    <p className='flex gap-x-2 items-center'>
                      {' '}
                      <span>
                        {' '}
                        <FaWhatsapp />{' '}
                      </span>{' '}
                      {entry.whatsapp_number}
                    </p>
                    <p className='flex gap-x-2 items-center'>
                      {' '}
                      <span>
                        <CiLocationOn />
                      </span>{' '}
                      {entry.address}
                    </p>
                  </td>
                  <td className='p-2 border text-nowrap'>
                    {entry.candidate_type === 'Student' ? (
                      <>
                        <div>Candidate: {entry.candidate_type || 'N/A'}</div>
                        <div>Institute: {entry.institute_name || 'N/A'}</div>
                        <div>Dept: {entry.department_name || 'N/A'}</div>
                        <div>Year: {entry.passing_year || 'N/A'}</div>
                        <div>
                          Guardian No : {entry.guardian_phone_number || 'N/A'}
                        </div>
                      </>
                    ) : (
                      <>
                        <div> Candidate: {entry.candidate_type || 'N/A'}</div>
                        <div>Company: {entry.company_name || 'N/A'}</div>
                        <div>Dept: {entry.department || 'N/A'}</div>
                        <div>Role: {entry.designation || 'N/A'}</div>
                      </>
                    )}
                  </td>
                  <td className='p-2 border text-nowrap'>
                    {entry.admission_date}
                  </td>
                  <td className='p-2 border text-nowrap'>
                    {entry.date_of_birth}
                  </td>
                  <td className='p-2 border text-nowrap space-x-2'>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className='text-white bg-red-600 px-2 py-1 rounded hover:bg-red-700 cursor-pointer'
                    >
                      Delete
                    </button>
                    <Link
                      href={`/dashboard/student-admission/student-list/${entry.id}`}
                    >
                      <button className='text-white bg-green-600 px-2 py-1 rounded hover:bg-green-700 cursor-pointer'>
                        Update
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className='flex justify-center mt-4 space-x-2'>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === index + 1
                    ? 'bg-[#111] text-white'
                    : 'bg-white'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Page
