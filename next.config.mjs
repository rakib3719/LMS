/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'api.eduden.mrshakil.com',
          pathname: '/media/teachers/picture/**',
        },
        {
          protocol: 'https',
          hostname: 'api.eduden.mrshakil.com',
          pathname: '/media/students/picture/**',
        },
      ],
    },
  }
  
  export default nextConfig
  


