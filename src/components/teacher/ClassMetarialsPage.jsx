'use client'
import useGetData from '@/app/hooks/useGetData';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { FaCopy, FaTrash, FaUpload, FaEdit, FaDownload } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
import { base_url } from '@/app/utils/api';

const ClassMetarialsPage = () => {
    const params = useParams();
    const { id } = params;
    const { data, loading, error } = useGetData(`/class-materials/`);
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [materials, setMaterials] = useState([]);

    // Initialize materials when data loads
    useEffect(() => {
        if (data) {
            const filtered = data.filter(d => d.class_schedule === Number(id));
            setMaterials(filtered);
        }
    }, [data, id]);

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>Something went wrong...</h1>
    }

    const handleCopy = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
        Swal.fire({
            title: 'Copied!',
            text: 'File link copied to clipboard',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
        });
    };

    const handleDelete = async (materialId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (!result.isConfirmed) return;

        try {
            await axios.delete(`${base_url}/class-materials/${materialId}/`);
            // Remove from local state without refetching
            setMaterials(prev => prev.filter(m => m.id !== materialId));
            await Swal.fire(
                'Deleted!',
                'Material has been deleted.',
                'success'
            );
        } catch (error) {
            Swal.fire(
                'Error!',
                error?.message || 'Failed to delete material.',
                'error'
            );
        }
    };

    // const handleUpdate = (materialId) => {
    //     // Implement your update logic here
    //     Swal.fire(
    //         'Update',
    //         'Update functionality would be implemented here',
    //         'info'
    //     );
    // };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Class Materials</h1>
                <Link 
                    href={`/dashboard/upload-class-material/?id=${id}`}  
                    className="flex items-center gap-2 py-2 px-4 bg-black text-white rounded hover:bg-gray-800 transition"
                >
                    <FaUpload /> Upload
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {materials.map((material) => (
                    <div key={material.id} className="border border-gray-300 rounded-lg p-4 ">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h2 className="text-xl font-semibold">{material.title}</h2>
                                <p className="text-gray-600 text-sm">{new Date(material.uploaded_at).toLocaleString()}</p>
                            </div>
                            <div className="flex gap-2">
                                <Link
                                    href={`/dashboard/class-metarials/${material.id}/update-class-metarial`}
                                    className="p-2 bg-green-800 cursor-pointer text-white rounded-full  transition"
                                    title="Update"
                                >
                                    <FaEdit size={14} />
                                </Link>
                                <button 
                                    onClick={() => handleDelete(material.id)}
                                    className="p-2 bg-red-500 cursor-pointer text-white rounded-full hover:bg-red-600 transition"
                                    title="Delete"
                                >
                                    <FaTrash size={14} />
                                </button>
                            </div>
                        </div>
                        
                        <p className="mb-4 text-gray-700">{material.description}</p>
                        
                        <div className="space-y-3">
                            {material.files?.map((file, index) => (
                                <div key={file.id} className="flex items-center justify-between bg-gray-50 p-3 rounded border border-gray-200">
                                    <div className="truncate flex-1">
                                        <Link 
                                            href={file.file} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline truncate block"
                                            title={file.file}
                                        >
                                            {file.file.split('/').pop()}
                                        </Link>
                                    </div>
                                    <div className="flex gap-2 ml-3">
                                        <button
                                            onClick={() => handleCopy(file.file, index)}
                                            className="p-2 text-gray-600 rounded transition"
                                            title="Copy link"
                                        >
                                            <FaCopy size={14} />
                                            {copiedIndex === index && (
                                                <span className="absolute -mt-8 -ml-2  text-xs px-2 py-1 rounded">
                                                    Copied!
                                                </span>
                                            )}
                                        </button>
                                        <Link 
                                            href={file.file} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="p-2 text-gray-600 hover:text-black hover:bg-gray-200 rounded transition"
                                            title="Download"
                                            download
                                        >
                                            <FaDownload size={14} />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClassMetarialsPage;