import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const MyNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarBackground = isScrolled
    ? 'bg-gradient-to-r from-gray-900 via-black to-gray-900 bg-opacity-90 backdrop-blur-md'
    : 'bg-transparent';
  const textColor = isScrolled ? 'text-white' : 'text-gray-500';
  const hoverColor = isScrolled
    ? 'hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-gray-400 hover:via-gray-300 hover:to-white'
    : 'hover:text-gray-700';

  return (
    <nav className={`${navbarBackground} fixed top-0 w-full z-50 transition-all duration-300`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Brand Logo */}
        <Link to="/" className={`text-2xl font-bold ${textColor} ${hoverColor} transition duration-300`}>
          SVG Editor
        </Link>
        
        {/* Navbar Links (Desktop) */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink to="/" isScrolled={isScrolled}>Home</NavLink>
          <NavLink to="/about" isScrolled={isScrolled}>About</NavLink>
          <NavLink to="/features" isScrolled={isScrolled}>Features</NavLink>
          <NavLink to="/iconedit" isScrolled={isScrolled}>Edit SVG</NavLink>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className={`${textColor} ${hoverColor} focus:outline-none transition duration-300`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-4 py-4 space-y-3 bg-gradient-to-b from-gray-900 via-black to-gray-900 bg-opacity-95 backdrop-blur-md">
            <MobileNavLink to="/" onClick={toggleMenu}>Home</MobileNavLink>
            <MobileNavLink to="/about" onClick={toggleMenu}>About</MobileNavLink>
            <MobileNavLink to="/features" onClick={toggleMenu}>Features</MobileNavLink>
            <MobileNavLink to="/iconedit" onClick={toggleMenu}>Edit SVG</MobileNavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, children, isScrolled }) => {
  const textColor = isScrolled ? 'text-gray-300' : 'text-gray-700';
  const hoverColor = isScrolled
    ? 'hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-gray-400 hover:via-gray-300 hover:to-white'
    : 'hover:text-gray-700';
  const underlineColor = isScrolled 
    ? 'bg-gradient-to-r from-gray-500 via-gray-400 to-gray-300'
    : 'bg-gray-700';

  return (
    <Link
      to={to}
      className={`${textColor} ${hoverColor} transition duration-300 relative group`}
    >
      {children}
      <span className={`absolute left-0 bottom-0 w-full h-0.5 ${underlineColor} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></span>
    </Link>
  );
};

const MobileNavLink = ({ to, onClick, children }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-gray-400 hover:via-gray-300 hover:to-white transition duration-300"
  >
    {children}
  </Link>
);

export default MyNavbar;