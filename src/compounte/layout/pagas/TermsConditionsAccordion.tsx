"use client";
import { useState, type FC, type JSX, } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, FileText, ShieldCheck, UserCheck } from "lucide-react";

// --- Terms Sections Data ---
const termsSections = [
    {
        title: "সাধারণ শর্তাবলী",
        content: `Madrasatu Nuurul 'Ilm-এর ব্যবহার করার মাধ্যমে আপনি আমাদের সেবার শর্তাবলী মেনে চলতে সম্মত হন। ব্যবহারকারীরা অবশ্যই আমাদের নীতি অনুযায়ী তথ্য প্রদান করবেন।`,
        icon: <FileText className="w-5 h-5 mr-2 text-teal-600" />,
    },
    {
        title: "নিবন্ধন এবং অ্যাকাউন্ট",
        content: `ব্যবহারকারীরা সঠিক তথ্য দিয়ে নিবন্ধন করতে বাধ্য। আপনার অ্যাকাউন্টের নিরাপত্তা আপনার নিজ দায়িত্বে।`,
        icon: <UserCheck className="w-5 h-5 mr-2 text-teal-600" />,
    },
    {
        title: "ক্লাস এবং শিক্ষাসেবা",
        content: `আমরা সরবরাহকৃত ক্লাস এবং শিক্ষাসেবার জন্য নির্দিষ্ট সময় এবং পাঠক্রম অনুসরণ করি। কোনও পরিবর্তন প্রয়োজন হলে পূর্ব-নোটিশ দেওয়া হবে।`,
        icon: <ShieldCheck className="w-5 h-5 mr-2 text-teal-600" />,
    },
    {
        title: "পেমেন্ট এবং ফি",
        content: `ক্লাসের ফি আমাদের নির্ধারিত নীতি অনুযায়ী দেওয়া হবে। কোনো রিফান্ড শুধুমাত্র আমাদের নীতি অনুযায়ী অনুমোদিত।`,
        icon: <FileText className="w-5 h-5 mr-2 text-teal-600" />,
    },
    {
        title: "সীমাবদ্ধতা ও দায়বদ্ধতা",
        content: `আমরা সরবরাহকৃত শিক্ষার ফলাফল এবং প্রযুক্তিগত সমস্যা বা তথ্য হারের জন্য সীমিতভাবে দায়ী থাকি।`,
        icon: <ShieldCheck className="w-5 h-5 mr-2 text-teal-600" />,
    },
    {
        title: "যোগাযোগ",
        content: `আপনি যদি শর্তাবলী সম্পর্কিত প্রশ্ন বা উদ্বেগ থাকে, অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন: info@madrasatunurulilm.com`,
        icon: <UserCheck className="w-5 h-5 mr-2 text-teal-600" />,
    },
];

// --- Accordion Item Component ---
interface AccordionItemProps {
    title: string;
    content: string;
    isOpen: boolean;
    onClick: () => void;
    icon: JSX.Element;
}

const AccordionItem: FC<AccordionItemProps> = ({ title, content, isOpen, onClick, icon }) => (
    <motion.div
        layout
        className={`rounded-xl overflow-hidden border border-gray-200 shadow-sm ${isOpen ? "bg-teal-50 border-teal-300" : "bg-white hover:bg-gray-50"
            }`}
    >
        <button
            onClick={onClick}
            className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-gray-900 transition-colors duration-300"
        >
            <div className="flex items-center">{icon}<span>{title}</span></div>
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
                    className="px-5 py-4 border-t border-teal-200 text-gray-700 text-base sm:text-lg"
                >
                    {content}
                </motion.div>
            )}
        </AnimatePresence>
    </motion.div>
);

// --- Main Terms & Conditions Component ---
const TermsConditionsAccordion: FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleIndex = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 md:px-12 lg:px-20">
            <motion.header
                className="text-center mb-12"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
                    Madrasatu Nuurul 'Ilm
                </h1>
                <p className="text-lg sm:text-xl text-gray-600">শর্তাবলী (Terms & Conditions)</p>
            </motion.header>

            <motion.main className="space-y-4" layout>
                {termsSections.map((section, index) => (
                    <AccordionItem
                        key={index}
                        title={section.title}
                        content={section.content}
                        icon={section.icon}
                        isOpen={openIndex === index}
                        onClick={() => toggleIndex(index)}
                    />
                ))}
            </motion.main>

            <motion.footer
                className="mt-12 text-center text-gray-600 text-sm sm:text-base"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
            >
                © {new Date().getFullYear()} Madrasatu Nuurul 'Ilm. সর্বস্বত্ব সংরক্ষিত।
            </motion.footer>
        </div>
    );
};

export default TermsConditionsAccordion;
