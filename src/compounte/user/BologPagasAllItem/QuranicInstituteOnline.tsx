"use client";
import  { useState, type ChangeEvent, type FC, type FormEvent, } from 'react';

import { motion, type Variants, } from 'framer-motion';
import { FaClock, FaDollarSign, FaQuran, FaCheckCircle, FaUserGraduate, FaHeadset, FaEnvelope, FaBookReader, FaLanguage, FaGlobe, FaCertificate } from 'react-icons/fa';
import { Star } from 'lucide-react';

// --- Type Definitions for Data and State ---
interface Feature {
    icon: FC<{ className: string }>;
    title: string;
    description: string;
}

interface Course {
    title: string;
    description: string;
}

interface ContactData {
    name: string;
    email: string;
    message: string;
}

// --- Data based on the "Best Quranic Institute Online in Bangladesh" blog post ---

const primaryFeatures: Feature[] = [
    { icon: FaQuran, title: "Authentic Curriculum", description: "Based on the Quran & Sunnah for true Islamic understanding." },
    { icon: FaLanguage, title: "Bengali-Speaking Teachers", description: "Perfect for Bangladeshi students worldwide, ensuring smooth communication." },
    { icon: FaDollarSign, title: "Affordable Pricing", description: "Family-friendly packages make quality education accessible." },
    { icon: FaClock, title: "Flexible Timing", description: "Classes suit all global time zones and busy lifestyles." },
    { icon: FaUserGraduate, title: "Interactive Live Classes", description: "Personalized feedback and correction for effective learning." },
    { icon: FaCertificate, title: "Certified Instructors", description: "Qualified, experienced, and engaging teachers." }
];

const mainCourses: Course[] = [
    { title: "Basic Online Noorani Qaida Class", description: "Perfect for beginners learning Arabic reading with Tajweed." },
    { title: "Online Perfect Salah/Namaz Education Class", description: "Learn how to perform Salah accurately with proper pronunciation." },
    { title: "Online Quran Learning with Tajweed", description: "Improve your recitation and understanding with expert guidance." },
    { title: "Basic 11 Sura Memorized Class Online", description: "Memorize essential Surahs with correct Tajweed." },
    { title: "Complete Ampara Memorized Course", description: "Master the entire last section (Juz’ Amma) of the Quran." },
    { title: "Complete Asma Ul Husna Memorized", description: "Memorize the 99 beautiful names of Allah with meanings." },
    { title: "Complete Quran Nazira Course", description: "Read the Quran fluently without memorization." },
    { title: "Complete Quran Haifz/Memorization Course", description: "Become a Hafiz of the Quran at your own pace with expert teachers." }
];

const testimonials = [
    { name: "Brother Rafiq, UK", quote: "Alhamdulillah, I found the perfect institute for my children in Europe. The Bengali-speaking teachers at Madrasatu Nuurul ‘Ilm make learning so much easier!" },
    { name: "Sister Salma, Germany", quote: "Their Complete Quran Nazira Course helped me finally achieve my dream of reading the Quran fluently!" }
];


// --- Framer Motion Variants ---
const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: "easeOut" },
    },
};



const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

// --- Main Component (Typed & Responsive) ---
const QuranicInstituteOnline: FC = () => {

    const [contactData, setContactData] = useState<ContactData>({ name: "", email: "", message: "" });

    // Typed Change Handler
    const handleContactChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setContactData({ ...contactData, [e.target.name]: e.target.value });
    };

    // Typed Form Submission Handler
    const handleContactSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert(`Trial Request Sent! We will contact you shortly. Data: ${JSON.stringify(contactData)}`);
        // Add actual form submission logic (e.g., EmailJS, API call) here
        setContactData({ name: "", email: "", message: "" });
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">

            {/* Header / Hero Section (Quranic Focus) */}
            <motion.header
                className="bg-gradient-to-r from-teal-700 to-blue-800 text-white pt-16 pb-10 sm:pt-20 sm:pb-14 px-4 md:px-8 shadow-2xl"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="max-w-7xl mx-auto">
                    <p className="text-base font-medium text-teal-300 mb-2">Quranic Institute Online | July 27, 2025</p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 leading-snug">
                        🕋 Best Quranic Institute Online in Bangladesh
                    </h1>
                    <p className="text-teal-200 text-lg sm:text-xl font-light">
                        Madrasatu Nuurul ‘Ilm: Trusted online learning for global Bangladeshi families.
                    </p>
                </div>
            </motion.header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 md:py-14">

                {/* Introduction & Main CTA Section */}
                <motion.section
                    className="mb-10 md:mb-14 bg-white p-5 sm:p-7 rounded-2xl shadow-xl border-l-4 border-blue-600"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-6">
                        For Bangladeshi expatriates in the **UK, Germany, France**, and beyond, finding a platform that maintains faith and identity is crucial. **Madrasatu Nuurul ‘Ilm** is a leading online Islamic madrasah offering **authentic, flexible, and affordable** high-quality Quranic instruction for your family's spiritual needs.
                    </p>
                    <a href="#contact-form" className="w-full sm:w-auto inline-block">
                        <motion.button
                            className="w-full sm:w-auto bg-green-600 text-white text-lg font-bold py-3 px-8 rounded-full shadow-lg hover:bg-green-700 transition duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Book Your FREE Trial Class Now!
                        </motion.button>
                    </a>
                </motion.section>

                {/* Key Features Grid */}
                <motion.section
                    className="mb-10 md:mb-14"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center border-b pb-2">
                        🌟 Why Choose Madrasatu Nuurul ‘Ilm?
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                        {primaryFeatures.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-5 rounded-xl shadow-md border-t-4 border-teal-500 hover:shadow-lg transition-all transform hover:-translate-y-1"
                                variants={cardVariants}
                                custom={index}
                            >
                                <feature.icon className="w-7 h-7 text-blue-600 mb-3" />
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">{feature.title}</h3>
                                <p className="text-gray-600 text-sm">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Course List Section (Detailed) */}
                <motion.section
                    className="mb-10 md:mb-14 bg-white p-5 sm:p-7 rounded-2xl shadow-2xl"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                        <FaBookReader className="w-6 h-6 sm:w-8 sm:h-8 text-teal-600 mr-3 flex-shrink-0" />
                        📚 Our Top Quranic and Islamic Courses
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {mainCourses.map((course, index) => (
                            <motion.div
                                key={index}
                                className="p-4 border-l-4 border-green-500 bg-gray-50 hover:bg-green-50 transition-colors rounded-r-lg shadow-sm"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.08 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-lg font-semibold text-blue-800 mb-1 flex items-center">
                                    <Star className="w-4 h-4 text-amber-500 mr-2 flex-shrink-0" />
                                    {course.title}
                                </h3>
                                <p className="text-gray-600 text-sm">{course.description}</p>
                            </motion.div>
                        ))}
                    </div>
                    <a href="#" className="mt-6 inline-block text-blue-700 font-semibold hover:text-blue-800 hover:underline transition">
                        👉 Explore all our courses here: All Courses
                    </a>
                </motion.section>

                {/* Testimonials Section */}
                <motion.section
                    className="mb-10 md:mb-14 bg-teal-50 p-5 sm:p-7 rounded-2xl shadow-inner border-r-4 border-blue-500"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-teal-800 mb-6 text-center">
                        💬 What Our Global Students Say
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {testimonials.map((story, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-6 rounded-xl shadow-lg"
                                variants={cardVariants}
                                custom={index}
                            >
                                <FaQuran className="w-6 h-6 text-blue-600 mb-3" />
                                <p className="italic text-gray-700 mb-3 text-base">
                                    <span className="font-bold text-green-700">“Alhamdulillah,</span> {story.quote.split("Alhamdulillah, ")[1] || story.quote}
                                </p>
                                <p className="font-semibold text-teal-700">-- {story.name}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* How to Get Started Section */}
                <motion.section
                    className="mb-10 md:mb-14 text-center bg-blue-50 p-8 rounded-2xl shadow-lg border-b-4 border-blue-600"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-4">
                        🚀 How to Get Started? (5 Simple Steps)
                    </h2>
                    <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700 max-w-lg mx-auto text-left">
                        <li className="font-medium">Visit <span className="text-blue-600">madrasatunurulilm.com</span></li>
                        <li className="font-medium">Browse all available courses</li>
                        <li className="font-medium">Register for a <span className="text-green-600">Free Trial Class</span></li>
                        <li className="font-medium">Enroll in your chosen course</li>
                        <li className="font-medium">Begin your journey to Quran mastery!</li>
                    </ol>
                </motion.section>


                {/* Contact/Form Section (Trial Request) */}
                <motion.section
                    id="contact-form"
                    className="bg-white p-5 sm:p-8 rounded-2xl shadow-2xl border-t-8 border-green-600 grid lg:grid-cols-2 gap-8 items-start"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {/* Contact Info (Left Side) */}
                    <div className="p-4 sm:p-6 bg-teal-50 rounded-xl">
                        <h2 className="text-2xl sm:text-3xl font-bold text-teal-800 mb-4 flex items-center">
                            <FaHeadset className="w-7 h-7 mr-3" />
                            📞 Contact Information
                        </h2>
                        <p className="text-base md:text-lg text-gray-700 mb-6">Invest in your *Akhirah* today. Contact us for enrollment or to book your free trial.</p>
                        <div className="space-y-4 text-left">
                            <p className="flex items-center text-lg font-medium text-gray-700">
                                <FaGlobe className="w-5 h-5 mr-3 text-blue-600" />
                                Website: <a href="https://madrasatunurulilm.com" target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-700 hover:underline">madrasatunurulilm.com</a>
                            </p>
                            <p className="flex items-center text-lg font-medium text-gray-700">
                                <FaHeadset className="w-5 h-5 mr-3 text-blue-600" />
                                Phone: <a href="tel:01834756502" className="ml-2 text-blue-700 hover:underline">01834-756502</a>
                            </p>
                            <p className="flex items-center text-lg font-medium text-gray-700">
                                <FaEnvelope className="w-5 h-5 mr-3 text-blue-600" />
                                Email: madrasatunuurulilm912@gmail.com
                            </p>
                        </div>
                    </div>

                    {/* Contact Form (Right Side) */}
                    <form onSubmit={handleContactSubmit} className="space-y-4 p-4 sm:p-6 bg-gray-50 rounded-xl shadow-inner">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 border-b pb-2 flex items-center">
                            <FaCheckCircle className="w-5 h-5 mr-2 text-green-700" />
                            Register for a Free Trial Class
                        </h3>
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                            <input type="text" id="name" name="name" value={contactData.name} onChange={handleContactChange} required
                                className="mt-1 w-full border border-gray-300 rounded-lg p-3 text-base focus:ring-green-500 focus:border-green-500 transition duration-150"
                            />
                        </div>
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input type="email" id="email" name="email" value={contactData.email} onChange={handleContactChange} required
                                className="mt-1 w-full border border-gray-300 rounded-lg p-3 text-base focus:ring-green-500 focus:border-green-500 transition duration-150"
                            />
                        </div>
                        {/* Message */}
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Trial Request Details (e.g., Course Interest, Time Zone)</label>
                            <textarea id="message" name="message" value={contactData.message} onChange={handleContactChange} rows={4} required
                                className="mt-1 w-full border border-gray-300 rounded-lg p-3 text-base focus:ring-green-500 focus:border-green-500 transition duration-150"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition duration-300 text-lg"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Start Your Journey Today!
                        </motion.button>
                    </form>
                </motion.section>

            </main>
        </div>
    );
};

export default QuranicInstituteOnline;