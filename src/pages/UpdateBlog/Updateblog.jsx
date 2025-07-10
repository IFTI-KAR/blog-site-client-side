import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import {
  FaPenNib,
  FaImage,
  FaTags,
  FaRegStickyNote,
  FaAlignLeft
} from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext/AuthCotext';

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    category: '',
    shortDesc: '',
    longDesc: ''
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://localhost:3000/blogs/${id}`);
        const data = await res.json();
        if (res.ok) {
          setFormData({
            title: data.title || '',
            image: data.image || '',
            category: data.category || '',
            shortDesc: data.shortDesc || '',
            longDesc: data.longDesc || ''
          });
        } else {
          Swal.fire('Error', 'Blog not found', 'error');
          navigate('/blogs');
        }
      } catch (err) {
        Swal.fire('Error', 'Failed to fetch blog', 'error');
      }
    };
    fetchBlog();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/blogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        Swal.fire('Success', 'Blog updated successfully!', 'success');
        navigate(`/blogs/${id}`);
      } else {
        Swal.fire('Error', 'Failed to update blog', 'error');
      }
    } catch (err) {
      Swal.fire('Error', 'Server error', 'error');
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
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 opacity-20 blur-2xl z-0"
      />

      {/* Form */}
      <div className="relative z-10 max-w-2xl w-full bg-white/90 backdrop-blur-md shadow-xl p-8 rounded-xl border border-white">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6 flex items-center justify-center gap-2">
          <FaPenNib /> Update Blog
        </h2>

        <form onSubmit={handleUpdate} className="space-y-5">
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
            Update Blog
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default UpdateBlog;
