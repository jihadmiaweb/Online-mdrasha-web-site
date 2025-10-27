import React, { useState, type ChangeEvent, type FC, type FormEvent, } from 'react'; // Import types
import { motion, type Transition, type Variants } from 'framer-motion';
import { BookOpen, MapPin, Zap, ChevronDown, ChevronUp, Globe, Clock, DollarSign, PenTool, CheckCircle, GraduationCap, Headset, Mail } from 'lucide-react';

// --- Type Definitions for Data and State ---

interface Benefit {
    icon: FC<{ className: string }>;
    title: string;
    desc: string;
}

interface FAQ {
    q: string;
    a: string;
}

interface ContactData {
    name: string;
    email: string;
    message: string;
}

// --- Data (Icons Replaced) ---
const benefits: Benefit[] = [
    // Replaced FaGlobe with Globe
    { icon: Globe, title: "Global Access", desc: "Learn from anywhere in the world." },
    // Replaced FaClock with Clock
    { icon: Clock, title: "Flexible Schedule", desc: "Perfect for working professionals & families." },
    // Replaced FaUserGraduate with GraduationCap
    { icon: GraduationCap, title: "Live Interactive Classes", desc: "Get direct guidance from qualified teachers." },
    // Replaced FaQuran (using PenTool as a substitute for religious text/writing)
    { icon: PenTool, title: "Comprehensive Curriculum", desc: "From Noorani Qaida to full Hifz." },
    // Replaced FaDollarSign with DollarSign
    { icon: DollarSign, title: "Affordable Pricing", desc: "Cost-effective Islamic education." },
    // Replaced FaCheckCircle with CheckCircle
    { icon: CheckCircle, title: "Authentic & Accredited", desc: "Qualified Bengali-speaking Islamic scholars." }
];

const popularCourses: string[] = [
    "বেসিক অনলাইন নূরানী কায়দা ক্লাস (Beginners)",
    "অনলাইন পারফেক্ট সালাহ/নামাজ শিক্ষা",
    "অনলাইনে তাজবীদ সহ কুরআন শিক্ষা",
    "মৌলিক ১১টি সূরা মুখস্থ ক্লাস অনলাইন",
    "সম্পূর্ণ কুরআন হিফজ/মুখস্থ কোর্স (Hifz)"
];

const faqs: FAQ[] = [
    { q: "What is the best way to learn Quran online as a beginner?", a: "The best way is to start with a Noorani Qaida class, which helps with Arabic letters, Tajweed, and pronunciation." },
    { q: "Are online Islamic courses suitable for kids?", a: "Yes, our online Islamic education for kids is designed with interactive lessons, making learning fun and engaging." },
    { q: "How can I ensure the authenticity of online Quran classes?", a: "At Madrasatu Nuurul ‘Ilm, we provide qualified, Bengali-speaking Islamic scholars to ensure authentic and accredited learning." },
    { q: "Can I learn at flexible times due to my work schedule abroad?", a: "Yes, our classes are designed for international students, with flexible timings to match different time zones." },
];

// --- Framer Motion Variants (Typed) ---
const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: "easeOut" as Transition["ease"] },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as Transition["ease"] },
    }),
};


// --- FAQ Item Component (Typed) ---
interface FAQItemProps {
    faq: FAQ;
    index: number;
    activeIndex: number | null;
    setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const FAQItem: FC<FAQItemProps> = ({ faq, index, activeIndex, setActiveIndex }) => {
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
                className={`w-full text-left flex justify-between items-center p-4 sm:p-5 font-semibold text-lg transition-colors duration-300 ${isActive ? 'bg-teal-50 text-teal-700' : 'text-gray-800 hover:text-teal-600'}`}
                onClick={toggleFAQ}
            >
                {faq.q}
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
                    <p className="text-gray-600">{faq.a}</p>
                </motion.div>
            )}
        </motion.div>
    );
};

// --- Main Component (Typed) ---
const InternationalIslamicStudies: FC = () => {
    // State is typed as number | null
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
        // Custom message box logic (replacing alert())
        const confirmationMessage = `Thank you, ${contactData.name}! Your request has been noted. We will contact you soon at ${contactData.email}.`;
        console.log(confirmationMessage);

        // In a real application, you would send this data to a backend API here.
        // For demonstration, we'll just reset the form.

        setContactData({ name: "", email: "", message: "" });
        // Instead of alert(), we could show a success message in the UI state.
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            {/* Header / Hero Section */}
            <motion.header
                className="bg-gradient-to-r from-teal-600 to-green-700 text-white pt-16 pb-12 sm:pt-20 sm:pb-16 px-4 md:px-8 shadow-xl"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 leading-tight">
                        📖 Learn International Online Islamic Studies | Best Islamic Courses Online
                    </h1>
                    <p className="text-teal-200 text-lg sm:text-xl font-medium flex items-center">
                        <MapPin className="w-5 h-5 mr-2" />
                        Quranic Institute Online (Bangladesh) - Posted by mdtalha2802
                    </p>
                </div>
            </motion.header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16">

                {/* Introduction & CTA Section */}
                <motion.section
                    className="mb-12 md:mb-16 bg-white p-6 sm:p-8 rounded-2xl shadow-lg border-l-4 border-teal-500"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <p className="text-lg leading-relaxed text-gray-700">
                        **Madrasatu Nuurul ‘Ilm**, a trusted online Islamic institute from Bangladesh, offers global students the opportunity to study Quran and Islamic courses online. From beginners to advanced learners, explore **interactive classes, Tajweed, Salah, and Hifz** with expert Bengali-speaking teachers. Get affordable, authentic, and accredited Islamic learning from anywhere.
                        <br className="my-2" />
                        <span className="font-semibold text-green-700">Start your journey with our Free Trial Class today.</span>
                    </p>
                    <a href="#contact-form" className="mt-6 inline-block">
                        <motion.button
                            className="bg-green-600 text-white text-lg font-bold py-3 px-8 rounded-full shadow-lg hover:bg-green-700 transition duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Book Your Free Trial Class Now!
                        </motion.button>
                    </a>
                </motion.section>

                {/* Why Learn Section */}
                <motion.section
                    className="mb-12 md:mb-16"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 border-b pb-2">
                        🌍 Why Learn International Online Islamic Studies?
                    </h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Islam is a complete way of life, and seeking Islamic knowledge is a duty for every Muslim. In today’s digital era, **International Online Islamic Studies** has made it possible for Muslims around the world—including Europe, the USA, Canada, and the Middle East—to access authentic Islamic knowledge from the comfort of their homes.
                    </p>
                    <div className="bg-teal-50 p-5 rounded-xl border border-teal-200 text-teal-800">
                        <p className="font-semibold">
                            At Madrasatu Nuurul ‘Ilm, we provide structured, interactive, and family-friendly courses designed for children, adults, and working professionals.
                        </p>
                    </div>
                </motion.section>

                {/* Benefits Grid */}
                <motion.section
                    className="mb-12 md:mb-16"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                        📌 Benefits of Studying Islamic Courses Online
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-6 rounded-xl shadow-md border-b-4 border-green-500 hover:shadow-lg transition-all transform hover:-translate-y-1"
                                variants={cardVariants}
                                custom={index}
                            >
                                <benefit.icon className="w-8 h-8 text-teal-600 mb-3" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                                <p className="text-gray-600 text-sm">{benefit.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Course List Section */}
                <motion.section
                    className="mb-12 md:mb-16 bg-white p-6 sm:p-8 rounded-2xl shadow-2xl"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 flex items-center">
                        <BookOpen className="w-8 h-8 text-teal-600 mr-3" />
                        📚 Our Popular Online Islamic Courses
                    </h2>
                    <ul className="space-y-3 pl-0">
                        {popularCourses.map((course, index) => (
                            <motion.li
                                key={index}
                                className="flex items-start text-lg text-gray-700 border-b pb-2"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Zap className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                                <span>{course}</span>
                            </motion.li>
                        ))}
                    </ul>
                    <a href="#" className="mt-6 inline-block text-green-700 font-semibold hover:text-green-800 transition">
                        👉 Explore all our courses here: All Courses
                    </a>
                </motion.section>

                {/* Why Choose Section (Condensed) */}
                <motion.section
                    className="mb-12 md:mb-16"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        💡 Why Choose Madrasatu Nuurul ‘Ilm?
                    </h2>
                    <ul className="space-y-2 text-gray-700 list-disc list-inside">
                        <li>✅ Experienced **Bengali-speaking Islamic teachers**</li>
                        <li>✅ **Affordable pricing** for families and students abroad</li>
                        <li>✅ Structured syllabus for Quran classes for beginners online</li>
                        <li>✅ Perfect choice for online Islamic education for kids</li>
                        <li>✅ 24/7 access to resources and recordings</li>
                        <li>✅ **Free Trial Class available**</li>
                    </ul>
                </motion.section>

                {/* FAQs Section (Now using the lucide icons) */}
                <motion.section
                    className="mb-12 md:mb-16"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        🙋 Frequently Asked Questions (FAQs)
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <FAQItem
                                key={index}
                                faq={faq}
                                index={index}
                                activeIndex={activeIndex}
                                setActiveIndex={setActiveIndex}
                            />
                        ))}
                    </div>
                </motion.section>

                {/* Contact/Form Section */}
                <motion.section
                    id="contact-form"
                    className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl border-t-8 border-green-600 grid lg:grid-cols-2 gap-8 items-start"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {/* Contact Info (Left Side) - Now using Headset and Mail from lucide */}
                    <div className="p-4 sm:p-6 bg-teal-50 rounded-xl">
                        <h2 className="text-3xl font-bold text-teal-800 mb-4 flex items-center">
                            <Headset className="w-8 h-8 mr-3" />
                            📞 Contact & Get Started
                        </h2>
                        <p className="text-xl text-gray-700 mb-6">Take the first step towards authentic Islamic knowledge by reaching out.</p>
                        <div className="space-y-4 text-left">
                            <p className="flex items-center text-lg font-medium text-gray-700">
                                <Mail className="w-5 h-5 mr-3 text-teal-600" />
                                Visit Official Website: <a href="https://madrasatunurulilm.com" target="_blank" rel="noopener noreferrer" className="ml-2 text-teal-700 hover:underline">madrasatunurulilm.com</a>
                            </p>
                            <p className="flex items-center text-lg font-medium text-gray-700">
                                <Headset className="w-5 h-5 mr-3 text-teal-600" />
                                Call Us: <a href="tel:01834756502" className="ml-2 text-teal-700 hover:underline">01834-756502</a>
                            </p>
                        </div>
                    </div>

                    {/* Contact Form (Right Side) - Now using Mail from lucide */}
                    <form onSubmit={handleContactSubmit} className="space-y-4 p-4 sm:p-6 bg-gray-50 rounded-xl shadow-inner">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2 flex items-center">
                            <Mail className="w-6 h-6 mr-2 text-green-700" />
                            Book Your Trial or Ask a Question
                        </h3>
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                            {/* Uses typed handler: handleContactChange */}
                            <input type="text" id="name" name="name" value={contactData.name} onChange={handleContactChange} required
                                className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:ring-green-500 focus:border-green-500 transition duration-150"
                            />
                        </div>
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                            {/* Uses typed handler: handleContactChange */}
                            <input type="email" id="email" name="email" value={contactData.email} onChange={handleContactChange} required
                                className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:ring-green-500 focus:border-green-500 transition duration-150"
                            />
                        </div>
                        {/* Message */}
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message / Trial Request Details</label>
                            {/* Uses typed handler: handleContactChange */}
                            <textarea id="message" name="message" value={contactData.message} onChange={handleContactChange} rows={4} required
                                className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:ring-green-500 focus:border-green-500 transition duration-150"
                            ></textarea>
                        </div>

                        {/* Submit Button (Uses typed handler: handleContactSubmit) */}
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

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-6 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 text-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Madrasatu Nuurul ‘Ilm. All rights reserved.</p>
                    <p className="mt-1">Designed for Global Islamic Education.</p>
                </div>
            </footer>
        </div>
    );
};

export default InternationalIslamicStudies;
