/** @type {import('next').NextConfig} */
const nextConfig = {

  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: 'http://localhost:5000/uploads/:path*' // Proxy para o servidor backend
      }]
  }
}

module.exports = nextConfig
