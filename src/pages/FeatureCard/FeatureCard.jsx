import React from "react";
import { motion } from "framer-motion";
import { FaFeatherAlt, FaGlobe, FaUsers, FaRocket } from "react-icons/fa";

const features = [
  {
    icon: <FaFeatherAlt />,
    title: "Write Without Limits",
    desc: "Our platform gives you freedom to express yourself fully with no restrictions.",
    color: "bg-purple-600",
  },
  {
    icon: <FaGlobe />,
    title: "Reach Global Readers",
    desc: "Share your stories with a vibrant international audience passionate about reading.",
    color: "bg-indigo-600",
  },
  {
    icon: <FaUsers />,
    title: "Join a Thriving Community",
    desc: "Connect, collaborate, and grow with fellow writers and readers alike.",
    color: "bg-pink-600",
  },
  {
    icon: <FaRocket />,
    title: "Grow Your Influence",
    desc: "Gain followers, get featured, and take your blogging journey to new heights.",
    color: "bg-yellow-500",
  },
];

const FeatureCards = () => {
  return (
    <section className="py-20 px-6 lg:px-20 bg-gradient-to-tr from-indigo-50 to-white">
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl font-bold text-center mb-14 text-indigo-700"
      >
        Why Blog With Us?
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {features.map(({ icon, title, desc, color }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            whileHover={{ scale: 1.05, boxShadow: "0 15px 25px rgba(99,102,241,0.4)" }}
            className={`${color} rounded-xl p-8 flex flex-col items-center text-white cursor-pointer shadow-md`}
          >
            <div className="text-5xl mb-6">{icon}</div>
            <h3 className="text-xl font-semibold mb-4 text-center">{title}</h3>
            <p className="text-center text-sm leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;
