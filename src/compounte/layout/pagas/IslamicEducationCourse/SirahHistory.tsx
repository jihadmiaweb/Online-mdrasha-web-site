import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Users, Clock, Search, ArrowRight, ChevronDown, Globe } from "lucide-react";
import { Link } from "react-router";

// --- ডেটা সোর্স (Data Source) ---
const instructors = [
    {
        id: 1, name: "ড. মোহাম্মদ রাশিদ", title: "ইসলামিক ইতিহাসবিজ্ঞানী",
        bio: "বিশ্লেষণাত্মক সীরাহ ও ইসলামী ইতিহাসে গবেষক; ১৫ বছরের শিক্ষাদান অভিজ্ঞতা।",
        photo: "/imgas/Qualified-Islamic-Scholars/download(3).jpeg"
    },
    { id: 2, name: "প্রফ. সাবিনা পারভীন", title: "তথ্যভিত্তিক বায়োগ্রাফি শিক্ষক", bio: "নবীর জীবনী ও সামাজিক প্রেক্ষাপটে দক্ষ; বিভিন্ন আন্তর্জাতিক জার্নালে প্রকাশনা আছে।", photo: "/imgas/Qualified-Islamic-Scholars/download (1).jpeg" },
];

const curriculum = [
    { id: 1, title: "প্রাথমিক জীবন ও প্রাক-নববী যুগ", desc: "আরব সমাজের অবস্থা ও নবিজির শৈশবকাল", points: ["আরব সমাজের অবস্থা", "বাবা-মায়ের সূত্র", "মক্কার রাজনৈতিক ও সামাজিক কাঠামো"] },
    { id: 2, title: "নোবুত্ব ও মক্কায় প্রচার", desc: "প্রথম ওয়াহি ও ইসলামের প্রাথমিক দাওয়াত", points: ["প্রথম আহলে কিতাব ও উপদেশ", "ঈমানগ্রহণকারীদের পরীক্ষাগুলি", "মক্কার বিরোধিতা ও সহিংসতা"] },
    { id: 3, title: "হিজরত ও মদিনায় প্রতিষ্ঠা", desc: "মদিনার প্রথম মুসলিম সমাজ গঠন", points: ["মদিনায় পৌছানো ও সামাজিক চুক্তি", "খিলাফত গঠনের সূচনা", "মহাকাব্যিক যুদ্ধ ও কুটনীতি"] },
    { id: 4, title: "মদিনায় সমাজগঠন ও ধর্মীয় আইন", desc: "ঐতিহাসিক নীতিমালা ও বিচারিক সিদ্ধান্তসমূহ", points: ["মানবিক নীতিমালা", "মাইনারিটি ও শান্তি চুক্তি", "আইনি ও আচার-ব্যবহারিক সিদ্ধান্তসমূহ"] },
    { id: 5, title: "পরবর্তী ঐতিহাসিক প্রেক্ষাপট ও প্রভাব", desc: "নবিজির ইন্তেকালের পর ইসলামের বিস্তার", points: ["রাশিদুন খিলাফা", "ইসলামের দ্রুত বিস্তার", "ইতিহাসে নবীর শিক্ষার প্রভাব"] },
];

const timeline = [
    { year: "570 CE", title: "জন্ম (অন্তঃশহরে) — মক্কা" },
    { year: "610 CE", title: "প্রথম ওয়াহি ও নবুওয়ত প্রতিষ্ঠা" },
    { year: "622 CE", title: "হিজরত: মক্কা থেকে মদিনা" },
    { year: "630 CE", title: "মক্কার বিজয়" },
    { year: "632 CE", title: "নবীর ইন্তেকাল ও ইসলামে অপরিবর্তনীয় ধারা" },
];

// --- নতুন কম্পোনেন্ট: পাঠ্যক্রমের আইটেম (Curriculum Item) ---
type CurriculumItemProps = {
    item: {
        id: number;
        title: string;
        desc: string;
        points: string[];
    };
    expanded: number | null;
    setExpanded: (id: number | null) => void;
};

const CurriculumItem: React.FC<CurriculumItemProps> = ({ item, expanded, setExpanded }) => {
    const isOpen = expanded === item.id;

    return (
        <motion.div
            layout
            className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm"
        >
            <button
                onClick={() => setExpanded(isOpen ? null : item.id)}
                className="w-full text-left flex items-center justify-between py-1 focus:outline-none"
                aria-expanded={isOpen}
            >
                <div>
                    <div className="font-bold text-gray-800">{item.title}</div>
                    <div className="text-xs text-slate-600 mt-1">{item.desc}</div>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-4 text-indigo-600"
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
                        className="pt-3 text-sm text-slate-700 overflow-hidden border-t mt-3 border-slate-100"
                    >
                        <ul className="list-disc ml-5 space-y-1 mt-1 pb-1">
                            {item.points.map((p, i) => <li key={i} className="py-0.5 text-slate-600">{p}</li>)}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};


// --- মূল কম্পোনেন্ট (Main Component) ---
export default function SirahHistory({ className = "" }) {
    const [selectedInstructor, setSelectedInstructor] = useState(instructors[0]);
    // Renaming activeIndex to expandedCurriculum for clarity
    const [expandedCurriculum, setExpandedCurriculum] = useState<number | null>(null);

    return (
        <div className={`max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-xl border border-slate-100 ${className}`}>
            <motion.header
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
            >
                <h1 className="text-3xl font-extrabold text-indigo-800 mb-2">সীরাহ ও ইসলামী ইতিহাস 📚</h1>
                <p className="text-base text-slate-600">নবী মুহাম্মদ (সা.)-এর জীবনী, শিক্ষা ও ইসলামের ঐতিহাসিক ঘটনাগুলোর বিশদ ও বিশ্লেষণাত্মক পাঠ্যক্রম।</p>
                <div className="flex items-center gap-4 text-sm mt-3 text-indigo-600 font-medium">
                    <div className="flex items-center gap-1"><Globe size={14} /> বিশ্বজনীন শিক্ষা</div>
                    <div className="flex items-center gap-1"><Clock size={14} /> ঐতিহাসিক বিশ্লেষণ</div>
                </div>
            </motion.header>

            <hr className="my-6 border-slate-100" />

            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* --- প্রধান বিষয়বস্তু: পাঠ্যক্রম ও সময়রেখা (Curriculum & Timeline) --- */}
                <div className="md:col-span-2 space-y-8">
                    {/* পাঠ্যক্রম (Curriculum) */}
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                        <h2 className="font-bold text-xl mb-4 flex items-center gap-2 text-gray-800">
                            <BookOpen size={20} className="text-indigo-600" /> কোর্সের বিস্তারিত পাঠ্যক্রম
                        </h2>
                        <div className="space-y-4">
                            {curriculum.map((c) => (
                                <CurriculumItem
                                    key={c.id}
                                    item={c}
                                    expanded={expandedCurriculum}
                                    setExpanded={setExpandedCurriculum}
                                />
                            ))}
                        </div>
                    </div>

                    {/* গুরুত্বপূর্ণ সময়রেখা (Timeline) */}
                    <div className="bg-white p-5 rounded-xl border border-slate-100">
                        <h3 className="font-bold text-xl mb-4 flex items-center gap-2 text-gray-800">
                            <Clock size={20} className="text-indigo-600" /> মূল সময়রেখা
                        </h3>
                        <div className="relative border-l border-indigo-200 pl-4 space-y-6">
                            {timeline.map((t, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.3, delay: i * 0.1 }}
                                    className="relative flex items-start gap-4"
                                >
                                    <div className="absolute -left-3 top-1 w-6 h-6 bg-indigo-600 rounded-full ring-4 ring-white shadow-md"></div>
                                    <div className="ml-2 pt-1">
                                        <div className="font-mono text-xs text-indigo-700 font-semibold">{t.year}</div>
                                        <div className="font-medium text-gray-800 mt-0.5">{t.title}</div>
                                    </div>
                                </motion.li>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- সাইডবার: শিক্ষক ও এনরোলমেন্ট (Sidebar: Instructor & Enrollment) --- */}
                <aside className="md:col-span-1">
                    <div className="sticky md:top-6 space-y-6">
                        {/* শিক্ষক নির্বাচন ও বিস্তারিত */}
                        <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-200 shadow-md">
                            <h4 className="font-bold text-lg mb-3 flex items-center gap-2 text-gray-800">
                                <Users size={18} className="text-indigo-700" /> শিক্ষকবৃন্দ
                            </h4>
                            <div className="space-y-3">
                                {instructors.map((ins) => (
                                    <button
                                        key={ins.id}
                                        onClick={() => setSelectedInstructor(ins)}
                                        className={`w-full text-left p-3 rounded-lg transition-all flex items-center gap-3 ${selectedInstructor.id === ins.id ? 'bg-white shadow-lg ring-2 ring-indigo-400' : 'hover:bg-indigo-100/70'}`}
                                        aria-current={selectedInstructor.id === ins.id ? "true" : "false"}
                                    >
                                        <img src={ins.photo} alt={ins.name} className="w-10 h-10 rounded-full object-cover shadow-sm" />
                                        <div>
                                            <div className="font-semibold text-gray-800">{ins.name}</div>
                                            <div className="text-xs text-slate-600">{ins.title}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="mt-5 pt-4 border-t border-indigo-200 text-sm text-slate-700">
                                <div className="font-semibold text-gray-800 mb-1">নির্বাচিত গবেষক:</div>
                                <p className="mt-1">{selectedInstructor.bio}</p>
                            </div>
                        </div>

                        {/* এনরোলমেন্ট বাটন */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-lg shadow-xl hover:bg-indigo-700 transition-all duration-300"
                        >
                            <Link to={"/CourseEnrollment"}>
                                কোর্সে ভর্তি হন
                            </Link>
                            <ArrowRight size={20} />
                        </motion.button>

                        {/* রিসোর্স ও পাঠ্যপুস্তক */}
                        <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm">
                            <h5 className="font-bold text-lg mb-3 flex items-center gap-2 text-gray-800">
                                <Search size={18} className="text-indigo-600" /> রিসোর্স ও পাঠ্যপুস্তক
                            </h5>
                            <ul className="text-sm text-slate-700 space-y-2">
                                <li className="flex items-start gap-2"><div className="text-indigo-600 pt-1">•</div> তাফসীর ও সীরাহের নির্বাচিত পাঠ</li>
                                <li className="flex items-start gap-2"><div className="text-indigo-600 pt-1">•</div> প্রচলিত ইতিহাসিক উৎসগুলোর সংক্ষিপ্ত পরিচিতি</li>
                                <li className="flex items-start gap-2"><div className="text-indigo-600 pt-1">•</div> অনলাইন আরকাইভ ও রেফারেন্স লিংক</li>
                            </ul>
                        </div>
                    </div>
                </aside>
            </section>

            <footer className="mt-10 text-center text-sm text-slate-500 border-t pt-4 border-slate-100">প্রস্তুতকারক: QuranEd • লক্ষ্য: তথ্যভিত্তিক, সম্মানজনক ও শিক্ষণীয় উপস্থাপনা।</footer>
        </div>
    );
}