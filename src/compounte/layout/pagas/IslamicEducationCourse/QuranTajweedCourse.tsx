import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, BookOpen, User, Speaker, CheckSquare, ArrowRight, ChevronDown } from "lucide-react";

// --- ডেটা সোর্স (Data Source) ---
const sampleTeachers = [
    {
        id: 1,
        name: "মুফতি আহমেদ হোসেন",
        title: "তাজবীদ বিশেষজ্ঞ",
        bio: "১৫ বছরের অভিজ্ঞতা; আরবি ব্যাকরণ ও সুরে দক্ষ",
        // Updated photo path
        photo: "/imgas/Qualified-Islamic-Scholars/download(3).jpeg",
    },
    {
        id: 2,
        name: "হাফেজা নাসরিন আক্তার",
        title: "কোরআনিক রিকটেশন শিক্ষক",
        bio: "হিফজ ও উচ্চারণ মূলক প্রশিক্ষণ প্রদান করেন",
        // Updated photo path
        photo: "/imgas/Qualified-Islamic-Scholars/download (1).jpeg",
    },
];

const sampleCurriculum = [
    {
        id: 1,
        title: "মূল পাঠ: আরবী হরফ ও স্বর",
        desc: "আর্থ এবং উচ্চারণ সহ হরফের পরিচিতি।",
        details: ["আরবি বর্ণমালা (মাজিদিয়্যাহ) পরিচিতি", "হরফের মাখরাজ (উচ্চারণ স্থান) অনুশীলন", "হরকতের (স্বরচিহ্ন) সঠিক ব্যবহার"],
    },
    {
        id: 2,
        title: "তাজবীদ: মূল নিয়মাবলী",
        desc: "নুকতা, মদ, ইখফা, ইদ্গাম ইত্যাদি নিয়ম।",
        details: ["নূন সাকিন ও তানভীনের নিয়মাবলি (ইযহার, ইদগাম, ইক্বলাব, ইখফা)", "মদের (দীর্ঘ উচ্চারণের) প্রকারভেদ ও প্রয়োগ", "ক্বলক্বালাহ এর ব্যবহার"],
    },
    {
        id: 3,
        title: "সুরাহ অনুশীলন",
        desc: "ছোট থেকে বড়— ধাপে ধাপে অনুশীলন ও সঠিক সংশোধন।",
        details: ["ছোট সুরাহগুলো শুদ্ধ করা (যেমন: সূরা ফাতিহা, ইখলাস)", "মুখস্থ করার কৌশল (হিফজ)", "দৈনিক আমলের জন্য প্রয়োজনীয় সুরাহ"],
    },
    {
        id: 4,
        title: "তাফসীর: সংক্ষিপ্ত ব্যাখ্যা",
        desc: "প্রাসঙ্গিক আয়াতের সংক্ষিপ্ত তাফসীর—with simple Bangla explanation.",
        details: ["নির্বাচিত আয়াতসমূহের বাংলা অনুবাদ", "শব্দের মূল অর্থ ও প্রেক্ষাপট", "দৈনন্দিন জীবনে প্রয়োগ"],
    },
];

// --- ছোট কম্পোনেন্ট: পাঠ্যক্রমের আইটেম (Curriculum Item) ---
const CurriculumItem = ({ item, expanded, setExpanded }) => {
    const isOpen = expanded === item.id;

    return (
        <motion.div
            layout // Enable layout animation for smooth resizing
            className="bg-slate-50 p-3 rounded-xl border border-slate-100"
        >
            <button
                onClick={() => setExpanded(isOpen ? null : item.id)}
                className="w-full text-left flex items-center justify-between py-1"
                aria-expanded={isOpen}
            >
                <div>
                    <div className="font-semibold text-gray-800">{item.title}</div>
                    <div className="text-sm text-slate-600">{item.desc}</div>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-4 text-slate-600"
                >
                    <ChevronDown size={20} />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ opacity: { duration: 0.2 }, height: { duration: 0.4 } }}
                        className="pt-3 text-sm text-slate-700 overflow-hidden"
                    >
                        <ul className="list-disc ml-5 space-y-1 mt-2 pb-2">
                            {item.details.map((detail, index) => (
                                <li key={index} className="text-slate-600">{detail}</li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};


// --- মূল কম্পোনেন্ট (Main Component) ---
export default function QuranTajweedCourse({ className = "" }) {
    const [playing, setPlaying] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(sampleTeachers[0]);
    const [expanded, setExpanded] = useState(null);
    const audioRef = useRef(null);

    function togglePlay() {
        if (!audioRef.current) return;
        if (playing) {
            audioRef.current.pause();
            setPlaying(false);
        } else {
            audioRef.current.play();
            setPlaying(true);
        }
    }

    React.useEffect(() => {
        const audio = audioRef.current;
        return () => {
            if (audio) {
                audio.pause();
            }
        };
    }, []);

    return (
        <div className={`max-w-6xl mx-auto p-4 sm:p-6 md:p-8 bg-white rounded-3xl shadow-2xl border border-indigo-100 ${className}`}>
            <div className="flex flex-col md:flex-row gap-8">
                {/* --- প্রধান বিষয়বস্তু (Main Content) --- */}
                <div className="flex-1">
                    <motion.h2
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="text-3xl sm:text-4xl font-extrabold text-indigo-800 mb-3"
                    >
                        কোরআন শিক্ষা ও তাজবীদ কোর্স
                    </motion.h2>
                    <p className="text-base text-slate-600 mb-6">
                        কোরআন সঠিকভাবে পড়া, উচ্চারণ (<span className="font-serif italic">تجويد</span>) ও সংক্ষিপ্ত তাফসীর শেখার জন্য একটি সহজ ও অন্তর্ভুক্তিমূলক কোর্স। ব্যবহারিক অনুশীলন, অডিও-ফিডব্যাক ও ব্যক্তি-নির্দিষ্ট সংশোধন থাকবে।
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="bg-white p-5 rounded-xl border border-slate-200 lg:col-span-1">
                            <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2 mb-3"> <BookOpen size={18} /> মূল বিষয়বস্তু</h3>
                            <ul className="mt-2 space-y-2 text-sm text-slate-700">
                                {sampleCurriculum.map((c) => (
                                    <li key={c.id} className="flex items-start gap-2">
                                        <CheckSquare size={16} className="text-indigo-500 min-w-[16px] mt-1" />
                                        <span>{c.title}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white p-5 rounded-xl border border-slate-200 lg:col-span-2">
                            <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2 mb-4"><User size={18} /> শিক্ষকবৃন্দ</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {sampleTeachers.map((t) => (
                                    <button
                                        key={t.id}
                                        onClick={() => setSelectedTeacher(t)}
                                        className={`w-full text-left p-3 rounded-lg transition-all flex items-center gap-4 border ${selectedTeacher.id === t.id ? 'bg-indigo-50 border-indigo-400 shadow-md' : 'bg-slate-50 border-slate-200 hover:bg-white'}`}
                                        aria-current={selectedTeacher.id === t.id ? "true" : "false"}
                                    >
                                        <img src={t.photo} alt={t.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-white shadow-sm" />
                                        <div>
                                            <div className="font-bold text-gray-800">{t.name}</div>
                                            <div className="text-sm text-indigo-600">{t.title}</div>
                                            <div className="text-xs text-slate-600 mt-1">{t.bio}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 bg-gradient-to-r from-indigo-100 to-white p-5 rounded-xl flex flex-col sm:flex-row gap-4 items-center justify-between">

                        <div className="flex items-center gap-4 flex-grow">
                            <button
                                onClick={togglePlay}
                                aria-label={playing ? "Pause sample recitation" : "Play sample recitation"}
                                className="p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors flex-shrink-0"
                            >
                                {playing ? <Pause size={24} /> : <Play size={24} />}
                            </button>

                            <div>
                                <div className="font-bold text-gray-800 flex items-center gap-2">
                                    <Speaker size={18} /> নমুনা রিকিটেশন
                                </div>
                                <div className="text-xs text-slate-600">শুনে উচ্চারণ অনুশীলন করুন এবং নিজে <span className="font-semibold text-indigo-600">অনুসরণ করুন</span></div>
                                <audio
                                    ref={audioRef}
                                    src="/audio/sample_recitation.mp3"
                                    onEnded={() => setPlaying(false)}
                                />
                            </div>
                        </div>

                        <div className="w-full sm:w-auto flex-shrink-0">
                            <button className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold shadow-xl hover:bg-indigo-700 transition-all duration-300">
                                কোর্সে ভর্তি করুন <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                <aside className="w-full md:w-72 md:flex-shrink-0">
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="sticky top-8 p-5 rounded-2xl bg-indigo-50 border border-indigo-200 shadow-lg"
                    >
                        <h4 className="font-bold text-xl text-gray-800 mb-3">শিক্ষক পরিচিতি</h4>

                        <div className="flex items-center gap-4 pb-4 border-b border-indigo-200">
                            <img src={selectedTeacher.photo} alt={selectedTeacher.name} className="w-16 h-16 rounded-full object-cover ring-2 ring-white shadow-sm" />
                            <div>
                                <div className="font-bold text-lg text-gray-900">{selectedTeacher.name}</div>
                                <div className="text-sm text-indigo-700">{selectedTeacher.title}</div>
                            </div>
                        </div>

                        <div className="mt-4 text-sm text-slate-700">
                            <p className="font-medium mb-1">শিক্ষকের বায়ো:</p>
                            <p>{selectedTeacher.bio}</p>
                        </div>

                        <div className="mt-5 pt-4 border-t border-indigo-200">
                            <h5 className="font-semibold text-gray-800 mb-2">আপনার লক্ষ্য:</h5>
                            <div className="space-y-2 text-sm">
                                <span className="w-full text-left p-2 rounded bg-white shadow-sm flex items-center gap-2 text-indigo-600">
                                    <CheckSquare size={16} /> হিফজ (মুখস্থ)
                                </span>
                                <span className="w-full text-left p-2 rounded bg-white shadow-sm flex items-center gap-2 text-indigo-600">
                                    <CheckSquare size={16} /> শুদ্ধ উচ্চারণ (তাজবীদ)
                                </span>
                                <span className="w-full text-left p-2 rounded bg-white shadow-sm flex items-center gap-2 text-indigo-600">
                                    <CheckSquare size={16} /> তাফসীর ও ব্যাখ্যা
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </aside>
            </div>

            <hr className="my-10 border-indigo-100" />

            <section className="mt-6">
                <h3 className="font-extrabold text-2xl text-gray-800 mb-5">বিস্তারিত পাঠ্যক্রম</h3>
                <div className="space-y-4">
                    {sampleCurriculum.map((item) => (
                        <CurriculumItem
                            key={item.id}
                            item={item}
                            expanded={expanded}
                            setExpanded={setExpanded}
                        />
                    ))}
                </div>
            </section>

            <hr className="my-10 border-indigo-100" />

            <section>
                <h3 className="font-extrabold text-2xl text-gray-800 mb-5">তাজবীদ নিয়মাবলী (সংক্ষিপ্ত পর্যালোচনা)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { title: 'নূন সাকিন ও তানভীন', desc: 'চারটি নিয়ম (ইযহার, ইদগাম, ইক্বলাব, ইখফা) এর বিস্তারিত প্রয়োগ।' },
                        { title: 'মদ (দীর্ঘ উচ্চারণ)', desc: 'কোরআনে দীর্ঘ স্বরচিহ্ন ব্যবহারের নিয়ম ও সময়কাল।' },
                        { title: 'ক্বলক্বালাহ', desc: 'পাঁচটি ক্বলক্বালাহ হরফের উচ্চারণ।' },
                        { title: 'ওয়াকফ (বিরাম)', desc: 'পড়ার সময় কোথায় থামা ও কিভাবে শুরু করার নির্দেশ।' },
                    ].map((r, i) => (
                        <motion.div
                            key={i}
                            className="p-4 bg-white rounded-xl shadow-lg border border-slate-100 hover:bg-slate-50 transition-colors"
                            whileHover={{ y: -4, boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)" }}
                        >
                            <div className="font-bold text-gray-800 mb-1">{r.title}</div>
                            <div className="text-sm text-slate-600">{r.desc}</div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <footer className="mt-12 text-center text-sm text-slate-500 pt-6 border-t border-indigo-100">
                <div className="font-semibold">প্রস্তুতকারক: QuranEd • সর্বস্বত্ব সংরক্ষিত</div>
                <div className="mt-1">নোট: এই কম্পোনেন্টটি একটি টেমপ্লেট — আপনার অ্যাপের API বা স্টেট ম্যানেজমেন্ট অনুযায়ী ডেটা সংযুক্ত করুন।</div>
            </footer>
        </div>
    );
}