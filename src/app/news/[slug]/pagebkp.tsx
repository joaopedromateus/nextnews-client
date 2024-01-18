//client/app/news/[slug]/page.tsx
'use client'
import { useEffect, useState } from 'react';

const NewsPage = ({ params }) => {
  const { slug } = params;
  const [article, setArticle] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:5000/api/articles/${slug}`);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setArticle(data);
      } catch (error) {
        console.error('Erro ao buscar detalhes da notícia:', error);
      }
    }

    fetchData();
  }, [slug]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Slug: {slug}</h1>
      <h1>Title: {article.title}</h1>
      <h1>Categoria:{article.category} </h1>
    </div>
  );
};

export default NewsPage;