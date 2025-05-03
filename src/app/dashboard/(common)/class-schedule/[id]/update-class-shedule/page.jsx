import UpdateClassShedule from '@/components/dashboard/counselor/classShedule/UpdateClassShedule';
import React from 'react';

const page = ({params}) => {
    const {id} = params;
    return (
        <div>
            <UpdateClassShedule id={id}/>
        </div>
    );
};

export default page;