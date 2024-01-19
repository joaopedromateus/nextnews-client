// app/technology/TechnologyPage.tsx
"use client"
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

const TechnologyPage: React.FC = () => {
  const [technologyNews, setTechnologyNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    // Faça uma requisição para a API que retorna as notícias de Tecnologia.
    fetch('http://localhost:5000/api/articles?category=Technology')
      .then((response) => response.json())
      .then((data) => {
        setTechnologyNews(data); // Define os dados das notícias de Tecnologia no estado
      })
      .catch((error) => {
        console.error('Erro ao buscar notícias de Tecnologia:', error);
      });
  }, []);

  // Filtra as notícias da categoria Tecnologia
  const technologyNewsFiltered = technologyNews.filter((article) => article.category === 'Technology');

  return (
    <div>
      <h1 className='text-2xl font-semibold mb-3'>Notícias de Tecnologia</h1>
      {technologyNewsFiltered.map((article) => (
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

export default TechnologyPage;