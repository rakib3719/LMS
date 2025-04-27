'use client'
import React from 'react';
import { MdPerson, MdEmail, MdPhoneAndroid, MdArrowForward } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa'; // Username icon
import { FcGoogle } from 'react-icons/fc'; // Google icon

const Signup = () => {
  return (
    
    <div className="min-h-screen px-4 pb-8 mt-16 md:mt-0 bg-[#f9f5f0] flex flex-col items-center justify-center">
      {/* Logo */}
      <div className="absolute top-4 left-4">
        <img src="/logo.png" alt="Edu.den" className="h-12 text-black" />
      </div>
      <div className="absolute top-4 right-4">
        <a href="/" className="text-yellow-500 underline text-sm font-medium">Back to Home</a>
      </div>

      <div className="w-full max-w-md p-8 space-y-6 bg-gray-100 shadow mt-16 rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900">Create Your Account</h2>

        <form className="mt-8 space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                required
                className="block w-full px-4 py-3 text-black rounded-lg border border-gray-300 focus:ring-yellow-500 focus:border-yellow-500"
              />
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                <MdPerson size={20} />
              </div>
            </div>
          </div>

          {/* Username */}
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="username"
                name="username"
                type="text"
                required
                className="block w-full px-4 py-3 text-black rounded-lg border border-gray-300 focus:ring-yellow-500 focus:border-yellow-500"
              />
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                <FaUserCircle size={20} />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full px-4 py-3 text-black rounded-lg border border-gray-300 focus:ring-yellow-500 focus:border-yellow-500"
              />
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                <MdEmail size={20} />
              </div>
            </div>
          </div>

          {/* Mobile Number */}
          <div className="space-y-2">
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="mobile"
                name="mobile"
                type="tel"
                required
                className="block w-full px-4 py-3 text-black rounded-lg border border-gray-300 focus:ring-yellow-500 focus:border-yellow-500"
              />
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                <MdPhoneAndroid size={20} />
              </div>
            </div>
          </div>

          {/* Signup Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center items-center px-4 py-3 bg-yellow-500 text-white font-semibold cursor-pointer rounded-full hover:bg-yellow-600 transition"
            >
              Sign Up
              <MdArrowForward className="ml-2" size={20} />
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center space-x-2">
          <div className="h-px w-full bg-gray-300"></div>
          <span className="text-gray-500 text-sm">OR</span>
          <div className="h-px w-full bg-gray-300"></div>
        </div>

        {/* Google Signup */}
        <button
          type="button"
          className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-full bg-white text-black cursor-pointer hover:bg-gray-100 transition"
        >
          <FcGoogle className="mr-3" size={22} />
          Continue with Google
        </button>

        {/* Already have an account */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-yellow-500 font-medium hover:text-yellow-600">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
