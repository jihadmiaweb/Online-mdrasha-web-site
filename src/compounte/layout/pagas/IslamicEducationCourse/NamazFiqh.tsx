import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize, Minimize, Contrast, Sun, Printer, Play, Pause, Download, Share2, BookOpen, ScrollText } from "lucide-react";

// Namaz & Fiqh Guidance Component (Bangla)
// Save as: src/components/NamazFiqhGuide.jsx
// Requirements: TailwindCSS, framer-motion, lucide-react

const sections = [
    {
        id: "overview",
        icon: BookOpen,
        title: "সারাংশ — নামাজ কেন এবং কীভাবে",
        body: `নামাজ ইসলামি জীবনের গুরুত্বপূর্ণ স্তম্ভ। এখানে আমরা সহজ ভাষায় নামাজের ধাপগুলো, উদ্দেশ্য এবং প্রয়োজনীয় বিষয়ে আলোচনা করব।`
    },
    {
        id: "steps",
        icon: ScrollText,
        title: "ধাপে ধাপে নামাজ (সহজ)",
        body: `নামাজের সাধারণ ধাপ: ইন্তেকাব/উজু পর, নিকটতম ইয়ারব করা, তাকবীর, কিয়াম, কিয়াম থেকে রুকু, সেজদা এবং সালাম। প্রতিটি ধাপে সংক্ষিপ্ত ব্যাখ্যা দেওয়া আছে।`
    },
    {
        id: "fiqh",
        icon: Maximize, // A general icon for 'specific' or 'accommodated'
        title: "বিশেষ ফিকাহ: শারীরিক সীমাবদ্ধতা সহ",
        body: `শয্যায় নামাজ, কুশনে বসে নামাজ, হাত/পায়ে সমস্যা থাকলে কীভাবে রুকনগুলো অভিযোজিত করা যায়—সবকিছু সংক্ষিপ্ত ও প্রমাণিত সূত্রসহ।`
    },
    {
        id: "resources",
        icon: Download,
        title: "অতিরিক্ত সম্পদ",
        body: `অডিও-রিসোর্স, ক্যান্ট্রাস্ট মোড, বড় টেক্সট অপশন ও প্রিন্ট/শেয়ার করার জন্য ইউটিলিটি।`
    }
];

const stepsList = [
    { step: 1, title: "নিয়ত (নিয়াত)", desc: "মনের মধ্যে যে নামাজ পড়ছেন তার নিয়ত করুন।" },
    { step: 2, title: "তাকবীর (আল্লাহু আকবার)", desc: "আল্লাহু আকবার বলে করাজে উঠুন। (এখানে মূল তাকবীর শব্দটি ব্যবহার করা হয়েছে)" },
    { step: 3, title: "কিয়াম ও সূরা পড়া", desc: "কিয়াম অবস্থায় সূরা বা আয়াত পড়ুন।" },
    { step: 4, title: "রুকু", desc: "রুকুতে কোমর-সোজা রাখুন, হাত হাঁটুর ওপর।" },
    { step: 5, title: "সেজ্দা", desc: "মাথা, নাক, দুই হাত, দুই হাঁটু এবং দুই পায়ের আঙ্গুল মাটিতে রাখুন।" },
    { step: 6, title: "তাশাহুদ ও সালাম", desc: "অবশেষে তাশাহুদ পড়ে সালাম দিন।" }
];

export default function NamazFiqhGuide() {
    const [active, setActive] = useState("overview");
    const [largeText, setLargeText] = useState(false);
    const [highContrast, setHighContrast] = useState(false);
    const [audioPlaying, setAudioPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const toggleAudio = () => {
        if (!audioRef.current) return;
        if (audioPlaying) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setAudioPlaying(false);
        } else {
            audioRef.current.play();
            setAudioPlaying(true);
            audioRef.current.onended = () => setAudioPlaying(false);
        }
    };

    // Dynamic Classes for High Contrast Mode
    const primaryBg = highContrast ? 'bg-black' : 'bg-white';
    const primaryText = highContrast ? 'text-white' : 'text-slate-800';
    const secondaryBg = highContrast ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200';
    const secondaryText = highContrast ? 'text-slate-300' : 'text-slate-600';

    const containerClass = `p-4 md:p-8 rounded-2xl shadow-xl min-h-[320px] ${primaryBg} ${primaryText}`;
    const textClass = largeText ? 'text-lg md:text-xl' : 'text-sm md:text-base';

    // Button styling
    const buttonBase = `flex items-center gap-2 px-3 py-1 border rounded-md transition duration-200 ease-in-out`;
    const headerButton = `${buttonBase} ${highContrast ? 'border-white/50 hover:bg-white/10' : 'border-slate-300 hover:bg-slate-100'}`;
    const navButtonActive = `w-full text-left p-3 rounded-lg font-bold ${highContrast ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`;
    const navButtonInactive = `w-full text-left p-3 rounded-lg ${highContrast ? 'hover:bg-slate-900/50' : 'hover:bg-slate-50'}`;

    const printGuide = () => {
        window.print();
    };

    return (
        <div className="max-w-4xl mx-auto my-6 print:my-0 print:shadow-none">
            <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3 print:hidden">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">নামাজ ও ফিকাহ নির্দেশিকা</h1>
                    <p className="text-sm text-slate-500">সবার জন্য সহজ, স্পষ্ট ও অ্যাক্সেসিবল নির্দেশনা</p>
                </div>

                <div className="flex flex-wrap gap-2 items-center">
                    <button
                        onClick={() => setLargeText(v => !v)}
                        aria-pressed={largeText}
                        title={largeText ? 'সাধারণ টেক্সট মোডে পরিবর্তন করুন' : 'বড় টেক্সট মোডে পরিবর্তন করুন'}
                        className={headerButton}
                    >
                        {largeText ? <Minimize size={18} /> : <Maximize size={18} />}
                        {largeText ? 'সাধারণ টেক্সট' : 'বড় টেক্সট'}
                    </button>

                    <button
                        onClick={() => setHighContrast(v => !v)}
                        aria-pressed={highContrast}
                        title={highContrast ? 'স্বাভাবিক ডিসপ্লে মোডে পরিবর্তন করুন' : 'উচ্চ কনট্রাস্ট মোডে পরিবর্তন করুন'}
                        className={headerButton}
                    >
                        {highContrast ? <Sun size={18} /> : <Contrast size={18} />}
                        {highContrast ? 'স্বাভাবিক মোড' : 'উচ্চ কনট্রাস্ট'}
                    </button>

                    <button onClick={printGuide} title="এই নির্দেশিকা প্রিন্ট করুন" className={headerButton}>
                        <Printer size={18} />
                        প্রিন্ট
                    </button>
                </div>
            </header>

            <main className={containerClass} role="main">
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Sidebar / Navigation */}
                    <nav aria-label="নেভিগেশন" className="md:col-span-1 print:hidden">
                        <ul className="space-y-2">
                            {sections.map(s => (
                                <li key={s.id}>
                                    <button
                                        onClick={() => setActive(s.id)}
                                        className={active === s.id ? navButtonActive : navButtonInactive}
                                        aria-current={active === s.id}
                                    >
                                        <s.icon size={20} className="hidden md:inline-block" />
                                        <div className={`${textClass} cursor-pointer`}>{s.title}</div>
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* Quick Links / Glossary */}
                        <div className={`mt-6 p-4 rounded-lg ${secondaryBg} border`}>
                            <h4 className={`font-semibold mb-2 ${textClass}`}>অভিধান / দ্রুত লিংক</h4>
                            <ul className={`text-sm space-y-1 ${secondaryText}`}>
                                <li><button className="underline text-left cursor-pointer hover:opacity-80" onClick={() => setActive('steps')}>ধাপে ধাপে নামাজ</button></li>
                                <li><button className="underline text-left cursor-pointer hover:opacity-80" onClick={() => setActive('fiqh')}>শারীরিক সীমাবদ্ধতা সহ নির্দেশ</button></li>
                                <li><button className="underline text-left cursor-pointer hover:opacity-80" onClick={() => setActive('resources')}>অডিও ও সম্পদ</button></li>
                            </ul>
                        </div>
                    </nav>

                    {/* Content Section */}
                    <section className="md:col-span-2">
                        <AnimatePresence mode="wait">
                            {/* Overview Section */}
                            {active === 'overview' && (
                                <motion.div
                                    key="overview"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    className="prose max-w-none"
                                >
                                    <h2 className={`text-xl font-semibold mb-2 ${textClass}`}>
                                        {(() => {
                                            const overviewSection = sections.find(s => s.id === 'overview');
                                            return overviewSection ? overviewSection.title.split('—')[0] : '';
                                        })()}
                                    </h2>
                                    <p className={`${textClass} leading-relaxed mb-4`}>নামাজ হলো আল্লাহর সাথে সংযোগ স্থাপনের খুবই গুরুত্বপূর্ণ মাধ্যম। এখানে আমরা সহজভাবে নামাজের উদ্দেশ্য, নিয়ত ও ধাপগুলো দেখাবো।</p>

                                    <div className={`${secondaryBg} p-4 rounded-lg border`}>
                                        <h3 className={`font-medium mb-2 ${textClass}`}>প্রাথমিক নিয়মাবলি</h3>
                                        <ul className="list-decimal pl-5 space-y-1">
                                            <li className={textClass}>ওজু করা (যদি সম্ভব)</li>
                                            <li className={textClass}>নিয়ত পরিষ্কার রাখা</li>
                                            <li className={textClass}>শান্ত ও সুষ্ঠু মন—অন্যান্য ব্যস্ততা কম রাখুন</li>
                                        </ul>
                                    </div>
                                </motion.div>
                            )}

                            {/* Steps Section */}
                            {active === 'steps' && (
                                <motion.div
                                    key="steps"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                >
                                    <h2 className={`text-xl font-semibold mb-4 ${textClass}`}>ধাপে ধাপে নামাজ</h2>
                                    <ol className="space-y-3">
                                        {stepsList.map(s => (
                                            <li key={s.step} className={`${secondaryBg} p-3 border rounded-lg`}>
                                                <div className={`font-semibold ${textClass}`}>ধাপ {s.step}: {s.title}</div>
                                                <div className={`${textClass} ${secondaryText}`}>{s.desc}</div>
                                            </li>
                                        ))}
                                    </ol>

                                    <div className={`mt-4 p-3 ${secondaryBg} rounded-lg border`}>
                                        <h4 className={`font-semibold mb-2 ${textClass}`}>দ্রুত টিপস</h4>
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li className={textClass}>শ্বাস-প্রশ্বাস নিয়ন্ত্রণ করুন—আরামদায়ক গতি বজায় রাখুন।</li>
                                            <li className={textClass}>ভিত্তিগুলো (নিয়ত, তাকবীর, কিয়াম, রুকু, সেজদা, তাশাহুদ) ভুলে গেলে স্থানীয় আলেমের নির্দেশনা অনুসরণ করুন।</li>
                                        </ul>
                                    </div>
                                </motion.div>
                            )}

                            {/* Fiqh Section */}
                            {active === 'fiqh' && (
                                <motion.div
                                    key="fiqh"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                >
                                    <h2 className={`text-xl font-semibold mb-4 ${textClass}`}>শারীরিক সীমাবদ্ধতা সহ নির্দেশ</h2>

                                    <div className="space-y-3">
                                        <article className={`${secondaryBg} p-3 border rounded-lg`}>
                                            <h3 className={`font-semibold ${textClass}`}>বিস্তার (বিছানায় বা চেয়ারে নামাজ)</h3>
                                            <p className={`${textClass} ${secondaryText}`}>যদি দাঁড়ানো সম্ভব না, তবে বসে নামাজ করা যায়। রুকু ও সেজ্দার বদলে মাথা হাল্কা-ভাবে নাড়ান অথবা শরীরের একটি অংশ বাঁকান—ফিকাহ অনুযায়ী অনুমোদিত ধরন অনুসরণ করুন।</p>
                                        </article>

                                        <article className={`${secondaryBg} p-3 border rounded-lg`}>
                                            <h3 className={`font-semibold ${textClass}`}>হাত/পা সমস্যার সময়</h3>
                                            <p className={`${textClass} ${secondaryText}`}>যদি হাত বা পা না চালাতে পারেন, আলেমদের বলা মতে আশ্রিত শরীরপ্রকৃতির উপায়গুলো মেনে চলুন — যেমন ইশারা বা কিসমত পরিবর্তন করে নিদিষ্ট ইঙ্গিত করা।</p>
                                        </article>

                                        <article className={`${secondaryBg} p-3 border rounded-lg`}>
                                            <h3 className={`font-semibold ${textClass}`}>বাচ্চা বা বৃদ্ধদের জন্য সহজকরণ</h3>
                                            <p className={`${textClass} ${secondaryText}`}>ছোটদের জন্য সংক্ষিপ্ত নিয়ম শেখান, বড়দের জন্য আরামদায়ক পোশাক ও সাপোর্ট দিতে হবে।</p>
                                        </article>
                                    </div>
                                </motion.div>
                            )}

                            {/* Resources Section */}
                            {active === 'resources' && (
                                <motion.div
                                    key="resources"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                >
                                    <h2 className={`text-xl font-semibold mb-4 ${textClass}`}>অডিও ও সম্পদ</h2>

                                    <div className="space-y-3">
                                        <div className={`${secondaryBg} p-3 border rounded-lg`}>
                                            <p className={`${textClass} ${secondaryText} mb-2`}>নমুনা অডিও (নিয়ত ও সূরা পাঠ) — দ্রুত অনুশীলনের জন্য ব্যবহার করুন।</p>
                                            <div className="flex flex-wrap gap-2">
                                                <button onClick={toggleAudio} className={headerButton} aria-pressed={audioPlaying}>
                                                    {audioPlaying ? <Pause size={18} /> : <Play size={18} />}
                                                    {audioPlaying ? 'পজ' : 'প্লে'}
                                                </button>
                                                <button onClick={() => { window.alert('অডিও ডাউনলোড: এই অংশ কাস্টম ফাইল দিয়ে পরিবর্তন করুন।'); }} className={headerButton}>
                                                    <Download size={18} />
                                                    ডাউনলোড
                                                </button>
                                            </div>
                                            <audio ref={audioRef} src="/audio/sample-namaz.mp3" preload="none" />
                                        </div>

                                        <div className={`${secondaryBg} p-3 border rounded-lg`}>
                                            <h4 className={`font-medium ${textClass}`}>অতিরিক্ত</h4>
                                            <ul className="list-disc pl-5">
                                                <li className={textClass}>প্রিন্ট ফরম্যাট: পৃষ্ঠার উপরের প্রিন্ট বাটন চাপুন।</li>
                                                <li className={textClass}>স্থানীয় আলেমদের নির্দেশনা অনুসরণ করুন—এই গাইডটি সাধারণ নির্দেশনা।</li>
                                            </ul>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Footer actions */}
                        <div className="mt-6 flex flex-wrap gap-3 print:hidden">
                            <button onClick={() => window.open('https://example.com/more-fiqqh', '_blank')} className={headerButton.replace('px-3 py-1', 'px-4 py-2')}>আরও পড়ুন</button>
                            <button onClick={() => navigator.share ? navigator.share({ title: 'নামাজ নির্দেশিকা', text: 'সহজ নামাজ ও ফিকাহ নির্দেশিকা', url: window.location.href }) : window.alert('আপনার ব্রাউজার শেয়ার সাপোর্ট করে না')} className={headerButton.replace('px-3 py-1', 'px-4 py-2')}>
                                <Share2 size={18} />
                                শেয়ার
                            </button>
                        </div>
                    </section>
                </div>
            </main>

            <footer className="text-xs text-slate-500 mt-3 p-2 text-center print:block">
                ⚠️ **গুরুত্বপূর্ণ ডিসক্লেমার:** এই গাইডটি সাধারণ নির্দেশনামূলক—কঠোর ফিকাহগত প্রশ্নের জন্য স্থানীয় আলেম বা নির্ভরযোগ্য ইসলামি সংস্থার পরামর্শ গ্রহণ করুন।
            </footer>
        </div>
    );
}