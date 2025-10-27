import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "emailjs-com";
import { FaClipboardList, FaChalkboardTeacher, FaCheckCircle, FaBookOpen } from "react-icons/fa"; // FaBookOpen added for About Us

// ---- Steps Data (for the responsive grid) ----
const steps = [
    {
        id: 1,
        icon: <FaClipboardList className="text-blue-600 text-4xl mb-3" />,
        title: "ফর্ম পূরণ করুন।",
        desc: "সহজ কয়েকটি ধাপে আপনার নাম, দেশ এবং হোয়াটসঅ্যাপ নম্বর দিয়ে ফর্ম পূরণ করুন।",
    },
    {
        id: 2,
        icon: <FaChalkboardTeacher className="text-green-600 text-4xl mb-3" />,
        title: "বিনামূল্যে ট্রায়াল ক্লাসের অভিজ্ঞতা নিন!",
        desc: "আমাদের অভিজ্ঞ শিক্ষক-শিক্ষিকাদের সাথে একদিনের ক্লাসে অংশ নিন এবং পার্থক্য অনুভব করুন।",
    },
    {
        id: 3,
        icon: <FaCheckCircle className="text-yellow-600 text-4xl mb-3" />,
        title: "তারপর আপনি আমাদের বেছে নিন",
        desc: "ট্রায়াল ক্লাসে সন্তুষ্ট হলে সহজেই আপনার পছন্দের কোর্সে ভর্তি হয়ে যান।",
    },
];

// ---- Country List (Shortened for demonstration, use full list if needed) ----
const countries = ["Bangladesh", "India", "Pakistan", "Saudi Arabia", "United Kingdom (UK)", "United States (US)", "Malaysia", "Canada", "Qatar", "UAE", "Germany", "Australia", "South Africa"];

const FreeTrialJoinForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        gender: "",
        whatsapp: "",
        country: "",
        facebook: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState(false);

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle submit
    interface EmailJSError {
        text: string;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setSubmitError(false);
        setSubmitted(false);

        // ⚠️ REMINDER: Replace with your actual EmailJS credentials
        const SERVICE_ID: string = "YOUR_SERVICE_ID";
        const TEMPLATE_ID: string = "YOUR_TEMPLATE_ID";
        const PUBLIC_KEY: string = "YOUR_PUBLIC_KEY";

        emailjs
            .send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY)
            .then(
                () => {
                    setSubmitted(true);
                    setFormData({ name: "", gender: "", whatsapp: "", country: "", facebook: "" });
                    setLoading(false);
                    setTimeout(() => setSubmitted(false), 4000);
                },
                (error: EmailJSError) => {
                    console.error("EmailJS Error:", error);
                    setSubmitError(true);
                    setLoading(false);
                    setTimeout(() => setSubmitError(false), 4000);
                }
            );
    };

    return (
        <>
            {/* ------------------ FORM SECTION ------------------ */}
            <section className="py-16 px-4 sm:px-6 md:px-12 bg-gradient-to-r from-green-50 via-white to-green-100">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-10"
                    >
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-green-800 mb-4">
                            ফ্রি ট্রায়াল ক্লাসে যুক্ত হতে নিচের দেয়া সম্পূর্ণ ফরমটি পূরণ করুন
                        </h2>
                        <p className="text-gray-700 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
                            উচ্চমানের শিক্ষাদানের অভিজ্ঞতা অর্জন করুন এবং দেখুন কিভাবে আমাদের কোর্সগুলি আপনার ইসলামের বোধগম্যতা এবং অনুশীলনকে সমৃদ্ধ করতে পারে।
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-10 items-start">
                        {/* Left Info - Combined Intro & About Us */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="p-6 md:p-8 bg-white rounded-xl shadow-lg border border-green-200"
                        >
                            <h3 className="text-2xl font-bold text-green-700 mb-4 border-b pb-2 border-green-300">
                                একদিনের ফ্রি ট্রায়াল ক্লাস! 🎉
                            </h3>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                যেখানে আপনি নিজেই অনুভব করতে পারবেন — **আমাদের ক্লাসের মান, অভিজ্ঞ শিক্ষক-শিক্ষিকার আন্তরিকতা, আর এক মনোমুগ্ধকর শিক্ষার পরিবেশ।** নিজ চোখে দেখে নিন কেন শত শত শিক্ষার্থী আমাদের সঙ্গে থেকে নামাজ ও ইসলামী শিক্ষা অর্জন করছে — সম্পূর্ণ আস্থার সঙ্গে! 🌙✨
                            </p>

                            <div className="bg-green-50 p-5 rounded-xl border border-green-200">
                                <h4 className="font-semibold text-xl text-green-900 mb-3 flex items-center">
                                    <FaBookOpen className="text-green-700 mr-2" />
                                    About Us
                                </h4>
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    **Madrasatu Nuurul ‘Ilm** একটি বিস্তৃত অনলাইন প্ল্যাটফর্ম যা সকল বয়স এবং লিঙ্গের শিক্ষার্থীদের উচ্চমানের ইসলামিক শিক্ষা প্রদান করে। আমাদের কোর্সগুলিতে কুরআন অধ্যয়ন, হাদিস, ফিকাহ এবং ইসলামিক ইতিহাস সহ বিস্তৃত বিষয় অন্তর্ভুক্ত রয়েছে, যা অভিজ্ঞ **হাফিজ, হাফিজা, মু’আল্লিম এবং মু’আল্লিমা** দ্বারা শেখানো হয়। আমরা ইন্টারেক্টিভ এবং আকর্ষণীয় শেখার অভিজ্ঞতার উপর জোর দিই, যা আপনার সময়সূচীর সাথে সামঞ্জস্যপূর্ণ নমনীয়তা এবং অ্যাক্সেসযোগ্যতা প্রদান করে। একটি অন্তর্ভুক্তিমূলক এবং সহায়ক পরিবেশে ইসলাম সম্পর্কে আপনার বোধগম্যতা আরও গভীর করতে আমাদের প্রাণবন্ত সম্প্রদায়ে যোগদান করুন। আমাদের শিক্ষার মান সরাসরি অভিজ্ঞতা অর্জনের জন্য আজই বিনামূল্যে ট্রায়াল ক্লাসে যোগদান করুন।
                                </p>
                            </div>
                        </motion.div>

                        {/* Right Section - Form */}
                        <motion.form
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl border-t-4 border-green-600 relative"
                        >
                            {/* Form Fields */}
                            {/* Name */}
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 font-medium mb-1">আপনার নাম <span className="text-red-500">*</span></label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="আপনার পুরো নাম লিখুন" className="w-full border rounded-md p-3 focus:ring-green-500 focus:border-green-500 transition duration-150" />
                            </div>

                            {/* WhatsApp */}
                            <div className="mb-4">
                                <label htmlFor="whatsapp" className="block text-gray-700 font-medium mb-1">হোয়াটসঅ্যাপ নাম্বার <span className="text-red-500">*</span></label>
                                <input type="text" id="whatsapp" name="whatsapp" value={formData.whatsapp} onChange={handleChange} required placeholder="দেশের কোড সহ হোয়াটসঅ্যাপ নাম্বার দিন (যেমন: +88017...)" className="w-full border rounded-md p-3 focus:ring-green-500 focus:border-green-500 transition duration-150" />
                            </div>

                            {/* Gender */}
                            <div className="mb-4">
                                <label htmlFor="gender" className="block text-gray-700 font-medium mb-1">Gender <span className="text-red-500">*</span></label>
                                <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required className="w-full border rounded-md p-3 bg-white focus:ring-green-500 focus:border-green-500 transition duration-150 appearance-none">
                                    <option value="">-- নির্বাচন করুন --</option>
                                    <option value="Male">পুরুষ</option>
                                    <option value="Female">মহিলা</option>
                                    <option value="Other">অন্যান্য</option>
                                </select>
                            </div>

                            {/* Country */}
                            <div className="mb-4">
                                <label htmlFor="country" className="block text-gray-700 font-medium mb-1">দেশ নির্বাচন করুন <span className="text-red-500">*</span></label>
                                <select id="country" name="country" value={formData.country} onChange={handleChange} required className="w-full border rounded-md p-3 bg-white focus:ring-green-500 focus:border-green-500 transition duration-150 appearance-none">
                                    <option value="">-- আপনার দেশ নির্বাচন করুন --</option>
                                    {countries.map((c) => (<option key={c} value={c}>{c}</option>))}
                                </select>
                            </div>

                            {/* Facebook */}
                            <div className="mb-6">
                                <label htmlFor="facebook" className="block text-gray-700 font-medium mb-1">ফেসবুক লিংক (ঐচ্ছিক)</label>
                                <input type="text" id="facebook" name="facebook" value={formData.facebook} onChange={handleChange} placeholder="ফেসবুক প্রোফাইল লিংক" className="w-full border rounded-md p-3 focus:ring-green-500 focus:border-green-500 transition duration-150" />
                            </div>

                            {/* Submit Button */}
                            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className={`w-full font-bold py-3 px-6 rounded-lg shadow-xl transition-all duration-300 flex items-center justify-center ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-700 hover:bg-green-800 text-white"}`}>
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        পাঠানো হচ্ছে...
                                    </>
                                ) : (
                                    "ফর্মটি জমা দিন এবং ট্রায়াল ক্লাসে যুক্ত হন"
                                )}
                            </motion.button>

                            {/* Status Toast */}
                            <AnimatePresence>
                                {submitted && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-md shadow-xl font-medium whitespace-nowrap">✅ ধন্যবাদ! আপনার ফর্ম সফলভাবে জমা হয়েছে।</motion.div>)}
                                {submitError && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-md shadow-xl font-medium whitespace-nowrap">❌ দুঃখিত, ফর্মে কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।</motion.div>)}
                            </AnimatePresence>
                        </motion.form>
                    </div>
                </div>
            </section>

            {/* ------------------ STEPS SECTION ------------------ */}
            <section className="bg-gradient-to-r from-blue-50 via-white to-indigo-50 py-20 px-4 sm:px-6 md:px-12 text-center">
                <motion.h2
                    className="text-3xl sm:text-4xl md:text-4xl font-extrabold text-green-800 mb-12"
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    আপনার শেখার যাত্রা মাত্র ৩টি সহজ ধাপে!
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-indigo-400 hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-md">
                                {step.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">{step.title}</h3>
                            <p className="text-gray-600 text-base">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default FreeTrialJoinForm;