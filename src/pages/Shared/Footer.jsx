import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import logo from '../../assets/images/logo-white.png';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 text-sm">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand Info */}
        <div>
          <img src={logo} alt="Logo" className="h-10 mb-4" />
          <p className="text-gray-400">
            Your go-to space for inspiration, creativity, and daily doses of thoughtful writing.
          </p>
        </div>

        {/* Explore Links */}
        <div>
          <h4 className="uppercase text-white text-xs tracking-wider mb-4">Explore</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">Blog</a></li>
            <li><a href="#" className="hover:text-white">About</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="uppercase text-white text-xs tracking-wider mb-4">Categories</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">Lifestyle</a></li>
            <li><a href="#" className="hover:text-white">Photography</a></li>
            <li><a href="#" className="hover:text-white">Travel</a></li>
            <li><a href="#" className="hover:text-white">Food</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="uppercase text-white text-xs tracking-wider mb-4">Follow Me</h4>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-4 px-6 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} IFTI’s Blog. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
