/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth/login',
        permanent: true
      }
    ];
  },
  images: {
    domains: ['i.pinimg.com']
  }
};

module.exports = nextConfig;
