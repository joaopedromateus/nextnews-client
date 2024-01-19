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
    return (
      <div className="text-center mt-8">
        <p className="text-xl font-semibold">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 mb-3">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-600 mb-2">Categoria: {article.category}</p>
      <img
        src={`http://localhost:5000/${article.images}`} // Use a URL completa para a imagem
        alt="Imagem da notícia"
        className='w-[700px] rounded-md mb-4'
      />
      <p className="text-xl leading-7">{article.content}</p>
    </div>
  );
}

export default NewsPage;
