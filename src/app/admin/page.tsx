'use client'
import React, { useState } from 'react';

const AdminPage: React.FC = () => {
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    category: '',
    content: '',
  });

  // Atualiza o estado com os dados do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Envia os dados do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Notícia enviada com sucesso!');
        // Limpa o formulário após o envio
        setFormData({
          slug: '',
          title: '',
          category: '',
          content: '',
        });
      } else {
        console.error('Erro ao enviar a notícia');
      }
    } catch (error) {
      console.error('Erro ao conectar ao servidor:', error);
    }
  };

  return (
    <div className="admin-form-container">
      <h1>Cadastrar Nova Notícia</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Slug:</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Título:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Categoria:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Conteúdo:</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit">Enviar Notícia</button>
      </form>
    </div>
  );
};

export default AdminPage;
