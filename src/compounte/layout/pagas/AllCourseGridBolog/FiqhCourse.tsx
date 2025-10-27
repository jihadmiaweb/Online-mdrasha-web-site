"use client";

import React, { useState } from "react"; // useState আমদানি করা হলো
import { motion } from "framer-motion";

// অ্যানিমেশন ভ্যারিয়েন্টস (Animation variants)
const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }, // স্ট্যাগার চিলড্রেন আরও দ্রুত
};

const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 120, damping: 15 } }, // উন্নত স্প্রিং ইফেক্ট
};

// মক কোর্স স্টেপস (Mock Course Steps) - ফিকহ অধ্যায়
const fiqhSteps = [
    {
        id: 1,
        title: "ফিকহ পরিচিতি",
        description: "ফিকহ কী, এর মূল উদ্দেশ্য এবং ইসলামী আইন সম্পর্কে সংক্ষিপ্ত পরিচিতি।",
    },
    {
        id: 2,
        title: "ইবাদাতের মৌলিক নিয়মাবলী",
        description: "নামাজ, রোযা, জাকাত ও হজ্জসহ ইবাদাতের মৌলিক নিয়ম।",
    },
    {
        id: 3,
        title: "মুয়ামালাত ও সামাজিক নিয়ম",
        description: "ব্যবসা, চুক্তি ও সামাজিক দায়িত্বের নিয়মাবলী।",
    },
    {
        id: 4,
        title: "হালাল ও হারাম",
        description: "ফিকহ অনুসারে হালাল এবং হারামের ধারণা।",
    },
    {
        id: 5,
        title: "ফিকহ চর্চা ও উদাহরণ",
        description: "প্রতিদিনের জীবনে ফিকহ প্রয়োগ ও উদাহরণ।",
    },
    {
        id: 6,
        title: "ফিকহের উৎস ও ইতিহাস", // অতিরিক্ত একটি ধাপ যোগ করা হলো
        description: "কুরআন, সুন্নাহ, ইজমা ও কিয়াস - ফিকহের মূল উৎসসমূহ সম্পর্কে জানা।",
    },
];


// সিঙ্গেল স্টেপ কার্ড কম্পোনেন্ট (Component for a single Fiqh step)
type FiqhStep = {
    id: number;
    title: string;
    description: string;
};

const FiqhStepCard = ({ step }: { step: FiqhStep }) => (
    <motion.div
        className="relative bg-white border border-yellow-100 rounded-3xl shadow-xl p-6 md:p-8 
                       hover:shadow-2xl hover:border-yellow-300 transition-all duration-300 ease-in-out
                       flex flex-col space-y-4"
        variants={itemVariants}
        whileHover={{ y: -5, scale: 1.02 }} // হোভারের সময় সামান্য উপরে ওঠা ও স্কেল হওয়া
    >
        {/* স্টেপ ব্যাজ ও টাইটেল */}
        <div className="flex items-start mb-2">
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-yellow-600 text-white font-extrabold text-lg shadow-lg mr-4">
                {step.id}
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-yellow-800 leading-snug">
                {step.title}
            </h2>
        </div>

        {/* কন্টেন্ট এরিয়া (Content Area) */}
        <p className="text-gray-600 text-sm md:text-base border-t border-gray-100 pt-3">
            {step.description}
        </p>
    </motion.div>
);

const FiqhCourse: React.FC = () => { // কম্পোনেন্টের নাম App হিসেবে সেট করা হয়েছে
    const [clickMessage, setClickMessage] = useState("");

    const handleStartClick = () => {
        // এই সিমুলেটেড পরিবেশে আমরা একটি মেসেজ দেখাচ্ছি।
        setClickMessage("অভিনন্দন! আপনার ফিকহ অধ্যয়ন শুরু করার অনুরোধ গ্রহণ করা হয়েছে।");
        console.log("Fiqh Start Clicked!");

        // ৫ সেকেন্ড পর মেসেজটি লুকিয়ে ফেলা
        setTimeout(() => setClickMessage(""), 5000);
    };

    return (
        <div className="min-h-screen font-sans bg-yellow-50 p-4 md:p-12">

            {/* হেডার (Header) */}
            <div className="max-w-4xl mx-auto text-center mb-10 md:mb-16">
                <h1 className="text-4xl md:text-6xl font-extrabold text-yellow-900 leading-tight">
                    ফিকহ এর মৌলিক ধারণা কোর্স
                </h1>
                <p className="mt-4 text-lg text-yellow-700">
                    ইসলামী আইন এবং ফিকহের মূল ধারণাগুলি শেখার জন্য সংক্ষিপ্ত এবং সহজ পথ।
                </p>
            </div>

            {/* মেইন গ্রিড কন্টেইনার (Main Grid/Flow Container) */}
            <motion.div
                // গ্রিড লেআউট: মোবাইলে ১ কলাম, ট্যাবলেটে ২ কলাম, বড় স্ক্রিনে ৩ কলাম
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }} // ভিউপোর্টে এলে একবারই অ্যানিমেট হবে
            >
                {fiqhSteps.map((step) => (
                    <FiqhStepCard key={step.id} step={step} />
                ))}
            </motion.div>

            {/* কল টু অ্যাকশন (Call to Action) */}
            <div className="text-center mt-12 max-w-4xl mx-auto">
                {/* ক্লিক মেসেজ ডিসপ্লে */}
                {clickMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded-lg font-medium shadow-md"
                    >
                        {clickMessage}
                    </motion.div>
                )}

                <button
                    onClick={handleStartClick}
                    className="px-8 py-3 bg-yellow-600 text-white font-semibold text-lg rounded-full shadow-lg
                             hover:bg-yellow-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300
                             focus:outline-none focus:ring-4 focus:ring-yellow-300"
                >
                    <span className="font-extrabold text-white mr-1"></span>
                    এখনই ফিকহ অধ্যয়ন শুরু করুন
                </button>
            </div>
        </div>
    );
};

export default FiqhCourse;
