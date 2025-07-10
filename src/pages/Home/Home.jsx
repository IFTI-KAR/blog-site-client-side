import React from 'react';
import { motion } from 'framer-motion';
import Banner from './Banner';
import Newsletter from './Newsletter';
import RecentBlogs from '../RecentBlog/RecentBlogs';

import FeatureCards from '../FeatureCard/FeatureCard';
import TrendingTags from '../TrendingTags/TrendingTags';
import Faq from '../Faq/Faq';

const sectionVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
};

const Home = () => {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.3 }}
            className=""
        >
            <motion.div
                variants={sectionVariant}
                transition={{ duration: 0.9, ease: 'easeOut' }}
            >
                <Banner />
            </motion.div>

            <motion.div
                variants={sectionVariant}
                transition={{ duration: 0.9, ease: 'easeOut' }}
            >
                <RecentBlogs />
            </motion.div>
            <motion.div
                variants={sectionVariant}
                transition={{ duration: 0.9, ease: 'easeOut' }}
            >
                <TrendingTags></TrendingTags>
            </motion.div>
            <motion.div
                variants={sectionVariant}
                transition={{ duration: 0.9, ease: 'easeOut' }}
            >
                <FeatureCards></FeatureCards>
            </motion.div>
            

            <motion.div
                variants={sectionVariant}
                transition={{ duration: 0.9, ease: 'easeOut' }}
            >
                <Newsletter />
            </motion.div>
            <motion.div
                variants={sectionVariant}
                transition={{ duration: 0.9, ease: 'easeOut' }}
            >
                <Faq></Faq>
            </motion.div>
        </motion.div>
    );
};

export default Home;
