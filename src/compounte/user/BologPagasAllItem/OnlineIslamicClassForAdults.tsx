"use client";
import React, { useState, ChangeEvent, FormEvent, FC } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaClock, FaDollarSign, FaQuran, FaCheckCircle, FaUserGraduate, FaHeadset, FaEnvelope, FaBookReader, FaMousePointer } from 'react-icons/fa';
import { BookOpen, MapPin, Zap, ChevronDown, ChevronUp, Users, DollarSign, Calendar } from 'lucide-react';

// --- Type Definitions for Data and State ---
interface Feature {
    icon: FC<{ className: string }>;
    title: string;
    description: string;
}

interface Course {
    title: string;
    linkText: string;
}

interface ContactData {
    name: string;
    email: string;
    message: string;
}

// --- Data based on the "Affordable Online Islamic Classes for Adults" blog post ---

const primaryFeatures: Feature[] = [
    { icon: DollarSign, title: "Affordable Courses", description: "Cost-effective Islamic learning options for everyone." },
    { icon: FaGraduationCap, title: "Experienced Teachers", description: "Qualified and certified instructors specializing in adult education." },
    { icon: Calendar, title: "Flexible Timings", description: "Classes scheduled to suit your time zone and availability." },
    { icon: Users, title: "Personalized Learning", description: "Tailored classes to suit your individual learning pace." },
    { icon: FaMousePointer, title: "Accessible Platform", description: "Easy-to-use online platform to access lessons from anywhere." },
    { icon: FaCheckCircle, title: "Free Trial Available", description: "Test the quality before you commit to enrollment." }
];

const adultCourses: Course[] = [
    { title: "Online Quran Learning with Tajweed", linkText: "Enroll in Online Quran Learning with Tajweed" },
    { title: "Complete Quran Nazira Course", linkText: "Enroll in Complete Quran Nazira Course" },
    { title: "Basic Online Noorani Qaida Class", linkText: "Enroll in Basic Noorani Qaida Class" },
    { title: "Online Perfect Salah/Namaz Education Class", linkText: "Enroll in Perfect Salah Class" },
    { title: "Asma Ul Husna Memorization Course", linkText: "Enroll in Asma Ul Husna Course" }
];

const secondaryBenefits: string[] = [
    "✅ Learn from Anywhere: Access classes from the comfort of your home.",
    "✅ Personalized Learning Experience: Tailored to suit each individual's needs.",
    "✅ Experienced Teachers: Instructors qualified in teaching adults, providing one-on-one attention.",
    "✅ Flexible Class Timing: Includes evenings and weekends to accommodate busy schedules.",
    "✅ Affordable and Accessible: Priced affordably with available discounts and promotions."
];

// --- Framer Motion Variants (Unchanged) ---
const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: "easeOut" }
    }
};

const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        transition: { delay: i * 0.1, duration: 0.5 }
    })
};

// --- FAQ Item Component (Kept for potential expansion/consistency) ---
// Note: The new blog post does not contain FAQs, but keeping the structure for robustness.
interface FAQItemProps {
    q: string;
    a: string;
    index: number;
    activeIndex: number | null;
    setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

// Placeholder FAQ for structural completeness (can be removed if not needed)
const placeholderFAQs = [
    { q: "How do I book a free trial?", a: "Simply fill out the form below or contact us directly via phone to schedule your free trial class." },
    { q: "Are the classes truly flexible?", a: "Yes, we offer multiple class times, including evenings and weekends, specifically designed to fit around a busy adult schedule." }
];

const FAQItem: FC<FAQItemProps> = ({ q, a, index, activeIndex, setActiveIndex }) => {
    const isActive = index === activeIndex;
    const toggleFAQ = () => setActiveIndex(isActive ? null : index);

    return (
        <motion.div
            className="border border-gray-200 rounded-lg shadow-sm bg-white transition-all overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            viewport={{ once: true }}
        >
            <button
                className={`w-full text-left flex justify-between items-center p-4 sm:p-5 font-semibold text-base md:text-lg transition-colors duration-300 ${isActive ? 'bg-teal-50 text-teal-700' : 'text-gray-800 hover:text-teal-600'}`}
                onClick={toggleFAQ}
            >
                {q}
                {isActive ? <ChevronUp className="w-5 h-5 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 flex-shrink-0" />}
            </button>
            {isActive && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 sm:p-5 border-t border-gray-200"
                >
                    <p className="text-sm md:text-base text-gray-600">{a}</p>
                </motion.div>
            )}
        </motion.div>
    );
};


// --- Main Component (Typed & Responsive) ---
const OnlineIslamicClassForAdults: FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    // Form state is explicitly typed
    const [contactData, setContactData] = useState<ContactData>({ name: "", email: "", message: "" });

    // Typed Change Handler for input/textarea elements
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

            {/* Header / Hero Section (Adults Focus) */}
            <motion.header
                className="bg-gradient-to-r from-teal-600 to-green-700 text-white pt-16 pb-10 sm:pt-20 sm:pb-14 px-4 md:px-8 shadow-xl"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="max-w-7xl mx-auto">
                    <p className="text-base font-medium text-teal-200 mb-2">Online Islamic Class | August 2, 2025</p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 leading-snug">
                        📚 Affordable Online Islamic Classes for Adults
                    </h1>
                    <p className="text-teal-200 text-lg sm:text-xl font-light">
                        Madrasatu Nurulilm: Learn at Your Own Pace, From the Comfort of Your Home.
                    </p>
                </div>
            </motion.header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 md:py-14">

                {/* Introduction & Main CTA Section */}
                <motion.section
                    className="mb-10 md:mb-14 bg-white p-5 sm:p-7 rounded-2xl shadow-xl border-l-4 border-teal-500"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-6">
                        In today’s fast-paced world, the demand for **online Islamic classes for adults** is growing rapidly. **Madrasatu Nurulilm** offers an affordable, flexible, and quality solution for adults—including professionals, housewives, and retirees—who seek to deepen their understanding of the Quran and Islamic teachings. We cater specifically to the diverse needs of adult learners, particularly those in the Bangladeshi community globally.
                    </p>
                    <a href="#contact-form" className="w-full sm:w-auto inline-block">
                        <motion.button
                            className="w-full sm:w-auto bg-green-600 text-white text-lg font-bold py-3 px-8 rounded-full shadow-lg hover:bg-green-700 transition duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Book Your Free Trial Class Here!
                        </motion.button>
                    </a>
                </motion.section>

                {/* Feature/Why Choose Table Re-imagined as a Responsive Grid */}
                <motion.section
                    className="mb-10 md:mb-14"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center border-b pb-2">
                        💡 Why Choose Our Online Islamic Classes for Adults?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {primaryFeatures.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-6 rounded-xl shadow-md border-t-4 border-green-500 hover:shadow-lg transition-all"
                                variants={cardVariants}
                                custom={index}
                            >
                                <feature.icon className="w-8 h-8 text-teal-600 mb-3" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-1">{feature.title}</h3>
                                <p className="text-gray-600 text-sm">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Course List Section */}
                <motion.section
                    className="mb-10 md:mb-14 bg-white p-5 sm:p-7 rounded-2xl shadow-2xl"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                        <FaBookReader className="w-6 h-6 sm:w-8 sm:h-8 text-teal-600 mr-3 flex-shrink-0" />
                        📚 Key Courses Offered for Adult Learners
                    </h2>
                    <ul className="space-y-4 pl-0">
                        {adultCourses.map((course, index) => (
                            <motion.li
                                key={index}
                                className="flex flex-col sm:flex-row sm:items-center justify-between text-gray-700 border-b pb-3 pt-1"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <span className="text-lg font-medium flex items-start sm:items-center">
                                    <Zap className="w-4 h-4 text-green-600 mt-1 sm:mt-0 mr-3 flex-shrink-0" />
                                    {course.title}
                                </span>
                                <a href="#" className="mt-2 sm:mt-0 sm:ml-4 text-sm font-semibold text-teal-700 hover:text-teal-900 hover:underline transition">
                                    {course.linkText}
                                </a>
                            </motion.li>
                        ))}
                    </ul>
                    <a href="#" className="mt-6 inline-block text-green-700 font-semibold hover:text-green-800 transition">
                        🔗 View All Our Courses Here
                    </a>
                </motion.section>

                {/* Key Benefits of Enrolling Section */}
                <motion.section
                    className="mb-10 md:mb-14 bg-teal-50 p-5 sm:p-7 rounded-2xl shadow-inner border-r-4 border-teal-500"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-teal-800 mb-5">
                        <FaClock className="inline w-6 h-6 mr-3 mb-1" /> Key Benefits of Enrolling
                    </h2>
                    <ul className="space-y-3 text-gray-700 list-none pl-0">
                        {secondaryBenefits.map((benefit, index) => (
                            <li key={index} className="text-base md:text-lg">
                                {benefit}
                            </li>
                        ))}
                    </ul>
                </motion.section>

                {/* FAQs Section (Using placeholder data for structural robustness) */}
                <motion.section
                    className="mb-10 md:mb-14"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                        🙋 Common Questions
                    </h2>
                    <div className="space-y-3">
                        {placeholderFAQs.map((faq, index) => (
                            <FAQItem
                                key={index}
                                q={faq.q}
                                a={faq.a}
                                index={index}
                                activeIndex={activeIndex}
                                setActiveIndex={setActiveIndex}
                            />
                        ))}
                    </div>
                </motion.section>

                {/* Contact/Form Section (Responsive and uses Typed Handlers) */}
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
                            📞 Contact & Get Started
                        </h2>
                        <p className="text-base md:text-lg text-gray-700 mb-6">Take the first step toward authentic Islamic knowledge with a free trial.</p>
                        <div className="space-y-4 text-left">
                            <p className="flex items-center text-lg font-medium text-gray-700">
                                <FaEnvelope className="w-5 h-5 mr-3 text-teal-600" />
                                Website: <a href="https://madrasatunurulilm.com" target="_blank" rel="noopener noreferrer" className="ml-2 text-teal-700 hover:underline">madrasatunurulilm.com</a>
                            </p>
                            <p className="flex items-center text-lg font-medium text-gray-700">
                                <FaHeadset className="w-5 h-5 mr-3 text-teal-600" />
                                Call Us: <a href="tel:01834756502" className="ml-2 text-teal-700 hover:underline">01834-756502</a>
                            </p>
                            <p className="flex items-center text-lg font-medium text-gray-700">
                                <FaClock className="w-5 h-5 mr-3 text-teal-600" />
                                Free Trial: Book yours now!
                            </p>
                        </div>
                    </div>

                    {/* Contact Form (Right Side) */}
                    <form onSubmit={handleContactSubmit} className="space-y-4 p-4 sm:p-6 bg-gray-50 rounded-xl shadow-inner">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 border-b pb-2 flex items-center">
                            <FaEnvelope className="w-5 h-5 mr-2 text-green-700" />
                            Book Your Trial or Ask a Question
                        </h3>
                        {/* Name, Email, Message inputs with responsive padding/font sizes */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                            <input type="text" id="name" name="name" value={contactData.name} onChange={handleContactChange} required
                                className="mt-1 w-full border border-gray-300 rounded-lg p-3 text-base focus:ring-green-500 focus:border-green-500 transition duration-150"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input type="email" id="email" name="email" value={contactData.email} onChange={handleContactChange} required
                                className="mt-1 w-full border border-gray-300 rounded-lg p-3 text-base focus:ring-green-500 focus:border-green-500 transition duration-150"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message / Trial Request Details</label>
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
                            Send Message & Request Trial
                        </motion.button>
                    </form>
                </motion.section>

            </main>
        </div>
    );
};

export default OnlineIslamicClassForAdults;