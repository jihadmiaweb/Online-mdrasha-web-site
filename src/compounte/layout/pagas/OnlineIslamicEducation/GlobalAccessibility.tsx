import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Globe, BookOpen, UserCheck, Eye, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// === TypeScript Types ===
type IslamicTopic = {
    id: number;
    to: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    cta: string;
};

type FormData = {
    name: string;
    email: string;
    phone: string;
};

// === Islamic Topics Data ===
const islamicTopics: IslamicTopic[] = [
    {
        id: 1,
        to: "/QuranTajweedCourse",
        title: "কোরআন শিক্ষা ও তাজবীদ",
        description:
            "কোরআন সঠিকভাবে পড়া, উচ্চারণ এবং তাফসীর শেখার জন্য সহজ ও অন্তর্ভুক্তিমূলক কোর্স।",
        icon: BookOpen,
        cta: "কোর্স শুরু করুন",
    },
    {
        id: 2,
        to: "/SirahHistory",
        title: "সীরাহ ও ইসলামী ইতিহাস",
        description:
            "নবী মুহাম্মদ (সাঃ)-এর জীবনী, শিক্ষা ও ইসলামের ইতিহাসের গুরুত্বপূর্ণ অধ্যয়ন।",
        icon: Globe,
        cta: "সীরাহ পড়ুন",
    },
    {
        id: 3,
        to: "/NamazFiqhGuide",
        title: "নামাজ ও ফিকাহ নির্দেশিকা",
        description:
            "সবার জন্য নামাজের সহজ নির্দেশিকা এবং বিভিন্ন পরিস্থিতিতে ফিকাহ ব্যাখ্যা।",
        icon: UserCheck,
        cta: "নির্দেশিকা দেখুন",
    },
    {
        id: 4,
        to: "/IslamicEthicsBehavior",
        title: "ইসলামিক নৈতিকতা ও আচরণ",
        description:
            "দৈনন্দিন জীবনে অনুসরণযোগ্য ইসলামিক নীতি, আদব ও সামাজিক আচরণের শিক্ষা।",
        icon: Eye,
        cta: "বিস্তারিত জানুন",
    },
];

// === Framer Motion Variants ===
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 120, damping: 18 },
    },
};

// === Topic Card ===
const TopicCard = ({ topic }: { topic: IslamicTopic }) => {
    const Icon = topic.icon;
    return (
        <motion.div
            variants={itemVariants}
            whileHover={{
                y: -8,
                scale: 1.03,
                boxShadow: "0 25px 45px -15px rgba(16,185,129,0.3)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="bg-white/90 backdrop-blur-md rounded-3xl p-7 shadow-lg border border-emerald-100 flex flex-col justify-between hover:scale-[1.02] transition-all duration-300"
        >
            <div>
                <motion.div
                    className="flex items-center justify-center w-14 h-14 rounded-xl bg-emerald-50 text-emerald-600 shadow-md mb-4"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                >
                    <Icon className="w-7 h-7" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 leading-snug">
                    {topic.title}
                </h3>
                <p className="text-gray-600 text-base mb-6">{topic.description}</p>
            </div>

            <Link
                to={topic.to}
                className="flex items-center text-emerald-600 font-semibold text-sm group"
            >
                {topic.cta || "আরো জানুন"}
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
        </motion.div>
    );
};

// === Main Component ===
export default function IslamicAccessibility() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
    });
    const [error, setError] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.phone) {
            setError("অনুগ্রহ করে সব ঘর পূরণ করুন।");
            return;
        }

        setError("");
        setLoading(true);

        // Fake delay to simulate submission
        await new Promise((res) => setTimeout(res, 2000));

        setLoading(false);
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "" });

        setTimeout(() => setSubmitted(false), 4000);
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-white via-emerald-50 to-teal-50 flex flex-col items-center py-16 px-4 sm:px-8 lg:px-12 font-['Inter']">
            <div className="max-w-7xl w-full">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight"
                    >
                        সবার জন্য <span className="text-emerald-600">সহজ ইসলামিক শিক্ষা</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-lg sm:text-xl text-gray-500 max-w-3xl mx-auto"
                    >
                        আমরা এমন একটি প্ল্যাটফর্ম তৈরি করতে চাই যা কোনো বাধা ছাড়াই জ্ঞান অর্জনে সাহায্য করবে।
                    </motion.p>
                </div>

                {/* Topics Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
                >
                    {islamicTopics.map((topic) => (
                        <TopicCard key={topic.id} topic={topic} />
                    ))}
                </motion.div>

                {/* Contact / Enroll Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-emerald-100"
                >
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        ভর্তি বা যোগাযোগ ফর্ম
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            aria-label="আপনার নাম"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="আপনার নাম"
                            required
                            autoComplete="off"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                        <input
                            aria-label="ইমেইল"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="ইমেইল"
                            required
                            autoComplete="off"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                        <input
                            aria-label="মোবাইল নাম্বার"
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="মোবাইল নাম্বার"
                            required
                            autoComplete="off"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none sm:col-span-2"
                        />
                    </div>

                    {error && (
                        <p className="text-center text-red-600 font-medium mt-4">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`mt-6 w-full py-3 rounded-xl font-semibold transition-all duration-300 ${loading
                                ? "bg-emerald-400 cursor-not-allowed text-white"
                                : "bg-emerald-600 hover:bg-emerald-700 text-white"
                            }`}
                    >
                        {loading ? "পাঠানো হচ্ছে..." : "আবেদন পাঠান"}
                    </button>

                    {submitted && (
                        <p className="text-center text-green-600 font-medium mt-4">
                            ✅ আপনার আবেদন সফলভাবে জমা হয়েছে!
                        </p>
                    )}
                </motion.form>
            </div>
        </section>
    );
}
