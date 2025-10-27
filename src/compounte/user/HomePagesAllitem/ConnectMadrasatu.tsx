import React from "react";
import { motion } from "framer-motion";

function ConnectMadrasatu() {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-16 bg-gradient-to-r from-pink-50 via-white to-indigo-50">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                        Connect with <span className="text-green-600">Madrasatu Nuurul 'Ilm</span>
                    </h2>
                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                        Madrasatu Nuurul ‘Ilm এ আমরা নতুন ও অভিজ্ঞ উভয় শিক্ষার্থীর জন্য বিশেষভাবে তৈরি অনলাইন ইসলামিক কোর্স অফার করি। শিশু থেকে প্রাপ্তবয়স্ক—সবার জন্যই আমাদের কোর্সগুলোতে ব্যবহার করা হয় আধুনিক শিক্ষণ পদ্ধতি।
                    </p>
                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed mt-4">
                        আপনার যদি কোনো প্রশ্ন, পরামর্শ বা মতামত থাকে—আমরা তা শুনতে আগ্রহী। নিচের ফর্মটি পূরণ করে আমাদের বার্তা পাঠান, অথবা সরাসরি ইমেইল ও হোয়াটসঅ্যাপের মাধ্যমে যোগাযোগ করুন। আমরা দ্রুততম সময়ে আপনার কাছে সাড়া দেওয়ার চেষ্টা করব।
                    </p>
                    <p className="mt-4 text-gray-800 font-semibold">
                        📩 ইমেইল: <a href="mailto:madrasatunuurulilm912@gmail.com" className="text-blue-700 underline">madrasatunuurulilm912@gmail.com</a><br />
                        📞 হোয়াটসঅ্যাপ: <a href="https://wa.me/01834756502" target="_blank" rel="noopener noreferrer" className="text-green-700 underline">01834-756502</a>
                    </p>
                </motion.div>

                {/* Form & Follow Us */}
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.form
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8 }}
                        className="bg-white p-6 rounded-xl shadow-lg"
                    >
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Name</label>
                            <input type="text" id="name" placeholder="Your Name" className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
                            <input type="email" id="email" placeholder="Your Email Address" className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="whatsapp" className="block text-gray-700 font-medium mb-1">WhatsApp</label>
                            <input type="text" id="whatsapp" placeholder="Your WhatsApp Number" className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-gray-700 font-medium mb-1">Your Message</label>
                            <textarea id="message" placeholder="Type your message..." className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"></textarea>
                        </div>
                        <button type="submit" className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300">
                            Send Message
                        </button>
                    </motion.form>

                    {/* Follow Us */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8 }}
                        className="bg-white p-6 rounded-xl shadow-lg flex flex-col justify-center items-center"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Follow Us</h3>
                        <p className="text-gray-700 mb-4 text-center">
                            Stay connected and receive updates about new courses, events, and Islamic guidance.
                        </p>
                        <div className="flex space-x-4 text-2xl">
                            <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors"><i className="fab fa-facebook"></i> Facebook</a>
                            <a href="#" className="text-pink-500 hover:text-pink-700 transition-colors"><i className="fab fa-instagram"></i> Instagram</a>
                            <a href="#" className="text-blue-400 hover:text-blue-600 transition-colors"><i className="fab fa-twitter"></i> Twitter</a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default ConnectMadrasatu;
