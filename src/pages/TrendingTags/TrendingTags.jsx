import React from "react";
import { motion } from "framer-motion";

const tags = [
  "Technology",
  "Travel",
  "Health",
  "Food",
  "Education",
  "Lifestyle",
  "Finance",
  "Fitness",
  "Environment",
  "Photography",
  "Art",
  "Science",
  "Books",
  "Music",
  "Gaming",
];

const getRandom = (min, max) => Math.random() * (max - min) + min;

const TrendingTags = () => {
  return (
    <section className="py-20 px-6 lg:px-20 bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50">
      <h2 className="text-4xl font-bold text-center text-indigo-800 mb-14">
        Explore Trending Topics
      </h2>

      <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
        {tags.map((tag, i) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, scale: 0.6, rotate: getRandom(-15, 15) }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.3, color: "#7c3aed" }}
            className="cursor-pointer text-indigo-600 font-semibold text-lg bg-white px-5 py-2 rounded-full shadow-md select-none"
          >
            {tag}
          </motion.span>
        ))}
      </div>
    </section>
  );
};

export default TrendingTags;
