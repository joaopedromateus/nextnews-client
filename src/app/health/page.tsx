// app/health/healthPage.tsx
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

const HealthPage: React.FC = () => {
  const [healthNews, setHealthNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetch('https://backend-next-news-project.onrender.com/api/articles?category=Health')
      .then((response) => response.json())
      .then((data) => {
        // Inverta a ordem das notícias de Saúde para que as mais recentes apareçam primeiro
        const reversedData = data.reverse();
        setHealthNews(reversedData);
      })
      .catch((error) => {
        console.error('Erro ao buscar notícias de Saúde:', error);
      });
  }, []);

  const healthNewsFiltered = healthNews.filter((article) => article.category === 'Health');

  return (
    <div>
      <h1 className='text-2xl font-semibold mb-3'>Notícias de Saúde</h1>
      {healthNewsFiltered.map((article) => (
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

export default HealthPage;
