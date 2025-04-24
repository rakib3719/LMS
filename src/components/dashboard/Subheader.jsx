import React from 'react';
import { CiLocationOn } from "react-icons/ci";
import { MdOutlinePermPhoneMsg } from "react-icons/md";
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram, FaLinkedin } from "react-icons/fa";

const Subheader = () => {
    return (
        <div className='bg-black hidden lg:block  fixed w-full z-50 text-white px-6 py-2'>
            <div className='flex justify-between items-center'>
                <section className='flex gap-3'>
                    <div className='flex items-center gap-2'>
                        <CiLocationOn  className='text-xs'/>
                        <h4 className='text-xs'>1442 Crosswind Drive Madisonville</h4>
                    </div>
                    <div className='flex items-center text-xs gap-2'>
                        <MdOutlinePermPhoneMsg />
                        <h4>+1 45887 77874</h4>
                    </div>
                </section>
                
                <section className="flex gap-2">
                    <a href="#" className="w-4 h-4 bg-white rounded-full flex items-center justify-center text-black hover:bg-gray-200 transition-colors">
                        <FaFacebook className="text-xs" />
                    </a>
                    <a href="#" className="w-4 h-4 bg-white rounded-full flex items-center justify-center text-black hover:bg-gray-200 transition-colors">
                        <FaTwitter className="text-xs" />
                    </a>
                    <a href="#" className="w-4 h-4 bg-white rounded-full flex items-center justify-center text-black hover:bg-gray-200 transition-colors">
                        <FaYoutube className="text-xs" />
                    </a>
                    <a href="#" className="w-4 h-4 bg-white rounded-full flex items-center justify-center text-black hover:bg-gray-200 transition-colors">
                        <FaInstagram className="text-xs" />
                    </a>
                    <a href="#" className="w-4 h-4 bg-white rounded-full flex items-center justify-center text-black hover:bg-gray-200 transition-colors">
                        <FaLinkedin className="text-xs" />
                    </a>
                </section>
            </div>
        </div>
    );
};

export default Subheader;