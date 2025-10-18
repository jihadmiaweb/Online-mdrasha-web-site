import React, { FC, useState } from "react";
// Assuming you are using 'react-router-dom' for routing in a real application
// If you are using plain 'react-router', adjust the import path as necessary.
// For this example, we use a mock Link component if 'react-router-dom' isn't explicitly imported.
// In a real project, change this line to: import { Link } from "react-router-dom";
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

// Fallback/Placeholder for the Link component if react-router-dom is not used, ensuring anchor tags are rendered
// const Link = ({ to, className, children }) => <a href={to} className={className}>{children}</a>;

const Footer: FC = () => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    // Explicitly type the event for better TypeScript practice
    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            // In a real app, you'd send the email to your API here
            setSubmitted(true);
            setEmail("");
            setTimeout(() => setSubmitted(false), 3000); // 3-second notification
        }
    };

    return (
        <footer className="bg-gray-900 text-white py-12 md:py-16">
            <div className="container mx-auto px-6 md:px-8 max-w-7xl">
                {/* Main Content Grid: 2 columns on mobile/sm, 4 columns on medium/desktop */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8">

                    {/* 1. Educational Links */}
                    <div className="col-span-1">
                        <h3 className="font-bold text-lg mb-5 border-b-2 border-indigo-500/50 pb-2 text-indigo-400">
                            শিক্ষামূলক লিঙ্ক
                        </h3>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li><Link to="/courses" className="hover:text-white transition duration-200">কোর্সসমূহ</Link></li>
                            <li><Link to="/about" className="hover:text-white transition duration-200">আমাদের সম্পর্কে</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition duration-200">যোগাযোগ</Link></li>
                            <li><Link to="/blog" className="hover:text-white transition duration-200">ব্লগ</Link></li>
                        </ul>
                    </div>

                    {/* 2. Contact Info */}
                    <div className="col-span-1">
                        <h3 className="font-bold text-lg mb-5 border-b-2 border-indigo-500/50 pb-2 text-indigo-400">
                            যোগাযোগ
                        </h3>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li className="flex items-start">
                                📍 <span className="ml-2">ঢাকা, বাংলাদেশ</span>
                            </li>
                            <li className="flex items-start">
                                📞 <span className="ml-2">+8801XXXXXXXXX</span>
                            </li>
                            <li className="flex items-start">
                                📧 <span className="ml-2">info@madrasa.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* 3. Quick Links */}
                    <div className="col-span-1">
                        <h3 className="font-bold text-lg mb-5 border-b-2 border-indigo-500/50 pb-2 text-indigo-400">
                            দ্রুত লিঙ্ক
                        </h3>
                        <ul className="space-y-3 text-sm text-gray-300">
                            {/* Adjusted the 'to' prop for clarity */}
                            <li><Link to="/PrivacyPolicyAccordion" className="hover:text-white transition duration-200">গোপনীয়তা নীতি</Link></li>
                            <li><Link to="/TermsConditionsAccordion" className="hover:text-white transition duration-200">শর্তাবলী</Link></li>
                            <li><Link to="/GeneralFAQ" className="hover:text-white transition duration-200">সাধারণ জিজ্ঞাসা</Link></li>
                            <li><Link to="/InfoTabs" className="hover:text-white transition duration-200">শিক্ষকগণ</Link></li>
                        </ul>
                    </div>

                    {/* 4. Newsletter & Social Media */}
                    <div className="col-span-2 md:col-span-1">
                        <h3 className="font-bold text-lg mb-5 border-b-2 border-indigo-500/50 pb-2 text-indigo-400">
                            নিউজলেটার
                        </h3>
                        <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                            <p className="text-sm text-gray-400">গুরুত্বপূর্ণ আপডেট পেতে সাবস্ক্রাইব করুন।</p>
                            <input
                                type="email"
                                placeholder="আপনার ইমেইল লিখুন"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="px-4 py-3 rounded-lg text-gray-900 bg-gray-200 border-none focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition duration-200"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition duration-200 shadow-lg"
                            >
                                সাবস্ক্রাইব
                            </button>
                            {submitted && (
                                <p className="text-green-400 text-sm mt-1 font-semibold animate-pulse">
                                    সাবস্ক্রিপশন সফল হয়েছে! ধন্যবাদ।
                                </p>
                            )}
                        </form>

                        {/* Social Media Section */}
                        <h3 className="font-bold text-lg mt-8 mb-4 border-b-2 border-indigo-500/50 pb-2 text-indigo-400">
                            আমাদের অনুসরণ করুন
                        </h3>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <FaFacebook className="text-3xl hover:text-blue-500 transition duration-200" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <FaInstagram className="text-3xl hover:text-pink-500 transition duration-200" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <FaTwitter className="text-3xl hover:text-cyan-400 transition duration-200" />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="Youtube">
                                <FaYoutube className="text-3xl hover:text-red-600 transition duration-200" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
                    <p>&copy; 2025 মাদ্রাসা. সর্বস্বত্ব সংরক্ষিত। | Developed with ❤️ in Bangladesh</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;