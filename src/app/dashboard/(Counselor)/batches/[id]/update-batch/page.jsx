import UpdateBatch from '@/components/dashboard/counselor/batches/UpdateBatch';
import React from 'react';

const page = ({params}) => {

    const {id} = params;
    return (
        <div>
         <UpdateBatch id={id}/>
        </div>
    );
};

export default page;