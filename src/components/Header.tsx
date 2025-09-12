import React, { useState } from 'react';
import { Menu, X, Moon, Sun, Globe, Search, User, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/useAuth';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { currentUser, logout } = useAuth();

  const navigation = [
    { name: t('home'), href: '/' },
    { name: t('destinations'), href: '/destinations' },
    { name: t('culture'), href: '/#culture' },
    { name: t('events'), href: '/events' },
    { name: 'Book Now', href: '/#booking' },
    { name: 'Admin', href: '/admin' }
  ];

  return (
    <header className="fixed top-0 w-full z-50 glass-card border-b border-white/20 shadow-lg">
      <nav className="container mx-auto container-padding">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-12 h-12 bg-cameroon-gradient rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <span className="text-white font-bold text-xl">🇨🇲</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold gradient-text group-hover:scale-105 transition-transform duration-300">
                Voyage Cameroon
              </h1>
              <p className="text-xs text-cameroon-blue-600 font-medium">Discover • Explore • Experience</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative text-gray-700 dark:text-gray-300 hover:text-cameroon-green-600 dark:hover:text-cameroon-green-400 
                         transition-all duration-300 font-medium group py-2"
              >
                {item.name}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-cameroon-gradient group-hover:w-full transition-all duration-300"></div>
              </a>
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-3 rounded-xl hover:bg-cameroon-green-500/10 transition-all duration-300 group"
            >
              <Search className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-cameroon-green-500 transition-colors" />
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
                className="flex items-center space-x-2 p-3 rounded-xl hover:bg-cameroon-blue-500/10 transition-all duration-300 group"
              >
                <Globe className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-cameroon-blue-500 transition-colors" />
                <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{language.toUpperCase()}</span>
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-3 rounded-xl hover:bg-cameroon-yellow-500/10 transition-all duration-300 group"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-cameroon-yellow-500 group-hover:scale-110 transition-transform" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700 group-hover:text-cameroon-yellow-500 group-hover:scale-110 transition-all" />
              )}
            </button>
            
            {/* Auth Links */}
            {currentUser ? (
              <Link 
                to="/dashboard"
                className="hidden md:flex items-center space-x-2 p-2 px-4 rounded-xl bg-cameroon-gradient hover:bg-gradient-to-br text-white transition-all duration-300 group"
              >
                <User className="w-5 h-5" />
                <span className="font-medium">My Account</span>
              </Link>
            ) : (
              <Link 
                to="/login"
                className="hidden md:flex items-center space-x-2 p-2 px-4 rounded-xl bg-cameroon-gradient hover:bg-gradient-to-br text-white transition-all duration-300 group"
              >
                <LogIn className="w-5 h-5" />
                <span className="font-medium">Sign In</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 rounded-xl hover:bg-cameroon-red-500/10 transition-all duration-300 group"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-cameroon-red-500 transition-colors" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-cameroon-red-500 transition-colors" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-white/20 animate-slide-down">
            <div className="flex flex-col space-y-4">
              {navigation.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-cameroon-green-600 dark:hover:text-cameroon-green-400 
                           transition-all duration-300 font-medium px-4 py-3 rounded-xl hover:bg-cameroon-green-500/10"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="absolute top-16 left-0 right-0 glass-card p-6 border-b border-white/20 animate-slide-down">
            <div className="container mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search destinations, tours, events..."
                  className="w-full p-4 pl-12 rounded-2xl bg-white/50 dark:bg-gray-800/50 border border-white/30 
                           focus:outline-none focus:ring-2 focus:ring-cameroon-blue-500 focus:border-transparent 
                           text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-lg"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-cameroon-blue-500" />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;