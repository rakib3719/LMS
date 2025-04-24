import React from 'react';
import summury1 from '@/assets/images/dashboard/summury1.svg';
import summury2 from '@/assets/images/dashboard/summury2.svg';
import summury3 from '@/assets/images/dashboard/summury3.svg';
import Image from 'next/image';

const Summury = () => {
    return (
        <div className='flex flex-col md:flex-row gap-4 mt-12 justify-between'>
            <section className='card-bg flex-1 p-4 rounded '>

<div className='space-y-2'>
<h4 className='text-gray-300  font-semibold'>Active Course</h4>
<p  className='font-bold text-2xl text-white'>1.5K+</p>
</div>

<div className="flex justify-center  items-center mt-4">

    <Image alt='img' src={summury1}/>
</div>

<div className='flex jusbtify-between mt-2 items-center '>
    
<p className='text-gray-700'>Edu.den</p>
<div className='bg-[#bfecd4] mt-2 px-[1px] border ml-auto w-8 border-[#2ed47e]'>
    <p className='text-gray-700 text-center text-xs ml-auto '>1.5</p>
</div>

</div>

            </section>
            <section className='card-bg flex-1 p-4 rounded '>

<div className='space-y-2 '>
<h4 className='text-gray-300  font-semibold'>Enrolled Students</h4>
<p  className='font-bold text-2xl text-white'>1.2K+</p>
</div>

<div className="flex justify-center items-center mt-4">

    <Image alt='img' src={summury2}/>
</div>

<div className='flex jusbtify-between mt-4 items-center '>
    
<p className='text-gray-700'>Edu.den</p>
<div className='bg-[#bfecd4] px-[1px] mt-1 border ml-auto w-8 border-[#2ed47e]'>
    <p className='text-gray-700 text-center text-xs ml-auto '>1.2</p>
</div>

</div>

            </section>
            <section className='card-bg flex-1 p-4 rounded '>

<div className='space-y-2'>
<h4 className='text-gray-300  font-semibold'>Completion Status</h4>
<p  className='font-bold text-2xl text-white'>75%</p>
</div>

<div className="flex justify-center items-center mt-4">

    <Image alt='img' src={summury3}/>
</div>

<div className='flex jusbtify-between items-center mt-4 '>
    
<p className='text-gray-700'>Edu.den</p>
<div className='bg-[#bfecd4] px-[1px] mt-1 border ml-auto w-8 border-[#2ed47e]'>
    <p className='text-gray-700 text-center text-xs ml-auto '>75%</p>
</div>

</div>

            </section>



           
            
        </div>
    );
};

export default Summury;