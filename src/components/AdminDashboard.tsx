import React, { useState } from 'react';
import { 
  BarChart3, Users, Calendar, MapPin, Plus, Edit2, Trash2, Eye, 
  TrendingUp, DollarSign, Star, Settings, Upload, Save 
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const stats = [
    { id: 1, name: 'Total Bookings', value: '2,847', change: '+12%', icon: Calendar, color: 'bg-blue-500' },
    { id: 2, name: 'Revenue', value: '$1,254,890', change: '+8%', icon: DollarSign, color: 'bg-green-500' },
    { id: 3, name: 'Active Users', value: '18,239', change: '+15%', icon: Users, color: 'bg-purple-500' },
    { id: 4, name: 'Destinations', value: '156', change: '+3%', icon: MapPin, color: 'bg-orange-500' },
  ];

  const recentBookings = [
    { id: 1, customer: 'John Doe', destination: 'Mount Cameroon', date: '2024-01-15', amount: '$450', status: 'confirmed' },
    { id: 2, customer: 'Jane Smith', destination: 'Kribi Beach', date: '2024-01-14', amount: '$280', status: 'pending' },
    { id: 3, customer: 'Mike Johnson', destination: 'Waza Park', date: '2024-01-13', amount: '$380', status: 'confirmed' },
    { id: 4, customer: 'Sarah Wilson', destination: 'Ring Road', date: '2024-01-12', amount: '$650', status: 'confirmed' },
  ];

  const destinations = [
    { id: 1, name: 'Mount Cameroon', category: 'Mountain', bookings: 234, rating: 4.8, status: 'active' },
    { id: 2, name: 'Kribi Beach', category: 'Beach', bookings: 189, rating: 4.9, status: 'active' },
    { id: 3, name: 'Waza National Park', category: 'Wildlife', bookings: 156, rating: 4.7, status: 'active' },
    { id: 4, name: 'Foumban Palace', category: 'Culture', bookings: 98, rating: 4.6, status: 'inactive' },
  ];

  const events = [
    { id: 1, name: 'Ngondo Festival', date: '2024-12-15', location: 'Douala', attendees: 5000, status: 'upcoming' },
    { id: 2, name: 'Jazz Safari', date: '2024-11-20', location: 'Yaoundé', attendees: 2000, status: 'upcoming' },
    { id: 3, name: 'Mount Race', date: '2024-02-10', location: 'Buea', attendees: 500, status: 'completed' },
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'destinations', name: 'Destinations', icon: MapPin },
    { id: 'events', name: 'Events', icon: Calendar },
    { id: 'bookings', name: 'Bookings', icon: Users },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const openModal = (type: string) => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-800 shadow-lg min-h-screen">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">
              Admin Panel
            </h2>
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Dashboard Overview
                </h1>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Last updated: {new Date().toLocaleString()}
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.id}
                      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                    >
                      <div className="flex items-center">
                        <div className={`p-3 rounded-full ${stat.color} mr-4`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{stat.name}</p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                          <p className="text-sm text-green-500 flex items-center">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            {stat.change}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Recent Bookings */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Recent Bookings
                  </h2>
                  <button className="text-green-600 hover:text-green-700 font-medium">
                    View All
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">Customer</th>
                        <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">Destination</th>
                        <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">Date</th>
                        <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">Amount</th>
                        <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentBookings.map((booking) => (
                        <tr key={booking.id} className="border-b border-gray-100 dark:border-gray-700">
                          <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">
                            {booking.customer}
                          </td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                            {booking.destination}
                          </td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                            {booking.date}
                          </td>
                          <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">
                            {booking.amount}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                booking.status === 'confirmed'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {booking.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Destinations Tab */}
          {activeTab === 'destinations' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Destinations Management
                </h1>
                <button
                  onClick={() => openModal('destination')}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 
                           text-white rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 
                           transform hover:scale-105 transition-all duration-300"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Destination</span>
                </button>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-400 font-medium">Name</th>
                        <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-400 font-medium">Category</th>
                        <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-400 font-medium">Bookings</th>
                        <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-400 font-medium">Rating</th>
                        <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-400 font-medium">Status</th>
                        <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-400 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {destinations.map((destination) => (
                        <tr key={destination.id} className="border-b border-gray-200 dark:border-gray-700">
                          <td className="py-4 px-6 text-gray-900 dark:text-white font-medium">
                            {destination.name}
                          </td>
                          <td className="py-4 px-6 text-gray-600 dark:text-gray-400">
                            {destination.category}
                          </td>
                          <td className="py-4 px-6 text-gray-900 dark:text-white">
                            {destination.bookings}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 mr-1 fill-current" />
                              <span className="text-gray-900 dark:text-white">{destination.rating}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                destination.status === 'active'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {destination.status}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-2">
                              <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors">
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Events Tab */}
          {activeTab === 'events' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Events Management
                </h1>
                <button
                  onClick={() => openModal('event')}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 
                           text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 
                           transform hover:scale-105 transition-all duration-300"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Event</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {event.name}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          event.status === 'upcoming'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {event.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Users className="w-4 h-4 mr-2" />
                        <span>{event.attendees.toLocaleString()} attendees</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                                       transition-colors font-medium">
                        Edit
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Bookings Management
                </h1>
                <div className="flex items-center space-x-4">
                  <select className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 
                                   rounded-lg text-gray-700 dark:text-gray-300">
                    <option>All Statuses</option>
                    <option>Confirmed</option>
                    <option>Pending</option>
                    <option>Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-400 font-medium">ID</th>
                        <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-400 font-medium">Customer</th>
                        <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-400 font-medium">Service</th>
                        <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-400 font-medium">Date</th>
                        <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-400 font-medium">Amount</th>
                        <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-400 font-medium">Status</th>
                        <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-400 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentBookings.map((booking) => (
                        <tr key={booking.id} className="border-b border-gray-200 dark:border-gray-700">
                          <td className="py-4 px-6 text-gray-900 dark:text-white font-medium">
                            #{booking.id.toString().padStart(4, '0')}
                          </td>
                          <td className="py-4 px-6 text-gray-900 dark:text-white">
                            {booking.customer}
                          </td>
                          <td className="py-4 px-6 text-gray-600 dark:text-gray-400">
                            {booking.destination}
                          </td>
                          <td className="py-4 px-6 text-gray-600 dark:text-gray-400">
                            {booking.date}
                          </td>
                          <td className="py-4 px-6 text-gray-900 dark:text-white font-medium">
                            {booking.amount}
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                booking.status === 'confirmed'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {booking.status}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-2">
                              <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors">
                                <Edit2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                System Settings
              </h1>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* General Settings */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    General Settings
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Site Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Voyage Tour"
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                                 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        defaultValue="admin@voyagetour.cm"
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                                 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Default Currency
                      </label>
                      <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                        <option value="USD">USD - US Dollar</option>
                        <option value="XAF">XAF - Central African Franc</option>
                        <option value="EUR">EUR - Euro</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Payment Settings */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Payment Settings
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 dark:text-gray-300">Credit Cards</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                                      peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full 
                                      peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
                                      after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full 
                                      after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 dark:text-gray-300">Mobile Money</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                                      peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full 
                                      peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
                                      after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full 
                                      after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 dark:text-gray-300">PayPal</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                                      peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full 
                                      peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
                                      after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full 
                                      after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 
                                 text-white rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 
                                 transform hover:scale-105 transition-all duration-300">
                  <Save className="w-5 h-5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Add New {modalType === 'destination' ? 'Destination' : 'Event'}
              </h3>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder={`Enter ${modalType} name`}
                />
              </div>

              {modalType === 'destination' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option>Mountain</option>
                    <option>Beach</option>
                    <option>Wildlife</option>
                    <option>Culture</option>
                  </select>
                </div>
              )}

              {modalType === 'event' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Image Upload
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Click to upload or drag and drop
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 
                           rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white 
                           rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 
                           transition-all duration-300"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;