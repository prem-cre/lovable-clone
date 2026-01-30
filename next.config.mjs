/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    if (process.env.NODE_ENV === 'production') return []
    return [
      {
        source: '/api/chat',
        destination: 'http://localhost:8000/chat',
      },
    ]
  },
}

export default nextConfig
