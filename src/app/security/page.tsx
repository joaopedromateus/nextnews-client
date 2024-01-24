// app/security/SecurityPage.tsx
"use client"
import React, { useEffect, useState } from 'react';
import News from '../components/News';

type NewsItem = {
  publishDate: string;
  _id: string;
  title: string;
  content: string;
  category: string;
  images: string[];
  slug: string;
};

const SecurityPage: React.FC = () => {
  const [securityNews, setSecurityNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/articles?category=Security')
      .then((response) => response.json())
      .then((data) => {
        // Inverta a ordem das notícias de Segurança para que as mais recentes apareçam primeiro
        const reversedData = data.reverse();
        setSecurityNews(reversedData);
      })
      .catch((error) => {
        console.error('Erro ao buscar notícias de Segurança:', error);
      });
  }, []);

  const securityNewsFiltered = securityNews.filter((article) => article.category === 'Security');

  return (
    <div>
      <h1 className='text-2xl font-semibold mb-3'>Notícias de Segurança</h1>
      {securityNewsFiltered.map((article) => (
        <News
          key={article._id}
          slug={article.slug}
          title={article.title}
          category={article.category}
          images={article.images.map(img => img.replace(/\\/g, '/'))}
          publishDate={article.publishDate}
          content={''}
        />
      ))}
    </div>
  );
};

export default SecurityPage;