"use client";

import React, { useState } from "react"; // useState আমদানি করা হলো
import { motion } from "framer-motion";

// মক কোর্স স্টেপস (Mock Course Steps) - সীরাহ অধ্যায়
const seerahSteps = [
    {
        id: 1,
        title: "সীরাহ পরিচিতি",
        description: "নবীজির জীবনের সংক্ষিপ্ত পরিচিতি, সীরাহ অধ্যয়নের গুরুত্ব এবং প্রাথমিক ধারণা।",
    },
    {
        id: 2,
        title: "জন্ম ও শৈশব",
        description: "মক্কায় জন্ম, প্রাথমিক জীবন, বনি সাদ গোত্রে দুধ পান এবং আব্দুল মুত্তালিব ও আবু তালিবের তত্ত্বাবধানে বেড়ে ওঠা।",
    },
    {
        id: 3,
        title: "নবুওয়াত ও মক্কায় কার্যক্রম",
        description: "নবীজি হিসেবে নিযুক্ত হওয়ার প্রক্রিয়া, প্রথম আয়াত প্রাপ্তি, গোপন ও প্রকাশ্যে দাওয়াত এবং মক্কায় কঠিন পরিস্থিতি মোকাবিলা।",
    },
    {
        id: 4,
        title: "হিজরত ও মদিনায় কার্যক্রম",
        description: "মক্কা থেকে মদিনায় হিজরত, মদিনায় ইসলামী সমাজ প্রতিষ্ঠা, আনসার ও মুহাজিরদের মধ্যে ভ্রাতৃত্ব স্থাপন।",
    },
    {
        id: 5,
        title: "যুদ্ধ ও বিজয়সমূহ",
        description: "বদর, উহুদ এবং খন্দকের মতো গুরুত্বপূর্ণ যুদ্ধসমূহ, সন্ধি ও মক্কা বিজয়।",
    },
    {
        id: 6,
        title: "শেষ সময় ও শিক্ষা",
        description: "বিদায় হজের ভাষণ, নবীজির শেষ সময়, শিক্ষা এবং উম্মাহর জন্য গুরুত্বপূর্ণ উপদেশ ও বার্তা।",
    },
];

// অ্যানিমেশন ভ্যারিয়েন্টস (Animation variants)
const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }, // স্ট্যাগার চিলড্রেন আরও দ্রুত
};

const itemVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.95 },
    show: { opacity: 1, x: 0, scale: 1, transition: { type: "spring" as const, stiffness: 120, damping: 15 } }, // উন্নত স্প্রিং ইফেক্ট
};

// সিঙ্গেল স্টেপ কার্ড কম্পোনেন্ট (Component for a single Seerah step)
interface SeerahStep {
    id: number;
    title: string;
    description: string;
}

interface SeerahStepCardProps {
    step: SeerahStep;
}

const SeerahStepCard: React.FC<SeerahStepCardProps> = ({ step }) => (
    <motion.div
        className="relative bg-white border border-green-100 rounded-3xl shadow-xl p-6 md:p-8 
                       hover:shadow-2xl hover:border-green-300 transition-all duration-300 ease-in-out
                       flex flex-col space-y-4"
        variants={itemVariants}
        whileHover={{ y: -5, scale: 1.02 }} // হোভারের সময় সামান্য উপরে ওঠা ও স্কেল হওয়া
    >
        {/* স্টেপ ব্যাজ ও টাইটেল */}
        <div className="flex items-start mb-2">
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-green-600 text-white font-extrabold text-lg shadow-lg mr-4">
                {step.id}
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-green-800 leading-snug">
                {step.title}
            </h2>
        </div>

        {/* কন্টেন্ট এরিয়া (Content Area) */}
        <p className="text-gray-600 text-sm md:text-base border-t border-gray-100 pt-3">
            {step.description}
        </p>
    </motion.div>
);

const SeerahCourse: React.FC = () => { // কম্পোনেন্টের নাম App হিসেবে সেট করা হয়েছে
    const [clickMessage, setClickMessage] = useState("");

    const handleStartClick = () => {
        // এই সিমুলেটেড পরিবেশে আমরা একটি মেসেজ দেখাচ্ছি।
        setClickMessage("অভিনন্দন! আপনার সীরাহ অধ্যয়ন শুরু করার অনুরোধ গ্রহণ করা হয়েছে।");
        console.log("Seerah Start Clicked!");

        // ৫ সেকেন্ড পর মেসেজটি লুকিয়ে ফেলা
        setTimeout(() => setClickMessage(""), 5000);
    };

    return (
        <div className="min-h-screen font-sans bg-green-50 p-4 md:p-12">

            {/* হেডার (Header) */}
            <div className="max-w-4xl mx-auto text-center mb-10 md:mb-16">
                <h1 className="text-4xl md:text-6xl font-extrabold text-green-900 leading-tight">
                    নবীজির জীবনী (সীরাহ) অধ্যয়ন
                </h1>
                <p className="mt-4 text-lg text-green-700">
                    আপনার প্রিয় নবী (সাঃ)-এর জীবন ও শিক্ষার সুসংগঠিত অধ্যয়ন।
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
                {seerahSteps.map((step) => (
                    <SeerahStepCard key={step.id} step={step} />
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
                        className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg font-medium shadow-md"
                    >
                        {clickMessage}
                    </motion.div>
                )}

                <button
                    onClick={handleStartClick}
                    className="px-8 py-3 bg-green-600 text-white font-semibold text-lg rounded-full shadow-lg
                             hover:bg-green-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300
                             focus:outline-none focus:ring-4 focus:ring-green-300"
                >
                    এখনই সীরাহ অধ্যয়ন শুরু করুন
                </button>
            </div>
        </div>
    );
};

export default SeerahCourse;





