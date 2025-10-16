
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { useState } from "react";

function Footer() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
            setEmail("");
            setTimeout(() => setSubmitted(false), 3000); // 3 সেকেন্ডের নোটিফিকেশন
        }
    };

    return (
        <footer className="bg-gray-800 text-white py-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">

                    {/* Educational Links */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">শিক্ষামূলক লিঙ্ক</h3>
                        <ul>
                            <li><a href="/courses" className="hover:underline">কোর্সসমূহ</a></li>
                            <li><a href="/about" className="hover:underline">আমাদের সম্পর্কে</a></li>
                            <li><a href="/contact" className="hover:underline">যোগাযোগ</a></li>
                            <li><a href="/blog" className="hover:underline">ব্লগ</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">যোগাযোগ</h3>
                        <ul>
                            <li>📍 ঢাকা, বাংলাদেশ</li>
                            <li>📞 +8801XXXXXXXXX</li>
                            <li>📧 info@madrasa.com</li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">দ্রুত লিঙ্ক</h3>
                        <ul>
                            <li><a href="/privacy" className="hover:underline">গোপনীয়তা নীতি</a></li>
                            <li><a href="/terms" className="hover:underline">শর্তাবলী</a></li>
                            <li><a href="/faq" className="hover:underline">সাধারণ জিজ্ঞাসা</a></li>
                        </ul>
                    </div>

                    {/* Newsletter & Social Media */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">নিউজলেটার</h3>
                        <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                            <input
                                type="email"
                                placeholder="আপনার ইমেইল লিখুন"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg"
                            >
                                সাবস্ক্রাইব
                            </button>
                            {submitted && <p className="text-green-400 text-sm mt-1">সাবস্ক্রিপশন সফল হয়েছে!</p>}
                        </form>

                        <h3 className="font-semibold text-lg mt-6 mb-4">আমাদের অনুসরণ করুন</h3>
                        <div className="flex space-x-3">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <FaFacebook className="text-2xl hover:text-blue-600" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <FaInstagram className="text-2xl hover:text-pink-600" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <FaTwitter className="text-2xl hover:text-blue-400" />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                                <FaYoutube className="text-2xl hover:text-red-600" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-10 text-center text-sm text-gray-400">
                    <p>&copy; 2025 মাদ্রাসা. সর্বস্বত্ব সংরক্ষিত।</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
