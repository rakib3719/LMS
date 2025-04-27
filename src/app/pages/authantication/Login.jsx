'use client'
import React, { useState } from 'react';
import { MdEmail, MdVisibility, MdVisibilityOff, MdArrowForward } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc'; 
import axios from 'axios';
import useAuthToken from '../../hooks/useAuthToken';





// const user = {
//   "message": "Counselor registered successfully",
//   "data": {
//       "id": 16,
//       "user": {
//           "username": "CNSL-3719",
//           "email": "r@gmail.com",
//           "user_type": "Counselor"
//       },
//       "full_name": "John Doe",
//       "contact_number": "012345678",
//       "whatsapp_number": "012345678",
//       "address": "123, Dhanmondi, Dhaka, Bangladesh",
//       "date_of_birth": "1990-05-15",
//       "gender": "Male",
//       "counselor_id": "CNSL-3719",
//       "designation": "Senior Counselor",
//       "pictrue": null,
//       "created_at": "2025-04-27",
//       "created_by": null
//   }
// }

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {setToken, setId} = useAuthToken()

  const toggleShowPassword = () => {
    setShowPassword(prevState => !prevState);
  };


  const loginHandler= async(e) => {


    e.preventDefault();
   const email = e.target.email.value;
   const password = e.target.password.value;
   const userInfo = {

    username: email,
    password
   }
   console.log(userInfo, 'userinfo');


   const resp = await axios.post(`https://api.eduden.mrshakil.com/api/login/`, userInfo);
   console.log(resp,'login successfully');
   if(resp.status === 200){
    const {token, id} = resp.data;
    console.log(token, id, 'token and id');
    // setToken(token);
    // setId(id);
    localStorage.setItem('token', token);
    localStorage.setItem('id', id);

   }
   console.log(email, password);


   


  }

  return (
    <div className="min-h-screen px-4 pb-8 mt-16 md:mt-0 bg-[#f9f5f0] flex flex-col items-center justify-center">
{/* logo  */}
      <div className="absolute top-4 left-4">
        <img src="/logo.png" alt="Edu.den" className="h-12 text-black" />
      </div>
      <div className="absolute top-4 right-4">
        <a href="/" className="text-yellow-500 underline text-sm font-medium">Back to Home</a>
      </div>


      <div className="w-full max-w-md p-8 space-y-6 bg-gray-100 shadow mt-16 rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900">Sign into Your Account</h2>

        <form onSubmit={loginHandler} className="mt-8 space-y-6">
          {/* emil */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="text"
                required
                className="block w-full px-4 py-3 text-black rounded-lg border focus:ring-yellow-500 focus:border-yellow-500"
              />
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                <MdEmail size={20} />
              </div>
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                className="block w-full px-4 text-black py-3 rounded-lg border border-gray-300 focus:ring-yellow-500 focus:border-yellow-500"
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute inset-y-0 cursor-pointer right-3 flex items-center text-gray-400"
              >
                {showPassword ? <MdVisibility size={20} /> : <MdVisibilityOff size={20} />}
              </button>
            </div>
          </div>

        
          <div className="flex items-center justify-between">
            <div></div>
          

            <div className="text-sm">
              <a href="/forgot-password" className="font-medium ml-auto text-yellow-500 hover:text-yellow-600">
                Forgot Password?
              </a>
            </div>
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center items-center px-4 py-3 bg-yellow-500 text-white font-semibold cursor-pointer rounded-full hover:bg-yellow-600 transition"
            >
              Login
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

        {/* Google Login */}
        <button
          type="button"
          className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-full bg-white text-black cursor-pointer hover:bg-gray-100 transition"
        >
          <FcGoogle className="mr-3" size={22} />
          Continue with Google
        </button>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/signup" className="text-yellow-500 font-medium hover:text-yellow-600">
            Sign up
          </a>
        </p>

      </div>
    </div>
  );
};

export default Login;
