// app/health/healthPage.tsx
"use client"
// healthPage.tsx
// healthPage.tsx
import React, { useEffect, useState } from 'react';
import News from '../components/News'; // Importe o componente News

// Defina um tipo para os dados da notícia
type NewsItem = {
  _id: string;
  title: string;
  content: string;
  category: string;
  images: string[];
  slug: string; // Certifique-se de que a propriedade slug esteja definida no seu modelo
};

const HealthPage: React.FC = () => {
  const [healthNews, setHealthNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    // Faça uma requisição para a API que retorna as notícias de Saúde.
    fetch('http://localhost:5000/api/articles?category=Health')
      .then((response) => response.json())
      .then((data) => {
        setHealthNews(data); // Define os dados das notícias de Saúde no estado
      })
      .catch((error) => {
        console.error('Erro ao buscar notícias de Saúde:', error);
      });
  }, []);

  // Filtra as notícias da categoria Health
  const healthNewsFiltered = healthNews.filter((article) => article.category === 'Health');

  return (
    <div>
      <h1 className='text-2xl font-semibold mb-3'>Notícias de Saúde</h1>
      {healthNewsFiltered.map((article) => (
        <News
          key={article._id}
          slug={article.slug}
          title={article.title}
          // content={article.content}
          category={article.category}
          images={article.images.map(img => img.replace(/\\/g, '/'))} // Corrige o caminho da imagem se necessário
          content={''}        />
      ))}
    </div>
  );
};

export default HealthPage;
