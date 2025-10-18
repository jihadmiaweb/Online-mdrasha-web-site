"use client";

import { motion } from "framer-motion";
import { BookOpen, CheckCircle } from "lucide-react";

const fiqhTopics = [
    {
        id: 1,
        title: "নামাজ ও ওয়াজিব দায়িত্ব",
        description:
            "দৈনন্দিন নামাজের সময় ও নিয়ম, ফারজ ও সুননের পার্থক্য, নামাজের পূর্ব প্রস্তুতি।",
        icon: <BookOpen className="w-8 h-8 text-emerald-500" />,
    },
    {
        id: 2,
        title: "রোজা ও ইফতার",
        description:
            "সিয়াম পালন, সুহুর ও ইফতার করার নিয়ম, হারাম-হালাল খাবারের বিধি।",
        icon: <BookOpen className="w-8 h-8 text-emerald-500" />,
    },
    {
        id: 3,
        title: "যাকাত ও দান",
        description:
            "যাকাতের হিসাব, দান-সদকার নিয়ম ও সমাজে প্রভাব।",
        icon: <BookOpen className="w-8 h-8 text-emerald-500" />,
    },
    {
        id: 4,
        title: "হালাল ও হারাম",
        description:
            "খাদ্য, বাণিজ্য ও দৈনন্দিন জীবনের হালাল ও হারাম বিষয়াবলি।",
        icon: <BookOpen className="w-8 h-8 text-emerald-500" />,
    },
    {
        id: 5,
        title: "দুই-মুখী আচরণ ও নৈতিকতা",
        description:
            "ইসলামিক নৈতিকতা ও সামাজিক আচরণের বিধি।",
        icon: <BookOpen className="w-8 h-8 text-emerald-500" />,
    },
];

const FiqhSection = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
            <div className="max-w-5xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl font-extrabold text-center text-emerald-800 mb-6"
                >
                    ইসলামিক ফিকহ (Fiqh)
                </motion.h2>
                <p className="text-center text-gray-600 mb-12 text-lg">
                    দৈনন্দিন জীবনে প্রয়োজনীয় ইসলামিক আইন ও বিধিবিধান সম্পর্কে মৌলিক জ্ঞান।
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {fiqhTopics.map((topic) => (
                        <motion.div
                            key={topic.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 100, duration: 0.6 }}
                            className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-start hover:scale-105 transition-transform duration-300"
                        >
                            <div className="mb-4">{topic.icon}</div>
                            <h3 className="text-xl font-bold text-emerald-800 mb-2">{topic.title}</h3>
                            <p className="text-gray-600">{topic.description}</p>
                            <div className="mt-4 flex items-center text-emerald-500 font-semibold">
                                <CheckCircle className="w-5 h-5 mr-2" /> বিস্তারিত পড়ুন
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FiqhSection;
