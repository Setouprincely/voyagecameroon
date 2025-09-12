import React, { useState } from 'react';
import { CreditCard, Smartphone, CheckCircle, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { processPayment, PaymentData } from '../services/paymentService';

interface PaymentProcessorProps {
  amount: number;
  currency?: string;
  description?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const PaymentProcessor: React.FC<PaymentProcessorProps> = ({
  amount,
  currency = 'USD',
  description = 'Tour Booking',
  onSuccess,
  onCancel
}) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [cardName, setCardName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const paymentMethods = [
    { 
      id: 'card', 
      name: 'Credit/Debit Card', 
      icon: CreditCard, 
      description: 'Pay securely with Visa, Mastercard, or other cards' 
    },
    { 
      id: 'mtn', 
      name: 'MTN Mobile Money', 
      icon: Smartphone, 
      description: 'Pay with your MTN Mobile Money account' 
    },
    { 
      id: 'orange', 
      name: 'Orange Money', 
      icon: Smartphone, 
      description: 'Pay using Orange Money mobile payment' 
    },
    { 
      id: 'paypal', 
      name: 'PayPal', 
      icon: CheckCircle, 
      description: 'Pay securely through PayPal' 
    }
  ];

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '');
    const formatted = input.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '');
    if (input.length > 4) return;
    
    if (input.length > 2) {
      setCardExpiry(`${input.substring(0, 2)}/${input.substring(2)}`);
    } else {
      setCardExpiry(input);
    }
  };

  const handleCVCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '');
    if (input.length > 3) return;
    setCardCVC(input);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === 'card' && (!cardNumber || !cardExpiry || !cardCVC || !cardName)) {
      toast.error('Please fill in all card details');
      return;
    }
    
    if ((paymentMethod === 'mtn' || paymentMethod === 'orange') && !mobileNumber) {
      toast.error('Please enter your mobile number');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Prepare payment data based on the selected payment method
      const paymentData: PaymentData = {
        amount,
        currency,
        paymentMethod,
        description: description || 'Voyage Cameroon Payment'
      };
      
      // Add method-specific details
      if (paymentMethod === 'card') {
        paymentData.cardDetails = {
          cardNumber,
          cardExpiry,
          cardName
        };
      } else if (paymentMethod === 'mtn' || paymentMethod === 'orange') {
        paymentData.mobileDetails = {
          mobileNumber,
          provider: paymentMethod
        };
      } else if (paymentMethod === 'paypal') {
        paymentData.paypalDetails = {
          paypalEmail: '' // Would be filled by PayPal after redirect
        };
      }
      
      // Process the payment using our payment service
      const result = await processPayment(paymentData);
      
      if (result.success) {
        setIsProcessing(false);
        toast.success('Payment processed successfully!');
        if (onSuccess) onSuccess();
      } else {
        throw new Error('Payment processing failed');
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      setIsProcessing(false);
      toast.error('Payment failed. Please try again or use a different payment method.');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Payment Details
      </h2>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <p className="text-gray-500 dark:text-gray-400">Amount:</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)}
          </p>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
            Select Payment Method
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div
                  key={method.id}
                  className={`border rounded-xl p-4 cursor-pointer transition-all ${
                    paymentMethod === method.id
                      ? 'border-cameroon-green-500 bg-cameroon-green-50 dark:bg-cameroon-green-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-cameroon-green-300'
                  }`}
                  onClick={() => setPaymentMethod(method.id)}
                >
                  <div className="flex items-center">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center mr-3
                      ${paymentMethod === method.id 
                        ? 'bg-cameroon-green-500 text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}
                    `}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{method.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{method.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          {paymentMethod === 'card' && (
            <div className="space-y-4">
              <div>
                <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Cardholder Name
                </label>
                <input
                  id="cardName"
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl 
                           bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  placeholder="John Smith"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    id="cardNumber"
                    type="text"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl 
                             bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="flex space-x-1">
                      <img src="https://www.svgrepo.com/show/328132/visa.svg" alt="Visa" className="h-6" />
                      <img src="https://www.svgrepo.com/show/328127/mastercard.svg" alt="MasterCard" className="h-6" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Expiration Date
                  </label>
                  <input
                    id="cardExpiry"
                    type="text"
                    value={cardExpiry}
                    onChange={handleExpiryChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl 
                             bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="cardCVC" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    CVC/CVV
                  </label>
                  <input
                    id="cardCVC"
                    type="text"
                    value={cardCVC}
                    onChange={handleCVCChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl 
                             bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    placeholder="123"
                    maxLength={3}
                    required
                  />
                </div>
              </div>
            </div>
          )}
          
          {(paymentMethod === 'mtn' || paymentMethod === 'orange') && (
            <div className="space-y-4">
              <div>
                <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Mobile Number
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 
                                 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-500 
                                 dark:text-gray-400 rounded-l-xl">
                    +237
                  </span>
                  <input
                    id="mobileNumber"
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').substring(0, 9))}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-r-xl 
                             bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    placeholder="6XXXXXXXX"
                    required
                  />
                </div>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-500 dark:text-yellow-400">
                      You will receive a prompt on your phone to complete the payment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {paymentMethod === 'paypal' && (
            <div className="text-center py-8">
              <img 
                src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/checkout-logo-large.png" 
                alt="PayPal Checkout" 
                className="h-12 mx-auto mb-4"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                You will be redirected to PayPal to complete your payment securely.
              </p>
            </div>
          )}
          
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 
                       dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700
                       transition-colors"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={isProcessing}
              className="px-6 py-2 bg-cameroon-gradient hover:bg-gradient-to-br text-white rounded-xl 
                       shadow-md hover:shadow-lg transition-all transform hover:scale-[1.02]
                       disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                `Pay ${new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)}`
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentProcessor;
