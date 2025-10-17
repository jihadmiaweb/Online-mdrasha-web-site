// --- ContactSection.tsx ---
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Mail, Facebook, Instagram, MessageCircle, Send } from "lucide-react";
import { motion } from "framer-motion";

interface FormData {
    name: string;
    email: string;
    whatsapp: string;
    message: string;
}

type Status = 'success' | 'error' | 'loading' | null;

const ContactSection: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        whatsapp: "",
        message: "",
    });

    const [status, setStatus] = useState<Status>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        setTimeout(() => {
            if (Math.random() > 0.1) {
                setStatus('success');
                setFormData({ name: "", email: "", whatsapp: "", message: "" });
                setTimeout(() => setStatus(null), 5000);
            } else {
                setStatus('error');
                setTimeout(() => setStatus(null), 5000);
            }
        }, 1500);
    };

    const fadeInLeft = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } } };
    const fadeInRight = { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } } };

    return (
        <section className="bg-gradient-to-r from-blue-50 via-white to-green-50 py-16 px-5 sm:px-10 md:px-20 font-inter">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                {/* Left Section */}
                <motion.div className="space-y-6 p-6 bg-white md:bg-transparent rounded-xl shadow-lg md:shadow-none transition-shadow"
                    variants={fadeInLeft} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
                >
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4 border-b-2 border-green-600 pb-2">
                        Connect with <span className="text-green-700">Madrasatu Nuurul 'Ilm</span>
                    </h2>

                    <p className="text-gray-700 leading-relaxed text-lg">
                        Madrasatu Nuurul ‘Ilm এ আমরা নতুন ও অভিজ্ঞ উভয় শিক্ষার্থীর জন্য বিশেষভাবে তৈরি অনলাইন ইসলামিক কোর্স অফার করি। শিশু থেকে প্রাপ্তবয়স্ক—সবার জন্যই আমাদের কোর্সগুলোতে ব্যবহার করা হয় আধুনিক শিক্ষণ পদ্ধতি।
                    </p>

                    <p className="text-gray-700 leading-relaxed">
                        আপনার যদি কোনো প্রশ্ন, পরামর্শ বা মতামত থাকে—আমরা তা শুনতে আগ্রহী। নিচের ফর্মটি পূরণ করে আমাদের বার্তা পাঠান, অথবা সরাসরি ইমেইল ও হোয়াটসঅ্যাপের মাধ্যমে যোগাযোগ করুন। আমরা দ্রুততম সময়ে আপনার কাছে সাড়া দেওয়ার চেষ্টা করব।
                    </p>

                    {/* Contact Info */}
                    <div className="space-y-3 text-gray-800 p-4 bg-green-100 rounded-lg border-l-4 border-green-600 shadow-md">
                        <h3 className="font-bold text-lg text-green-800">আমাদের সাথে যোগাযোগ করুন:</h3>
                        <p className="flex items-center">
                            <Mail className="text-green-700 mr-2 min-w-[20px] h-5 w-5" />
                            <span className="font-medium">madrasatunuurulilm912@gmail.com</span>
                        </p>
                        <p className="flex items-center">
                            <MessageCircle className="text-green-700 mr-2 min-w-[20px] h-5 w-5" />
                            <span className="font-medium">01834-756502</span>
                        </p>
                    </div>

                    {/* Social Links */}
                    <motion.div className="flex gap-5 mt-6 pt-2 border-t border-gray-200"
                        transition={{ delay: 0.5, staggerChildren: 0.1 }}
                    >
                        <motion.a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer"
                            className="text-blue-600 text-3xl hover:text-blue-800 transition transform hover:scale-110"
                            initial={{ scale: 0 }} animate={{ scale: 1 }}><Facebook size={32} /></motion.a>
                        <motion.a href="https://instagram.com/yourpage" target="_blank" rel="noopener noreferrer"
                            className="text-pink-600 text-3xl hover:text-pink-800 transition transform hover:scale-110"
                            initial={{ scale: 0 }} animate={{ scale: 1 }}><Instagram size={32} /></motion.a>
                        <motion.a href="https://wa.me/8801834756502" target="_blank" rel="noopener noreferrer"
                            className="text-green-600 text-3xl hover:text-green-800 transition transform hover:scale-110"
                            initial={{ scale: 0 }} animate={{ scale: 1 }}><MessageCircle size={32} /></motion.a>
                        <motion.a href="mailto:madrasatunuurulilm912@gmail.com"
                            className="text-gray-700 text-3xl hover:text-gray-900 transition transform hover:scale-110"
                            initial={{ scale: 0 }} animate={{ scale: 1 }}><Mail size={32} /></motion.a>
                    </motion.div>

                    {/* Map + Video side by side */}

                </motion.div>

                {/* Right Section: Contact Form */}
                <motion.div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-8 border-t-4 border-green-600 relative h-fit"
                    variants={fadeInRight} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
                >
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">যোগাযোগ ফর্ম</h3>
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <InputField label="Name" name="name" value={formData.name} onChange={handleChange} required placeholder="আপনার নাম লিখুন" />
                        <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="আপনার ইমেইল ঠিকানা" />
                        <InputField label="WhatsApp" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="আপনার WhatsApp নম্বর (ঐচ্ছিক)" />
                        <TextareaField label="Your Message" name="message" value={formData.message} onChange={handleChange} required placeholder="আপনার বার্তা লিখুন..." rows={5} />

                        <motion.button type="submit" disabled={status === 'loading'}
                            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                            className={`w-full font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 text-lg ${status === 'loading'
                                ? "bg-gray-400 cursor-not-allowed text-gray-700"
                                : "bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-200"
                                }`}
                        >
                            {status === 'loading' ? <>পাঠানো হচ্ছে... <Spinner /></> : <>Send Message <Send className="ml-2 h-4 w-4" /></>}
                        </motion.button>

                        {status && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                className={`text-center p-3 rounded-xl font-medium mt-4 border-2 ${status === 'success' ? 'bg-green-100 text-green-700 border-green-300' : 'bg-red-100 text-red-700 border-red-300'}`}>
                                {status === 'success' ? '✅ আপনার বার্তা সফলভাবে পাঠানো হয়েছে!' : '❌ দুঃখিত, বার্তা পাঠাতে সমস্যা হয়েছে। আবার চেষ্টা করুন।'}
                            </motion.div>
                        )}
                    </form>
                </motion.div>
            </div>

            <div className="mt-8 flex flex-col md:flex-row gap-6 justify-between items-center">

                {/* Map */}
                <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-green-500 w-full md:w-[500px]">
                    <h3 className="text-center bg-green-600 text-white p-2 font-semibold">আমাদের অবস্থান</h3>
                    <div className="relative w-full" style={{ paddingBottom: '75%' }}>
                        <iframe
                            title="Madrasatu Nuurul 'Ilm Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.2774900000003!2d90.395123!3d23.746000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b854379a0001%3A0x1d54f67c4585e1!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                            className="absolute top-0 left-0 w-full h-full border-0"
                            allowFullScreen
                            loading="lazy"
                        />
                    </div>
                </div>

                {/* Video */}
                <motion.div
                    className="rounded-xl overflow-hidden shadow-lg border-4 border-green-500 w-full md:w-[500px]"
                    variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <h3 className="text-center bg-green-600 text-white p-2 font-semibold">কোরআন টিউটোরিয়াল ভিডিও</h3>
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                        <iframe
                            title="Quran Tutorial"
                            src="https://www.youtube.com/embed/[YOUR_VIDEO_ID]"
                            className="absolute top-0 left-0 w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </motion.div>

            </div>

        </section>
    );
};

// --- Reusable Input / Textarea Components ---
const InputField = ({ label, name, value, onChange, required, placeholder, type = "text" }: any) => (
    <div>
        <label className="block text-gray-700 mb-1 font-medium">{label}{required && <span className="text-red-500">*</span>}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-200 focus:border-green-500 outline-none transition duration-300 placeholder-gray-500"
        />
    </div>
);

const TextareaField = ({ label, name, value, onChange, required, placeholder, rows }: any) => (
    <div>
        <label className="block text-gray-700 mb-1 font-medium">{label}{required && <span className="text-red-500">*</span>}</label>
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            rows={rows}
            placeholder={placeholder}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-200 focus:border-green-500 outline-none transition duration-300 resize-none placeholder-gray-500"
        />
    </div>
);

const Spinner = () => (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4}></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

export default ContactSection;
