//client/app/page.tsx
"use client";
import React, { useEffect, useState } from 'react';
import News from './components/News';

type NewsItem = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  images: string[];
  publishDate: string; // Adicionando publishDate
};

const Home: React.FC = () => {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/articles')
      .then((response) => response.json())
      .then((data) => {
        setNewsData(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar notícias:', error);
      });
  }, []);

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-3">Notícias Recentes:</h2>
      {newsData.map((news) => (
        <News
          // key={news._id}
          title={news.title}
          // slug={news.slug}
          category={news.category}
          images={news.images}
          // content={news.content}
          publishDate={news.publishDate} // Passando publishDate
        />
      ))}
    </section>
  );
};

export default Home;
