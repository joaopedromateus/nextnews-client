// client/app/components/News.tsx
import React from 'react';
import Link from 'next/link';

type NewsProps = {
  slug: string;
  title: string;
  content: string;
  category: string;
  images: string[];
};

const News: React.FC<NewsProps> = ({ slug, title, content, category, images }) => {
  return (
    <div className="mb-8">
      {images && images.map((image, index) => (
        <div key={index} className="relative">
          <img 
            src={`/${image.replace(/\\/g, '/')}`} // Ajustando o caminho
            alt={`Imagem de ${title}`}
            className="w-full max-w-md rounded-lg object-cover"
            style={{ width: '500px' }}
          />
          <Link href={`/news/${slug}`}>
            <div className="absolute bottom-0 left-0 p-3 bg-black bg-opacity-50 w-full max-w-md rounded-b-lg">
              <h2 className="text-2xl font-semibold text-white hover:underline">
                {title}
              </h2>
            </div>
          </Link>
        </div>
      ))}
      <p className="mt-2 text-gray-600">{content}</p>
      <p className="text-sm font-semibold">{category}</p>
    </div>
  );
};

export default News;
