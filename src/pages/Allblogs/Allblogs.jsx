import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { FaHeart, FaEye } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { useNavigate } from 'react-router'
const categories = ['All', 'Technology', 'Lifestyle', 'Education', 'Travel', 'Food'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const trimText = (text, maxWords = 20) => {
  if (!text) return '';
  const words = text.split(' ');
  return words.length <= maxWords ? text : words.slice(0, maxWords).join(' ') + '...';
};

const AllBlogs = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      let url = 'https://blog-server-five-alpha.vercel.app/blogs?';
      if (searchTerm) url += `search=${encodeURIComponent(searchTerm)}&`;
      if (category && category !== 'All') url += `category=${encodeURIComponent(category)}&`;

      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch blogs');
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Failed to load blogs', text: error.message, timer: 2500, showConfirmButton: false });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, [searchTerm, category]);

  const handleWishlist = async (blogId) => {
    if (!user || !user.email) {
      Swal.fire({ icon: 'warning', title: 'You must be logged in to add to wishlist!', showConfirmButton: false, timer: 2000 });
      return;
    }
    try {
      const res = await fetch('https://blog-server-five-alpha.vercel.app/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail: user.email, blogId })
      });
      const data = await res.json();
      if (res.ok) {
        Swal.fire({ icon: 'success', title: 'Added to wishlist!', showConfirmButton: false, timer: 1500 });
      } else {
        Swal.fire({ icon: 'info', title: data.message || 'Already in wishlist', showConfirmButton: false, timer: 1500 });
      }
    } catch {
      Swal.fire({ icon: 'error', title: 'Failed to add to wishlist', timer: 2000, showConfirmButton: false });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-700">All Blogs</h1>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {loading && <p className="text-center text-gray-500">Loading blogs...</p>}
      {!loading && blogs.length === 0 && <p className="text-center text-gray-500">No blogs found.</p>}

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {blogs.map(blog => (
          <motion.div
            key={blog._id}
            className="bg-white rounded-lg shadow-md border border-blue-100 overflow-hidden flex flex-col"
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
          >
            <img src={blog.image} alt={blog.title} className="h-48 w-full object-cover" />
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-xl font-semibold text-blue-800 mb-2">{blog.title}</h2>
              <p className="text-gray-600 flex-grow">{trimText(blog.shortDesc)}</p>
              <p className="text-sm mt-2 font-medium text-indigo-600">Category: {blog.category}</p>
              <div className="mt-4 flex justify-between">
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 text-white px-3 py-2 rounded flex items-center gap-2"
                    onClick={() => navigate(`/blogs/${blog._id}`)}
                >
                    <FaEye /> Details
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="bg-pink-500 text-white px-3 py-2 rounded flex items-center gap-2"
                  onClick={() => handleWishlist(blog._id)}
                >
                  <FaHeart /> Wishlist
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AllBlogs;
