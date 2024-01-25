//next-news-project\client\src\app\components\Navbar.tsx
'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  // Lógica de verificação de login
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
      
    <header className="h-[60px] bg-gradient-to-r from-[#121532] to-[#121253] text-white w-[100%] flex flex-row text-white justify-center items-center ">
      <nav>
        <ul className="flex justify-center space-x-4">
          <li>
            <Link href="/" className="hover:text-gray-300">
              Últimas Notícias
            </Link>
          </li>
          <li>
            <Link href="/security" className="hover:text-gray-300">
              Segurança
            </Link>
          </li>
          <li>
            <Link href="/technology/" className="hover:text-gray-300">
              Tecnologia
            </Link>
          </li>
          <li>
            <Link href="/health" className="hover:text-gray-300">
              Saúde
            </Link>
          </li>
          <li>
            <Link href="/internet" className="hover:text-gray-300">
              Internet
            </Link>
          </li>  
          {/* Login info */}
        {loggedIn && (
          <Link href="/admin" className="pl-[100px] text-green-500">Adm View</Link>
      )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
