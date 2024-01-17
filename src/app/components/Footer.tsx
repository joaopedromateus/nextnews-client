// components/Footer.tsx
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4 absolute bottom-0 w-full">
      <p>&copy; {new Date().getFullYear()} News Portal</p>
    </footer>
  );
};

export default Footer;
