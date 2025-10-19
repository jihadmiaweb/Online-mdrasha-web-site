import React, { useState } from "react";
import { ChevronDown, CheckCircle, Ban, Briefcase, BookOpen, Smile, Zap } from 'lucide-react';
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
            className={`w-full text-left p-4 sm:p-5 flex items-center justify-between transition-colors duration-200 ${isOpen ? 'bg-lime-50 border-b border-lime-200' : 'hover:bg-gray-50'}`}
        >
            <div className="flex items-center space-x-3">
                <div className="text-lime-600">{icon}</div>
                <div className="font-bold text-gray-800 text-base sm:text-lg">{title}</div>
            </div>
            <ChevronDown
                className={`w-5 h-5 text-lime-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
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
export default function HalalHaramGuide() {
    const [open, setOpen] = useState<string | null>(null);
    const toggle = (key: string) => setOpen(open === key ? null : key);

    const sections = [
        {
            key: "definition",
            title: "হালাল ও হারাম — মৌলিক ধারণা",
            icon: <BookOpen className="w-5 h-5" />,
            content:
                "ইসলামে ‘হালাল’ অর্থ বৈধ বা অনুমোদিত, আর ‘হারাম’ অর্থ নিষিদ্ধ। আল্লাহ যা বৈধ করেছেন তা গ্রহণ করা এবং যা হারাম করেছেন তা পরিহার করা ঈমানের অংশ। প্রতিটি কাজ, খাদ্য, উপার্জন ও আচরণ এই নীতির আওতায় পড়ে।",
        },
        {
            key: "food",
            title: "খাদ্য বিষয়ক হালাল ও হারাম",
            icon: <CheckCircle className="w-5 h-5" />,
            content:
                "হালাল খাবার হলো সেইসব যা ইসলামিক শরিয়াহ অনুযায়ী প্রস্তুত। যেমন: ইসলামী পদ্ধতিতে যবেহ করা পশু, মাছ, শস্য, ফলমূল ইত্যাদি। হারাম খাদ্যের মধ্যে রয়েছে: শূকর ও তার উপজাত, রক্ত, নিজে মারা পশু, মদ্যপান বা অ্যালকোহলযুক্ত পানীয়, এবং যেসব খাদ্যে নিষিদ্ধ উপাদান ব্যবহৃত হয়েছে। প্যাকেটজাত খাবার কেনার আগে হালাল সার্টিফিকেট বা লেবেল পরীক্ষা করা জরুরি।",
        },
        {
            key: "business",
            title: "বাণিজ্য ও উপার্জনে হালাল-হারাম",
            icon: <Briefcase className="w-5 h-5" />,
            content:
                "বাণিজ্য ও চাকরিতে হালাল উপার্জন অপরিহার্য। হালাল উপার্জন হলো যে সম্পদে প্রতারণা, সুদ (রিবা), ঘুষ, জালিয়াতি, জুয়া, বা অন্যায় পদ্ধতি নেই। হারাম উপার্জন দ্বারা জীবনযাপন করলে ইবাদতের গ্রহণযোগ্যতা প্রভাবিত হয়। তাই প্রতিটি ব্যবসায়িক লেনদেনে সততা ও ন্যায়পরায়ণতা বজায় রাখা উচিত।",
        },
        {
            key: "daily_life",
            title: "দৈনন্দিন জীবনে হালাল আচরণ",
            icon: <Smile className="w-5 h-5" />,
            content:
                "হালাল কেবল খাদ্য নয় — জীবনের প্রতিটি কাজে প্রযোজ্য। যেমন: হালাল পোশাক (যা শালীন), হালাল বিনোদন (যা নৈতিকতার পরিপন্থী নয়), ও হালাল ব্যবহার (অন্যের অধিকার লঙ্ঘন নয়)। মানুষের প্রতি সদ্ব্যবহার, কথা ও আচরণে সততা বজায় রাখাও হালাল জীবনের অংশ।",
        },
        {
            key: "benefit",
            title: "হালাল জীবনযাপনের উপকারিতা",
            icon: <CheckCircle className="w-5 h-5" />,
            content:
                "হালাল জীবন মানুষকে আত্মিক শান্তি, পবিত্রতা এবং আল্লাহর সন্তুষ্টি এনে দেয়। হারাম থেকে বিরত থাকা মানুষকে লোভ ও অন্যায় থেকে দূরে রাখে। হালাল উপার্জনে দোয়া কবুল হয়, পরিবারে বরকত আসে এবং সমাজে আস্থা গড়ে ওঠে।",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <header className="mb-8 text-center">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-lime-800 mb-2">
                        হালাল ও হারাম
                    </h1>
                    <p className="mt-2 text-base text-gray-600 max-w-2xl mx-auto">
                        খাদ্য, বাণিজ্য ও দৈনন্দিন জীবনের হালাল ও হারাম বিষয়াবলি সম্পর্কে
                        স্পষ্ট ও সহজ ব্যাখ্যা।
                    </p>
                </header>

                {/* Info Cards - Enhanced Design */}
                <section className="grid gap-6 md:grid-cols-2 mb-8">
                    <div className="bg-white shadow-xl rounded-2xl p-5 border-l-4 border-lime-500">
                        <h2 className="text-xl font-bold text-lime-800 mb-3 flex items-center">
                            <CheckCircle className="w-5 h-5 mr-2 text-lime-600" />
                            হালাল জীবনযাপন (Halal)
                        </h2>
                        <ul className="mt-3 list-disc list-inside text-sm text-gray-700 space-y-2 ml-4">
                            <li>সন্দেহজনক খাদ্য/উৎস এড়িয়ে চলুন (Principle of Wara').</li>
                            <li>প্রতিটি লেনদেনে সততা ও স্বচ্ছতা বজায় রাখুন।</li>
                            <li>আল্লাহর সন্তুষ্টির উদ্দেশ্যে সৎ ও নৈতিক জীবনধারা অনুসরণ করুন।</li>
                        </ul>
                    </div>

                    <div className="bg-white shadow-xl rounded-2xl p-5 border-l-4 border-red-500">
                        <h2 className="text-xl font-bold text-red-800 mb-3 flex items-center">
                            <Ban className="w-5 h-5 mr-2 text-red-600" />
                            হারাম থেকে দূরে থাকা (Haram)
                        </h2>
                        <ul className="mt-3 list-disc list-inside text-sm text-gray-700 space-y-2 ml-4">
                            <li>শূকর বা অপবিত্র মাংস, মদ্যপান কঠোরভাবে নিষিদ্ধ।</li>
                            <li>সুদ (রিবা), জুয়া, বা যেকোনো প্রকারের প্রতারণামূলক আয় পরিহার করুন।</li>
                            <li>অন্যায়, অশ্লীলতা ও অন্যের ক্ষতি হয় এমন আচরণ থেকে বিরত থাকুন।</li>
                        </ul>
                    </div>
                </section>

                {/* Accordion Section */}
                <section className="mt-8">
                    <h2 className="text-2xl font-bold text-lime-800 mb-4">বিস্তারিত নির্দেশনা</h2>
                    <div className="space-y-3">
                        {sections.map((sec) => (
                            <AccordionItem
                                key={sec.key}
                                title={sec.title}
                                content={sec.content}
                                icon={sec.icon}
                                isOpen={open === sec.key}
                                onToggle={() => toggle(sec.key)}
                            />
                        ))}
                    </div>
                </section>

                {/* Footer with Disclaimer */}
                <footer className="mt-8 text-sm text-gray-600">
                    <div className="bg-lime-50 rounded-lg p-4 border border-lime-300">
                        <strong className="text-lime-700 flex items-center mb-2">
                            <Zap className="w-4 h-4 mr-2" />
                            গুরুত্বপূর্ণ পরামর্শ:
                        </strong>
                        <ul className="list-disc list-inside ml-2">
                            <li>সন্দেহজনক কোনো পণ্য বা লেনদেনের ক্ষেত্রে অভিজ্ঞ আলেম বা ইসলামি স্কলারদের পরামর্শ নেওয়া উত্তম।</li>
                            <li>আল্লাহর পক্ষ থেকে ক্ষমা ও বরকত লাভের জন্য হালাল জীবনযাপন একটি অবিচ্ছেদ্য অংশ।</li>
                        </ul>
                    </div>
                </footer>
            </div>
        </div>
    );
}