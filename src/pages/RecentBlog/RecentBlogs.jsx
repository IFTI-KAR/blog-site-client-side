import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { FaHeart, FaEye } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext/AuthCotext';
import bg from '../../assets/images/bg.jpg'; // Make sure this path is correct
import { useNavigate } from 'react-router'
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

const trimText = (text, maxWords = 20) => {
    const words = text.split(' ');
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(' ') + '...';
};

const RecentBlogs = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch('http://localhost:3000/blogs/recent')
            .then(res => res.json())
            .then(data => setBlogs(data));
    }, []);

    const handleWishlist = async (blogId) => {
        if (!user || !user.email) {
            Swal.fire({
                icon: 'warning',
                title: 'You must be logged in to add to wishlist!',
                showConfirmButton: false,
                timer: 2000
            });
            return;
        }

        const res = await fetch('http://localhost:3000/wishlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userEmail: user.email, blogId })
        });

        const data = await res.json();
        if (res.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Added to wishlist!',
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            Swal.fire({
                icon: 'info',
                title: data.message || 'Already in wishlist',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <div
            className="bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url(${bg})`,
                backgroundAttachment: 'fixed', // Optional for parallax effect
            }}
        >
            <div className="bg-white/80 backdrop-blur-sm">
                <motion.div
                    className="max-w-6xl mx-auto py-10 px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.h2
                        className="text-3xl font-bold mb-6 text-center text-blue-700"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        Recent Blogs
                    </motion.h2>

                    <motion.div
                        className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {blogs.map(blog => (
                            <motion.div
                                key={blog._id}
                                variants={cardVariants}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white rounded-lg shadow-md p-4 border border-blue-100 transition-all duration-300"
                            >
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-48 object-cover rounded"
                                />
                                <h3 className="text-xl font-semibold mt-4 text-blue-800">{blog.title}</h3>
                                <p className="text-gray-600 mt-2">{trimText(blog.shortDesc)}</p>
                                <div className="flex justify-between mt-4">
                                    <motion.button
                                            whileTap={{ scale: 0.95 }}
                                            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
                                            onClick={() => navigate(`/blogs/${blog._id}`)}
                                            >
                                            <FaEye /> Details
                                            </motion.button>
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-pink-500 text-white px-4 py-2 rounded flex items-center gap-2"
                                        onClick={() => handleWishlist(blog._id)}
                                    >
                                        <FaHeart /> Wishlist
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default RecentBlogs;
