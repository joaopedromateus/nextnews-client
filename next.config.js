<<<<<<< HEAD
// /** @type {import('next').NextConfig} */
// const nextConfig = {

//   async rewrites() {
//     return [
//       {
//         source: '/uploads/:path*',
//         destination: 'https://backend-next-news-project.onrender.com/uploads/:path*' // Proxy para o servidor backend
//       }]
//   }
// }

// module.exports = nextConfig
=======
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
>>>>>>> 1c74cadd0c5eb4434f5c9d0b607809b60e746cc6
