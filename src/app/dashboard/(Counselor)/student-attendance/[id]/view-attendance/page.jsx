import ViewAttendence from '@/components/teacher/ViewAttendence';
import React from 'react';

const page = ({params}) => {
    const {id} = params;

    return (
        <div>
            <ViewAttendence id={id}/>
        </div>
    );
};

export default page;