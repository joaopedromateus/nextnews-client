// app/technology/TechnologyPage.tsx
"use client"
import React, { useEffect, useState } from 'react';

// Defina um tipo para os dados da notícia
type NewsItem = {
  _id: string;
  slug:string;
  title: string;
  content: string;
  category:string;
  // Adicione outras propriedades conforme necessário
};

const TechnologyPage: React.FC = () => {
  const [technologyNews, setTechnologyNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    // Aqui você deve fazer uma requisição para a API que retorna as notícias de Tecnologia.
    // Substitua a URL pela rota correta da sua API.
    fetch('http://localhost:5000/api/articles?category=Technology') // Use "Technology" com a primeira letra maiúscula
      .then((response) => response.json())
      .then((data) => {
        // Filtra apenas as notícias da categoria "Tecnologia"
        const technologyNewsFiltered = data.filter((article: NewsItem) => article.category === 'Technology');
        setTechnologyNews(technologyNewsFiltered);
      })
      .catch((error) => {
        console.error('Erro ao buscar notícias de Tecnologia:', error);
      });
  }, []);

  return (
    <div>
      <h1>Notícias de Tecnologia</h1>
      <ul>
        {technologyNews.map((article) => (
          <li key={article._id}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
            <p>{article.category}</p>
            
            {/* Renderize as imagens e outros detalhes do artigo, se necessário */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TechnologyPage;
