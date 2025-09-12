import React, { useState, useEffect } from 'react';
import { User, Settings, CreditCard, Package, Star, Calendar, LogOut } from 'lucide-react';
import { useAuth } from '../../context/useAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const UserDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  // Mock data for bookings
  const bookings = [
    {
      id: 'BK1234',
      type: 'Hotel',
      name: 'Hilton Yaoundé',
      date: '2025-10-15',
      status: 'Confirmed',
      price: '$250'
    },
    {
      id: 'BK5678',
      type: 'Tour',
      name: 'Mount Cameroon Hike',
      date: '2025-11-05',
      status: 'Pending',
      price: '$120'
    },
    {
      id: 'BK9012',
      type: 'Event',
      name: 'Limbe Festival of Arts',
      date: '2025-09-25',
      status: 'Confirmed',
      price: '$45'
    }
  ];
  
  // Mock data for reviews
  const reviews = [
    {
      id: 'RV123',
      place: 'Kribi Beach',
      rating: 5,
      comment: 'Amazing beach with pristine waters',
      date: '2025-08-15'
    },
    {
      id: 'RV456',
      place: 'Waza National Park',
      rating: 4,
      comment: 'Great wildlife experience, saw many animals',
      date: '2025-07-22'
    }
  ];
  
  // Mock data for upcoming events
  const upcomingEvents = [
    {
      id: 'EV123',
      name: 'Ngondo Festival',
      location: 'Douala',
      date: '2025-12-01',
      registered: true
    },
    {
      id: 'EV456',
      name: 'Nyem-Nyem Festival',
      location: 'Bamenda',
      date: '2025-11-20',
      registered: false
    }
  ];

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Successfully logged out');
      navigate('/');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };
  
  // If no user is logged in, redirect to login page
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);
  
  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'bookings', label: 'My Bookings', icon: Package },
    { id: 'reviews', label: 'My Reviews', icon: Star },
    { id: 'events', label: 'Upcoming Events', icon: Calendar },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-24 h-24 rounded-full bg-cameroon-gradient flex items-center justify-center text-white text-3xl font-bold mb-4">
                  {currentUser.photoURL ? (
                    <img 
                      src={currentUser.photoURL} 
                      alt={currentUser.displayName || 'User'} 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span>{currentUser.displayName?.charAt(0) || currentUser.email?.charAt(0)}</span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {currentUser.displayName || 'User'}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">{currentUser.email}</p>
              </div>
              
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center p-3 rounded-xl transition-all ${
                        activeTab === tab.id
                          ? 'bg-cameroon-gradient text-white'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center p-3 rounded-xl transition-all text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Profile Information</h2>
                  
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                        <input
                          type="text"
                          id="fullName"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl 
                                    bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                          defaultValue={currentUser.displayName || ''}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl 
                                    bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                          defaultValue={currentUser.email || ''}
                          disabled
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl 
                                    bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                          placeholder="+237"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nationality</label>
                        <input
                          type="text"
                          id="nationality"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl 
                                    bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
                      <textarea
                        id="bio"
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl 
                                  bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                        placeholder="Tell us about yourself..."
                      ></textarea>
                    </div>
                    
                    <div>
                      <button
                        type="button"
                        className="px-6 py-3 bg-cameroon-gradient hover:bg-gradient-to-br text-white rounded-xl 
                                  shadow-md hover:shadow-lg transition-all transform hover:scale-[1.02]"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Bookings Tab */}
              {activeTab === 'bookings' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Bookings</h2>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Booking ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {bookings.map((booking) => (
                          <tr key={booking.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{booking.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{booking.type}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{booking.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{booking.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                booking.status === 'Confirmed' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                              }`}>
                                {booking.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{booking.price}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button className="text-cameroon-blue-600 hover:text-cameroon-blue-900 mr-3">View</button>
                              <button className="text-red-600 hover:text-red-900">Cancel</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Reviews</h2>
                  
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{review.place}</h3>
                            <div className="flex items-center mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                                />
                              ))}
                              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                                {review.date}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <button className="p-2 text-cameroon-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                              </svg>
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                      </div>
                    ))}
                    
                    <button className="px-4 py-2 bg-cameroon-gradient hover:bg-gradient-to-br text-white rounded-lg 
                                       shadow-md hover:shadow-lg transition-all transform hover:scale-[1.02]">
                      Write New Review
                    </button>
                  </div>
                </div>
              )}
              
              {/* Events Tab */}
              {activeTab === 'events' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Upcoming Events</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{event.name}</h3>
                          {event.registered && (
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              Registered
                            </span>
                          )}
                        </div>
                        
                        <p className="text-gray-500 dark:text-gray-400">{event.location}</p>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">Date: {event.date}</p>
                        
                        {!event.registered ? (
                          <button className="px-4 py-2 bg-cameroon-gradient hover:bg-gradient-to-br text-white rounded-lg 
                                           shadow-md hover:shadow-lg transition-all transform hover:scale-[1.02]">
                            Register Now
                          </button>
                        ) : (
                          <button className="px-4 py-2 border border-cameroon-green-500 text-cameroon-green-600 
                                           dark:border-cameroon-green-400 dark:text-cameroon-green-400 rounded-lg 
                                           hover:bg-cameroon-green-50 dark:hover:bg-cameroon-green-900/20">
                            View Details
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Payment Methods Tab */}
              {activeTab === 'payment' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Payment Methods</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="bg-blue-500 rounded-lg p-2 mr-4">
                          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                            <path d="M3 10H21V14H3V10Z" fill="currentColor"/>
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">VISA ending in 1234</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Expires 09/2027</p>
                        </div>
                      </div>
                      <div>
                        <button className="text-cameroon-blue-600 hover:text-cameroon-blue-900 mr-4">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="bg-yellow-500 rounded-lg p-2 mr-4">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">MTN Mobile Money</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">+237 6XX XXX XXX</p>
                        </div>
                      </div>
                      <div>
                        <button className="text-cameroon-blue-600 hover:text-cameroon-blue-900 mr-4">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </div>
                    </div>
                    
                    <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 
                                     dark:text-gray-300 rounded-lg flex items-center hover:bg-gray-100 dark:hover:bg-gray-700">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                      Add New Payment Method
                    </button>
                  </div>
                </div>
              )}
              
              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Settings</h2>
                  
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Email Notifications</h3>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-700 dark:text-gray-300">Booking Confirmations</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Receive emails for new booking confirmations</p>
                        </div>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input type="checkbox" name="booking-confirmation" id="booking-confirmation" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" defaultChecked />
                          <label htmlFor="booking-confirmation" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-700 dark:text-gray-300">Special Offers</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Receive emails about special offers and discounts</p>
                        </div>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input type="checkbox" name="special-offers" id="special-offers" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                          <label htmlFor="special-offers" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-700 dark:text-gray-300">Trip Reminders</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Receive reminder emails before your scheduled trips</p>
                        </div>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input type="checkbox" name="trip-reminders" id="trip-reminders" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" defaultChecked />
                          <label htmlFor="trip-reminders" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Account Settings</h3>
                      
                      <button className="px-4 py-2 border border-cameroon-red-500 text-cameroon-red-600 
                                       dark:border-cameroon-red-400 dark:text-cameroon-red-400 rounded-lg 
                                       hover:bg-cameroon-red-50 dark:hover:bg-cameroon-red-900/20">
                        Change Password
                      </button>
                      
                      <button className="px-4 py-2 border border-red-500 text-red-600 
                                       dark:border-red-400 dark:text-red-400 rounded-lg 
                                       hover:bg-red-50 dark:hover:bg-red-900/20">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
