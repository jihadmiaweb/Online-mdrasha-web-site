"use client";
import React, { useState, type ChangeEvent, type FC, type FormEvent } from "react";
import { motion, Variants, Transition } from "framer-motion";
import { FaClock, FaUserGraduate, FaHeadset, FaEnvelope, FaLanguage, FaCommentDots } from "react-icons/fa";
import { ChevronDown, ChevronUp, Users, MessageSquare, Clock } from "lucide-react";

// --- Type Definitions ---
interface Feature {
    icon: FC<{ className: string }>;
    title: string;
    description: string;
}

interface ContactData {
    name: string;
    email: string;
    message: string;
}

interface FAQItemProps {
    q: string;
    a: string;
    index: number;
    activeIndex: number | null;
    setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

// --- Framer Motion Variants ---
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

// --- Sample Data ---
const bengaliBenefits: Feature[] = [
    { icon: Clock, title: "Flexible Scheduling", description: "Learn at your own pace and time, designed for different time zones." },
    { icon: FaLanguage, title: "Qualified Bengali Teachers", description: "Experienced instructors fluent in Bengali for smoother, relatable learning." },
    { icon: MessageSquare, title: "Regular Assessments & Feedback", description: "Constructive feedback and assessments to ensure continuous progress." },
    { icon: FaUserGraduate, title: "Interactive Online Platform", description: "Easy-to-use, interactive, and accessible platform for convenient learning." },
];

const familyAdvantages: string[] = [
    "✅ Learn in your native language, ensuring full comprehension.",
    "✅ Study at your own pace without the need to travel to a physical institution.",
    "✅ Connect with other Bengali learners and share knowledge, building a sense of community.",
    "✅ Take advantage of personalized learning plans for all ages and levels.",
];

const successStories = [
    { name: "Sister Nazma, UK", quote: "I always struggled to find an Islamic learning program that was flexible and in my own language. Madrasatu Nuurul ‘Ilm gave me the perfect opportunity." },
    { name: "Brother Karim, Germany", quote: "The teachers at Madrasatu Nuurul ‘Ilm are so patient and skilled. I love how everything is explained in Bengali. It made learning the Quran much easier!" },
];

const placeholderFAQs = [
    { q: "Who are the courses suitable for?", a: "Our program is designed to cater to learners of all ages, from Quranic studies to general Islamic teachings." },
    { q: "How does learning in Bengali help?", a: "Learning in your native language ensures full comprehension and makes the learning experience smoother and more relatable." },
];

// --- FAQ Item Component ---
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

// --- Main Component ---
const BengaliIslamicLearningProgram: FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [contactData, setContactData] = useState<ContactData>({ name: "", email: "", message: "" });

    const handleContactChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setContactData({ ...contactData, [e.target.name]: e.target.value });
    };

    const handleContactSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert(`Trial Request Sent! Data: ${JSON.stringify(contactData)}`);
        setContactData({ name: "", email: "", message: "" });
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">

            {/* Hero Section */}
            <motion.header
                className="bg-gradient-to-r from-teal-600 to-green-700 text-white pt-16 pb-10 sm:pt-20 sm:pb-14 px-4 md:px-8 shadow-xl"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="max-w-7xl mx-auto">
                    <p className="text-base font-medium text-teal-200 mb-2">Uncategorized | July 31, 2025</p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 leading-snug">
                        🌐 অনলাইন ইসলামিক শিক্ষা কার্যক্রম
                    </h1>
                    <p className="text-teal-200 text-lg sm:text-xl font-light">
                        Madrasatu Nuurul ‘Ilm: কুরআন ও ইসলামিক জ্ঞান শিখুন আপনার মাতৃভাষায়।
                    </p>
                </div>
            </motion.header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 md:py-14">

                {/* Introduction Section */}
                <motion.section
                    className="mb-10 md:mb-14 bg-white p-5 sm:p-7 rounded-2xl shadow-xl border-l-4 border-teal-500"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-6">
                        আমাদের অনলাইন ইসলামিক শিক্ষা কার্যক্রমটি সকল বয়সের শিক্ষার্থীদের জন্য তৈরি করা হয়েছে।
                        <br className="my-2" />
                        <span className="font-semibold text-green-700">🌟 বিনামূল্যে ট্রায়াল ক্লাসের জন্য সাইন আপ করুন!</span>
                    </p>
                </motion.section>

                {/* Benefits Grid */}
                <motion.section
                    className="mb-10 md:mb-14"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {bengaliBenefits.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-5 rounded-xl shadow-md border-b-4 border-teal-500 hover:shadow-lg transition-all transform hover:-translate-y-1"
                                variants={cardVariants}
                                custom={index}
                            >
                                <feature.icon className="w-7 h-7 text-green-600 mb-3" />
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">{feature.title}</h3>
                                <p className="text-gray-600 text-sm">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Family Advantages */}
                <motion.section
                    className="mb-10 md:mb-14 bg-teal-50 p-5 sm:p-7 rounded-2xl shadow-inner border-r-4 border-teal-500"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-teal-800 mb-5 flex items-center">
                        <Users className="w-6 h-6 mr-3 mb-1" /> How Our Program Helps Bengali Families
                    </h2>
                    <ul className="space-y-3 text-gray-700 list-none pl-0">
                        {familyAdvantages.map((benefit, idx) => (
                            <li key={idx} className="text-base md:text-lg">{benefit}</li>
                        ))}
                    </ul>
                </motion.section>

                {/* Success Stories */}
                <motion.section
                    className="mb-10 md:mb-14"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {successStories.map((story, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-600"
                                variants={cardVariants}
                                custom={index}
                            >
                                <FaCommentDots className="w-6 h-6 text-green-600 mb-3" />
                                <p className="italic text-gray-700 mb-3">"{story.quote}"</p>
                                <p className="font-semibold text-teal-700">-- {story.name}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* FAQs */}
                <motion.section
                    className="mb-10 md:mb-14"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
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
                </motion.section>

                {/* Contact Form */}
                <motion.section
                    id="contact-form"
                    className="bg-white p-5 sm:p-8 rounded-2xl shadow-2xl border-t-8 border-green-600 grid lg:grid-cols-2 gap-8 items-start"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {/* Contact Info */}
                    <div className="p-4 sm:p-6 bg-teal-50 rounded-xl">
                        <h2 className="text-2xl sm:text-3xl font-bold text-teal-800 mb-4 flex items-center">
                            <FaHeadset className="w-7 h-7 mr-3" /> 📞 যোগাযোগ করুন
                        </h2>
                        <p className="text-base md:text-lg text-gray-700 mb-6">জ্ঞানের পথে প্রথম পদক্ষেপ নিতে আজই আমাদের সাথে যোগাযোগ করুন।</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleContactSubmit} className="space-y-4 p-4 sm:p-6 bg-gray-50 rounded-xl shadow-inner">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 border-b pb-2 flex items-center">
                            <FaEnvelope className="w-5 h-5 mr-2 text-green-700" /> ফ্রি ট্রায়ালের জন্য অনুরোধ করুন
                        </h3>

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">আপনার নাম</label>
                            <input type="text" id="name" name="name" value={contactData.name} onChange={handleContactChange} required
                                className="mt-1 w-full border border-gray-300 rounded-lg p-3 text-base focus:ring-green-500 focus:border-green-500 transition duration-150"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">ইমেল ঠিকানা</label>
                            <input type="email" id="email" name="email" value={contactData.email} onChange={handleContactChange} required
                                className="mt-1 w-full border border-gray-300 rounded-lg p-3 text-base focus:ring-green-500 focus:border-green-500 transition duration-150"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">বার্তা / ট্রায়াল অনুরোধ</label>
                            <textarea id="message" name="message" value={contactData.message} onChange={handleContactChange} rows={4} required
                                className="mt-1 w-full border border-gray-300 rounded-lg p-3 text-base focus:ring-green-500 focus:border-green-500 transition duration-150"
                            />
                        </div>

                        <motion.button
                            type="submit"
                            className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition duration-300 text-lg"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            অনুরোধ পাঠান
                        </motion.button>
                    </form>
                </motion.section>
            </main>
        </div>
    );
};

export default BengaliIslamicLearningProgram;
