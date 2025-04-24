import React from 'react';
import video1 from '@/assets/images/dashboard/video.svg';
import video2 from '@/assets/images/dashboard/video2.svg';
import Image from 'next/image';
const Summury2 = () => {
    return (
        <div>
<section className='card-bg flex-1 p-4 rounded '>

<div className='space-y-2'>
<h4 className='text-gray-300  font-semibold'>Video Courses</h4>
<p  className='font-bold text-2xl text-white'>100+</p>
</div>

<div className="flex justify-center  items-center mt-4">

    <Image alt='img' src={video1}/>
</div>

<div className='flex jusbtify-between mt-2 items-center '>
    
<p className='text-gray-700'>Edu.den</p>
<div className='bg-[#bfecd4] mt-2 px-[1px] border ml-auto w-8 border-[#2ed47e]'>
    <p className='text-gray-700 text-center text-xs ml-auto '>100+</p>
</div>

</div>

            </section>
<section className='card-bg flex-1 p-4 mt-6 rounded '>

<div className='space-y-2'>
<h4 className='text-gray-300  font-semibold'>Total Instructors</h4>
<p  className='font-bold text-2xl text-white'>1.5K+</p>
</div>

<div className="flex justify-center  items-center mt-4">

    <Image alt='img' src={video2}/>
</div>

<div className='flex jusbtify-between mt-2 items-center '>
    
<p className='text-gray-700'>Edu.den</p>
<div className='bg-[#bfecd4] mt-2 px-[1px] border ml-auto w-8 border-[#2ed47e]'>
    <p className='text-gray-700 text-center text-xs ml-auto '>1.5</p>
</div>

</div>

            </section>
        </div>
    );
};

export default Summury2;