import ClassMetarialsPage from '@/components/teacher/ClassMetarialsPage';
import React from 'react';

const page = ({params}) => {
    const {id} = params;
    return (
        <div>
            <ClassMetarialsPage/>
        </div>
    );
};

export default page;