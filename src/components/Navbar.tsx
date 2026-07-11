import React, { useState } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
  activeSection?: string;
  scrollToSection?: (sectionId: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDark, toggleTheme, activeSection, scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (sectionId: string) => {
    if (location.pathname === '/') {
      if (scrollToSection) scrollToSection(sectionId.toLowerCase());
    } else {
      // Navigate to home and then scroll
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId.toLowerCase());
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-md border-b ${isDark ? 'border-gray-800' : 'border-gray-200'} shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-bold text-xl bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            Kiran Srivastava
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {['Hero', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`hover:text-yellow-500 transition-colors duration-200 relative ${activeSection === item.toLowerCase() ? 'text-yellow-500 font-medium' : ''}`}
              >
                {item}
                {activeSection === item.toLowerCase() && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
                )}
              </button>
            ))}
            <Link 
              to="/social-media-portfolio" 
              className={`hover:text-yellow-500 transition-colors duration-200 relative font-medium whitespace-nowrap ${location.pathname === '/social-media-portfolio' ? 'text-yellow-500' : ''}`}
            >
              Social Media Handles
              {location.pathname === '/social-media-portfolio' && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
              )}
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-800 transition-colors"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-800"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className={`md:hidden ${isDark ? 'bg-gray-900' : 'bg-white'} border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {['Hero', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className="block w-full text-left px-3 py-2 text-base font-medium hover:text-yellow-500 transition-colors"
              >
                {item}
              </button>
            ))}
            <Link 
              to="/social-media-portfolio"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-left px-3 py-2 text-base font-medium hover:text-yellow-500 transition-colors"
            >
              Social Media Handles
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
