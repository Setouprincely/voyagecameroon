import React, { useState } from 'react';
import { Calendar, Mail, Users, Phone } from 'lucide-react';
import { Destination } from '../data/destinations';
import toast from 'react-hot-toast';
import PaymentSection from './PaymentSection';
import { saveBooking } from '../services/bookingService';

interface TourBookingFormProps {
  destination: Destination;
}

const TourBookingForm: React.FC<TourBookingFormProps> = ({ destination }) => {
  const [step, setStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState({
    tourDate: '',
    guests: 1,
    fullName: '',
    email: '',
    phone: '',
    specialRequirements: '',
    paymentMethod: 'card',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Save booking using the booking service
      await saveBooking({
        destinationId: destination.id,
        destinationName: destination.name,
        ...bookingDetails,
        totalPrice: parseInt(destination.price.replace(/[^\d]/g, '')) * bookingDetails.guests
      });
      
      // Show success notification
      toast.success('Booking confirmed! Check your email for confirmation details.', {
        duration: 5000,
        position: 'top-center',
      });
      
      // Reset form and go back to step 1
      setBookingDetails({
        tourDate: '',
        guests: 1,
        fullName: '',
        email: '',
        phone: '',
        specialRequirements: '',
        paymentMethod: 'card',
      });
      setStep(1);
      
    } catch (error) {
      console.error("Error saving booking:", error);
      toast.error('Booking failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div>
      <div className="flex mb-6">
        <div className={`flex-1 text-center py-2 ${step >= 1 ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>
          <span className={`inline-block w-8 h-8 rounded-full mb-1 ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'} flex items-center justify-center`}>1</span>
          <div className="text-xs">Details</div>
        </div>
        <div className={`flex-1 text-center py-2 ${step >= 2 ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>
          <span className={`inline-block w-8 h-8 rounded-full mb-1 ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'} flex items-center justify-center`}>2</span>
          <div className="text-xs">Contact</div>
        </div>
        <div className={`flex-1 text-center py-2 ${step >= 3 ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>
          <span className={`inline-block w-8 h-8 rounded-full mb-1 ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'} flex items-center justify-center`}>3</span>
          <div className="text-xs">Payment</div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* Step 1: Tour Details */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tour Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar size={16} className="text-gray-500" />
                </div>
                <input
                  type="date"
                  name="tourDate"
                  value={bookingDetails.tourDate}
                  onChange={handleInputChange}
                  required
                  className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Number of Guests
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Users size={16} className="text-gray-500" />
                </div>
                <select
                  name="guests"
                  value={bookingDetails.guests}
                  onChange={handleInputChange}
                  required
                  className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i} value={i + 1}>{i + 1} {i === 0 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Continue to Contact
            </button>
          </div>
        )}
        
        {/* Step 2: Contact Information */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={bookingDetails.fullName}
                onChange={handleInputChange}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
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
                  value={bookingDetails.email}
                  onChange={handleInputChange}
                  required
                  className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone size={16} className="text-gray-500" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={bookingDetails.phone}
                  onChange={handleInputChange}
                  required
                  className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Special Requirements (Optional)
              </label>
              <textarea
                name="specialRequirements"
                value={bookingDetails.specialRequirements}
                onChange={handleInputChange}
                rows={3}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              ></textarea>
            </div>
            
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/2 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        )}
        
        {/* Step 3: Payment */}
        {step === 3 && (
          <div className="space-y-4">
            <PaymentSection 
              destination={destination} 
              bookingDetails={bookingDetails}
              setBookingDetails={setBookingDetails}
            />
            
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-1/2 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                disabled={isSubmitting}
              >
                Back
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
                  'Confirm Booking'
                )}
              </button>
            </div>
          </div>
        )}
        
        {/* Confirmation Details */}
        {step === 3 && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">Booking Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Tour:</span>
                <span className="text-gray-800 dark:text-gray-200">{destination.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Date:</span>
                <span className="text-gray-800 dark:text-gray-200">{bookingDetails.tourDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Guests:</span>
                <span className="text-gray-800 dark:text-gray-200">{bookingDetails.guests}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Price:</span>
                <span className="text-gray-800 dark:text-gray-200">{destination.price} × {bookingDetails.guests}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                <span className="font-medium text-gray-800 dark:text-gray-200">Total:</span>
                <span className="font-bold text-blue-600">{(parseInt(destination.price.replace(/[^\d]/g, '')) * bookingDetails.guests).toLocaleString()} CFA</span>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default TourBookingForm;
