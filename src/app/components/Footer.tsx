'use client'
import { useEffect } from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  // Função para controlar a classe "bg-opacity-0" com base no scroll da tela
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('.footer');
      const footerContent = document.querySelector('.footer-content');
      if (footer && footerContent) {
        if (window.scrollY > 0) {
          footer.classList.remove('bg-opacity-0');
          footerContent.classList.remove('opacity-0');
        } else {
          footer.classList.add('bg-opacity-0');
          footerContent.classList.add('opacity-0');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer className="bg-black text-white text-center fixed bottom-0 p-4 w-full footer bg-opacity-0 transition-all duration-300">
      <div className="footer-content opacity-0 transition-opacity duration-300">
        <p>&copy; {new Date().getFullYear()} News Portal - João Pedro Mateus da Silva</p>
        <div className="mt-2">
          <a href="https://www.linkedin.com/in/joaopedromateusdasilva/" target="_blank" rel="noopener noreferrer">
            <span className="mr-2">
              <FaLinkedin />
            </span>
            LinkedIn
          </a>
          <a href="https://github.com/joaopedromateus" target="_blank" rel="noopener noreferrer" className="ml-4">
            <span className="mr-2">
              <FaGithub />
            </span>
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
