"use client";

import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react"; // Added ArrowRight
import type { JSX } from "react";
import { Link } from "react-router-dom";

// --- Interface for Type Safety ---
interface FiqhTopic {
    id: number;
    to: string;
    title: string;
    description: string;
    icon: JSX.Element;
}

const fiqhTopics: FiqhTopic[] = [
    {
        id: 1,
        to: "/NamazGuide",
        title: "নামাজ ও ওয়াজিব দায়িত্ব",
        description:
            "দৈনন্দিন নামাজের সময় ও নিয়ম, ফারজ ও সুননের পার্থক্য, নামাজের পূর্ব প্রস্তুতি।",
        icon: <BookOpen className="w-8 h-8 text-emerald-500" />,
    },
    {
        id: 2,
        // FIX: Added a valid example route; empty 'to' prop is valid but not useful
        to: "/RozaGuide",
        title: "রোজা ও ইফতার",
        description:
            "সিয়াম পালন, সুহুর ও ইফতার করার নিয়ম, হারাম-হালাল খাবারের বিধি।",
        icon: <BookOpen className="w-8 h-8 text-emerald-500" />,
    },
    {
        id: 3,

        to: "/ZakatAndDonation",
        title: "যাকাত ও দান",
        description:
            "যাকাতের হিসাব, দান-সদকার নিয়ম ও সমাজে প্রভাব।",
        icon: <BookOpen className="w-8 h-8 text-emerald-500" />,
    },
    {
        id: 4,
        to: "/HalalHaramGuide",
        title: "হালাল ও হারাম",
        description:
            "খাদ্য, বাণিজ্য ও দৈনন্দিন জীবনের হালাল ও হারাম বিষয়াবলি।",
        icon: <BookOpen className="w-8 h-8 text-emerald-500" />,
    },
    {
        id: 5,
        to: "/IslamicEthics",
        title: "দুই-মুখী আচরণ ও নৈতিকতা",
        description:
            "ইসলামিক নৈতিকতা ও সামাজিক আচরণের বিধি।",
        icon: <BookOpen className="w-8 h-8 text-emerald-500" />,
    },
];

const FiqhSection = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
            <div className="max-w-7xl mx-auto"> {/* Increased max-width for better spacing on large screens */}
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl font-extrabold text-center text-emerald-800 mb-4"
                >
                    ইসলামিক ফিকহ (Fiqh)
                </motion.h2>
                <p className="text-center text-gray-600 mb-12 text-lg max-w-3xl mx-auto">
                    দৈনন্দিন জীবনে প্রয়োজনীয় ইসলামিক আইন ও বিধিবিধান সম্পর্কে মৌলিক জ্ঞান।
                </p>

                {/* Grid is fully responsive: 1 col on mobile, 2 on small, 3 on large */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {fiqhTopics.map((topic) => (
                        <motion.div
                            key={topic.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }} // amount: 0.2 means trigger when 20% visible
                            transition={{ type: "spring", stiffness: 100, duration: 0.6 }}
                            className="h-full" // Ensure div takes full height for consistent card size
                        >
                            {/* IMPROVEMENT: Wrap the entire card in the Link for a better click target */}
                            <Link
                                to={topic.to}
                                className="block h-full bg-white p-6 rounded-2xl shadow-xl border-t-4 border-transparent hover:border-emerald-500 flex flex-col items-start transition-all duration-300 transform hover:scale-[1.02] active:scale-100 group"
                            >
                                <div className="mb-4 p-3 bg-emerald-50 rounded-full">{topic.icon}</div>
                                <h3 className="text-xl font-bold text-emerald-800 mb-2 transition-colors group-hover:text-emerald-900">
                                    {topic.title}
                                </h3>
                                <p className="text-gray-600 flex-grow mb-4 text-base">{topic.description}</p>

                                {/* Call to Action at the bottom */}
                                <div className="mt-auto flex items-center text-emerald-600 font-bold transition-all group-hover:text-emerald-700 group-hover:gap-1">
                                    <span>বিস্তারিত পড়ুন</span>
                                    <ArrowRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FiqhSection;