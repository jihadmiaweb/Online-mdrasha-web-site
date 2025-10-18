"use client";


import { motion } from "framer-motion";
import { Link } from "react-router";



const courseData = [
    {
        id: 1,
        to: "/OnlineQuranCourse", // Added realistic link
        imageSrc: "/imgas/Bolog/1.jpeg",
        title:
            "Online Quran Memorization Course 2025 - Memorize with Certified Tutors in 12-24 Months",
        description:
            "Looking to memorize the Quran from home? Madrasatu Nuurul ‘Ilm offers a structured Online Quran Memorization Course with expert teachers and personalized plans.",
        icon: "🕋",
    },
    {
        id: 2,
        to: "/InternationalIslamicStudies",
        imageSrc: "/imgas/Bolog/2.jpg",
        title:
            "📖 Learn International Online Islamic Studies | Best Islamic Courses Online",
        description:
            "Learn authentic Islamic Studies from certified scholars with Madrasatu Nuurul ‘Ilm — a trusted international Islamic institute offering flexible online classes.",
        icon: "📖",
    },
    {
        id: 3,
        to: "/OnlineIslamicClassForAdults",
        imageSrc: "/imgas/Bolog/3.jpg",
        title:
            "Affordable Online Islamic Classes for Adults | Online Islamic Institute",
        description:
            "In today's fast-paced world, adults are seeking reliable online Islamic classes. Join Madrasatu Nuurul ‘Ilm to learn Quran, Hadith, and Fiqh at your own pace.",
        icon: "🌙",
    },
    {
        id: 4,
        to: "/BengaliIslamicLearningProgram",
        imageSrc: "/imgas/Bolog/4.jpg",
        title:
            "Best Quranic Institute Online in Bangladesh (বাংলাদেশের বেস্ট অনলাইন কুরআন ইনস্টিটিউট)",
        description:
            "In today’s fast-paced digital age, many Muslim families are seeking the best Quranic institute online that offers flexible schedules and certified tutors.",
        icon: "🌟",
    },
    {
        id: 5,
        to: "/QuranicInstituteOnline",
        imageSrc: "/imgas/Bolog/5.jpg",
        title:
            "Online Islamic learning program for Bengali people (বাঙালিদের জন্য অনলাইন ইসলামিক শিক্ষা কার্যক্রম)",
        description:
            "Our online Islamic learning program is designed to cater to learners of all ages. From Quranic studies to Islamic principles — learn from anywhere in the world.",
        icon: "🕌",
    },
    {
        id: 6,
        to: "/OnlineQuranCourse",
        imageSrc: "/imgas/Bolog/1.jpeg",
        title:
            "Advanced Arabic Language Course for Hifz Students",
        description:
            "This course focuses on essential Arabic grammar and vocabulary needed to deepen understanding of the Quran and Islamic texts for hifz students.",
        icon: "📚",
    },
];

// --- Framer Motion Variants (Improved Staggering) ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

// --- Course Card Component ---
const CourseCard = ({ course }) => {
    return (
        <motion.div
            variants={cardVariants}
            className="relative bg-white/95 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-md transition-all duration-300 flex flex-col cursor-pointer border-t-4 border-purple-500/50"
            whileHover={{ scale: 1.03, boxShadow: "0 10px 30px rgba(168, 85, 247, 0.4)" }} // Purple shadow hover
            whileTap={{ scale: 0.98 }}
        >
            {/* Image with hover overlay */}
            <Link to={course.to} className="w-full h-56 block relative overflow-hidden">
                <motion.img
                    src={course.imageSrc}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
                    whileHover={{ scale: 1.1 }}
                />
                {/* Hover overlay */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-purple-800/80 to-transparent flex items-end p-4 text-white text-lg font-bold opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <span className="backdrop-blur-sm px-2 py-1 rounded-md text-sm">বিস্তারিত দেখুন →</span>
                </motion.div>
            </Link>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-extrabold text-gray-900 mb-2 leading-snug">
                    {/* NEW DESIGN: Purple accent on icon */}
                    {course.icon && <span className="mr-2 text-2xl text-purple-600">{course.icon}</span>}
                    {course.title}
                </h3>
                <p className="text-gray-600 text-base mb-5 flex-grow line-clamp-3">
                    {course.description}
                </p>

                {/* Continue Reading Button */}
                <Link to={course.to} className="self-start">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        // NEW DESIGN: Vibrant pink/purple button
                        className="mt-4 bg-gradient-to-r cursor-pointer from-pink-500 to-purple-600 text-white font-bold py-2.5 px-6 rounded-full text-sm uppercase tracking-wider shadow-lg transition-all duration-300
                            hover:from-pink-600 hover:to-purple-700"
                    >
                        CONTINUE READING
                    </motion.button>
                </Link>
            </div>
        </motion.div>
    );
};

// --- Main Grid Component ---
const CourseGrid = () => {
    return (
        // NEW DESIGN: Stronger background gradient for a floating effect
        <section className="bg-gradient-to-br from-indigo-50 to-purple-100 py-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto text-center mb-16">
                {/* NEW DESIGN: Text with vibrant gradient */}
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
                        🎓 Our Exclusive Online Programs 💡
                    </span>
                </h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                    Explore our certified courses and start your journey of Islamic knowledge from anywhere in the world.
                </p>
            </div>

            {/* RESPONSIVE GRID with Framer Motion Container */}
            <motion.div
                className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {courseData.map((course, index) => (
                    <CourseCard key={course.id + "-" + index} course={course} index={index} />
                ))}
            </motion.div>

            {/* View More Button */}
            <div className="text-center mt-20">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-purple-600 text-white font-bold py-3.5 px-10 rounded-full shadow-xl transition-all duration-300 text-lg uppercase tracking-wider
                        hover:bg-purple-700 shadow-purple-300/50"
                >

                    View All Programs ({courseData.length})
                </motion.button>
            </div>
        </section>
    );
};

export default CourseGrid;