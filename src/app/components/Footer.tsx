// components/Footer.tsx
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center fixed bottom-0 p-4 w-full">
      <p>&copy; {new Date().getFullYear()} News Portal</p>
    </footer>
  );
};

export default Footer;
