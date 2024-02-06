/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: 'https://nextnewsproject.s3.sa-east-1.amazonaws.com/news-images/:path*' // Direciona diretamente para o bucket do S3
      }]
  }
}

module.exports = nextConfig;
