import UpdateAssignCourse from '@/components/dashboard/counselor/assignedCourse/UpdateAssignCourse';
import React from 'react';

const page = ({params}) => {
    const {id} = params;
    return (
        <div>
            <UpdateAssignCourse id={id}/>
        </div>
    );
};

export default page;