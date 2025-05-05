import UpdateClassMetarials from '@/components/teacher/UpdateClassMetarials';
import React from 'react';

const page = ({params}) => {
    const {id} = params;
    return (
        <div>
            <UpdateClassMetarials id={id}/>
        </div>
    );
};

export default page;