import React, { useState } from "react";
import { motion, type Variants, } from "framer-motion";
import { CheckCircle, BookOpen, Award, Globe, UserCheck, ArrowRight } from "lucide-react";

// === Authentic & Accredited Education Data ===
const educationData = [
    {
        id: 1,
        title: "প্রামাণিক শিক্ষা",
        description:
            "আমাদের কোর্সগুলো নির্ভরযোগ্য উৎস থেকে যাচাইকৃত এবং আন্তর্জাতিক শিক্ষামূলক মান বজায় রাখে।",
        icon: BookOpen,
        color: "bg-emerald-50 text-emerald-600",
    },
    {
        id: 2,
        title: "স্বীকৃত সার্টিফিকেট",
        description:
            "আমাদের শিক্ষা প্রতিষ্ঠান এবং প্রদত্ত সার্টিফিকেটগুলো আন্তর্জাতিক সংস্থা দ্বারা স্বীকৃত ও মূল্যবান।",
        icon: Award,
        color: "bg-fuchsia-50 text-fuchsia-600",
    },
    {
        id: 3,
        title: "বিশ্বব্যাপী সম্প্রদায়",
        description:
            "শিক্ষার্থীরা বিশ্বের যেকোনো প্রান্ত থেকে আমাদের কোর্সে অংশগ্রহণ করতে পারে এবং একটি বৈশ্বিক নেটওয়ার্ক তৈরি করতে পারে।",
        icon: Globe,
        color: "bg-sky-50 text-sky-600",
    },
    {
        id: 4,
        title: "দক্ষ ও বিশ্বস্ত শিক্ষকেরা",
        description:
            "প্রত্যেকটি কোর্সে অভিজ্ঞ, উচ্চ-যোগ্যতাসম্পন্ন এবং ইসলামি জ্ঞানসম্পন্ন শিক্ষকেরা শিক্ষাদান নিশ্চিত করেন।",
        icon: UserCheck,
        color: "bg-amber-50 text-amber-600",
    },
];

// Motion Variants
// Variants টাইপ ব্যবহার করে সংজ্ঞায়িত করা হলো
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

// Variants টাইপ ব্যবহার করে সংজ্ঞায়িত করা হলো
const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 150, damping: 22 } },
};

// === Card Component ===
// TypeScript টাইপিং
type EducationItem = {
    id: number;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
};

const EducationCard = ({ item }: { item: EducationItem }) => {
    const Icon = item.icon;
    return (
        <motion.div
            variants={itemVariants}
            whileHover={{
                y: -10,
                scale: 1.03,
                boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.4)",
                transition: { type: "spring", stiffness: 200, damping: 15 },
            }}
            className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-gray-100/70 cursor-pointer flex flex-col justify-start h-full transition-all duration-300 transform hover:ring-8 hover:ring-emerald-400/30 overflow-hidden"
        >
            <div className={`${item.color} flex items-center justify-center w-16 h-16 rounded-2xl shadow-xl mb-6 flex-shrink-0`}>
                <Icon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl sm:text-2xl font-black mb-3 text-gray-900 leading-tight">{item.title}</h3>
            <p className="text-gray-600 text-base md:text-lg flex-grow mb-4">{item.description}</p>
            <a href="#" className="mt-auto text-emerald-600 font-bold flex items-center text-sm group transition-colors hover:text-emerald-800">
                বিস্তারিত দেখুন
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </a>
        </motion.div>
    );
};

// === Main Component ===
export default function AuthenticEducation() {
    const [formData, setFormData] = useState({ name: "", email: "" });
    const [submitted, setSubmitted] = useState(false);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.name && formData.email) {
            setSubmitted(true);
            setFormData({ name: "", email: "" });
            setTimeout(() => setSubmitted(false), 4000);
        }
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-white via-emerald-50 to-teal-100 flex flex-col items-center py-20 px-4 sm:px-8 lg:px-12 font-['Inter'] relative overflow-hidden">
            {/* Background Shapes */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-300/20 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-300/20 rounded-full filter blur-3xl opacity-30 animate-pulse-slow"></div>

            <div className="max-w-7xl w-full relative z-10">
                {/* Header */}
                <div className="text-center mb-16 lg:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center text-sm font-semibold text-emerald-800 bg-emerald-200/50 py-2 px-5 rounded-full mb-4 shadow-inner"
                    >
                        <CheckCircle className="w-4 h-4 mr-2 text-emerald-600" />
                        গুণগত মান এবং বিশ্বস্ততার অঙ্গীকার
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 tracking-tighter"
                    >
                        প্রামাণিক ও <span className="text-emerald-600">স্বীকৃত শিক্ষা</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl sm:text-2xl text-gray-500 max-w-4xl mx-auto font-light"
                    >
                        আমাদের কোর্স, শিক্ষক এবং সার্টিফিকেটগুলো নিশ্চিত করে শিক্ষার্থীরা পাবেন বিশ্বস্ত এবং স্বীকৃত শিক্ষা।
                    </motion.p>
                </div>

                {/* Cards Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
                >
                    {educationData.map((item) => (
                        <EducationCard key={item.id} item={item} />
                    ))}
                </motion.div>

                {/* Enrollment Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-gray-100"
                >
                    <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">নিবন্ধন করুন</h3>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="আপনার নাম"
                            required
                            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="আপনার ইমেইল"
                            required
                            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                        <button
                            type="submit"
                            className="mt-2 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all"
                        >
                            এখনই নিবন্ধন করুন
                        </button>
                        {submitted && <p className="text-green-600 text-center font-medium mt-2">✅ আপনার আবেদন সফলভাবে জমা হয়েছে!</p>}
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
