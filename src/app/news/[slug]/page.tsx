//client/app/news/[slug]/page.tsx
'use client'
import { useEffect, useState } from 'react';

interface RouteParams {
  slug: string;
}

const NewsPage = ({ params }: { params: RouteParams }) => {
  const [article, setArticle] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const { slug } = params;
      try {
        const response = await fetch(`http://localhost:5000/api/articles/${slug}`);
        const articleData = await response.json();

        if (!articleData) {
          setArticle(null);
          return;
        }

        setArticle(articleData);
      } catch (error) {
        console.error('Erro ao buscar detalhes da notícia:', error);
        setArticle(null);
      }
    }

    fetchData();
  }, [params]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Slug: {params.slug}</h1>
      <h1>Title: {article.title}</h1>
      <p>Category: {article.category}</p>
    </div>
  );
}

export default NewsPage;
