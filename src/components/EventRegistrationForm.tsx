import React, { useState } from 'react';
import { Calendar, Mail, User, Users, Phone } from 'lucide-react';
import { Event } from '../data/events';
import toast from 'react-hot-toast';
import { saveEventRegistration } from '../services/eventService';

interface EventRegistrationFormProps {
  event: Event;
  onClose: () => void;
}

const EventRegistrationForm: React.FC<EventRegistrationFormProps> = ({ event, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    numberOfTickets: 1,
    specialRequirements: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Save registration using the event service
      await saveEventRegistration({
        eventId: event.id,
        eventName: event.name,
        ...formData,
        totalPrice: parseInt(event.price.replace(/[^\d]/g, '')) * formData.numberOfTickets
      });
      
      toast.success('Registration successful! Check your email for confirmation details.', {
        duration: 5000,
        position: 'top-center',
      });
      
      onClose();
    } catch (error) {
      console.error("Error saving event registration:", error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Format date for display
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Calculate total price
  const totalPrice = parseInt(event.price.replace(/[^\d]/g, '')) * formData.numberOfTickets;
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
        <div className="flex items-center mb-2">
          <Calendar size={18} className="text-gray-500 mr-2" />
          <span className="text-sm text-gray-600 dark:text-gray-300">{formattedDate}, {event.time}</span>
        </div>
        <div className="font-medium text-gray-900 dark:text-white">{event.name}</div>
        <div className="text-sm text-gray-600 dark:text-gray-300">{event.location}, Cameroon</div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Full Name
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User size={16} className="text-gray-500" />
          </div>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
            className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail size={16} className="text-gray-500" />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Phone Number
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Phone size={16} className="text-gray-500" />
          </div>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Number of Tickets
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Users size={16} className="text-gray-500" />
          </div>
          <select
            name="numberOfTickets"
            value={formData.numberOfTickets}
            onChange={handleInputChange}
            required
            className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {[...Array(10)].map((_, i) => (
              <option key={i} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Special Requirements (Optional)
        </label>
        <textarea
          name="specialRequirements"
          value={formData.specialRequirements}
          onChange={handleInputChange}
          rows={3}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        ></textarea>
      </div>
      
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600 dark:text-gray-400">Ticket Price:</span>
          <span className="text-gray-900 dark:text-white">{event.price} × {formData.numberOfTickets}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span className="text-gray-900 dark:text-white">Total:</span>
          <span className="text-blue-600">{totalPrice.toLocaleString()} CFA</span>
        </div>
      </div>
      
      <div className="flex items-center">
        <input
          id="terms"
          type="checkbox"
          required
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label htmlFor="terms" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
          I agree to the <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a>
        </label>
      </div>
      
      <div className="flex gap-3 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="w-1/2 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Processing...
            </div>
          ) : (
            'Complete Registration'
          )}
        </button>
      </div>
    </form>
  );
};

export default EventRegistrationForm;
