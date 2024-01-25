// client/src/app/news/[slug]/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { FaWhatsapp, FaFacebook, FaTelegramPlane, FaTwitter } from 'react-icons/fa';

interface RouteParams {
  slug: string;
}

const NewsPage = ({ params }: { params: RouteParams }) => {
  const shareUrl = window.location.href; // URL da página atual
  const shareText = "Confira esta notícia: "; // Texto para compartilhamento

  const shareToWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + shareUrl)}`);
  };

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
  };

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`);
  };

  const shareToTelegram = () => {
    window.open(`https://telegram.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`);
  };

  const [article, setArticle] = useState<any>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} - ${hours}:${minutes}h`;
  };

  useEffect(() => {
    async function fetchData() {
      const { slug } = params;
      try {
        const response = await fetch(`https://backend-next-news-project.onrender.com/api/articles/${slug}`);
        const articleData = await response.json();

        if (!articleData) {
          setArticle(null);
          return;
        }

        // Formate a data de publicação antes de definir no estado
        articleData.publishDate = formatDate(articleData.publishDate);

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
      <p className="text-gray-600 mb-2">Data de publicação: {article.publishDate} </p>
      <img
        src={`https://backend-next-news-project.onrender.com/${article.images}`} // Use a URL completa para a imagem
        alt="Imagem da notícia"
        className='w-[700px] rounded-md mb-4'
      />
      <p className="text-xl leading-7">{article.content}</p>
      {/* Seção de Compartilhamento */}
      <div className="flex justify-center mt-3 mb-3">
        <p className="mr-2">Compartilhar:</p>
        <button onClick={shareToWhatsApp} aria-label="Compartilhar no WhatsApp"><FaWhatsapp size={24} /></button>
        <button onClick={shareToFacebook} aria-label="Compartilhar no Facebook" className="mx-2"><FaFacebook size={24} /></button>
        <button onClick={shareToTwitter} aria-label="Compartilhar no Twitter" className="mx-2"><FaTwitter size={24} /></button>
        <button onClick={shareToTelegram} aria-label="Compartilhar no Telegram"><FaTelegramPlane size={24} /></button>
      </div>
    </div>
  );
}

export default NewsPage;
