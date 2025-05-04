
'use client'
import useGetData from '@/app/hooks/useGetData';
import ClassShedulePage from '@/components/dashboard/counselor/classShedule/ClassShedulePage';
import TeacherCalassSheduleTable from '@/components/teacher/TeacherClassSheduleTable';
import React from 'react';


const page = () => {

    const {data, isLoading, error} = useGetData(`/class-schedules/`)


if(isLoading){
    return <h1>loading...</h1>
}

if(error){
    return <h1>Something went wrong!</h1>
}
    return (
        <div>

            <TeacherCalassSheduleTable data={data || []}/>
            <ClassShedulePage/>
            

     
        </div>
    );
};

export default page;