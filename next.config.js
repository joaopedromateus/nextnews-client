/** @type {import('next').NextConfig} */
const nextConfig = {

  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: 'https://backend-next-news-project.onrender.com/uploads/:path*' // Proxy para o servidor backend
      }]
  }
}

module.exports = nextConfig
