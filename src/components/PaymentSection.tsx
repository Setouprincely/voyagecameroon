import React from 'react';
import { CreditCard, Smartphone, DollarSign } from 'lucide-react';
import { Destination } from '../data/destinations';

interface PaymentSectionProps {
  destination: Destination;
  bookingDetails: {
    tourDate: string;
    guests: number;
    fullName: string;
    email: string;
    phone: string;
    specialRequirements: string;
    paymentMethod: string;
  };
  setBookingDetails: React.Dispatch<React.SetStateAction<{
    tourDate: string;
    guests: number;
    fullName: string;
    email: string;
    phone: string;
    specialRequirements: string;
    paymentMethod: string;
  }>>;
}

const PaymentSection: React.FC<PaymentSectionProps> = ({ destination, bookingDetails, setBookingDetails }) => {
  const handlePaymentMethodChange = (method: string) => {
    setBookingDetails(prev => ({
      ...prev,
      paymentMethod: method
    }));
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Select Payment Method
        </label>
        
        <div className="space-y-3">
          {/* Credit Card Option */}
          <div
            className={`flex items-center border ${
              bookingDetails.paymentMethod === 'card'
                ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-700'
            } rounded-lg p-3 cursor-pointer`}
            onClick={() => handlePaymentMethodChange('card')}
          >
            <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
              bookingDetails.paymentMethod === 'card'
                ? 'bg-blue-600'
                : 'border border-gray-400 dark:border-gray-600'
            }`}>
              {bookingDetails.paymentMethod === 'card' && (
                <div className="w-2 h-2 bg-white rounded-full"></div>
              )}
            </div>
            
            <div className="flex-shrink-0 mr-3">
              <CreditCard size={24} className={bookingDetails.paymentMethod === 'card' ? 'text-blue-600' : 'text-gray-500'} />
            </div>
            
            <div className="flex-grow">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">Credit/Debit Card</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">Visa, MasterCard, American Express</p>
            </div>
          </div>
          
          {/* Mobile Money Option */}
          <div
            className={`flex items-center border ${
              bookingDetails.paymentMethod === 'mobile'
                ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-700'
            } rounded-lg p-3 cursor-pointer`}
            onClick={() => handlePaymentMethodChange('mobile')}
          >
            <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
              bookingDetails.paymentMethod === 'mobile'
                ? 'bg-blue-600'
                : 'border border-gray-400 dark:border-gray-600'
            }`}>
              {bookingDetails.paymentMethod === 'mobile' && (
                <div className="w-2 h-2 bg-white rounded-full"></div>
              )}
            </div>
            
            <div className="flex-shrink-0 mr-3">
              <Smartphone size={24} className={bookingDetails.paymentMethod === 'mobile' ? 'text-blue-600' : 'text-gray-500'} />
            </div>
            
            <div className="flex-grow">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">Mobile Money</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">MTN MoMo, Orange Money</p>
            </div>
          </div>
          
          {/* PayPal Option */}
          <div
            className={`flex items-center border ${
              bookingDetails.paymentMethod === 'paypal'
                ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-700'
            } rounded-lg p-3 cursor-pointer`}
            onClick={() => handlePaymentMethodChange('paypal')}
          >
            <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
              bookingDetails.paymentMethod === 'paypal'
                ? 'bg-blue-600'
                : 'border border-gray-400 dark:border-gray-600'
            }`}>
              {bookingDetails.paymentMethod === 'paypal' && (
                <div className="w-2 h-2 bg-white rounded-full"></div>
              )}
            </div>
            
            <div className="flex-shrink-0 mr-3">
              <DollarSign size={24} className={bookingDetails.paymentMethod === 'paypal' ? 'text-blue-600' : 'text-gray-500'} />
            </div>
            
            <div className="flex-grow">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">PayPal</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">Safe international payments</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Payment Details Form */}
      {bookingDetails.paymentMethod === 'card' && (
        <div className="space-y-3 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Card Number
            </label>
            <input
              type="text"
              placeholder="•••• •••• •••• ••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Expiration Date
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                CVC
              </label>
              <input
                type="text"
                placeholder="•••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cardholder Name
            </label>
            <input
              type="text"
              placeholder="Name on card"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>
      )}
      
      {bookingDetails.paymentMethod === 'mobile' && (
        <div className="space-y-3 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Select Provider
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="mtn">MTN Mobile Money</option>
              <option value="orange">Orange Money</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Mobile Money Number
            </label>
            <input
              type="tel"
              placeholder="+237 ..."
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>
      )}
      
      {bookingDetails.paymentMethod === 'paypal' && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            You will be redirected to PayPal to complete your payment securely.
          </p>
          <img 
            src="https://www.paypalobjects.com/digitalassets/c/website/marketing/na/us/logo-center/9_bdg_secured_by_pp_2line.png" 
            alt="PayPal"
            className="h-10 mx-auto"
          />
        </div>
      )}
      
      <div className="flex items-center mt-4">
        <input
          id="terms"
          type="checkbox"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label htmlFor="terms" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
          I agree to the <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a>
        </label>
      </div>
    </div>
  );
};

export default PaymentSection;
