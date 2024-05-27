// app/internet/InternetPage.tsx
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

const InternetPage: React.FC = () => {
  const [internetNews, setInternetNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/articles?category=Internet')
      .then((response) => response.json())
      .then((data) => {
        // Inverta a ordem das notícias de Internet para que as mais recentes apareçam primeiro
        const reversedData = data.reverse();
        setInternetNews(reversedData);
      })
      .catch((error) => {
        console.error('Erro ao buscar notícias de Internet:', error);
      });
  }, []);

  const internetNewsFiltered = internetNews.filter((article) => article.category === 'Internet');

  return (
    <div>
      <h1 className='text-2xl font-semibold mb-3'>Notícias de Internet</h1>
      {internetNewsFiltered.map((article) => (
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

export default InternetPage;