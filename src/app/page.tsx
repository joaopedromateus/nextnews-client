'use client'
import React, { useEffect, useState } from 'react';
import News from './components/News';

type NewsItem = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  images: string[];
  publishDate: string;
};

const Home: React.FC = () => {
  // Função para formatar a data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    // Verifique se a data é válida antes de formatá-la
    if (isNaN(date.getTime())) {
      return 'Data inválida';
    }

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} - ${hours}:${minutes}h`;
  };

  const [newsData, setNewsData] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/articles')
      .then((response) => response.json())
      .then((data) => {
        // Inverta a ordem das notícias para que as mais recentes apareçam primeiro
        const reversedData = data.reverse();
        setNewsData(reversedData);
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
          // Passando todos os campos, exceto o conteúdo, diretamente para o componente News
          <News
            key={news._id}
            title={news.title}
            slug={news.slug}
            category={news.category}
            images={news.images}
            publishDate={news.publishDate} // Passando a data formatada
            content={''}          />
        ))}
      </section>
    </main>
  );
};

export default Home;
