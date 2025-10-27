"use client";
import React, { useState, type FC, } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

// --- FAQ Data ---
const faqs = [
    {
        question: "আমি অনলাইনে কুরআন কীভাবে শিখতে পারি?",
        answer: "আপনি আমাদের বিনামূল্যে ট্রায়াল ক্লাস থেকে শুরু করতে পারেন। এরপর ধাপে ধাপে নূরানী কায়দা, তাজবিদ ও হিফজ ক্লাসে অংশ নিতে পারবেন।",
    },
    {
        question: "আমাদের ক্লাস কি শিশুদের জন্যও উপযুক্ত?",
        answer: "হ্যাঁ, আমাদের ক্লাস শিশুদের জন্য ইন্টারঅ্যাকটিভ লেসনের মাধ্যমে ডিজাইন করা হয়েছে, যাতে শেখা মজার এবং সহজ হয়।",
    },
    {
        question: "ক্লাসের সময়সূচি কি নমনীয়?",
        answer: "হ্যাঁ, আমরা ভিন্ন টাইমজোনে থাকা শিক্ষার্থীদের জন্য নমনীয় সময়সূচি প্রদান করি।",
    },
    {
        question: "ক্লাসে যোগ দিতে কি ইন্টারনেট সংযোগ প্রয়োজন?",
        answer: "হ্যাঁ, অনলাইনে ক্লাসে অংশগ্রহণের জন্য স্থিতিশীল ইন্টারনেট সংযোগ প্রয়োজন।",
    },
    {
        question: "ক্লাসের শিক্ষকের যোগ্যতা কেমন?",
        answer: "আমাদের শিক্ষকেরা বাংলা ভাষায় শিক্ষাদান করতে পারদর্শী এবং সার্টিফায়েড ইসলামী স্কলার।",
    },
];

// --- Accordion Item Component ---
interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

const FAQItem: FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => (
    <motion.div
        layout
        className={`rounded-xl overflow-hidden border border-gray-200 shadow-sm ${isOpen ? "bg-teal-50 border-teal-300" : "bg-white hover:bg-gray-50"
            }`}
    >
        <button
            onClick={onClick}
            className="w-full flex justify-between items-center px-4 sm:px-5 py-3 sm:py-4 text-left font-semibold text-gray-900 transition-colors duration-300"
        >
            <div className="flex items-center">
                <HelpCircle className="w-5 h-5 mr-2 text-teal-600" />
                <span className="text-sm sm:text-base md:text-lg">{question}</span>
            </div>
            {isOpen ? <ChevronUp className="w-5 h-5 text-teal-600" /> : <ChevronDown className="w-5 h-5 text-teal-600" />}
        </button>

        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="px-4 sm:px-5 py-3 sm:py-4 border-t border-teal-200 text-gray-700 text-sm sm:text-base md:text-lg"
                >
                    {answer}
                </motion.div>
            )}
        </AnimatePresence>
    </motion.div>
);

// --- Main FAQ Component ---
const GeneralFAQ: FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleIndex = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 md:px-12 lg:px-20">
            <motion.header
                className="text-center mb-10"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 text-gray-900">
                    সাধারণ জিজ্ঞাসা (FAQ)
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-gray-600">
                    আপনার প্রায়শই জিজ্ঞাসিত প্রশ্নের উত্তর এখানে খুঁজুন।
                </p>
            </motion.header>

            <motion.main className="space-y-3 sm:space-y-4 md:space-y-5">
                {faqs.map((faq, index) => (
                    <FAQItem
                        key={index}
                        question={faq.question}
                        answer={faq.answer}
                        isOpen={openIndex === index}
                        onClick={() => toggleIndex(index)}
                    />
                ))}
            </motion.main>

            <motion.footer
                className="mt-10 sm:mt-12 text-center text-gray-600 text-xs sm:text-sm md:text-base"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
            >
                © {new Date().getFullYear()} Madrasatu Nuurul 'Ilm. সর্বস্বত্ব সংরক্ষিত।
            </motion.footer>
        </div>
    );
};

export default GeneralFAQ;
