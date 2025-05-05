'use client';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useParams} from 'next/navigation';


import useGetData from '@/app/hooks/useGetData';
import axios from 'axios';
import { base_url } from '@/app/utils/api';

const UpdateClassMetarials = () => {


  const [fileNames, setFileNames] = useState([]);
  const params = useParams();
  const {id} = params;
  const {data, loading, error} = useGetData(`/class-materials/${id}/`)


  if(loading){
    return <h1>Loading...</h1>
  }
if(error){
    return <h1>Something went wrong!</h1>
}


console.log(data.files);
  const submitHandler = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const files = e.target.files.files; 


    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('class_schedule', data?.class_schedule)


    // Handle both single file and multiple files case
    if (files.length === undefined) {
      // Single file case
      formData.append('files', files);
    } else {
      // Multiple files case
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
    }

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to Update these materials?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Update it!',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;


    try {

        const resp = await axios.put(`${base_url}/class-materials/${id}/`, formData);
        console.log(resp, 'class materials');

      await Swal.fire('Success!', 'Materials Updated successfully.', 'success');


      setFileNames([]);
    } catch (error) {
      console.error(error);
      Swal.fire('Error', error?.response?.data?.message || 'Failed to upload materials.', 'error');
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    // Handle both single file and multiple files case
    const names = files.length ? 
      Array.from(files).map((file) => file.name) : 
      [files.name];
    setFileNames(names);
  };

  return (
    <div className="mx-auto py-8 bg-white">
      <h2 className="text-2xl font-semibold mb-6 border-b border-gray-200 pb-4">
        Upload Class Materials
      </h2>
      <form onSubmit={submitHandler}>
        <div className="grid grid-cols-1 gap-6 mt-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block mb-1 font-medium text-gray-700">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              defaultValue={data?.title}
              required
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block mb-1 font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              required

              defaultValue={data?.description}
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none"
              rows={4}
            />
          </div>

          {/* File Upload */}
          <div>
            <label htmlFor="files" className="block mb-1 font-medium text-gray-700">
              Upload Files
            </label>
            <input
              id="files"
              name="files"
              type="file"
              multiple
       
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-dashed border-gray-400 rounded-md focus:outline-none"
            />

            <h1 className='Prev Value'>New File</h1>
            {fileNames.length > 0 && (

                
              <ul className="mt-2 list-disc list-inside text-sm text-gray-600">
                {fileNames.map((name, index) => (
                  <li key={index}>{name}</li>
                ))}
              </ul>
            )}

<p>----------------------------------------------</p>

<h1 className='Prev Value'>Prev File</h1>
            

                
              <ul className="mt-2 list-disc list-inside text-sm text-gray-600">
                {data?.files?.map((name, index) => (
                  <li key={index}>{name?.file}</li>
                ))}
              </ul>
            

          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            className="bg-black cursor-pointer text-white px-6 py-2 rounded transition duration-200"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateClassMetarials;