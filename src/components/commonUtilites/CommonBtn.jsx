import Link from 'next/link'
import React from 'react'

function CommonBtn ({ text, className, icon: Icon, link }) {
  const btnContent = (
    <button className={`bg-[#111] text-white py-2 px-6 rounded-sm cursor-pointer ${className}`}>
      {text} {Icon && <Icon className='inline-block mr-2'></Icon>}
    </button>
  )
  return link ? <Link href={link}> {btnContent}</Link> : btnContent
}

export default CommonBtn
