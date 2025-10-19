import React, { useState } from "react";
import { ChevronDown, Zap, Users, Shield, BookOpen, Heart } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

// --- REUSABLE ACCORDION ITEM COMPONENT ---
interface AccordionItemProps {
    title: string;
    content: string;
    icon: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content, icon, isOpen, onToggle }) => (
    <motion.article
        className="bg-white rounded-xl shadow-md border border-gray-100 transition-shadow duration-300"
        initial={false}
    >
        <button
            onClick={onToggle}
            aria-expanded={isOpen}
            className={`w-full text-left p-4 sm:p-5 flex items-center justify-between transition-colors duration-200 ${isOpen ? 'bg-indigo-50 border-b border-indigo-200' : 'hover:bg-gray-50'}`}
        >
            <div className="flex items-center space-x-3">
                <div className="text-indigo-600">{icon}</div>
                <div className="font-bold text-gray-800 text-base sm:text-lg">{title}</div>
            </div>
            <ChevronDown
                className={`w-5 h-5 text-indigo-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            />
        </button>

        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                >
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-sm text-gray-700">
                        {content}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </motion.article>
);


// --- MAIN COMPONENT ---
export default function IslamicEthics() {
    const [open, setOpen] = useState<string | null>(null);
    const toggle = (key: string) => setOpen(open === key ? null : key);

    const topics = [
        {
            key: "meaning",
            title: "দ্বিচারিতার অর্থ ও গুরুত্ব",
            icon: <Zap className="w-5 h-5" />,
            content:
                "দুই-মুখী আচরণ মানে হলো মানুষকে একভাবে সামনে আর অন্যভাবে পেছনে আচরণ করা — অর্থাৎ ভণ্ডামি বা কপটতা (মুনাফিকি)। ইসলাম এটিকে কঠোরভাবে নিষিদ্ধ করেছে। রাসূলুল্লাহ (সা.) বলেছেন, ‘যে ব্যক্তি দুই-মুখী আচরণ করে, সে কিয়ামতের দিনে দুই মুখ নিয়ে উঠবে।’ এটি সমাজের বিশ্বাস ও ঐক্য নষ্ট করে।",
        },
        {
            key: "islamic_ethics",
            title: "ইসলামিক নৈতিকতার মূলনীতি",
            icon: <BookOpen className="w-5 h-5" />,
            content:
                "ইসলামের নৈতিকতা **সত্যবাদিতা, ন্যায়পরায়ণতা, সহানুভূতি, দয়া, ও তাকওয়া (আল্লাহভীতি)-র** ওপর ভিত্তি করে গঠিত। মুসলমানের চরিত্র এমন হওয়া উচিত যাতে তার কথা, কাজ ও মনোভাবের মধ্যে মিল থাকে। মিথ্যা, কপটতা ও প্রতারণা নৈতিকতার পরিপন্থী।",
        },
        {
            key: "social_behavior",
            title: "সামাজিক আচরণের বিধি",
            icon: <Users className="w-5 h-5" />,
            content:
                "সামাজিক আচরণে ইসলাম **পারস্পরিক সম্মান, দায়িত্ববোধ ও সহযোগিতাকে** গুরুত্ব দেয়। সমাজে অন্যের অধিকার রক্ষা, ওয়াদা (কথা) রাখার সততা, এবং ভালো ব্যবহার নৈতিক দায়িত্ব। অন্যকে ছোট করা, গীবত (পরনিন্দা), বা প্রতারণা করা ইসলামি আদর্শের পরিপন্থী।",
        },
        {
            key: "self_purification",
            title: "আত্মশুদ্ধি ও নৈতিক উন্নয়ন",
            icon: <Heart className="w-5 h-5" />,
            content:
                "নৈতিকতার উন্নয়ন শুরু হয় **আত্মশুদ্ধি (তাযকিয়াতুন-নফস)** থেকে। আত্মাকে পরিশুদ্ধ রাখতে নিয়মিত নামাজ, কুরআন পাঠ, জিকির ও আত্মসমালোচনার মাধ্যমে আল্লাহর সন্তুষ্টি অর্জনের চেষ্টা করতে হয়। নিজের ত্রুটি স্বীকার করা এবং সংশোধনের প্রচেষ্টা করাও নৈতিকতার অংশ।",
        },
        {
            key: "benefit",
            title: "সৎ নৈতিকতার উপকারিতা",
            icon: <Shield className="w-5 h-5" />,
            content:
                "সৎ নৈতিকতা ব্যক্তি ও সমাজ উভয়ের উন্নতির চাবিকাঠি। এতে মানুষ বিশ্বাসযোগ্য হয়, সমাজে আস্থা বৃদ্ধি পায়, এবং আল্লাহর রহমত লাভ হয়। উত্তম চরিত্র নবী (সাঃ)-এর সুন্নতের এবং জান্নাতে প্রবেশের একটি অন্যতম মাধ্যম।",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <header className="mb-8 text-center">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-800 mb-2">
                        দ্বিচারিতা ও ইসলামিক নৈতিকতা
                    </h1>
                    <p className="mt-2 text-base text-gray-600 max-w-2xl mx-auto">
                        ইসলামিক নৈতিকতা (আখলাক) এবং সামাজিক আচরণের বিধি সম্পর্কে বিস্তারিত ধারণা।
                    </p>
                </header>

                {/* Info Cards - Enhanced Design */}
                <section className="grid gap-6 md:grid-cols-2 mb-8">
                    <div className="bg-white shadow-xl rounded-2xl p-5 border-l-4 border-indigo-500">
                        <h2 className="text-xl font-bold text-indigo-800 mb-3 flex items-center">
                            <Shield className="w-5 h-5 mr-2 text-indigo-600" />
                            নৈতিকতার মূলভিত্তি
                        </h2>
                        <ul className="mt-3 list-disc list-inside text-sm text-gray-700 space-y-2 ml-4">
                            <li>কথা ও কাজে **সততা** (সিদক) বজায় রাখা।</li>
                            <li>সকলের প্রতি **ন্যায়পরায়ণতা** (আদল) নিশ্চিত করা।</li>
                            <li>আচরণে **আন্তরিকতা** ও **বিনয়** প্রদর্শন করা।</li>
                        </ul>
                    </div>

                    <div className="bg-white shadow-xl rounded-2xl p-5 border-l-4 border-red-500">
                        <h2 className="text-xl font-bold text-red-800 mb-3 flex items-center">
                            <Zap className="w-5 h-5 mr-2 text-red-600" />
                            দ্বিচারিতা থেকে বিরত থাকুন
                        </h2>
                        <p className="mt-2 text-sm text-gray-700">
                            দ্বিচারিতা বা কপটতা (**মুনাফিকি**) ঈমানের দুর্বলতার প্রতীক। এটি সমাজে অবিশ্বাস সৃষ্টি করে এবং এটি আল্লাহর কাছে অত্যন্ত অপছন্দনীয় একটি কাজ। একজন মুসলমানের উচিত কথাবার্তা ও আচরণে সর্বদা একরূপ ও স্পষ্ট থাকা।
                        </p>
                    </div>
                </section>

                {/* Accordion Topics */}
                <section className="mt-8">
                    <h2 className="text-2xl font-bold text-indigo-800 mb-4">বিস্তারিত বিষয়বস্তু</h2>
                    <div className="space-y-3">
                        {topics.map((item) => (
                            <AccordionItem
                                key={item.key}
                                title={item.title}
                                content={item.content}
                                icon={item.icon}
                                isOpen={open === item.key}
                                onToggle={() => toggle(item.key)}
                            />
                        ))}
                    </div>
                </section>

                {/* Footer */}
                <footer className="mt-8 text-sm text-gray-600">
                    <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-300">
                        <strong className="text-indigo-700 flex items-center mb-2">
                            <Heart className="w-4 h-4 mr-2" />
                            গুরুত্বপূর্ণ শিক্ষা:
                        </strong>
                        <ul className="list-disc list-inside ml-2">
                            <li>উত্তম চরিত্রের মাধ্যমেই আল্লাহর সন্তুষ্টি ও জান্নাত অর্জন সম্ভব।</li>
                            <li>প্রতিদিনের আত্মসমালোচনা ও তওবা (অনুশোচনা) নৈতিক উন্নতির পথ সুগম করে।</li>
                            <li>দ্বিচারিতা থেকে দূরে থাকা আত্মাকে পরিশুদ্ধ করে।</li>
                        </ul>
                    </div>
                </footer>
            </div>
        </div>
    );
}