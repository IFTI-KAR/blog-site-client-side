import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthCotext';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { FaEye, FaTrash } from 'react-icons/fa';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
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

const WishlistPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [wishlistBlogs, setWishlistBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = async () => {
    if (!user?.email) return;

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/wishlist/${user.email}`,{
        credentials:'include'
      });
      const data = await res.json();
      setWishlistBlogs(data);
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Failed to load wishlist', text: err.message });
    }
    setLoading(false);
  };

  const handleRemoveWishlist = async (blogId) => {
    const confirm = await Swal.fire({
      title: 'Remove from wishlist?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it',
      cancelButtonText: 'Cancel'
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`http://localhost:3000/wishlist/${user.email}/${blogId}`, {
        method: 'DELETE'
      });
      const result = await res.json();

      if (res.ok) {
        Swal.fire({ icon: 'success', title: 'Removed from wishlist', timer: 1500, showConfirmButton: false });
        fetchWishlist();
      } else {
        Swal.fire({ icon: 'error', title: result.message || 'Failed to remove' });
      }
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error removing from wishlist', text: err.message });
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user?.email]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-pink-600">My Wishlist</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading wishlist...</p>
      ) : wishlistBlogs.length === 0 ? (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {wishlistBlogs.map(blog => (
            <motion.div
              key={blog._id}
              className="bg-white rounded-lg shadow-md border border-pink-200 overflow-hidden flex flex-col"
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
            >
              <img src={blog.image} alt={blog.title} className="h-48 w-full object-cover" />
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold text-pink-700 mb-2">{blog.title}</h2>
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
                    className="bg-red-500 text-white px-3 py-2 rounded flex items-center gap-2"
                    onClick={() => handleRemoveWishlist(blog._id)}
                  >
                    <FaTrash /> Remove
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default WishlistPage;
