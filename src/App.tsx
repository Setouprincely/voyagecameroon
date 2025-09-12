import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Home from './pages/Home';
import DestinationsPage from './pages/DestinationsPage';
import DestinationDetail from './pages/DestinationDetail';
import EventsPage from './pages/EventsPage';
import EventDetail from './pages/EventDetail';
import CulturalDetail from './pages/CulturalDetail';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import UserDashboard from './pages/user/Dashboard';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-red-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Voyage Cameroon</h2>
          <p className="text-gray-300">Discovering Cameroon's Beauty...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              
              {/* User Dashboard */}
              <Route path="/dashboard" element={<UserDashboard />} />
              
              {/* Main Routes with Layout */}
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/destinations" element={<DestinationsPage />} />
                <Route path="/destinations/:id" element={<DestinationDetail />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/events/:id" element={<EventDetail />} />
                <Route path="/cultural/:type/:id" element={<CulturalDetail />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>
            </Routes>
            <Toaster position="top-center" />
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;