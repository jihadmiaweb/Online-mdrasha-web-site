"use client";
import { useState, type FC, } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

// --- Privacy Sections Data (No change to data) ---
const privacySections = [
    {
        title: "গোপনীয়তার উদ্দেশ্য (Purpose of Privacy)",
        content: `Madrasatu Nuurul 'Ilm আমাদের শিক্ষার্থীদের তথ্যের গোপনীয়তা রক্ষা করতে প্রতিশ্রুতিবদ্ধ। এই নীতি আমাদের তথ্য সংগ্রহ, ব্যবহার, এবং সংরক্ষণের পদ্ধতি ব্যাখ্যা করে।`
    },
    {
        title: "তথ্য সংগ্রহ (Data Collection)",
        content: `আমরা শুধুমাত্র শিক্ষার্থীদের নাম, ইমেইল, ফোন নম্বর এবং ক্লাস সম্পর্কিত তথ্য সংগ্রহ করি। এই তথ্য শুধুমাত্র আমাদের সেবা প্রদান এবং শিক্ষার মান উন্নয়নের জন্য ব্যবহৃত হয়।`
    },
    {
        title: "তথ্য ব্যবহার (Data Usage)",
        content: `আপনার তথ্য কেবল Madrasatu Nuurul 'Ilm এর অভ্যন্তরীণ উদ্দেশ্যে ব্যবহার করা হয়। আমরা আপনার অনুমতি ছাড়া কোনো তৃতীয় পক্ষের সঙ্গে শেয়ার করি না।`
    },
    {
        title: "কুকিজ এবং ট্র্যাকিং (Cookies and Tracking)",
        content: `আমাদের ওয়েবসাইটে কুকিজ ব্যবহার করা হয় যাতে ব্যবহারকারীর অভিজ্ঞতা উন্নত করা যায়। কোনো ব্যক্তিগত তথ্য তৃতীয় পক্ষের সাথে শেয়ার করা হয় না।`
    },
    {
        title: "নিরাপত্তা (Security)",
        content: `আপনার তথ্যের নিরাপত্তা আমাদের জন্য গুরুত্বপূর্ণ। আমরা উন্নত নিরাপত্তা ব্যবস্থা গ্রহণ করি যাতে তথ্য চুরি বা অননুমোদিত অ্যাক্সেস থেকে রক্ষা করা যায়।`
    },
    {
        title: "যোগাযোগ (Contact Information)",
        content: `আপনি যদি আপনার তথ্য নিয়ে প্রশ্ন বা উদ্বেগ থাকে, অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন: 
    Email: info@madrasatunurulilm.com
    Call: 01834-756502`
    },
];

// --- Accordion Item Component ---
interface AccordionItemProps {
    title: string;
    content: string;
    isOpen: boolean;
    onClick: () => void;
}

const AccordionItem: FC<AccordionItemProps> = ({ title, content, isOpen, onClick }) => (
    <motion.div
        className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-shadow duration-300 hover:shadow-xl"
        // Removed initial={{ borderRadius: 12 }} as it's redundant with className
        layout // Maintain smooth layout shift
    >
        <button
            onClick={onClick}
            // Enhanced button styling for better hover state and focus
            className={`w-full px-5 py-5 text-left flex justify-between items-center font-bold text-lg ${isOpen ? 'bg-teal-50 text-teal-800' : 'text-gray-900 hover:bg-gray-100'} transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500`}
            aria-expanded={isOpen}
            aria-controls={`accordion-content-${title.replace(/\s/g, '-')}`}
        >
            {title}
            {isOpen
                ? <ChevronUp className="w-6 h-6 ml-4 min-w-6 text-teal-600 transition-transform duration-300" />
                : <ChevronDown className="w-6 h-6 ml-4 min-w-6 text-teal-600 transition-transform duration-300" />}
        </button>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="content"
                    id={`accordion-content-${title.replace(/\s/g, '-')}`}
                    role="region"
                    aria-labelledby={`accordion-button-${title.replace(/\s/g, '-')}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    // Refined content styling for readability
                    className="px-5 py-4 border-t border-gray-200 text-gray-700 text-base leading-relaxed whitespace-pre-line"
                >
                    {content}
                </motion.div>
            )}
        </AnimatePresence>
    </motion.div>
);

// --- Main Privacy Policy Component ---
const PrivacyPolicyAccordion: FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleIndex = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
                <motion.header
                    className="text-center mb-14"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-gray-900">
                        Madrasatu Nuurul 'Ilm
                    </h1>
                    <p className="text-xl sm:text-2xl text-teal-600 font-medium">
                        গোপনীয়তা নীতি (Privacy Policy)
                    </p>
                </motion.header>

                {/* Main Accordion Container */}
                <motion.main
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    layout
                >
                    {privacySections.map((section, index) => (
                        <AccordionItem
                            key={index}
                            title={section.title}
                            content={section.content}
                            isOpen={openIndex === index}
                            onClick={() => toggleIndex(index)}
                        />
                    ))}
                </motion.main>

                <motion.footer
                    className="mt-16 text-center text-gray-500 text-sm sm:text-base border-t pt-8 border-gray-200"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                >
                    © {new Date().getFullYear()} Madrasatu Nuurul 'Ilm. সর্বস্বত্ব সংরক্ষিত।
                    <p className="mt-2 text-xs">Policy last updated: October 2025</p>
                </motion.footer>
            </div>
        </div>
    );
};

export default PrivacyPolicyAccordion;