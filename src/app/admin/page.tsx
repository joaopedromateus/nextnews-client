// client/src/app/admin/page.tsx
'use client';
import React, { useState, useEffect } from 'react';

const AdminPage: React.FC = () => {
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    category: '',
    content: '',
    images: [], // Inicializa como um array vazio
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [redirectMessage, setRedirectMessage] = useState('');
  const [newsList, setNewsList] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setRedirectMessage('Você fez logout. Redirecionando para a página de login...');
    setTimeout(() => {
      window.location.href = '/login';
    }, 2000);
  };

const submitForm = async () => {
  const submissionFormData = new FormData();
  submissionFormData.append('slug', formData.slug);
  submissionFormData.append('title', formData.title);
  submissionFormData.append('category', formData.category);
  submissionFormData.append('content', formData.content);
  
  if (formData.images && formData.images.length > 0) {
    Array.from(formData.images).forEach(file => {
      submissionFormData.append('images', file);
    });
  }

  try {
    const response = await fetch('http://localhost:5000/api/articles', {
      method: 'POST',
      body: submissionFormData, // Enviando FormData
    });

    if (response.ok) {
      // Exibir alerta de sucesso
      alert('Notícia cadastrada com sucesso!');
      // Recarregar a página
      window.location.reload();
    } else {
      // Trate aqui os erros de resposta não bem-sucedidos
      alert('Erro ao enviar o formulário. Por favor, tente novamente.');
    }
  } catch (error) {
    console.error('Erro ao conectar ao servidor:', error);
    alert('Erro ao conectar ao servidor. Por favor, verifique sua conexão.');
  }
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm(); // Chame a função que envia os dados do formulário.
  };

  // Gerador de Slug
  const handleGenerateSlug = () => {
    const title = formData.title;
    const slug = title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove acentos
      .replace(/[^\w\s]/g, "") // Remove pontuação
      .replace(/\s+/g, "-") // Substitui espaços por hifens
      .replace(/ç/g, "c") // Substitui "ç" por "c"
      .trim(); // Remove espaços em branco extras
    setFormData({
      ...formData,
      slug: slug,
    });
  };

  // Atualiza o estado para as imagens
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, images: Array.from(e.target.files) });
    }
  };

  const formatDate = (dateString: string) => {
  const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} - ${hours}:${minutes}h`;
  };

  const fetchNewsList = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/articles');
      if (response.ok) {
        const data = await response.json();
        setNewsList(data);
      } else {
        console.error('Erro ao buscar a lista de notícias');
      }
    } catch (error) {
      console.error('Erro ao conectar ao servidor:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchNewsList(); 
    } else {
      setRedirectMessage('Você não está logado. Redirecionando para a página de login...');
      setTimeout(() => {
        window.location.href = '/login';
      }, 0);
    }
  }, []);

  const handleDeleteNews = async (slug: string) => {
    const confirmDelete = window.confirm('Deseja realmente excluir esta notícia?');
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5000/api/articles/${slug}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchNewsList();
        } else {
          console.error('Erro ao excluir a notícia');
        }
      } catch (error) {
        console.error('Erro ao conectar ao servidor:', error);
      }
    }
  };

  return (
    <div className={`flex flex-col items-center ${isLoggedIn ? '' : 'hidden'}`}>
      {isLoggedIn ? (
        <div>
          <div className="admin-form-container p-4 w-full max-w-md">
            {/* Formulário de adicionar notícias */}
            <h1 className="text-xl font-semibold mb-4">Cadastrar Nova Notícia</h1>
          <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <label className="block font-medium">Título:</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        className="rounded-md px-3 py-2 border text-black" // Adicione a classe text-black aqui
      />
    </div>
    <div className="mb-4">
      <label className="block font-medium">Slug:</label>
      <input
        type="text"
        name="slug"
        value={formData.slug}
        onChange={handleChange}
        required
        className="rounded-md px-3 py-2 border text-black" // Adicione a classe text-black aqui
      />
      <button
        type="button"
        onClick={handleGenerateSlug}
        className="bg-blue-500 text-white rounded-md px-3 py-2 ml-2"
      >
        GERAR
      </button>
    </div>
  <div className="mb-4">
  <label className="block font-medium">Categoria:</label>
  <select
    name="category"
    value={formData.category}
    onChange={handleChange}
    required
    className="rounded-md px-3 py-2 border text-black" // Estilo do dropdown
  >
    <option value="">Selecione uma categoria</option>
    <option value="Health">Saúde</option>
    <option value="Security">Segurança</option>
    <option value="Internet">Internet</option>
    <option value="Technology">Tecnologia</option>
    {/* Adicione mais opções de categoria conforme necessário */}
  </select>
</div>
    <div className="mb-4">
      <label className="block font-medium">Conteúdo:</label>
      <textarea
        name="content"
        value={formData.content}
        onChange={handleChange}
        required
        className="rounded-md px-3 py-2 border text-black" // Adicione a classe text-black aqui
      />
    </div>
    <div className="mb-4">
      <label className="block font-medium">Imagens:</label>
      <input
        type="file"
        name="images"
        onChange={handleImageChange}
        multiple
        className="rounded-md px-3 py-2 border"
      />
    </div>
    <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2">
      Enviar Notícia
    </button>
       </form>
          </div>

          <div className="w-full max-w-md mt-4">
            <h2 className="text-lg font-semibold mb-2">Lista de Notícias</h2>
          <ul>
  {newsList.map((news: any, index: number) => (
    <li key={news.slug} className={`flex justify-between items-center mb-2 rounded-lg p-2 ${index % 2 === 0 ? 'bg-black' : 'bg-gray-800'}`}>
      <div>
      <p>{news.title}</p>
      <p>Data de Publicação: {formatDate(news.publishDate)}</p>
      </div>
      <div>
      <button className="text-red-500" onClick={() => handleDeleteNews(news.slug)}>X</button>
      </div>
      </li>
      ))}
      </ul>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white rounded-md px-4 mt-3 py-2 mb-10"
          >
            Sair
          </button>
        </div>
      ) : (
        <div className="text-center mt-8 text-gray-700">
          <p>{redirectMessage}</p>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
