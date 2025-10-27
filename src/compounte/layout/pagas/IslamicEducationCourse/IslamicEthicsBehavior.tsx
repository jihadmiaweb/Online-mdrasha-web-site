import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Zap, Users, Feather, ScrollText, GitBranch, X, CheckCircle } from "lucide-react";

// Islamic Ethics & Behavior Guide (Bangla)
// Save as: src/components/IslamicEthicsBehavior.jsx
// Requirements: TailwindCSS, framer-motion, lucide-react (optional icons)

const sections = [
    { id: 'overview', title: 'সারাংশ (ভূমিকা)', icon: BookOpen, desc: 'ইসলামিক নৈতিকতা ও আচরণ — সাক্ষ্য, সততা, ইনসাফ ও সদ্ভাবপ্রবণ আচরণ কিভাবে দৈনন্দিন জীবনে প্রয়োগ করতে হয়।' },
    { id: 'core', title: 'মূল নৈতিক গুণাবলী', icon: Zap, desc: 'সৎকর্ম, ইমান, ধৈর্য, কৃতজ্ঞতা, সহমর্মিতা, ক্ষমাশীলতা ইত্যাদি সম্পর্কে সংক্ষিপ্ত ব্যাখ্যা।' },
    { id: 'daily', title: 'দৈনন্দিন অভ্যাস', icon: Feather, desc: 'ভাষা, সময়নিষ্ঠা, সৎচর্চা, মিথ্যাচার এড়ানো—প্র্যাকটিক্যাল টিপস।' },
    { id: 'social', title: 'আন্তঃসামাজিক আচরণ', icon: Users, desc: 'গৃহস্থালিতে, কর্মক্ষেত্রে ও সামাজিক পেশায় সৌহার্দ্য বজায় রাখার ধরন।' },
    { id: 'parenting', title: 'শিশু ও তরুণদের নৈতিক শিক্ষা', icon: GitBranch, desc: 'নমুনা-মাহিরা দেওয়া, কথোপকথন, মডেলিং আচরণ।' },
    { id: 'resources', title: 'সংকরণ ও সম্পদ', icon: ScrollText, desc: 'আরও পড়ার জন্য বই, অডিও, ভিডিও লিংক—স্থানীয় আলেম/ইমামকে অনুসরণ করুন।' }
];

const virtues = [
    { id: 'sincerity', name: 'নিয়্যালা (সত্যনিষ্ঠা)', note: 'কাজে ও কথায় আন্তরিকতা' },
    { id: 'truth', name: 'সত্যবাণী', note: 'মিথ্যা এড়ানো; প্রতিশ্রুতি পালন' },
    { id: 'justice', name: 'নিষ্পক্ষতা ও ইনসাফ', note: 'সাম্য ও ন্যায়পরায়ণতা' },
    { id: 'compassion', name: 'দয়া ও সহমর্মিতা', note: 'দু:খে সহানুভূতি দেখানো' },
    { id: 'gratitude', name: 'কৃতজ্ঞতা', note: 'আলহামদুলিল্লাহ মনোভাব' }
];

// Quiz data (added correct answers for clarity)
const quizData = [
    {
        q: "Q1: আপনি যদি কেউ ভুল তথ্য দেয়, আপনি কেমন আচরণ করবেন?",
        options: [
            { id: 'a', text: 'অবহেলার সাথে আলোচনা এড়িয়ে যাওয়া' },
            { id: 'b', text: 'নম্রভাবে সংশোধন করা', isCorrect: true },
        ]
    },
    {
        q: "Q2: আপনি কাউকে আঘাত করলে কী করবেন?",
        options: [
            { id: 'a', text: 'ক্ষমা চেয়ে সমস্যা সমাধান করা', isCorrect: true },
            { id: 'b', text: 'কিছু না বলা, ভান করা এটি ঘটেনি' },
        ]
    }
];

export default function IslamicEthicsBehavior() {
    const [active, setActive] = useState('overview');
    const [quizOpen, setQuizOpen] = useState(false);
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [score, setScore] = useState<number | null>(null);

    interface Answers {
        [key: string]: string;
    }

    const handleAnswer = (qIndex: number, val: string): void =>
        setAnswers((a: Answers) => ({ ...a, [`q${qIndex + 1}`]: val }));

    const submitQuiz = () => {
        let s = 0;
        quizData.forEach((question, index) => {
            const userAnswer = answers[`q${index + 1}`];
            const correctOption = question.options.find(opt => opt.isCorrect);
            if (userAnswer === correctOption?.id) {
                s += 1;
            }
        });
        setScore(s);
    };

    const resetQuiz = () => {
        setAnswers({});
        setScore(null);
    }

    // Tailwind CSS Class Constants
    const buttonClass = "flex items-center gap-1 px-3 py-1 border border-slate-300 rounded-md text-sm hover:bg-slate-100 transition duration-200";
    const activeNavClass = 'bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-md';
    const inactiveNavClass = 'hover:bg-slate-100 text-slate-700';
    const contentBoxClass = 'p-3 border rounded-lg bg-white shadow-sm';
    const quizButtonClass = "px-3 py-1 border rounded-md transition duration-200";

    return (
        <div className="max-w-4xl mx-auto my-6 p-4 bg-gray-50 rounded-xl shadow-lg">
            <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
                <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">ইসলামিক নৈতিকতা ও আচরণ 🕌</h1>
                    <p className="text-sm text-slate-500">দৈনন্দিন জীবনে ইসলামী নৈতিকতার অনুবর্তন—সহজ ভাষায় ও প্র্যাকটিক্যাল টিপস</p>
                </div>

                <div className="flex flex-wrap gap-2 items-center">
                    <button onClick={() => window.print()} className={buttonClass}>
                        <ScrollText size={16} />
                        প্রিন্ট
                    </button>
                    <button onClick={() => navigator.share ? navigator.share({ title: 'ইসলামিক নৈতিকতা', text: 'দৈনন্দিন নৈতিকতা ও আচরণ — সহজ নির্দেশিকা', url: window.location.href }) : alert('শেয়ার সাপোর্ট নেই')} className={buttonClass}>
                        <Users size={16} />
                        শেয়ার
                    </button>
                </div>
            </header>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Sidebar Navigation */}
                <nav className="md:col-span-1 p-3 bg-white rounded-lg shadow-inner border border-slate-100 print:hidden">
                    <ul className="space-y-1">
                        {sections.map(s => {
                            const Icon = s.icon;
                            return (
                                <li key={s.id}>
                                    <button
                                        onClick={() => setActive(s.id)}
                                        className={`w-full text-left p-3 rounded-lg flex items-center gap-2 ${active === s.id ? activeNavClass : inactiveNavClass}`}
                                        aria-current={active === s.id}
                                    >
                                        <Icon size={18} />
                                        <div className="font-medium cursor-pointer">{s.title}</div>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="mt-6 border-t pt-4">
                        <button onClick={() => { setQuizOpen(true); resetQuiz(); }} className="px-3 py-2 bg-green-500 text-white font-semibold rounded-md w-full hover:bg-green-600 transition duration-200 shadow-lg">
                            নৈতিকতা কুইজ 🧠
                        </button>
                    </div>
                </nav>

                {/* Main Content Area */}
                <section className="md:col-span-2 bg-white p-6 rounded-lg shadow-xl min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {/* Overview Section */}
                        {active === 'overview' && (
                            <motion.div key="overview" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                                <h2 className="text-xl font-semibold mb-3 border-b pb-1">সারাংশ</h2>
                                <p className="text-base text-slate-700 leading-relaxed mb-4">ইসলামিক নৈতিকতা নকশা করে ব্যক্তি ও সমাজ—এটি কেবল ধর্মীয় আচার নয়, বরং মানুষের সঙ্গে **ন্যায়পরায়ণতা, সদয় আচরণ ও দায়িত্বশীলতার প্রতিফলন**। নিচে আমরা প্রধান গুণাবলীগুলির একটি সংক্ষিপ্ত রূপরেখা দিয়েছি।</p>

                                <div className="grid md:grid-cols-2 gap-3">
                                    {virtues.map(v => (
                                        <div key={v.id} className={`${contentBoxClass} border-l-4 border-blue-400`}>
                                            <div className="font-semibold text-lg text-blue-800">{v.name}</div>
                                            <div className="text-sm text-slate-600">{v.note}</div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Core Virtues Section */}
                        {active === 'core' && (
                            <motion.div key="core" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                                <h2 className="text-xl font-semibold mb-3 border-b pb-1">প্রধান নৈতিক গুণাবলী</h2>
                                <ul className="list-disc pl-5 space-y-3 text-slate-700 text-base">
                                    <li>**সত্যনিষ্ঠা (সিদক):** প্রতিজ্ঞা রাখুন, মিথ্যা এড়ান ও স্পষ্টতা বজায় রাখুন। এটি ইমানের ভিত্তি।</li>
                                    <li>**ধৈর্য (সবর):** কষ্টে ধৈর্যশীল হওয়া—পরীক্ষায় স্থিতপক্ষতা দেখান। কখনোই আশা হারাবেন না।</li>
                                    <li>**কৃতজ্ঞতা (শুকর):** ছোটো বড়ো অনুগ্রহের জন্য কৃতজ্ঞতা প্রকাশ করুন—এটি সম্পর্ক শক্ত করে ও আল্লাহ'র নেয়ামত বৃদ্ধি করে।</li>
                                    <li>**দয়া (রহম):** দুর্বল ও অভাবীদের প্রতি সহানুভূতিশীল হোন।</li>
                                </ul>
                            </motion.div>
                        )}

                        {/* Daily Habits Section */}
                        {active === 'daily' && (
                            <motion.div key="daily" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                                <h2 className="text-xl font-semibold mb-3 border-b pb-1">দৈনন্দিন অভ্যাস</h2>
                                <ol className="list-decimal pl-5 space-y-3 text-slate-700 text-base">
                                    <li>**ভালো ভাষা ব্যবহার:** গালি-মাতাল ও গীবত থেকে বিরত থাকুন। আপনার শব্দ যেন অন্যদের শান্তি দেয়।</li>
                                    <li>**সময়নিষ্ঠা (আমানত):** আপনার সময়কে সম্মান করুন ও অন্যের সময়ের মূল্য দিন। প্রতিশ্রুতি দিলে সময়মতো তা পালন করুন।</li>
                                    <li>**শিষ্টাচার:** ধন্যবাদ ও ক্ষমা চাওয়ার অভ্যাস গড়ে তুলুন। সালাম দেওয়া ও উত্তর দেওয়া জরুরি।</li>
                                    <li>**সত্যবাদিতা:** সব পরিস্থিতিতে সত্য কথা বলার সাহস রাখুন।</li>
                                </ol>
                            </motion.div>
                        )}

                        {/* Social Behavior Section */}
                        {active === 'social' && (
                            <motion.div key="social" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                                <h2 className="text-xl font-semibold mb-3 border-b pb-1">আন্তঃসামাজিক আচরণ</h2>
                                <div className="space-y-4 text-slate-700 text-base">
                                    <div className={contentBoxClass}>
                                        <h3 className="font-semibold text-lg mb-1">কর্মক্ষেত্রে সৎচর্চা</h3>
                                        <p>আইনি ও নৈতিক সীমা মেনে চলুন; ন্যায্যতা বজায় রাখুন। নিজের কাজ সম্পূর্ণ সততার সাথে করুন।</p>
                                    </div>
                                    <div className={contentBoxClass}>
                                        <h3 className="font-semibold text-lg mb-1">পরিবারে মিতভাষিতা</h3>
                                        <p>সন্তানদের কাছে নিজেকে নমুনা হিসেবে রাখুন—শব্দ, আচরণ ও প্রতিশ্রুতি অনুযায়ী। পরিবারের প্রতি দয়ালু হোন।</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Parenting Section */}
                        {active === 'parenting' && (
                            <motion.div key="parenting" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                                <h2 className="text-xl font-semibold mb-3 border-b pb-1">শিশু ও তরুণদের নৈতিক শিক্ষা</h2>
                                <ul className="list-disc pl-5 space-y-3 text-slate-700 text-base">
                                    <li>**উৎসাহ দিন:** ভালো ব্যবহারের জন্য **পুরস্কার ও প্রশংসা** ব্যবহার করুন (যেমন, হাদিস মুখস্থ করা)।</li>
                                    <li>**আদর্শ তৈরি করুন:** আপনার কাজগুলো তাদের সামনে করে দেখান—নৈতিক শিক্ষা **কথায় নয়, কাজে**।</li>
                                    <li>**মাল্টিমিডিয়া সীমা:** ইলেকট্রনিক গ্যাজেট নিয়ন্ত্রণ করুন এবং পারিবারিক কথোপকথন ও আলোচনা বাড়ান।</li>
                                </ul>
                            </motion.div>
                        )}

                        {/* Resources Section */}
                        {active === 'resources' && (
                            <motion.div key="resources" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                                <h2 className="text-xl font-semibold mb-3 border-b pb-1">সংকরণ ও সম্পদ</h2>
                                <div className="space-y-4 text-slate-700 text-base">
                                    <p>স্থানীয় **আলেম/ইমামদের কাছ থেকে ধারাবাহিক নির্দেশনা** নিন। এছাড়া নিম্নলিখিত ধরনের উপকরণ অনুসন্ধান করুন — নৈতিকতা নিয়ে খণ্ডগ্রন্থ, প্রবন্ধ, অডিও টকস এবং পারিবারিক কর্মশালা।</p>
                                    <div className="flex flex-wrap gap-3">
                                        <button onClick={() => window.open('https://example.com/ethics-books', '_blank')} className={buttonClass}>বই সংগ্রহ</button>
                                        <button onClick={() => window.open('https://example.com/ethics-audio', '_blank')} className={buttonClass}>অডিও</button>
                                        <button onClick={() => window.open('https://example.com/ethics-video', '_blank')} className={buttonClass}>ভিডিও লেকচার</button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Footer actions */}
                    <div className="mt-8 pt-4 border-t flex flex-wrap gap-3 print:hidden">
                        <button onClick={() => alert('আপনি চাইলে আমি এই কম্পোনেন্টকে বাংলা+ইংরেজি দুইটি করে দিতে পারি।')} className={buttonClass.replace('py-1', 'py-2').replace('px-3', 'px-4')}>অনুবাদ বিকল্প</button>
                        <button onClick={() => alert('ডেমো পেজ বানাতে চাইলে বলুন—I will create a small Next.js demo.')} className={buttonClass.replace('py-1', 'py-2').replace('px-3', 'px-4')}>ডেমো পেজ দেখুন</button>
                    </div>
                </section>
            </div>

            {/* Quiz modal */}
            {quizOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white p-6 rounded-xl max-w-lg w-full shadow-2xl">
                        <div className="flex justify-between items-center mb-4 border-b pb-2">
                            <h3 className="text-xl font-bold">নৈতিকতা সংক্ষিপ্ত কুইজ 🧠</h3>
                            <button onClick={() => { setQuizOpen(false); setScore(null); }} className="text-slate-400 hover:text-red-500 transition"><X size={24} /></button>
                        </div>

                        <div className="space-y-5">
                            {quizData.map((qItem, qIndex) => (
                                <div key={qIndex}>
                                    <div className="font-semibold mb-2 text-lg text-gray-800">{qItem.q}</div>
                                    <div className="space-y-2">
                                        {qItem.options.map((opt) => {
                                            const isSelected = answers[`q${qIndex + 1}`] === opt.id;
                                            const isCorrect = score !== null && opt.isCorrect;
                                            const isIncorrect = score !== null && isSelected && !opt.isCorrect;

                                            let style = `${quizButtonClass} w-full text-left`;
                                            if (isCorrect) {
                                                style += ' bg-green-100 border-green-500 text-green-700 font-medium';
                                            } else if (isIncorrect) {
                                                style += ' bg-red-100 border-red-500 text-red-700 font-medium';
                                            } else if (isSelected) {
                                                style += ' bg-blue-100 border-blue-500 text-blue-700 font-medium';
                                            } else {
                                                style += ' border-slate-300 hover:bg-slate-50';
                                            }

                                            return (
                                                <button
                                                    key={opt.id}
                                                    onClick={() => handleAnswer(qIndex, opt.id)}
                                                    disabled={score !== null}
                                                    className={style}
                                                >
                                                    {isCorrect && <CheckCircle size={16} className="inline mr-1" />}
                                                    {isIncorrect && <X size={16} className="inline mr-1" />}
                                                    {opt.id.toUpperCase()}) {opt.text}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-3 mt-6 pt-4 border-t">
                            <button
                                onClick={submitQuiz}
                                disabled={score !== null}
                                className={`${quizButtonClass} bg-blue-500 text-white font-semibold hover:bg-blue-600 ${score !== null ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                সাবমিট করুন
                            </button>
                            {score !== null && (
                                <button
                                    onClick={resetQuiz}
                                    className={`${quizButtonClass} bg-yellow-500 text-white font-semibold hover:bg-yellow-600`}
                                >
                                    কুইজ রিসেট
                                </button>
                            )}
                        </div>

                        {score !== null && (
                            <div className="mt-4 p-3 bg-blue-50 rounded-lg font-bold text-lg">
                                আপনার স্কোর: <span className="text-blue-700">{score}</span> / {quizData.length} 🎉
                            </div>
                        )}
                    </div>
                </div>
            )}

            <footer className="text-xs text-slate-500 mt-4 p-2 text-center">
                **দ্রষ্টব্য:** এই নির্দেশিকা সাধারণ উদ্দেশ্যে—নির্দিষ্ট ধর্মীয় বা আইনি পরামর্শের জন্য স্থানীয় **আলেমের সাথে পরামর্শ** করুন।
            </footer>
        </div>
    );
}