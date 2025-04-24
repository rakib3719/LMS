import Image from 'next/image';
import React from 'react';
import { FiArrowRight, FiBook } from 'react-icons/fi';

const TopCoursesCategories = () => {
  // Sample data for course categories
  const categories = [
    {
      id: 1,
      name: 'Web Development',
      logo: '/icons/web-dev.png',
      enrolled: 1245,
      courses: 86,
      color: 'bg-blue-100'
    },
    {
      id: 2,
      name: 'Data Science',
      logo: '/icons/data-science.png',
      enrolled: 892,
      courses: 42,
      color: 'bg-purple-100'
    },
    {
      id: 3,
      name: 'Graphic Design',
      logo: '/icons/design.png',
      enrolled: 765,
      courses: 58,
      color: 'bg-pink-100'
    },
    {
      id: 4,
      name: 'Mobile Development',
      logo: '/icons/mobile-dev.png',
      enrolled: 932,
      courses: 37,
      color: 'bg-green-100'
    },
    {
      id: 5,
      name: 'Digital Marketing',
      logo: '/icons/marketing.png',
      enrolled: 654,
      courses: 29,
      color: 'bg-yellow-100'
    },
    {
      id: 6,
      name: 'Photography',
      logo: '/icons/photography.png',
      enrolled: 587,
      courses: 31,
      color: 'bg-red-100'
    }
  ];

  return (
    <div className="p-6 card-bg mt-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-200 mb-6">Top Courses Categories</h2>
      
      <div className="space-y-4">
        {categories.map((category) => (
          <div 
            key={category.id} 
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-900 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              {/* Category Logo */}
              <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center`}>
                <Image
                  src={category.logo} 
                  alt={"category.nam"} 
                  className="w-8 h-8 object-contain"
                  width={32}
                    height={32}
                 
                />
              </div>
              
              {/* Category Info */}
              <div>
                <h3 className="font-medium text-gray-800">{category.name}</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <span>Enrolled by {category.enrolled.toLocaleString()}</span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <FiBook className="mr-1" size={14} />
                    {category.courses} courses
                  </span>
                </div>
              </div>
            </div>
            
            {/* Arrow Icon */}
            <FiArrowRight className="text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCoursesCategories;