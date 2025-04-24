import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FiStar } from 'react-icons/fi';
import image1 from '@/assets/images/course/course1.webp';
import image2 from '@/assets/images/course/course2.webp';
import image3 from '@/assets/images/course/course3.webp';
import image4 from '@/assets/images/course/course4.webp';
import image5 from '@/assets/images/course/course5.webp';
import image6 from '@/assets/images/course/course6.webp';
import image7 from '@/assets/images/course/course7.webp';
import Image from 'next/image';

const RecentCourse = () => {
  // Course data array
  const courses = [
    {
      id: 1,
      courseName: 'Python Programming Masterclass',
      image: image1,
      instructorName: 'Alex Johnson',
      instructorImg: <FaUserCircle className="text-blue-500" size={24} />,
      category: 'Programming',
      price: 89.99,
      rating: 4.8,
      totalReview: 1245
    },
    {
      id: 2,
      courseName: 'MERN Stack Development',
      image: image2,
      instructorName: 'Sarah Smith',
      instructorImg: <FaUserCircle className="text-purple-500" size={24} />,
      category: 'Web Development',
      price: 99.99,
      rating: 4.7,
      totalReview: 987
    },
    {
      id: 3,
      courseName: 'Ethical Hacking Fundamentals',
      image: image3,
      instructorName: 'Mike Chen',
      instructorImg: <FaUserCircle className="text-green-500" size={24} />,
      category: 'Cyber Security',
      price: 109.99,
      rating: 4.9,
      totalReview: 856
    },
    {
      id: 4,
      courseName: 'Data Science with Python',
      image: image4,
      instructorName: 'Emma Wilson',
      instructorImg: <FaUserCircle className="text-red-500" size={24} />,
      category: 'Data Science',
      price: 94.99,
      rating: 4.6,
      totalReview: 723
    },
    {
      id: 5,
      courseName: 'Advanced JavaScript Concepts',
      image: image5,
      instructorName: 'David Kim',
      instructorImg: <FaUserCircle className="text-yellow-500" size={24} />,
      category: 'Programming',
      price: 79.99,
      rating: 4.5,
      totalReview: 654
    },
    {
      id: 6,
      courseName: 'Mobile App Development with Flutter',
      image: image6,
      instructorName: 'Lisa Rodriguez',
      instructorImg: <FaUserCircle className="text-indigo-500" size={24} />,
      category: 'Mobile Development',
      price: 89.99,
      rating: 4.7,
      totalReview: 532
    },
    {
      id: 7,
      courseName: 'Machine Learning Basics',
      image: image7,
      instructorName: 'Robert Taylor',
      instructorImg: <FaUserCircle className="text-pink-500" size={24} />,
      category: 'AI/ML',
      price: 119.99,
      rating: 4.8,
      totalReview: 1023
    }
  ];

  return (
    <div className="p-6 main-bg rounded-lg mt-16 shadow-md">
      <h2 className="text-2xl font-bold text-gray-50 mb-6">Recent Courses</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="border  card-bg border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 overflow-hidden">
              <Image
                src={course.image} 
                alt={course.courseName} 
                className="w-full h-full cursor-pointer object-cover"
              />
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm text-primary font-medium">{course.category}</span>
                <span className="text-lg font-bold text-gray-50">${course.price.toFixed(2)}</span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-50 mb-2">{course.courseName}</h3>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <div className="mr-2">
                    {course.instructorImg}
                  </div>
                  <span className="text-sm text-gray-600">{course.instructorName}</span>
                </div>
                
                <div className="flex items-center">
                  <FiStar className="text-yellow-500 mr-1" />
                  <span className="text-sm font-medium text-gray-700">{course.rating}</span>
                  <span className="text-sm text-gray-500 ml-1">({course.totalReview})</span>
                </div>




              </div>

            </div>
                          

          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentCourse;