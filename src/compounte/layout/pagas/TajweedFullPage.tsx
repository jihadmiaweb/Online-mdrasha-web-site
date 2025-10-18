"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; // Using lucide-react for icons

// type definitions and data remain the same
type Teacher = {
    id: number;
    name: string;
    qualification: string;
    bio: string;
    audio?: string;
};

const TEACHERS: Teacher[] = [
    { id: 1, name: "শায়খ আব্দুল্লাহ", qualification: "শায়খুল তাজভীদ", bio: "১০+ বছরের তাজওয়ীদ প্রশিক্ষক", audio: "/imgas/Aodou/067.mp3" },
    { id: 2, name: "মুসা আনোয়ার", qualification: "MA Islamic Studies", bio: "শিশু ও প্রাপ্তবয়স্কদের জন্য বিশেষ কোচিং", audio: "/imgas/Aodou/055.mp3" },
];

const FAQS = [
    { q: "কোর্স কতদিনের?", a: "সাধারণত ৮-১২ সপ্তাহ (সপ্তাহে ২-৩ সেশন), স্টুডেন্টের অগ্রগতি অনুযায়ী সমন্বয় করা হয়।" },
    { q: "অনলাইনে কি রেকর্ডিং দেয়া হয়?", a: "হ্যাঁ — প্রতিটি লাইভ ক্লাসের রেকর্ডিং ও হোমওর্ক ফিডব্যাক দেয়া হয়।" },
    { q: "বয়স সীমা আছে কি?", a: "না — শিশু ও প্রাপ্তবয়স্ক উভয়ের জন্যই উপযোগী।" },
];

// Helper for navigation links
const NAV_LINKS = [
    { name: "About", refName: "aboutRef" },
    { name: "Curriculum", refName: "curriculumRef" },
    { name: "FAQ", refName: "faqRef" },
];

// ----------------------------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------------------------

export default function TajweedFullPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // New state for mobile menu
    const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);

    // Ref map for easier access
    const refMap = {
        aboutRef: useRef<HTMLElement | null>(null),
        curriculumRef: useRef<HTMLElement | null>(null),
        faqRef: useRef<HTMLElement | null>(null),
        registerRef: useRef<HTMLElement | null>(null),
    };

    useEffect(() => {
        // Ensure smooth scroll is set globally
        document.documentElement.style.scrollBehavior = "smooth";
    }, []);

    // Simplified and centralized scroll function
    function handleScrollTo(refName: keyof typeof refMap) {
        refMap[refName].current?.scrollIntoView({ behavior: "smooth", block: "start" });
        setIsMobileMenuOpen(false); // Close menu on mobile after selection
    }

    function validate() {
        const e: Record<string, string> = {};
        if (!form.name.trim()) e.name = "নাম লিখুন";
        if (!form.email.trim()) e.email = "ইমেইল লিখুন";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "সঠিক ইমেইল দিন";
        if (!form.phone.trim()) e.phone = "ফোন নম্বর লিখুন";
        else if (!/^\+?[0-9]{8,15}$/.test(form.phone)) e.phone = "সঠিক ফোন নম্বর দিন";
        return e;
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const v = validate();
        setErrors(v);
        if (Object.keys(v).length === 0) {
            // Client-side only: show success state. Replace with API call as needed.
            setSubmitted(true);
            // reset form after small delay to mimic submit
            setTimeout(() => setForm({ name: "", email: "", phone: "", message: "" }), 800);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">

            {/* --------------------------- MOBILE MENU DRAWER --------------------------- */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 bg-white md:hidden p-6 shadow-2xl"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <div className="font-bold text-lg">Menu</div>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                                <X size={24} />
                            </button>
                        </div>
                        <nav className="flex flex-col space-y-4">
                            {NAV_LINKS.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => handleScrollTo(link.refName as keyof typeof refMap)}
                                    className="text-xl text-left py-3 border-b hover:bg-slate-50"
                                >
                                    {link.name}
                                </button>
                            ))}
                            <button
                                onClick={() => handleScrollTo("registerRef")}
                                className="mt-6 px-4 py-3 rounded bg-emerald-500 text-white font-medium text-lg"
                            >
                                রেজিস্টার
                            </button>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --------------------------- HEADER / NAV --------------------------- */}
            <header className="bg-[linear-gradient(130deg,#0f172a20,transparent)] sticky top-0 z-40 backdrop-blur-sm border-b border-slate-100">
                <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-sky-400 flex items-center justify-center font-bold text-white text-lg">নূর</div>
                        <div>
                            <div className="font-bold text-sm">Madrasatu Nuurul 'Ilm</div>
                            <div className="text-xs text-slate-500">তাজওয়ীদ স্পেশাল কোর্স</div>
                        </div>
                    </div>

                    <nav className="hidden md:flex items-center gap-1">
                        {NAV_LINKS.map((link) => (
                            <button key={link.name} onClick={() => handleScrollTo(link.refName as keyof typeof refMap)} className="text-sm px-3 py-2 rounded-lg hover:bg-slate-100 transition">
                                {link.name}
                            </button>
                        ))}
                        <button onClick={() => handleScrollTo("registerRef")} className="text-sm px-4 py-2 ml-2 rounded-full bg-emerald-500 hover:bg-emerald-600 transition text-white font-medium">Register</button>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden">
                        <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200">
                            <Menu size={20} />
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 py-12">

                {/* --------------------------- HERO --------------------------- */}
                <motion.section
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pb-12"
                >
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">তাজওয়ীদ কোর্স — শুদ্ধ উচ্চারণ ও বাস্তব অনুশীলন</h1>
                        <p className="mt-4 text-slate-600">মৌখিক উচ্চারণ (Makharij), মাদ-নিয়ম, ইখফা/ইদগাম প্রভৃতি অনুশীলনের মাধ্যমে কোরআন পাঠে তাজওয়ীদ নিশ্চিত করা হবে।</p>

                        <ul className="mt-6 space-y-2 text-sm">
                            <li>• লাইভ ইন্টারেকটিভ ক্লাস + রেকর্ডিং</li>
                            <li>• ব্যক্তিগত ফিডব্যাক ও হোমওয়ার্ক</li>
                            <li>• স্টেপ-বাই-স্টেপ মডিউল ও অডিও রিসোর্স</li>
                        </ul>

                        <div className="mt-6 flex gap-3">
                            <button onClick={() => handleScrollTo("registerRef")} className="px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 transition text-white font-semibold shadow-md">এখনই রেজিস্টার</button>
                            <button onClick={() => handleScrollTo("curriculumRef")} className="px-5 py-3 rounded-full border border-slate-300 hover:border-slate-400 transition text-slate-800 font-medium">পাঠ্যসূচি দেখুন</button>
                        </div>

                        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-center text-slate-500">
                            <div className="p-3 bg-white rounded-lg shadow-sm border border-slate-100">লাইভ সেশন</div>
                            <div className="p-3 bg-white rounded-lg shadow-sm border border-slate-100">রেকর্ডিং</div>
                            <div className="p-3 bg-white rounded-lg shadow-sm border border-slate-100">সার্টিফিকেট</div>
                            <div className="p-3 bg-white rounded-lg shadow-sm border border-slate-100">ফিডব্যাক</div>
                        </div>
                    </div>

                    {/* Teachers Section - Improved styles and avatar */}
                    <motion.div
                        initial={{ scale: 0.98, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100"
                    >
                        <div className="text-base font-semibold mb-4 border-b pb-3">আমাদের শিক্ষকরা</div>
                        <div className="space-y-4">
                            {TEACHERS.map((t) => (
                                <div key={t.id} className="flex gap-4 p-3 rounded-xl hover:bg-slate-50 transition">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-sky-200 to-emerald-200 flex items-center justify-center font-bold text-sky-800 text-lg">
                                        {t.name.split(" ")[0].charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium text-base">{t.name}</div>
                                        <div className="text-xs text-emerald-600 font-semibold">{t.qualification}</div>
                                        <div className="text-xs mt-1 text-slate-600">{t.bio}</div>
                                        {t.audio && (
                                            <audio controls className="mt-3 w-full h-8">
                                                <source src={t.audio} type="audio/mpeg" />
                                                আপনার ব্রাউজার অডিও সমর্থন করে না।
                                            </audio>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.section>

                <div className="mt-12 space-y-8">

                    {/* --------------------------- ABOUT --------------------------- */}
                    <section ref={refMap.aboutRef} className="pt-8">
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
                        >
                            <h2 className="text-2xl font-bold">কোর্সের উদ্দেশ্য</h2>
                            <p className="mt-3 text-slate-600">এই কোর্সটি তৈরি করা হয়েছে যাতে শিক্ষার্থীরা কোরআনের পাঠে শুদ্ধ উচ্চারণ অর্জন করতে পারে — শুরু থেকে উন্নত স্তর পর্যন্ত। বিবরণে থাকবে **মখারিজ (Makharij)**, **স্বর**, **মাদ**, **ওকফ/ওকিলাস** প্র্যাকটিস। কোর্স শেষে একটি সার্টিফিকেট প্রদান করা হবে।</p>
                        </motion.div>
                    </section>

                    {/* --------------------------- CURRICULUM --------------------------- */}
                    <section ref={refMap.curriculumRef} className="pt-8">
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
                        >
                            <h2 className="text-2xl font-bold">পাঠ্যসূচি (নমুনা)</h2>
                            <ol className="mt-5 space-y-4 list-decimal list-inside text-slate-700">
                                <li className="font-medium">
                                    <strong>ভূমিকা ও প্রাথমিক অনুশীলন:</strong> তাজওয়ীদ প্রাথমিক ধারণা, আরবি বর্ণ ও স্বর-সৃষ্টি অনুশীলন।
                                </li>
                                <li className="font-medium">
                                    <strong>মখারিজের বিস্তারিত পাঠ:</strong> প্রতিটি হরফের উচ্চারণের স্থান ও সঠিক পদ্ধতি (জিহ্বা, ঠোঁট, গলা)।
                                </li>
                                <li className="font-medium">
                                    <strong>নুন-মীম সাকিন ও তানভীনের নিয়মাবলি:</strong> **ইদগাম, ইখফা, ইজ্জাল, ইকলব** এর ব্যবহারিক অনুশীলন।
                                </li>
                                <li className="font-medium">
                                    <strong>মাদ ও ওয়াকফ:</strong> মাদ-এর ধরণ, দীর্ঘতা (২/৪/৬ হারাকাত), এবং সঠিক ওকফ (থামার নিয়ম)।
                                </li>
                                <li className="font-medium">
                                    <strong>প্র্যাকটিক্যাল পাঠ:</strong> ছোট সূরাগুলোর মাধ্যমে অর্জিত জ্ঞানের প্রয়োগ ও ব্যক্তিগত সংশোধন।
                                </li>
                            </ol>
                        </motion.div>
                    </section>

                    {/* --------------------------- FAQ (With Framer Motion) --------------------------- */}
                    <section ref={refMap.faqRef} className="pt-8">
                        <motion.div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                            <h2 className="text-2xl font-bold">সাধারণ জিজ্ঞাসা</h2>
                            <div className="mt-5 space-y-3">
                                {FAQS.map((f, i) => (
                                    <div key={i} className="border rounded-xl overflow-hidden">
                                        <button
                                            className="w-full text-left px-4 py-4 flex justify-between items-start font-medium text-slate-800 bg-slate-50 hover:bg-slate-100 transition"
                                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                            aria-expanded={openFaq === i}
                                        >
                                            <span className="pr-4">{f.q}</span>
                                            <motion.span
                                                animate={{ rotate: openFaq === i ? 45 : 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="flex-shrink-0 text-lg text-emerald-600"
                                            >
                                                +
                                            </motion.span>
                                        </button>
                                        <AnimatePresence>
                                            {openFaq === i && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                    className="px-4 pt-0 pb-4 text-sm text-slate-600 bg-white overflow-hidden"
                                                >
                                                    <p>{f.a}</p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </section>

                    {/* --------------------------- REGISTRATION --------------------------- */}
                    <section ref={refMap.registerRef} className="pt-8">
                        <motion.div className="bg-gradient-to-br from-emerald-50 to-sky-50 rounded-2xl p-8 shadow-xl border border-emerald-100" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                            <h2 className="text-2xl font-bold text-emerald-900">রেজিস্ট্রেশন ফর্ম</h2>
                            <p className="text-sm text-slate-700 mt-2">নিচের ফর্ম পূরণ করে রেজিস্ট্রেশন করুন — আমাদের টীম আপনার সাথে শীঘ্রই যোগাযোগ করবে।</p>

                            <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">

                                {/* Name */}
                                <div>
                                    <label htmlFor="name-input" className="text-xs font-medium block mb-1">নাম <span className="text-red-500">*</span></label>
                                    <input id="name-input" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="block w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:ring-emerald-500 focus:border-emerald-500 transition" />
                                    {errors.name && <div className="text-xs text-red-600 mt-1">{errors.name}</div>}
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email-input" className="text-xs font-medium block mb-1">ইমেইল <span className="text-red-500">*</span></label>
                                    <input id="email-input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="block w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:ring-emerald-500 focus:border-emerald-500 transition" />
                                    {errors.email && <div className="text-xs text-red-600 mt-1">{errors.email}</div>}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label htmlFor="phone-input" className="text-xs font-medium block mb-1">ফোন <span className="text-red-500">*</span></label>
                                    <input id="phone-input" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="block w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:ring-emerald-500 focus:border-emerald-500 transition" />
                                    {errors.phone && <div className="text-xs text-red-600 mt-1">{errors.phone}</div>}
                                </div>

                                {/* Message */}
                                <div>
                                    <label htmlFor="message-input" className="text-xs font-medium block mb-1">মন্তব্য / বার্তা (ঐচ্ছিক)</label>
                                    <input id="message-input" type="text" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="block w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:ring-emerald-500 focus:border-emerald-500 transition" />
                                </div>

                                <div className="sm:col-span-2 flex items-center gap-4 mt-2">
                                    <button
                                        type="submit"
                                        className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition shadow-md"
                                        disabled={submitted} // Disable button after submission
                                    >
                                        {submitted ? 'জমা দেওয়া হয়েছে' : 'জমা দিন'}
                                    </button>
                                    {submitted && <div className="text-sm text-emerald-800 font-medium">✅ ধন্যবাদ! আপনার ফর্ম প্রাপ্ত হয়েছে।</div>}
                                </div>
                            </form>

                            <div className="mt-5 text-xs text-slate-500">নোট: এই ডেমো ফর্মটি কেবল ক্লায়েন্ট-সাইড ভ্যালিডেশন সহ; বাস্তবে এটি একটি ব্যাকএন্ড API-এর সাথে সংযুক্ত করতে হবে।</div>
                        </motion.div>
                    </section>

                </div>

                {/* --------------------------- FOOTER --------------------------- */}
                <footer className="mt-16 pt-8 border-t border-slate-200 text-center text-sm text-slate-500">© {new Date().getFullYear()} Madrasatu Nuurul 'Ilm — All rights reserved.</footer>
            </main>
        </div>
    );
}