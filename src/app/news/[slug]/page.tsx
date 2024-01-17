'use client'
// app/news/[slug]/page.tsx
import React, { useEffect, useState } from 'react';

type NewsItem = {
  _id: string;
  title: string;
  content: string;
  category: string;
};

const NewsPage: React.FC = () => {
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const path = window.location.pathname;
    const slug = path.split('/').pop();

    if (slug) {
      fetch(`http://localhost:5000/api/articles/slug/${slug}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setNewsItem(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching news item:', error);
          setError(error.message);
          setLoading(false);
        });
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!newsItem) {
    return <div>No news item found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{newsItem.title}</h1>
      <p>{newsItem.content}</p>
      <p className="text-sm font-semibold">Category: {newsItem.category}</p>
    </div>
  );
};

export default NewsPage;
