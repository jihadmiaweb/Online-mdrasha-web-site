import React, { useState } from "react";
import { ChevronDown, Clock, Layers, BookOpen, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

// --- ACCORDION ITEM COMPONENT (for better reusability and clean code) ---
interface AccordionItemProps {
    title: string;
    content: string;
    isOpen: boolean;
    onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content, isOpen, onToggle }) => (
    <motion.article
        className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
        initial={false}
    >
        <button
            onClick={onToggle}
            aria-expanded={isOpen}
            className="w-full text-left p-4 sm:p-5 flex items-center justify-between"
        >
            <div className="flex items-center space-x-3">
                <div className="text-teal-600">
                    <BookOpen className="w-5 h-5" />
                </div>
                <div className="font-bold text-teal-800 text-base sm:text-lg">{title}</div>
            </div>
            <ChevronDown
                className={`w-5 h-5 text-teal-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
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
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-sm text-gray-700 border-t border-gray-100">
                        {content}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </motion.article>
);

// --- MAIN COMPONENT ---
export default function NamazGuide() {
    const [openSection, setOpenSection] = useState<string | null>(null);

    const toggle = (key: string) => {
        setOpenSection(openSection === key ? null : key);
    };

    // Static placeholder times and Raka'ah data
    const prayerTimes = [
        { id: 'fajr', name: 'ফজর', time: 'সকাল (উদাহরণ: 04:30)', farz: 2, sunnahMuakkadah: 2, nafl: 0, total: 4 },
        { id: 'zuhr', name: 'যোহর', time: 'দুপুর (উদাহরণ: 12:15)', farz: 4, sunnahMuakkadah: 4, nafl: 2, total: 10 },
        { id: 'asr', name: 'আসর', time: 'বিকাল (উদাহরণ: 15:45)', farz: 4, sunnahGhairMuakkadah: 4, nafl: 0, total: 8 },
        { id: 'maghrib', name: 'মাগরিব', time: 'সূর্যাস্ত (উদাহরণ: 18:10)', farz: 3, sunnahMuakkadah: 2, nafl: 2, total: 7 },
        { id: 'isha', name: 'ইশা', time: 'রাত (উদাহরণ: 19:30)', farz: 4, sunnahGhairMuakkadah: 2, nafl: 2, total: 10 },
    ];

    const preparationSteps = [
        {
            key: 'wudu',
            title: 'ওযু (আবশ্যকীয় প্রস্তুতি)',
            content: 'ওযু নামাজের জন্য পূর্বশর্ত। মুখ, হাত কনুই পর্যন্ত, মাথা মাসেহ এবং পা গোড়ালি পর্যন্ত ধোয়া আবশ্যক। শরীর ও কাপড় নাপাক (অপবিত্র) মুক্ত হতে হবে।',
        },
        {
            key: 'clothes',
            title: 'পোশাক ও সতর (আবরণ)',
            content: 'পবিত্র, পরিমিত ও ঢিলেঢালা পোশাক পরিধান করুন। পুরুষদের জন্য নাভি থেকে হাঁটু পর্যন্ত, আর মহিলাদের জন্য মুখ ও কব্জি ছাড়া পুরো শরীর ঢাকা আবশ্যক।',
        },
        {
            key: 'qibla',
            title: 'কিবলা ও স্থান (সাফ-তারতিব)',
            content: 'নামাজের জন্য পরিষ্কার জায়গা নির্বাচন করুন এবং মক্কার কাবা শরীফের দিকে মুখ করে দাঁড়ান (কিবলামুখী)।',
        },
        {
            key: 'intent',
            title: 'নিয়ত (নিয়্যত)',
            content: 'নামাজ শুরু করার আগে মনের মধ্যে নির্দিষ্ট নামাজের নিয়ত করা আবশ্যক — এটি কোন ওয়াক্তের, ফরয না সুন্নত। নিয়তের জন্য মুখে উচ্চারণ করা জরুরি নয়।',
        },
        {
            key: 'silence',
            title: 'মনোযোগ ও শান্তি (খুশু)',
            content: 'নামাজের সময় ফোন বন্ধ রাখুন এবং পার্থিব কথা বা কাজ এড়িয়ে চলুন। নামাজে একাগ্রতা এবং প্রশান্তি থাকা জরুরি।',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8 text-center">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-teal-800 mb-2">নামাজ ও ওয়াজিব দায়িত্ব</h1>
                    <p className="mt-2 text-base text-gray-600 max-w-2xl mx-auto">
                        দৈনন্দিন নামাজের সময়, নিয়ম, ফরয ও সুন্নাতের পার্থক্য এবং নামাজের পূর্ব প্রস্তুতি — সংক্ষিপ্ত ও ব্যবহারিক নির্দেশনা।
                    </p>
                </header>

                <section className="grid gap-6 lg:grid-cols-2">
                    {/* Left column: Prayer times & Raka'ah count */}
                    <div className="bg-white shadow-xl rounded-2xl p-5 sm:p-6 border-t-4 border-teal-500">
                        <h2 className="text-xl font-bold text-teal-800 flex items-center mb-4">
                            <Clock className="w-5 h-5 mr-2 text-teal-600" />
                            দৈনন্দিন নামাজের সময় ও রাক'আত (নমুনা)
                        </h2>
                        <p className="text-sm text-gray-600 mb-4">
                            *শুধুমাত্র উদাহরণ হিসেবে সময় দেওয়া আছে।
                        </p>

                        <ul className="space-y-3">
                            {prayerTimes.map((p) => (
                                <li key={p.id} className="bg-teal-50 border border-teal-200 rounded-lg p-3 hover:bg-teal-100 transition duration-300">
                                    <div className="flex items-center justify-between">
                                        <div className="font-extrabold text-lg text-teal-800">{p.name}</div>
                                        <div className="text-sm font-semibold text-gray-700">{p.time}</div>
                                    </div>
                                    <div className="mt-1 text-xs text-gray-600 flex justify-between">
                                        <span title="ফরজ রাক'আত">
                                            **ফরজ:** {p.farz}
                                        </span>
                                        <span title="সুন্নাত মুয়াক্কাদা/গাইর মুয়াক্কাদা">
                                            সুন্নাত: {p.sunnahMuakkadah || p.sunnahGhairMuakkadah || 0}
                                        </span>
                                        <span title="মোট রাক'আত (ধারণা)">
                                            মোট: {p.total}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-4 text-xs text-gray-500">
                            <strong>দ্রষ্টব্য:</strong> সুন্নাত/নফল রাক'আতের সংখ্যা মাযহাব ও প্রথা অনুযায়ী কিছুটা ভিন্ন হতে পারে।
                        </div>
                    </div>

                    {/* Right column: Farz vs Sunnah */}
                    <div className="bg-white shadow-xl rounded-2xl p-5 sm:p-6 border-t-4 border-teal-500">
                        <h2 className="text-xl font-bold text-teal-800 flex items-center mb-4">
                            <Layers className="w-5 h-5 mr-2 text-teal-600" />
                            ফরয ও সুন্নাতের পার্থক্য
                        </h2>

                        <div className="space-y-5 text-sm text-gray-700">
                            <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded-md">
                                <div className="font-extrabold text-base text-red-800 mb-1">ফরয (فرض)</div>
                                <div>ফরয হলো **ইসলামে বাধ্যতামূলক** এমন নামাজ/কর্ম। ফরয ত্যাগ করলে গুনাহ হয় এবং এর জন্য জবাবদিহি করতে হবে। দৈনন্দিন পাঁচ ওয়াক্ত নামাজের মূল অংশ ফরয।</div>
                            </div>

                            <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded-md">
                                <div className="font-extrabold text-base text-yellow-800 mb-1">সুন্নাত (سُنّة)</div>
                                <div>সুন্নাত হলো নবী (সাঃ) কর্তৃক নিয়মিত অনুশীলিত কিন্তু **বাধ্যতামূলক নয়**। সুন্নাত পড়লে অতিরিক্ত সওয়াব (পুরস্কার) মেলে। এগুলো দুই প্রকার: **মুয়াক্কাদা** (নিয়মিত ও জোরদার) এবং **গাইর মুয়াক্কাদা** (কম জোরদার)।</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Preparation and rules accordion */}
                <section className="mt-8">
                    <h2 className="text-2xl font-bold text-teal-800 mb-4 flex items-center">
                        <Lightbulb className="w-6 h-6 mr-2 text-teal-600" />
                        নামাজের পূর্ব প্রস্তুতি ও আবশ্যকীয় বিষয়াদি
                    </h2>

                    <div className="space-y-3">
                        {preparationSteps.map((s) => (
                            <AccordionItem
                                key={s.key}
                                title={s.title}
                                content={s.content}
                                isOpen={openSection === s.key}
                                onToggle={() => toggle(s.key)}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}