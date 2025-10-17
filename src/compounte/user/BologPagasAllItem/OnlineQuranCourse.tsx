"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, BookOpen, Clock, Zap } from 'lucide-react'; // Using lucide-react for better icons

const OnlineQuranCourse = () => {
    // State for the Contact Form (unchanged)
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Form submitted!\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`);
        setFormData({ name: "", email: "", message: "" }); // Clear form after alert
    };

    // Course Data (unchanged)
    const courseStructure = [
        { level: "Basic Noorani Qaida Class", duration: "1–2 months", focus: "Letters & Pronunciation" },
        { level: "Perfect Salah/Namaz Education", duration: "1 month", focus: "Salah & Wudu Guidance" },
        { level: "Quran Learning with Tajweed", duration: "3–6 months", focus: "Tajweed & Recitation" },
        { level: "11 Surah Memorization", duration: "2–3 months", focus: "Basic Surahs" },
        { level: "Complete Ampara Memorization", duration: "12–18 months", focus: "Full Quran Sections" },
        { level: "Asma ul Husna Memorization", duration: "1–2 months", focus: "99 Names of Allah" },
        { level: "Quran Nazira Course", duration: "3–6 months", focus: "Reading & Recitation" },
        { level: "Full Quran Hifz Course", duration: "12–24 months", focus: "Full Quran Memorization" },
    ];

    // FAQ Data (unchanged)
    const faqs = [
        { question: "How long does it take to memorize the Quran online?", answer: "Our structured courses allow completion in 12–24 months depending on pace and daily practice." },
        { question: "Are these courses suitable for adults?", answer: "Absolutely! We offer flexible schedules and courses specifically designed for adults." },
        { question: "Can I learn Tajweed along with memorization?", answer: "Yes, our Quran Learning with Tajweed course ensures proper pronunciation alongside memorization." },
        { question: "Is there a free trial available?", answer: "Yes! You can join a Free Trial Class before enrolling." },
        { question: "Can I access classes from abroad?", answer: "Definitely! Our online platform is accessible globally, perfect for Bangladeshi diaspora or international learners." },
    ];

    return (
        // NEW DESIGN: Use a clean off-white background
        <div className="bg-white text-gray-800">

            {/* Hero Section */}
            <motion.section
                className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 flex flex-col-reverse md:flex-row items-center gap-12 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-b-3xl shadow-inner"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                {/* Text */}
                <div className="flex-1 max-w-lg md:max-w-none">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
                        Online Quran <br className="hidden md:inline" /> <span className="text-indigo-600">Memorization Course</span> 2025
                    </h1>
                    <p className="text-lg text-gray-700 mb-8">
                        Looking to memorize the Quran from home? Madrasatu Nuurul ‘Ilm offers a structured Online Quran Memorization Course with **certified tutors**. Achieve Quranic mastery in 12–24 months with Tajweed guidance. Flexible and reliable for all ages.
                    </p>
                    <motion.button
                        className="bg-indigo-600 text-white px-8 py-4 text-lg font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition duration-300"
                        whileHover={{ scale: 1.05, boxShadow: "0 8px 15px rgba(79, 70, 229, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Enroll Now & Get a Free Trial
                    </motion.button>
                </div>

                {/* Image */}
                <div className="flex-1">
                    <img
                        src="/imgas/Bolog/1.jpeg"
                        alt="Online Quran Course"
                        // NEW DESIGN: Elevated shadow and modern rounded corners
                        className="w-full h-auto rounded-3xl shadow-2xl object-cover ring-4 ring-white"
                    />
                </div>
            </motion.section>

            {/* Why Choose Section (Features) */}
            <motion.section
                className="max-w-7xl mx-auto px-6 md:px-12 py-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-12">Why Choose Us?</h2>

                {/* Responsive Grid for Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Feature Card 1 */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-indigo-500 text-center hover:shadow-xl transition-all">
                        <BookOpen className="w-10 h-10 text-indigo-600 mx-auto mb-3" />
                        <h3 className="font-bold text-lg mb-1">Certified Tutors</h3>
                        <p className="text-gray-600 text-sm">Experienced teachers with deep religious knowledge.</p>
                    </div>
                    {/* Feature Card 2 */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-yellow-500 text-center hover:shadow-xl transition-all">
                        <Clock className="w-10 h-10 text-yellow-600 mx-auto mb-3" />
                        <h3 className="font-bold text-lg mb-1">Flexible Timings</h3>
                        <p className="text-gray-600 text-sm">Learn at your own pace from anywhere in the world.</p>
                    </div>
                    {/* Feature Card 3 */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-teal-500 text-center hover:shadow-xl transition-all">
                        <Zap className="w-10 h-10 text-teal-600 mx-auto mb-3" />
                        <h3 className="font-bold text-lg mb-1">Tajweed Focus</h3>
                        <p className="text-gray-600 text-sm">Proper pronunciation ensures correct memorization.</p>
                    </div>
                    {/* Feature Card 4 */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-red-500 text-center hover:shadow-xl transition-all">
                        <BookOpen className="w-10 h-10 text-red-600 mx-auto mb-3" />
                        <h3 className="font-bold text-lg mb-1">Global Access</h3>
                        <p className="text-gray-600 text-sm">Accessible worldwide, perfect for diaspora learners.</p>
                    </div>
                </div>
            </motion.section>

            ---

            {/* Course Structure Table */}
            <motion.div
                className="max-w-7xl mx-auto px-6 md:px-12 py-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-8">Detailed Course Structure</h2>
                {/* Responsive table container */}
                <div className="overflow-x-auto rounded-xl shadow-xl border border-gray-200">
                    <table className="min-w-full bg-white table-auto">
                        <thead>
                            {/* NEW DESIGN: Dark header for contrast */}
                            <tr className="bg-indigo-700 text-white text-left text-sm uppercase tracking-wider">
                                <th className="px-4 py-3 border-r border-indigo-600">Course Level</th>
                                <th className="px-4 py-3 border-r border-indigo-600 hidden sm:table-cell">Duration</th>
                                <th className="px-4 py-3">Focus Area</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courseStructure.map((course, index) => (
                                <tr key={index} className={`hover:bg-indigo-50 transition ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                    <td className="px-4 py-3 border-b font-medium text-gray-900">{course.level}</td>
                                    <td className="px-4 py-3 border-b hidden sm:table-cell text-gray-700">{course.duration}</td>
                                    <td className="px-4 py-3 border-b text-gray-700">{course.focus}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            ---

            {/* FAQs and Contact Form - Side-by-Side on Desktop */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* FAQs */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-gray-900">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            // NEW DESIGN: Accordion with subtle border and icon
                            <details key={i} className="border border-gray-200 rounded-xl p-4 bg-white shadow-md transition-all open:border-indigo-400">
                                <summary className="font-semibold cursor-pointer flex items-center justify-between text-lg text-gray-900">
                                    {faq.question}
                                    <ChevronDown className="w-5 h-5 ml-2 transform details-arrow transition-transform" />
                                </summary>
                                <p className="mt-3 text-gray-600 border-t pt-3">{faq.answer}</p>
                            </details>
                        ))}
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-gray-900">Join Free Trial / Contact</h2>
                    {/* NEW DESIGN: Clean, bordered form container */}
                    <div className="bg-white rounded-2xl shadow-2xl p-6 border border-indigo-100">
                        <p className="text-center text-gray-600 mb-6">Fill out the form to request a **free class** or ask any questions.</p>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Full Name"
                                required
                                className="w-full border-2 border-gray-200 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Your Email Address"
                                required
                                className="w-full border-2 border-gray-200 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                            />
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Your Message or Trial Request..."
                                rows={4}
                                className="w-full border-2 border-gray-200 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                            />
                            <motion.button
                                type="submit"
                                // NEW DESIGN: Green button for action/enrollment emphasis
                                className="bg-green-600 text-white px-8 py-3 font-bold rounded-xl shadow-md hover:bg-green-700 transition w-full"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Send Request
                            </motion.button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default OnlineQuranCourse;