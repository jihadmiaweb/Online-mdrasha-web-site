import React, { useState } from "react";
import { ChevronDown, Moon, Sunrise, Sunset, UtensilsCrossed, Zap } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

// --- REUSABLE ACCORDION ITEM COMPONENT ---
interface AccordionItemProps {
    title: string;
    body: string;
    icon: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, body, icon, isOpen, onToggle }) => (
    <motion.article
        className="bg-white rounded-xl shadow-lg border border-gray-100 transition-all duration-300"
        initial={false}
    >
        <button
            onClick={onToggle}
            aria-expanded={isOpen}
            className={`w-full text-left p-4 sm:p-5 flex items-center justify-between transition-colors duration-200 ${isOpen ? 'bg-teal-50 border-b border-teal-200' : 'hover:bg-gray-50'}`}
        >
            <div className="flex items-center space-x-3">
                <div className="text-teal-600">{icon}</div>
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
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-sm text-gray-700">
                        {body}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </motion.article>
);


// --- MAIN COMPONENT ---
export default function RozaGuide() {
    const [open, setOpen] = useState<string | null>(null);
    const toggle = (k: string) => setOpen(open === k ? null : k);

    const sections = [
        {
            key: 'fasting',
            title: 'সিয়াম পালন — মৌলিক নিয়ম ও শর্ত',
            icon: <Moon className="w-5 h-5" />,
            body:
                'সিয়াম বা রোজা রাখা রমজান মাসে প্রত্যেক সুস্থ, প্রাপ্তবয়স্ক মুসলিমের ওপর ফরয। ভোর হওয়ার আগ মুহূর্ত (সুবহে সাদিক) থেকে সূর্যাস্ত পর্যন্ত পানাহার, যৌন সম্পর্ক ও অন্যান্য রোজা ভঙ্গকারী কাজ থেকে ইচ্ছাকৃতভাবে বিরত থাকতে হয়। অসুস্থতা, সফর, গর্ভধারণ বা মাসিক চলাকালীন রোজা না রাখার অনুমতি আছে এবং সেগুলোকে অন্য সময় কাজা (পরে রাখা) করতে হয়।',
        },
        {
            key: 'suhoor',
            title: 'সুহুর (সেহরি) করার আদব ও উপকারিতা',
            icon: <Sunrise className="w-5 h-5" />,
            body:
                'সুহুর হলো দিনের রোজার জন্য প্রস্তুতিমূলক খাদ্য গ্রহণ — ফজরের আজানের পূর্ব পর্যন্ত তা শেষ করতে হয়। সুহুর বিলম্ব করা নবী (সাঃ)-এর সুন্নত এবং এটি সারাদিন শক্তি যোগায়। খাদ্য হিসেবে ফাইবার, প্রোটিন ও জল-সমৃদ্ধ খাবার (যেমন, ওটস, ডিম, ফল) গ্রহণ করা উত্তম। সুহুর শেষ করার সাথে সাথে রোজার নিয়ত করুন।',
        },
        {
            key: 'iftar',
            title: 'ইফতার করার নিয়ম ও সুন্নত',
            icon: <Sunset className="w-5 h-5" />,
            body:
                'সূর্যাস্তের সাথে সাথে ইফতার করা সুন্নত। তাড়াহুড়ো করে ইফতার করা মুস্তাহাব। প্রথমে খেজুর ও পানি দিয়ে ইফতার শুরু করা উত্তম। হালকা ইফতারের পর মাগরিবের নামাজ পড়ে ভারী খাবার গ্রহণ করা ভালো। একবারে অতিরিক্ত খাবার গ্রহণ থেকে বিরত থাকুন।',
        },
        {
            key: 'food',
            title: 'হালাল ও হারাম খাদ্যের সাধারণ বিধি',
            icon: <UtensilsCrossed className="w-5 h-5" />,
            body:
                'হালাল খাদ্য হলো ইসলামিক শরিয়াহ মোতাবেক বৈধ খাদ্য। এর মধ্যে জবেহ করার সঠিক নিয়ম ও পবিত্রতা জড়িত। হারাম খাদ্যের মধ্যে রয়েছে শূকরের মাংস, অ্যালকোহল, এবং সঠিকভাবে জবেহ না করা প্রাণীর মাংস। প্রক্রিয়াজাত বা প্যাকেটজাত খাবারের ক্ষেত্রে হালাল সনদ বা উপাদানের লেবেল যাচাই করা জরুরি।',
        },
        {
            key: 'exceptions',
            title: 'শর্তসাপেক্ষ ও ছাড়ের বিধান (ফিদিয়া/কাজা)',
            icon: <Zap className="w-5 h-5" />,
            body:
                'দীর্ঘস্থায়ী অসুস্থতা, বার্ধক্য বা এমন কোনো অবস্থা যার জন্য রোজা রাখা অসম্ভব (যেমন দীর্ঘ সফর), সেক্ষেত্রে রোজা কাজা করার পরিবর্তে ফিদিয়া (প্রতিটি রোজার জন্য একজন দরিদ্রকে খাদ্য দান) দেওয়া যেতে পারে। যে রোজা রাখা সম্ভব, তা পরে কাজা করতে হবে। স্বাস্থ্য সংক্রান্ত বিষয়ে অবশ্যই চিকিৎসকের পরামর্শ নিন।',
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8 text-center">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-teal-800 mb-2">রোজা ও ইফতার — সিয়াম নির্দেশিকা</h1>
                    <p className="mt-2 text-base text-gray-600 max-w-2xl mx-auto">
                        সুহুর, ইফতার, রোজার সাধারণ নিয়ম এবং হালাল-হারাম খাদ্য বিধি সম্পর্কে কার্যকর ও সহজবোধ্য নির্দেশনা।
                    </p>
                </header>

                {/* Quick Summary Section - Responsive Grid */}
                <section className="grid gap-6 md:grid-cols-2 mb-8">
                    <div className="bg-white rounded-2xl shadow-xl p-5 border-l-4 border-teal-500">
                        <h2 className="text-xl font-bold text-teal-800 mb-3">দ্রুত সারমর্ম</h2>
                        <ul className="mt-3 list-disc list-inside text-sm text-gray-700 space-y-2">
                            <li>**রোজা শুরু:** সুবহে সাদিক (ভোর) থেকে পানাহার ত্যাগ।</li>
                            <li>**রোজা ভাঙ্গা:** সূর্যাস্তের সাথে সাথে ইফতার করা।</li>
                            <li>**সুন্নত:** খেজুর ও পানি দিয়ে ইফতার শুরু করা উত্তম।</li>
                            <li>**আবশ্যকীয়তা:** রোগ বা সফরের ক্ষেত্রে কাজা করার বিধান।</li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-5 border-l-4 border-teal-500">
                        <h2 className="text-xl font-bold text-teal-800 mb-3">স্বাস্থ্যকর টিপস</h2>
                        <div className="mt-3 text-sm text-gray-700 space-y-2">
                            <div className="flex items-start">
                                <span className="text-teal-500 mr-2">•</span>
                                **সুহুর:** জটিল শর্করা (কমপ্লেক্স কার্বোহাইড্রেট) ও পর্যাপ্ত প্রোটিন গ্রহণ করুন।
                            </div>
                            <div className="flex items-start">
                                <span className="text-teal-500 mr-2">•</span>
                                **ইফতার:** অতিরিক্ত মিষ্টি ও ভাজাপোড়া খাবার এড়িয়ে চলুন; শরীরকে হাইড্রেটেড রাখুন।
                            </div>
                            <div className="flex items-start">
                                <span className="text-teal-500 mr-2">•</span>
                                **সাধারণ:** ইবাদতে মনোযোগ দিন এবং অপ্রয়োজনীয় কথা পরিহার করুন।
                            </div>
                        </div>
                    </div>
                </section>

                {/* Accordion Guide Section */}
                <section className="mt-8">
                    <h2 className="text-2xl font-bold text-teal-800 mb-4">বিস্তারিত নির্দেশনা</h2>
                    <div className="space-y-3">
                        {sections.map((s) => (
                            <AccordionItem
                                key={s.key}
                                title={s.title}
                                body={s.body}
                                icon={s.icon}
                                isOpen={open === s.key}
                                onToggle={() => toggle(s.key)}
                            />
                        ))}
                    </div>
                </section>

                {/* Footer with Disclaimer */}
                <footer className="mt-8 text-sm text-gray-600">
                    <div className="bg-amber-100 rounded-lg p-4 border border-amber-300">
                        <strong className="text-amber-700 flex items-center">
                            <Zap className="w-4 h-4 mr-2" />
                            গুরুত্বপূর্ণ স্মরণীয়:
                        </strong>
                        <ul className="mt-2 list-disc list-inside ml-2">
                            <li>ইসলামী বিধান মাদহাব (যেমন: হানাফী, শাফেয়ী) অনুসারে কিছু পার্থক্য থাকতে পারে।</li>
                            <li>যদি রোজা রাখা স্বাস্থ্যগত কারণে প্রশ্নবিদ্ধ হয়, **অবশ্যই একজন চিকিৎসকের পরামর্শ নিন**।</li>
                        </ul>
                    </div>
                </footer>
            </div>
        </div>
    );
}