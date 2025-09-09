import React, { useState } from 'react';
import { Plane, Hotel, Car, Calendar, Users, CreditCard, Smartphone, CheckCircle } from 'lucide-react';

const BookingSection = () => {
  const [activeBooking, setActiveBooking] = useState('flights');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [bookingStep, setBookingStep] = useState(1);

  const bookingTypes = [
    { id: 'flights', name: 'Flights', icon: Plane, color: 'from-blue-500 to-indigo-500' },
    { id: 'hotels', name: 'Hotels', icon: Hotel, color: 'from-green-500 to-teal-500' },
    { id: 'cars', name: 'Car Rental', icon: Car, color: 'from-purple-500 to-pink-500' }
  ];

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, Amex' },
    { id: 'mobile', name: 'Mobile Money', icon: Smartphone, description: 'Orange Money, MTN MoMo' },
    { id: 'paypal', name: 'PayPal', icon: CheckCircle, description: 'International payments' }
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingStep < 3) {
      setBookingStep(bookingStep + 1);
    } else {
      // Process booking
      alert('Booking confirmed! You will receive an email confirmation shortly.');
      setBookingStep(1);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Book Your Journey
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Seamless booking experience for flights, hotels, and car rentals with multiple payment options
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Booking Type Selector */}
          <div className="flex flex-wrap justify-center mb-8">
            {bookingTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setActiveBooking(type.id)}
                  className={`flex items-center space-x-2 px-6 py-3 mx-2 mb-4 rounded-full font-medium 
                             transition-all duration-300 ${
                    activeBooking === type.id
                      ? `bg-gradient-to-r ${type.color} text-white shadow-lg transform scale-105`
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{type.name}</span>
                </button>
              );
            })}
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      bookingStep >= step
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                    }`}
                  >
                    {bookingStep > step ? <CheckCircle className="w-6 h-6" /> : step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-16 h-1 mx-2 ${
                        bookingStep > step ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <form onSubmit={handleBookingSubmit}>
              {bookingStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    {activeBooking === 'flights' && 'Flight Details'}
                    {activeBooking === 'hotels' && 'Hotel Booking'}
                    {activeBooking === 'cars' && 'Car Rental'}
                  </h3>

                  {/* Flight Form */}
                  {activeBooking === 'flights' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          From
                        </label>
                        <input
                          type="text"
                          placeholder="Departure city"
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                                   focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          To
                        </label>
                        <input
                          type="text"
                          placeholder="Destination city"
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                                   focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Departure Date
                        </label>
                        <input
                          type="date"
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                                   focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Passengers
                        </label>
                        <select
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                                   focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option>1 Adult</option>
                          <option>2 Adults</option>
                          <option>3 Adults</option>
                          <option>4+ Adults</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Hotel Form */}
                  {activeBooking === 'hotels' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Destination
                        </label>
                        <input
                          type="text"
                          placeholder="City or hotel name"
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                                   focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Check-in Date
                        </label>
                        <input
                          type="date"
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                                   focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Check-out Date
                        </label>
                        <input
                          type="date"
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                                   focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Guests & Rooms
                        </label>
                        <select
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                                   focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option>1 Room, 2 Guests</option>
                          <option>1 Room, 4 Guests</option>
                          <option>2 Rooms, 4 Guests</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Car Rental Form */}
                  {activeBooking === 'cars' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Pick-up Location
                        </label>
                        <input
                          type="text"
                          placeholder="City or airport"
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                                   focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Pick-up Date
                        </label>
                        <input
                          type="date"
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                                   focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Return Date
                        </label>
                        <input
                          type="date"
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                                   focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Car Type
                        </label>
                        <select
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                                   focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option>Economy</option>
                          <option>Compact</option>
                          <option>Mid-size</option>
                          <option>SUV</option>
                          <option>Luxury</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {bookingStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Payment Method
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      return (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setPaymentMethod(method.id)}
                          className={`p-6 border-2 rounded-lg transition-all duration-300 ${
                            paymentMethod === method.id
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                          }`}
                        >
                          <Icon className="w-8 h-8 mx-auto mb-3 text-gray-600 dark:text-gray-400" />
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                            {method.name}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {method.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="mt-6 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'mobile' && (
                    <div className="mt-6 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Mobile Money Provider
                        </label>
                        <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                          <option>Orange Money</option>
                          <option>MTN Mobile Money</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="+237 XXX XXX XXX"
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {bookingStep === 3 && (
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Booking Confirmation
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Review your booking details before confirming
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-left">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Booking Summary</h4>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex justify-between">
                        <span>Service:</span>
                        <span className="font-medium capitalize">{activeBooking}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Payment Method:</span>
                        <span className="font-medium">
                          {paymentMethods.find(m => m.id === paymentMethod)?.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total:</span>
                        <span className="font-bold text-green-600">$450.00</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between mt-8">
                {bookingStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setBookingStep(bookingStep - 1)}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 
                             rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Back
                  </button>
                )}
                
                <button
                  type="submit"
                  className="ml-auto px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white 
                           rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 
                           transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  {bookingStep === 3 ? 'Confirm Booking' : 'Continue'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;