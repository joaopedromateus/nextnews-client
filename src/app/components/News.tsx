// components/News.tsx
import React from 'react';
import Link from 'next/link';

type NewsProps = {
  slug: string; // Utilize slug em vez de _id
  title: string;
  content: string;
  category: string;
};

const News: React.FC<NewsProps> = ({ slug, title, content, category }) => {
  return (
    <div className="mb-8">
      <Link href={`/news/${slug}`} passHref>
        <h2 className="text-2xl font-semibold hover:underline cursor-pointer">
          {title}
        </h2>
      </Link>
      <p className="mt-2 text-gray-600">{content}</p>
      <p className="text-sm font-semibold">{category}</p>
    </div>
  );
};

export default News;
