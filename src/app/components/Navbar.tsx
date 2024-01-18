// components/Navbar.tsx
import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="bg-gray-800 text-white w-full p-4 ">
      <nav>
        <ul className="flex justify-center space-x-4">
          <li>
            <Link href="/" className="hover:text-gray-300">Home</Link>
          </li>
          <li>
            <Link href="/security" className="hover:text-gray-300">Security</Link>
          </li>
          <li>
            <Link href="/technology/" className="hover:text-gray-300">Technology</Link>
          </li>
          <li>
            <Link href="/health" className="hover:text-gray-300">Health</Link>
          </li>
          <li>
            <Link href="/internet" className="hover:text-gray-300">Internet</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
