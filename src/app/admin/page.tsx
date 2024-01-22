// client/src/app/admin/page.tsx
'use client';
import React, { useState, useEffect } from 'react';

const AdminPage: React.FC = () => {
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    category: '',
    content: '',
    images: null as any,
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [redirectMessage, setRedirectMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false); // Define como não autenticado após o logout
    setRedirectMessage('Você fez logout. Redirecionando para a página de login...');
    setTimeout(() => {
      window.location.href = '/login';
    }, 2000);
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
      setFormData({ ...formData, images: e.target.files });
    }
  };


// Envia os dados do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append('slug', formData.slug);
    data.append('title', formData.title);
    data.append('category', formData.category);
    data.append('content', formData.content);
    // Adiciona imagens ao FormData
    if (formData.images) {
      Array.from(formData.images).forEach(image => {
        data.append('images', image);
      });
    }

    try {
      const response = await fetch('http://localhost:5000/api/articles', {
        method: 'POST',
        body: data, // Agora enviando FormData
      });

      if (response.ok) {
        console.log('Notícia enviada com sucesso!');
        // Limpa o formulário após o envio
        setFormData({
          slug: '',
          title: '',
          category: '',
          content: '',
          images: null,
        });
      } else {
        console.error('Erro ao enviar a notícia');
      }
    } catch (error) {
      console.error('Erro ao conectar ao servidor:', error);
    }
  };

  useEffect(() => {
    // Verifique se o usuário está logado
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      setRedirectMessage('Você já está autenticado. Redirecionando para a página de admin...');
      setTimeout(() => {
        setRedirectMessage('');
      }, 2000);
    } else {
      // Se não estiver logado, mostre a mensagem e redirecione
      setRedirectMessage('Você não está logado. Redirecionando para a página de login...');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    }
  }, []); // Executar apenas uma vez, quando o componente é montado

  // Renderize o conteúdo somente se o usuário estiver logado
  if (!isLoggedIn) {
    return (
      <div>
        {redirectMessage}
      </div>
    );
  }


  return (

    <div className="admin-form-container p-4">
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
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
        className="rounded-md px-3 py-2 border text-black" // Adicione a classe text-black aqui
      />
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
      <button onClick={handleLogout} className="bg-red-500 text-white rounded-md px-4 mt-3 py-2">
        Sair
      </button>
    </div>
  );
};

export default AdminPage;