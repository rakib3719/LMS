'use client';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { base_url } from '@/app/utils/api';

const UploadClassMaterials = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [fileNames, setFileNames] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const files = e.target.files.files; 
    const class_schedule = id;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('class_schedule', class_schedule);

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
      text: 'Are you sure you want to upload these materials?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Upload it!',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;

    try {
      const resp = await axios.post(`${base_url}/class-materials/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(resp, 'class materials');
      await Swal.fire('Success!', 'Materials uploaded successfully.', 'success');
      // Reset form after successful upload
      e.target.reset();
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
              required
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-dashed border-gray-400 rounded-md focus:outline-none"
            />
            {fileNames.length > 0 && (
              <ul className="mt-2 list-disc list-inside text-sm text-gray-600">
                {fileNames.map((name, index) => (
                  <li key={index}>{name}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            className="bg-black cursor-pointer text-white px-6 py-2 rounded transition duration-200"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadClassMaterials;