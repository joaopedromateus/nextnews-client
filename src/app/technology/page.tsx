// app/technology/TechnologyPage.tsx
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

const TechnologyPage: React.FC = () => {
  const [technologyNews, setTechnologyNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetch('https://backend-next-news-project.onrender.com/api/articles?category=Technology')
      .then((response) => response.json())
      .then((data) => {
        // Inverta a ordem das notícias de Tecnologia para que as mais recentes apareçam primeiro
        const reversedData = data.reverse();
        setTechnologyNews(reversedData);
      })
      .catch((error) => {
        console.error('Erro ao buscar notícias de Tecnologia:', error);
      });
  }, []);

  const technologyNewsFiltered = technologyNews.filter((article) => article.category === 'Technology');

  return (
    <div>
      <h1 className='text-2xl font-semibold mb-3'>Notícias de Tecnologia</h1>
      {technologyNewsFiltered.map((article) => (
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

export default TechnologyPage;