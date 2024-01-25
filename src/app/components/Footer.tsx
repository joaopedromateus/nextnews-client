'use client'
import { useEffect } from 'react';

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
    <footer className="bg-gray-800 text-center fixed bottom-0 p-4 w-full footer bg-opacity-0 transition-all duration-300  bg-gradient-to-r from-[#121532] to-[#121253] text-white w-[100%] flex flex-row  justify-center items-center ">
      <div className="footer-content opacity-0 transition-opacity duration-300">
        <p className='text-white'>&copy; {new Date().getFullYear()} News Portal - João Pedro Mateus da Silva</p>
      </div>
    </footer>
  );
};

export default Footer;
