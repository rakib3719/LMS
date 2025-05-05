import React from 'react';
import CounselorAssignedCourse from '../../counselor/assignedCourse/CounselorAssignedCourse';
import AssignedCourseTable from '@/components/teacher/AssignCourseTable';

const AssignedCoursePage = () => {
    return (
        <div>

            <AssignedCourseTable/>
            <CounselorAssignedCourse/>
            
        </div>
    );
};

export default AssignedCoursePage;