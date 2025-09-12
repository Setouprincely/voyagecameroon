import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, AlertCircle, ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/useAuth';
import toast from 'react-hot-toast';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(email);
      setMessage('Check your inbox for password reset instructions');
      toast.success('Reset link sent to your email');
    } catch (error) {
      setError('Failed to reset password. Check if the email is correct.');
      toast.error('Failed to send reset email');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-xl">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto bg-cameroon-gradient rounded-2xl flex items-center justify-center shadow-lg mb-6">
            <span className="text-white text-3xl">🔑</span>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Reset Password
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Enter your email to receive a reset link
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-6 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        {message && (
          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 mb-6 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-500 dark:text-green-400">{message}</p>
              </div>
            </div>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-xl 
                         text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-cameroon-green-500 focus:border-transparent
                         bg-white dark:bg-gray-900"
                placeholder="Email address"
              />
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent 
                       text-sm font-medium rounded-xl text-white bg-cameroon-gradient hover:bg-gradient-to-br
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cameroon-green-500
                       transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-70"
            >
              {loading ? "Sending..." : "Reset Password"}
            </button>
          </div>
        </form>
        
        <div className="text-center mt-4">
          <Link to="/login" className="flex items-center justify-center font-medium text-cameroon-blue-600 hover:text-cameroon-blue-500">
            <ArrowLeft className="h-4 w-4 mr-2" /> 
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
