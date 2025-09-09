import React from 'react';
import { 
  Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, 
  Plane, Camera, Heart, Star, Award, Shield 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              Stay Updated on Cameroon's Best Adventures
            </h3>
            <p className="text-gray-400 mb-8">
              Get exclusive travel tips, destination guides, and special offers delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg 
                         text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-green-500 focus:border-transparent"
              />
              <button className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 
                               text-white rounded-lg font-semibold hover:from-green-600 
                               hover:to-blue-600 transform hover:scale-105 transition-all duration-300 
                               flex items-center justify-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>Subscribe</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">VT</span>
              </div>
              <h3 className="text-2xl font-bold">Voyage Tour</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Discover the beauty and diversity of Cameroon through our expertly curated travel experiences. 
              From majestic mountains to pristine beaches, we make your dream journey a reality.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-3 bg-gray-800 rounded-full hover:bg-green-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 bg-gray-800 rounded-full hover:bg-blue-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 bg-gray-800 rounded-full hover:bg-pink-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 bg-gray-800 rounded-full hover:bg-red-600 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                'About Us',
                'Destinations',
                'Tour Packages',
                'Cultural Experiences',
                'Travel Guide',
                'Safety Information',
                'Travel Insurance',
                'FAQ'
              ].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-green-400 transition-colors flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 opacity-70"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {[
                { name: 'Flight Booking', icon: Plane },
                { name: 'Hotel Reservations', icon: MapPin },
                { name: 'Cultural Tours', icon: Camera },
                { name: 'Safari Adventures', icon: Heart },
                { name: 'Mountain Trekking', icon: Star },
                { name: 'Beach Holidays', icon: Award },
                { name: 'Event Planning', icon: Shield }
              ].map((service) => {
                const Icon = service.icon;
                return (
                  <li key={service.name}>
                    <a href="#" className="text-gray-400 hover:text-green-400 transition-colors flex items-center">
                      <Icon className="w-4 h-4 mr-3 text-green-500" />
                      {service.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Headquarters</p>
                  <p className="text-gray-400">
                    Avenue du 20 Mai<br />
                    Yaoundé, Cameroon
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-green-500 mt-1" />
                <div>
                  <p className="text-white font-medium">Phone</p>
                  <p className="text-gray-400">+237 222 123 456</p>
                  <p className="text-gray-400">+237 677 890 123</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-green-500 mt-1" />
                <div>
                  <p className="text-white font-medium">Email</p>
                  <p className="text-gray-400">info@voyagetour.cm</p>
                  <p className="text-gray-400">support@voyagetour.cm</p>
                </div>
              </div>
              
              {/* Business Hours */}
              <div className="pt-4">
                <p className="text-white font-medium mb-2">Business Hours</p>
                <p className="text-gray-400 text-sm">
                  Monday - Friday: 8:00 AM - 6:00 PM<br />
                  Saturday: 9:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-gray-800 mt-16 pt-8">
          <div className="flex flex-wrap justify-center items-center space-x-8 mb-8">
            <div className="flex items-center space-x-2 text-gray-400">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="text-sm">Secure Payments</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <Award className="w-5 h-5 text-yellow-500" />
              <span className="text-sm">Award Winning Service</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="text-sm">Customer Satisfaction</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-sm">5-Star Rated</span>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Voyage Tour. All rights reserved. Made with ❤️ in Cameroon.
            </p>
            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-green-400 transition-colors">Cookie Policy</a>
              <a href="#" className="hover:text-green-400 transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;