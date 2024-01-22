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
    <header className="bg-gray-800 text-white w-full p-4">
      <nav>
        <ul className="flex justify-center space-x-4">
          <li>
            <Link href="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/security" className="hover:text-gray-300">
              Security
            </Link>
          </li>
          <li>
            <Link href="/technology/" className="hover:text-gray-300">
              Technology
            </Link>
          </li>
          <li>
            <Link href="/health" className="hover:text-gray-300">
              Health
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
