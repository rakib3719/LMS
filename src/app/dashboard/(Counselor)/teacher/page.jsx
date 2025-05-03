import React from 'react'
import TeacherPage from '../../../../components/TeacherPage/TeacherPage'
import CommonBtn from "../../../../components/commonUtilites/CommonBtn"
// icons 
import { MdArrowForwardIos } from "react-icons/md";

const page = () => {
  return (
    <div className='' >
      <div className='flex justify-between items-center mb-[5vh] border-b pb-5 border-black/10 '>
        <h2 className='text-xl font-medium  text-black/80'>
          Teacher Register Form
        </h2>
        <CommonBtn text="Teachers List" icon={MdArrowForwardIos} link="/dashboard/teacher/teacher-list"></CommonBtn>
      </div>

      <TeacherPage />
    </div>
  )
}

export default page
