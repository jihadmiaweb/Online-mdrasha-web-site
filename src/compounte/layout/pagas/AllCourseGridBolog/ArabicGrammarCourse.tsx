import React, { useState, useEffect } from "react";
// motion এবং AnimatePresence আমদানি করা হলো যোগাযোগ ফর্মের অ্যানিমেশনের জন্য
import { motion, AnimatePresence } from "framer-motion";
import {
    Type, TextCursorInput, MessageCircle, GitBranch, Edit3,
    ChevronRight, Home, Zap, User, Mail, MessageSquare, Send, Check, ExternalLink
} from 'lucide-react';

// --- ১. কোর্স মডিউল ডেটা এবং কম্পোনেন্টসমূহ ---

// Icon mapping for dynamic rendering (Using Purple/Grammar icons)
const IconMap = {
    Type: Type, 					// Letters (বর্ণ পরিচিতি)
    TextCursorInput: TextCursorInput, // Vowels/Diacritics (স্বর ও ব্যঞ্জনচিহ্ন)
    MessageCircle: MessageCircle, 	// Sentence Formation (বাক্য গঠন)
    GitBranch: GitBranch, 			// Noun/Verb Rules (ক্রিয়াপদের নিয়মাবলী)
    Edit3: Edit3, 					// Practice (চর্চা ও উদাহরণ)
};

// Course Step Interface
interface GrammarStep {
    id: number;
    title: string;
    description: string;
    icon: keyof typeof IconMap;
}

// Mock Course Steps (Bangla) - Updated with new Icons
const arabicGrammarSteps: GrammarStep[] = [
    {
        id: 1,
        title: "আরবি বর্ণ ও মাখরাজ পরিচিতি",
        description: "আরবি বর্ণমালা, এর সঠিক উচ্চারণ স্থান (মাখরাজ) এবং মৌলিক ধ্বনিতত্ত্ব শেখা।",
        icon: "Type",
    },
    {
        id: 2,
        title: "হরকত ও স্বরচিহ্ন বিশ্লেষণ",
        description: "ফতহা, দাম্মা, কাসরা, তানভীন সহ আরবি স্বর ও ব্যঞ্জনচিহ্নগুলোর ব্যাকরণগত ব্যবহার অনুশীলন।",
        icon: "TextCursorInput",
    },
    {
        id: 3,
        title: "বাক্য গঠন (জুমলা) ও ধারা",
        description: "সহজ জুমলা ইসমিয়্যা (পরিচয়মূলক বাক্য) এবং জুমলা ফেলিইয়্যা (ক্রিয়াপদ ব্যবহার করে বাক্য) গঠন করার মূলনীতি।",
        icon: "MessageCircle",
    },
    {
        id: 4,
        title: "ইসিম ও ফেল (নাম ও ক্রিয়াপদ) এর নিয়মাবলী",
        description: "সংখ্যা (একক/দ্বৈত/বহুবচন), লিঙ্গ (পুং/স্ত্রী) ও কাল অনুযায়ী নাম এবং ক্রিয়াপদের পরিবর্তন ও ব্যবহার শেখা।",
        icon: "GitBranch",
    },
    {
        id: 5,
        title: "দৈনন্দিন চর্চা ও কোরআনী উদাহরণ",
        description: "প্রতিদিনের কথোপকথন এবং পবিত্র কুরআন থেকে নেওয়া উদাহরণ ও অনুশীলনের মাধ্যমে ব্যাকরণ দক্ষতা বৃদ্ধি।",
        icon: "Edit3",
    },
];

// Single Step Card Component with Staggered Entrance Simulation
const StepCard: React.FC<{ step: GrammarStep, index: number }> = ({ step, index }) => {
    const IconComponent = IconMap[step.icon];
    const [isVisible, setIsVisible] = useState(false);
    const [targetRef, setTargetRef] = useState<HTMLDivElement | null>(null);

    // Intersection Observer logic for staggered 'whileInView' animation
    useEffect(() => {
        if (!targetRef) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    // Staggered effect using index and setTimeout
                    setTimeout(() => {
                        setIsVisible(true);
                    }, index * 150); // 150ms delay per item
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1, // Trigger when 10% of the card is visible
            }
        );

        observer.observe(targetRef);

        return () => {
            if (targetRef) observer.unobserve(targetRef);
        };
    }, [index, isVisible, targetRef]);

    // CSS class to control visibility and transformation
    const transitionClasses = isVisible
        ? 'opacity-100 translate-y-0 scale-100'
        : 'opacity-0 translate-y-10 scale-95';

    return (
        <div
            ref={setTargetRef} // Use the ref callback to capture the element
            id={`step-${step.id}`}
            className={`bg-white rounded-2xl shadow-xl p-6 transition-all duration-700 ease-out
                         hover:shadow-2xl hover:border-purple-500 border-b-4 border-white cursor-pointer
                         ${transitionClasses}
                         hover:scale-[1.02]`}
        >
            <div className="flex items-start space-x-4 mb-3">
                <div className="p-3 rounded-full bg-purple-100 text-purple-700 flex-shrink-0">
                    {IconComponent && <IconComponent className="w-6 h-6" />}
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 pt-1 leading-snug">{step.title}</h2>
            </div>
            {/* Description starts below the icon/title line, aligned with the title text */}
            <p className="text-gray-600 pl-0 sm:pl-[52px] text-base leading-relaxed">{step.description}</p>
        </div>
    );
};

// --- ২. ফ্রি ট্রায়াল যোগাযোগ ফর্ম কম্পোনেন্ট (Purple Theme) ---

const FreeTrialContactSection: React.FC = () => {
    const [name, setName] = useState("");
    const [phoneOrEmail, setPhoneOrEmail] = useState("");
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // বাস্তব ক্ষেত্রে আপনার যোগাযোগের তথ্য এখানে প্রতিস্থাপন করুন
    const supportEmail = "support@example.com";
    const supportPhoneNumber = "8801700000000";

    // const subject = encodeURIComponent("ফ্রি ট্রায়াল অনুরোধ (Arabic Grammar Free Trial Request)");

    // // Ensure prefilledMessage uses the current state values for Mailto/WhatsApp links
    // const prefilledMessage = encodeURIComponent(
    //     `কোর্স: সহজ আরবি ব্যাকরণ কোর্স\nনাম: ${name || "[আপনার নাম]"}\nযোগাযোগ: ${phoneOrEmail || "[মোবাইল/ইমেইল]"}\n\nমেসেজ: ${message || "[আপনার বার্তা]"}`
    // );

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            // মৌলিক ভ্যালিডেশন
            if (name.trim() === "" || phoneOrEmail.trim() === "") {
                throw new Error("অনুগ্রহ করে নাম ও যোগাযোগের তথ্য পূরণ করুন।");
            }

            // সিমুলেটেড ব্যাকএন্ড কল
            console.log("Submitting form data:", { name, phoneOrEmail, message });
            await new Promise(resolve => setTimeout(resolve, 1500));

            setSubmitted(true);
        } catch (err) {
            // Narrow the unknown error before accessing .message
            if (err instanceof Error) {
                setError(err.message || "ফর্ম জমা দিতে ব্যর্থ। অনুগ্রহ করে সরাসরি যোগাযোগ করুন।");
            } else {
                setError(String(err) || "ফর্ম জমা দিতে ব্যর্থ। অনুগ্রহ করে সরাসরি যোগাযোগ করুন।");
            }
        } finally {
            setLoading(false);
        }
    }

    const labelClasses = "block text-sm font-medium text-gray-700 mb-1";

    // Helper function to dynamically generate prefilled links on click if needed, though state usage in JSX is generally fine.
    const getMailToLink = () =>
        `mailto:${supportEmail}?subject=${encodeURIComponent("ফ্রি ট্রায়াল অনুরোধ (Arabic Grammar Free Trial Request)")}&body=${encodeURIComponent(
            `কোর্স: সহজ আরবি ব্যাকরণ কোর্স\nনাম: ${name || "[আপনার নাম]"}\nযোগাযোগ: ${phoneOrEmail || "[মোবাইল/ইমেইল]"}\n\nমেসেজ: ${message || "[আপনার বার্তা]"}`
        )}`;

    const getWhatsAppLink = () =>
        `https://wa.me/${supportPhoneNumber}?text=${encodeURIComponent(
            `কোর্স: সহজ আরবি ব্যাকরণ কোর্স\nনাম: ${name || "[আপনার নাম]"}\nযোগাযোগ: ${phoneOrEmail || "[মোবাইল/ইমেইল]"}\n\nমেসেজ: ${message || "[আপনার বার্তা]"}`
        )}`;


    return (
        <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 transform transition-all duration-300 border-t-4 border-purple-500">
            <header className="mb-6 text-center">
                <Zap className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    কোর্স শুরুর আগে <span className="text-purple-600">ফ্রি ট্রায়ালের</span> জন্য যোগাযোগ
                </h1>
                <p className="mt-2 text-base text-gray-600">
                    আপনার আরবি শেখার যাত্রা শুরু করতে নীচের ফর্ম পূরণ করুন।
                </p>
            </header>

            <AnimatePresence mode="wait">
                {submitted ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.5 }}
                        className="p-6 sm:p-8 bg-purple-50 rounded-xl border border-purple-200 text-center shadow-lg"
                    >
                        <Check className="w-10 h-10 text-purple-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-purple-800">ধন্যবাদ! আপনার অনুরোধ জমা দেওয়া হয়েছে।</h3>
                        <p className="mt-2 text-base text-gray-700">
                            আমরা আপনার তথ্য পেয়েছি এবং যত দ্রুত সম্ভব আপনার সাথে যোগাযোগ করব।
                        </p>
                        <button
                            onClick={() => {
                                setSubmitted(false);
                                setName("");
                                setPhoneOrEmail("");
                                setMessage("");
                            }}
                            className="mt-4 inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-800 transition duration-150"
                        >
                            <ExternalLink className="w-4 h-4 mr-1" /> নতুন অনুরোধ পাঠান
                        </button>
                    </motion.div>
                ) : (
                    <motion.form
                        key="form"
                        onSubmit={handleSubmit}
                        className="space-y-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Error Message */}
                        {error && (
                            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        {/* Name Input */}
                        <div>
                            <label htmlFor="name" className={labelClasses}>নাম (Name)</label>
                            <div className="relative mt-1">
                                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150 pl-12"
                                    placeholder="আপনার সম্পূর্ণ নাম"
                                    type="text"
                                />
                            </div>
                        </div>

                        {/* Phone or Email Input */}
                        <div>
                            <label htmlFor="contact" className={labelClasses}>মোবাইল বা ইমেইল (Mobile or Email)</label>
                            <div className="relative mt-1">
                                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    id="contact"
                                    value={phoneOrEmail}
                                    onChange={(e) => setPhoneOrEmail(e.target.value)}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150 pl-12"
                                    placeholder="01xxxxxxxxx অথবা someone@mail.com"
                                    type="text"
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">যোগাযোগের জন্য এই তথ্যটি গুরুত্বপূর্ণ।</p>
                        </div>

                        {/* Message Textarea */}
                        <div>
                            <label htmlFor="message" className={labelClasses}>সংক্ষিপ্ত বার্তা (Message) (ঐচ্ছিক)</label>
                            <div className="relative mt-1">
                                <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <textarea
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows={4}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150 pl-12 pt-3"
                                    placeholder="আপনার ফ্রি ট্রায়ালটি সম্পর্কে সংক্ষেপে বলুন"
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3 pt-2">
                            {/* Form Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full inline-flex justify-center items-center bg-purple-600 text-white font-semibold px-4 py-3 rounded-xl shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5 mr-2" />
                                        ফর্ম পাঠান (Submit Request)
                                    </>
                                )}
                            </button>

                            {/* Alternative Contact Links */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {/* WhatsApp quick link */}
                                <a
                                    // Use the function to get the current state for prefilled message
                                    href={getWhatsAppLink()}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-full inline-flex justify-center items-center bg-green-500 text-white font-semibold px-4 py-3 rounded-xl shadow-md hover:bg-green-600 transition duration-300"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-5 h-5 mr-2 fill-current">
                                        <path d="M380.9 97.4C339.4 51.6 279.7 21.6 215.8 21.6 127 21.6 52 93.6 52 186.2c0 32.5 9.7 63 28.3 89.6L5.4 402.7c-3.2 12.3 8.2 24 20.2 20.3l119.2-34.5c24.6 15.6 52.8 24.3 82.8 24.3 88.8 0 163.9-72 163.9-164.6 0-38.2-13.4-74.1-37.4-104.5zM215.8 393.1c-25.1 0-49.3-7.5-70.1-21.8l-5.4-3.2-56.3 16.3 16.5-54.7-3.5-5.6c-17.7-28.1-27-60.5-27-94.6C68.9 116.5 137.9 52 215.8 52c42.5 0 82.5 17 112.5 47.7 30 30.7 46.8 70.8 46.8 113.6 0 87.1-70.9 157.5-157.3 157.5zM340.9 220c-5.5-2.8-32.8-16.2-37.9-18.1-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.5-14.3 18.1-17.6 21.8-3.3 3.7-6.5 4.1-12.1 1.4-11.8-5.7-47.3-29.2-89.4-54.6-33-19.5-55.5-32.8-59.3-39-3.7-6.2-4-8.8-4-12.1 0-3.3.4-6.5 1.8-8.8 1.4-2.4 3.7-4.1 5.5-6.2 1.7-2.1 3.7-3.7 5.5-5.8 1.7-2 2-3.7 3.3-6.2 1.3-2.4 1.3-4.1 1.8-5.5.5-1.4.2-3.3-.2-4.1-.4-.8-3.7-9.4-5.1-13.1-1.3-3.7-2.6-3.1-4-3.1s-2.8.4-4.1.6c-1.3.2-3.3.5-5.1.5-1.7 0-4-.2-6.2-2.8-2.2-2.8-8.5-8.3-12.1-11.8-3.7-3.5-7.7-2.8-12.1-2.8-4.4 0-8.8-.7-13.4-.7-4.5 0-8.8 0-12.5 4.7-3.7 4.7-14.3 14-14.3 34.3 0 20.3 14.7 39.8 16.8 42.5 2.1 2.7 28.5 43.5 69.5 60.1 41 16.6 65.2 16.9 74 15.6 9.4-1.3 29.2-12 33.4-23.3 4.2-11.3 4.2-20.9 2.9-23.3z" />
                                    </svg>
                                    WhatsApp এ যোগাযোগ
                                </a>

                                {/* Mailto quick link */}
                                <a
                                    // Use the function to get the current state for prefilled message
                                    href={getMailToLink()}
                                    className="w-full inline-flex justify-center items-center bg-gray-700 text-white font-semibold px-4 py-3 rounded-xl shadow-md hover:bg-gray-800 transition duration-300"
                                >
                                    <Mail className="w-5 h-5 mr-2" />
                                    ইমেইল করুন
                                </a>
                            </div>
                        </div>

                        <p className="text-xs text-gray-500 mt-4 text-center">
                            আপনার তথ্য আমরা গোপন রাখব — শুধুমাত্র ফ্রি ট্রায়াল সম্পর্কিত যোগাযোগের জন্য ব্যবহার করা হবে।
                        </p>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
}

// --- ৩. মূল অ্যাপ্লিকেশন কম্পোনেন্ট ---

const ArabicGrammarCourse: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Header Section - Purple Gradient Theme */}
            <div className="bg-gradient-to-br from-purple-50 to-white pt-8 pb-16 shadow-inner border-b-4 border-purple-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="flex text-sm text-purple-600 mb-6" aria-label="Breadcrumb">
                        <a href="#" className="hover:text-purple-800 flex items-center transition">
                            <Home className="w-4 h-4 mr-1" /> হোম
                        </a>
                        <ChevronRight className="w-4 h-4 mx-1.5 text-gray-400" />
                        <a href="#" className="hover:text-purple-800 transition">কোর্সসমূহ</a>
                        <ChevronRight className="w-4 h-4 mx-1.5 text-gray-400" />
                        <span className="font-medium text-gray-500">আরবি ব্যাকরণ</span>
                    </nav>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-purple-800 text-center mb-4 leading-tight">
                        সহজ আরবি ব্যাকরণ (সরফ-নাহু) কোর্স
                    </h1>
                    <p className="text-center text-lg md:text-xl text-purple-700 font-medium max-w-4xl mx-auto">
                        প্রাথমিক পর্যায় থেকে কুরআন ও হাদিসের আরবি ভাষা বোঝার জন্য মৌলিক সরফ (শব্দ গঠন) এবং নাহু (বাক্য গঠন) শিখুন।
                    </p>
                </div>
            </div>

            {/* Main Content (Course Modules) */}
            <div className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-10 text-center border-b-2 border-purple-300 pb-3">
                        কোর্স মডিউলসমূহ ও ধাপ
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                        {arabicGrammarSteps.map((step, index) => (
                            <StepCard key={step.id} step={step} index={index} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Free Trial Contact Form Section */}
            <div className="bg-purple-50 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">
                    <FreeTrialContactSection />
                </div>
            </div>

            {/* Optional Footer */}
            <footer className="bg-gray-800 text-white p-6 text-center text-sm">
                <p>
                    © {new Date().getFullYear()} সহজ আরবি ব্যাকরণ কোর্স। সর্বস্বত্ব সংরক্ষিত।
                </p>
            </footer>

        </div>
    );
};

export default ArabicGrammarCourse;
