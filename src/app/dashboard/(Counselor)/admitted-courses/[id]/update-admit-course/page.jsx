import UpdateAdmitCourse from '@/components/dashboard/counselor/admittedCourse/UpdateAdmitCourse';
import React from 'react';

const page = ({params}) => {
    const {id} = params;
    return (
        <div>
            <UpdateAdmitCourse id={id}/>
        </div>
    );
};

export default page;