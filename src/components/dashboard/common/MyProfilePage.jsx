'use client'
import useAuthToken from "@/app/hooks/useAuthToken";
import useGetData from "@/app/hooks/useGetData";
import React from "react";
import { FaUser } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi"; 
import { MdUpdate } from "react-icons/md"; 
const MyProfilePage = () => {
    const {id} = useAuthToken();
    console.log(id, 'id pailam');

    const {data, loading, error} = useGetData(`/users_auth/${id}/`);


    if(loading){
        return <h1>Loading...</h1>
    }

    if(error){
        return <h1>Something went wrong!</h1>
    }

    console.log(data, 'data user e');
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className=" w-full bg-white rounded-3xl  p-8">
        <div className="flex flex-col items-center">
          <FaUser/>
          <button className="mt-4 border border-gray-300 px-4 py-2 rounded-md text-sm flex items-center gap-2">
            <FiUpload className="h-4 w-4" />
            Upload Photo
          </button>
        </div>

        <form className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={data?.username}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              value="010000000"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={data?.email}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value="........"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              value="........"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="px-6 py-2 bg-gray-100 text-black rounded-md flex items-center gap-2"
            >
              <FiLogOut className="h-4 w-4" />
              Logout
            </button>
         
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyProfilePage;
