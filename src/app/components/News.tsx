// client/app/components/News.tsx
import React from 'react';
import Link from 'next/link';

type NewsProps = {
  slug: string;
  title: string;
  content: string;
  category: string;
  images: string[];
  publishDate: string; // Adicionando publishDate
};

const News: React.FC<NewsProps> = ({ slug, title, content, category, images, publishDate }) => {
  // Função para formatar a data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} - ${hours}:${minutes}h`;
  };

  const formattedDate = formatDate(publishDate);

  return (
    <div className="mb-8">
      {images && images.map((image, index) => (
        <div key={index} className="relative">
          <img 
            src={`/${image.replace(/\\/g, '/')}`}
            alt={`Imagem de ${title}`}
            className="w-full max-w-md rounded-lg object-cover w-[500px]"
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
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold">{category}</p>
      <p className="text-sm">{formattedDate}</p> {/* Exibindo a data formatada */}
      </div>
    </div>
  );
};

export default News;
