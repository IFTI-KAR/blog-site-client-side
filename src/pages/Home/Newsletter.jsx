import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { FaEnvelopeOpenText } from 'react-icons/fa';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() === '') {
      toast.error('Please enter a valid email');
      return;
    }

    toast.success('Thank you for subscribing to our newsletter!');
    setEmail('');
  };

  return (
    <div className="bg-gray-100 py-12 px-4 lg:px-16 text-center">
      <Toaster position="top-right" />
      
      <div className="max-w-2xl mx-auto">
        <FaEnvelopeOpenText className="text-4xl text-indigo-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-2">Subscribe to Our Newsletter</h2>
        <p className="text-gray-600 mb-6">
          Stay updated with the latest blog posts, writing tips, and community news.
        </p>

        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-80"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
