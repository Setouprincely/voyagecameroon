import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-cameroon-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-cameroon-green-950 transition-all duration-500">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-cameroon-green-400 rounded-full animate-float opacity-30"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-cameroon-blue-400 rounded-full animate-float opacity-20" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-cameroon-yellow-400 rounded-full animate-float opacity-40" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-32 w-2.5 h-2.5 bg-cameroon-red-400 rounded-full animate-float opacity-25" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-cameroon-green-300 rounded-full animate-float opacity-50" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-cameroon-blue-300 rounded-full animate-float opacity-35" style={{animationDelay: '5s'}}></div>
      </div>

      {/* Subtle Pattern Overlay */}
      <div className="fixed inset-0 bg-hero-pattern opacity-5 pointer-events-none"></div>

      <Header />
      <main className="relative z-10">
        <Outlet />
      </main>
      <Footer />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#1f2937',
          },
        }}
      />
    </div>
  );
};

export default Layout;
