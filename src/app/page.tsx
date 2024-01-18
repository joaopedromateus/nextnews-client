//client/app/page.tsx
"use client";
import React, { useEffect, useState } from 'react';
import News from './components/News';

// Defina um tipo para os dados da notícia
type NewsItem = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
};

const Home: React.FC = () => {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);

  useEffect(() => {
    // Faça a solicitação HTTP para buscar as notícias
    fetch('http://localhost:5000/api/articles')
      .then((response) => response.json())
      .then((data) => {
        // Aqui, supõe-se que a API já retorna o 'slug' para cada notícia
        setNewsData(data); // Define os dados das notícias no estado
      })
      .catch((error) => {
        console.error('Erro ao buscar notícias:', error);
      });
  }, []);

  return (
    <main className="flex flex-col items-center p-8">
      <section>
        <h2 className="text-2xl font-semibold mb-3">Notícias Recentes:</h2>
        {newsData.map((news) => (
          // Passando o slug diretamente para o componente News
          <News key={news._id} title={news.title} slug={news.slug} content={news.content} category={news.category} />
        ))}
      </section>
    </main>
  );
};

export default Home;
