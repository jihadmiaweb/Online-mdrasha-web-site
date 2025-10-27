import { motion, type Transition, type Variants, } from "framer-motion";
import { ChevronRight, Filter, Grid } from "lucide-react";
import { Link } from "react-router-dom";

// Course Type Interface
interface Course {
    id: number;
    image: string;
    titleBn: string;
    titleEn: string;
    to: string;
}

// Mock Course Data
const courses: Course[] = [
    { id: 1, to: "/AsmaulHusnaCourse", image: "imgas/1.jpg", titleBn: "সম্পূর্ণ আসমাউল হুসনা মুখস্থ কোর্স", titleEn: "Complete Asmaul Husna memorization course" },
    { id: 2, to: "/PerfectSalahCourse", image: "imgas/2.jpg", titleBn: "অনলাইন পারফেক্ট সালাহ/নামাজ শিক্ষা কোর্স", titleEn: "Perfect Salah/Namaz Education Course Online" },
    { id: 3, to: "/TajweedQuranCourse", image: "imgas/3.jpg", titleBn: "তাজওয়ীদ সহ কুরআন শিক্ষা কোর্স", titleEn: "Quran learning Course with Tajweed" },
    { id: 4, to: "/NooraniQaidaCourse", image: "imgas/4.jpg", titleBn: "বেসিক অনলাইন নূরানি কায়দা কোর্স", titleEn: "Basic Online Noorani Qaida Course" },
    { id: 5, to: "/ArabicGrammarCourse", image: "imgas/5.jpg", titleBn: "সহজ আরবি ব্যাকরণ কোর্স", titleEn: "Easy Arabic Grammar Course" },
    { id: 6, to: "/CompleteQuranHifz", image: "imgas/6.jpg", titleBn: "সম্পূর্ণ কুরআন হিফজ প্রোগ্রাম", titleEn: "Complete Quran Hifz Program" },
    { id: 7, to: "/SeerahCourse", image: "imgas/7.jpg", titleBn: "নবীজির জীবনী (সীরাহ) অধ্যয়ন", titleEn: "Prophet's Biography (Seerah) Studies" },
    { id: 8, to: "/FiqhCourse", image: "imgas/8.jpg", titleBn: "ফিকহ এর মৌলিক ধারণা কোর্স", titleEn: "Basic Fiqh Principles Course" },
];

// Framer Motion Transition
const spring: Transition = { type: "spring", stiffness: 100, damping: 20 };

// Container Variants
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }, // প্রতিটি কার্ড একে একে আসবে
    },
};

// Item Variants (TypeScript-safe)
const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    show: { opacity: 1, y: 0, scale: 1, transition: spring },
};

export default function CourseGrid() {
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">

            {/* Top Navigation & Controls */}
            <div className="max-w-7xl mx-auto mb-8 space-y-4">
                {/* Breadcrumb */}
                <nav className="flex text-sm text-gray-500">
                    <a href="#" className="hover:text-indigo-600">Home</a>
                    <ChevronRight className="w-4 h-4 mx-1" />
                    <span className="font-semibold text-gray-700">All Course</span>
                </nav>

                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-3 sm:mb-0">আমাদের কোর্সসমূহ</h2>

                    {/* Sorting and View Options */}
                    <div className="flex items-center space-x-4 text-sm">
                        <button className="flex items-center text-gray-600 hover:text-indigo-600 transition">
                            <Grid className="w-4 h-4 mr-1" /> View Grid
                        </button>
                        <div className="flex items-center space-x-2">
                            <Filter className="w-4 h-4 text-gray-500" />
                            <label htmlFor="sort" className="text-gray-700 font-medium hidden sm:inline">Sort by:</label>
                            <select
                                id="sort"
                                className="p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="price-high">Price: High to Low</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="newest">Newest</option>
                            </select>
                        </div>
                    </div>
                </header>
            </div>

            {/* Course Grid with Staggered Animation */}
            <motion.div
                className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
            >
                {courses.map((course) => (
                    <motion.div
                        key={course.id}
                        className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer 
              transform transition-all duration-300 ease-in-out
              hover:scale-[1.03] hover:shadow-2xl hover:border-indigo-400 border border-transparent"
                        variants={itemVariants}
                    >
                        {/* Image Area */}
                        <img
                            src={course.image}
                            alt={course.titleEn}
                            className="w-full h-48 object-cover"
                        />

                        {/* Content Area */}
                        <div className="p-5">
                            <h3 className="font-bold text-xl mb-1 text-gray-800 leading-snug">{course.titleBn}</h3>
                            <p className="text-sm text-indigo-600 font-medium uppercase tracking-wider">{course.titleEn}</p>
                            <div className="mt-4">
                                <Link
                                    to={course.to}
                                    className="inline-block bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-lg 
                    hover:bg-indigo-600 transition duration-200"
                                >
                                    বিস্তারিত দেখুন
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
