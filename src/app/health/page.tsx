// app/health/healthPage.tsx
"use client"
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
  // Adicione outras propriedades conforme necessário
};

const HealthPage: React.FC = () => {
  const [healthNews, setHealthNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    // Faça uma requisição para a API que retorna as notícias de Saúde.
    // Substitua a URL pela rota correta da sua API.
    fetch('http://localhost:5000/api/articles?category=Health') // Use "Health" com a primeira letra maiúscula
      .then((response) => response.json())
      .then((data) => {
        setHealthNews(data); // Define os dados das notícias de Saúde no estado
      })
      .catch((error) => {
        console.error('Erro ao buscar notícias de Saúde:', error);
      });
  }, []);

  return (
    <div>
      <h1>Notícias de Saúde</h1>
      {healthNews.map((article) => (
        // Use o componente News para renderizar cada notícia de Saúde
        <News
          key={article._id}
          slug={article.slug} // Use o ID como slug, você pode ajustar isso conforme necessário
          title={article.title}
          // content={article.content}
          category={article.category}
          images={article.images}
        />
      ))}
    </div>
  );
};

export default HealthPage;
