import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import {
  FaPenNib,
  FaImage,
  FaTags,
  FaRegStickyNote,
  FaAlignLeft
} from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext/AuthContext';

const AddBlog = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: '',
    image: '',
    category: '',
    shortDesc: '',
    longDesc: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blogWithUser = {
      ...formData,
      email: user?.email || 'anonymous',
      createdAt: new Date().toISOString()
    };

    try {
      const res = await fetch('https://blog-server-five-alpha.vercel.app/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogWithUser)
      });

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Blog submitted successfully!',
          showConfirmButton: false,
          timer: 2000
        });

        setFormData({
          title: '',
          image: '',
          category: '',
          shortDesc: '',
          longDesc: ''
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to submit blog',
          showConfirmButton: false,
          timer: 2000
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Server error',
        showConfirmButton: false,
        timer: 2000
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background Animation */}
      <motion.div
        animate={{ x: [0, 100, -100, 0], y: [0, 100, -100, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 opacity-30 blur-2xl z-0"
      />

      {/* Form Card */}
      <div className="relative z-10 max-w-2xl w-full bg-white/90 backdrop-blur-md shadow-xl p-8 rounded-xl border border-white">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6 flex items-center justify-center gap-2">
          <FaPenNib /> Submit a New Blog
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center gap-2">
            <FaPenNib className="text-blue-500" />
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Blog Title"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <FaImage className="text-blue-500" />
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <FaTags className="text-blue-500" />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Category</option>
              <option value="Technology">Technology</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Education">Education</option>
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
            </select>
          </div>

          <div className="flex items-start gap-2">
            <FaRegStickyNote className="text-blue-500 mt-2" />
            <textarea
              name="shortDesc"
              value={formData.shortDesc}
              onChange={handleChange}
              placeholder="Short Description"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={3}
              required
            />
          </div>

          <div className="flex items-start gap-2">
            <FaAlignLeft className="text-blue-500 mt-2" />
            <textarea
              name="longDesc"
              value={formData.longDesc}
              onChange={handleChange}
              placeholder="Long Description"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={5}
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Submit Blog
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default AddBlog;
