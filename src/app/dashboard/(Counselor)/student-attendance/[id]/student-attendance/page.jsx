import Attenddence from '@/components/teacher/Attenddence';
import React from 'react';

const page = ({params}) => {
    const {id} = params;
    return (
        <div>
            <Attenddence id={id}/>
        </div>
    );
};

export default page;