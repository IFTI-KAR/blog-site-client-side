import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPenNib, FaUsers, FaBookOpen } from 'react-icons/fa';
import ban_1 from '../../assets/images/ban-1.webp';
import ban_2 from '../../assets/images/ban-2.png';
import ban_3 from '../../assets/images/ban-3.avif';
import ban_4 from '../../assets/images/blog-4.jpg';

const Banner = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative bg-gradient-to-r from-[#1e293b] to-[#0f172a] text-white min-h-[100vh] flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-16 overflow-hidden">

      {/* Cursor-following background animation */}
      <motion.div
        className="pointer-events-none absolute w-[1000px] h-[1000px] bg-indigo-500 rounded-full opacity-20 blur-3xl z-0"
        animate={{
          x: mousePosition.x - 500,
          y: mousePosition.y - 500,
        }}
        transition={{
          type: 'spring',
          stiffness: 20,
          damping: 20,
        }}
      />

      {/* TEXT CONTENT */}
      <div className="text-center lg:text-left max-w-3xl z-10 py-10">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl lg:text-6xl font-bold leading-tight mb-4"
        >
          Welcome to{' '}
          <motion.span
            animate={{ color: ['#0f03fe', '#ff00ff', '#00bdff'] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-indigo-400"
          >
            BLOGAR
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg lg:text-xl text-gray-300 mb-6"
        >
          Share your stories, thoughts, and experiences with the world. Join a community of writers and readers.
        </motion.p>

        <motion.a
          href="/blog"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="inline-block px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg shadow-lg transition"
        >
          Explore Blogs
        </motion.a>

        {/* Additional Features */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col items-center sm:items-start"
          >
            <FaPenNib className="text-indigo-400 text-3xl mb-2" />
            <h3 className="text-xl font-semibold">Write Freely</h3>
            <p className="text-gray-400 text-sm">Express your ideas, thoughts, and creativity with ease.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col items-center sm:items-start"
          >
            <FaUsers className="text-indigo-400 text-3xl mb-2" />
            <h3 className="text-xl font-semibold">Build Community</h3>
            <p className="text-gray-400 text-sm">Connect with readers and fellow writers from around the world.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col items-center sm:items-start"
          >
            <FaBookOpen className="text-indigo-400 text-3xl mb-2" />
            <h3 className="text-xl font-semibold">Read & Learn</h3>
            <p className="text-gray-400 text-sm">Explore diverse perspectives and gain insights from others.</p>
          </motion.div>
        </div>
      </div>

      {/* IMAGES */}
      <div className="relative w-[500px] lg:w-[700px] h-[500px] lg:h-[600px] z-10 mt-10 lg:mt-0">
        <motion.img
          src={ban_1}
          alt="ban_1"
          className="absolute w-[55%] left-[0%] top-[10%] rounded-2xl shadow-2xl z-10"
          animate={{ y: [0, -10, 0], rotate: [0, 1, -1, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.img
          src={ban_2}
          alt="ban_2"
          className="absolute w-[50%] left-[30%] top-[0%] rounded-2xl shadow-xl border-4 border-white z-20"
          animate={{ y: [0, 15, 0], rotate: [0, -2, 2, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.img
          src={ban_3}
          alt="ban_3"
          className="absolute w-[48%] left-[20%] top-[30%] rounded-2xl shadow-xl border-4 border-white z-30"
          animate={{ y: [0, -12, 0], rotate: [0, 2, -2, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.img
          src={ban_4}
          alt="ban_4"
          className="absolute w-[50%] left-[45%] top-[40%] rounded-2xl shadow-xl border-4 border-white z-40"
          animate={{ y: [0, 8, 0], rotate: [0, -1.5, 1.5, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
};

export default Banner;
