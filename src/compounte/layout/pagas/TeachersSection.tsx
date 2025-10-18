"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

// --- Type Definitions ---
type TabOption = "teachers" | "privacy" | "terms" | "faq";

interface Teacher {
    name: string;
    qualification: string;
    photo: string;
    bio: string;
}

const teachers: Teacher[] = [
    {
        name: "মোঃ তৌহিদুল ইসলাম",
        qualification: "Certified Quran Tutor",
        photo: "/img/teacher1.jpg",
        bio: "10+ years experience teaching Quran with Tajweed.",
    },
    {
        name: "ফাতিমা খানম",
        qualification: "Senior Islamic Studies Teacher",
        photo: "/img/teacher2.jpg",
        bio: "Expert in Tajweed and Hifz for children and adults.",
    },
    {
        name: "মোঃ আব্দুল্লাহ",
        qualification: "Hifz Teacher",
        photo: "/img/teacher3.jpg",
        bio: "Specializes in full Quran memorization.",
    },
];

const faqData = [
    { q: "How can I enroll for online classes?", a: "Simply click on the enroll button and fill out the form." },
    { q: "Can adults join Quran memorization?", a: "Yes, our courses are designed for all ages." },
    { q: "Do you provide Tajweed guidance?", a: "Absolutely, Tajweed is integrated in every course." },
];

// --- Framer Motion Variants ---
const tabContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const InfoTabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabOption | "quran">("teachers");

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12">
            {/* Tabs */}
            <div className="flex flex-wrap md:flex-nowrap gap-3 mb-8 justify-center">
                {["teachers", "privacy", "terms", "faq", "quran"].map((tab) => (
                    <button
                        key={tab}
                        className={`px-4 py-2 rounded-full font-semibold transition ${activeTab === tab
                                ? "bg-green-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-green-100"
                            }`}
                        onClick={() => setActiveTab(tab as TabOption | "quran")}
                    >
                        {tab === "teachers"
                            ? "শিক্ষকগণ"
                            : tab === "privacy"
                                ? "গোপনীয়তা নীতি"
                                : tab === "terms"
                                    ? "শর্তাবলী"
                                    : tab === "faq"
                                        ? "সাধারণ জিজ্ঞাসা"
                                        : "কুরআন রিসাইটেশন"}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <motion.div
                key={activeTab}
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg"
            >
                {activeTab === "teachers" && (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {teachers.map((teacher, idx) => (
                            <div
                                key={idx}
                                className="bg-gray-50 rounded-xl p-4 shadow hover:shadow-lg transition"
                            >
                                <img
                                    src={teacher.photo}
                                    alt={teacher.name}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                                <h3 className="text-lg font-bold text-gray-900">{teacher.name}</h3>
                                <p className="text-teal-700 font-medium">{teacher.qualification}</p>
                                <p className="text-gray-700 mt-2 text-sm">{teacher.bio}</p>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === "privacy" && (
                    <div className="prose max-w-none text-gray-700">
                        <h3>গোপনীয়তা নীতি</h3>
                        <p>আমরা আপনার তথ্যের গোপনীয়তা বজায় রাখি এবং তৃতীয় পক্ষের সাথে শেয়ার করি না।</p>
                        <p>ব্যক্তিগত তথ্য শুধুমাত্র কোর্স পরিচালনার জন্য ব্যবহৃত হয়।</p>
                    </div>
                )}

                {activeTab === "terms" && (
                    <div className="prose max-w-none text-gray-700">
                        <h3>শর্তাবলী</h3>
                        <p>কোর্সে অংশগ্রহণের সময় আমাদের নিয়মাবলী মেনে চলতে হবে।</p>
                        <p>প্রদত্ত শিক্ষাগত উপকরণ কেবল শিক্ষার উদ্দেশ্যে ব্যবহৃত হবে।</p>
                    </div>
                )}

                {activeTab === "faq" && (
                    <div className="space-y-4">
                        {faqData.map((item, idx) => (
                            <details key={idx} className="border rounded-lg p-4">
                                <summary className="font-semibold cursor-pointer">{item.q}</summary>
                                <p className="mt-2 text-gray-700">{item.a}</p>
                            </details>
                        ))}
                    </div>
                )}

                {activeTab === "quran" && (
                    <div className="space-y-6">
                        <p className="text-gray-700">
                            এখানে কুরআনের কিছু নির্বাচিত আয়াতের রিসাইটেশন শুনতে পারবেন:
                        </p>
                        <div className="space-y-4">
                            <audio controls className="w-full">
                                <source src="/audio/quran1.mp3" type="audio/mpeg" />
                                আপনার ব্রাউজার অডিও প্লে সমর্থন করছে না।
                            </audio>
                            <audio controls className="w-full">
                                <source src="/audio/quran2.mp3" type="audio/mpeg" />
                                আপনার ব্রাউজার অডিও প্লে সমর্থন করছে না।
                            </audio>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default InfoTabs;
