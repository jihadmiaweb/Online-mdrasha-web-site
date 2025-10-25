import React, { useState, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    User,
    Mail,
    Phone,
    BookOpen,
    Clock,
    Zap,
    CheckCircle,
    Printer,
    Share2,
    Download,
    RefreshCw,
    ScrollText,
} from "lucide-react";

// --- TYPE DEFINITIONS ---
interface Course {
    id: string;
    title: string;
    duration: string;
    level: string;
}

interface EnrollmentForm {
    name: string;
    email: string;
    phone: string;
    courseId: string;
    schedule: "weekday" | "weekend" | "self-paced";
    accessibility: "none" | "seat-support" | "audio-only" | "large-text";
    notes: string;
}

interface EnrollmentSuccess {
    enrollmentId: string;
    payload: EnrollmentForm & { enrolledAt: string };
}

// --- SAMPLE COURSES ---
const sampleCourses: Course[] = [
    { id: "quran-basics", title: "কোরআন পাঠ — বেসিক", duration: "8 সপ্তাহ", level: "শুরুতি" },
    { id: "fiqh-practical", title: "ফিকাহ (প্র্যাকটিক্যাল)", duration: "6 সপ্তাহ", level: "মাঝারি" },
    { id: "ethics-behavior", title: "ইসলামিক নৈতিকতা ও আচরণ", duration: "4 সপ্তাহ", level: "শুরুতি" },
    { id: "tajweed", title: "তাজওয়ীদ কোর্স", duration: "10 সপ্তাহ", level: "উন্নত" },
];

// --- UTILITY FUNCTIONS ---
const validateEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePhone = (phone: string): boolean =>
    /^[0-9+\-\s()]{7,20}$/.test(phone);

// --- COMPONENT ---
export default function CourseEnrollment(): JSX.Element {
    const defaultForm: EnrollmentForm = {
        name: "",
        email: "",
        phone: "",
        courseId: sampleCourses[0].id,
        schedule: "weekend",
        accessibility: "none",
        notes: "",
    };

    const [form, setForm] = useState<EnrollmentForm>(defaultForm);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<EnrollmentSuccess | null>(null);

    // --- UI CLASSES ---
    const inputClass =
        "mt-1 block w-full rounded-lg border px-3 py-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 text-gray-700";
    const buttonClass =
        "flex items-center gap-1 px-4 py-2 border rounded-lg transition duration-200 hover:shadow-md";
    const buttonPrimaryClass = `${buttonClass} bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed`;
    const buttonSecondaryClass = `${buttonClass} bg-white text-gray-700 border-gray-300 hover:bg-gray-50`;
    const labelClass =
        "block text-sm font-medium text-gray-700 flex items-center gap-1 mb-1";
    const errorClass = "text-xs text-red-600 mt-1";

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
        setErrors((err) => ({ ...err, [name]: undefined }));
    };

    const validate = (): Record<string, string> => {
        const err: Record<string, string> = {};
        if (!form.name.trim()) err.name = "নাম লিখুন";
        if (!validateEmail(form.email)) err.email = "বৈধ ইমেইল চাই";
        if (!validatePhone(form.phone)) err.phone = "বৈধ ফোন নম্বর দিন";
        if (!form.courseId) err.courseId = "কোর্স নির্বাচন করুন";
        return err;
    };

    const generateEnrollmentId = (): string => {
        const ts = Date.now().toString(36);
        const rnd = Math.random().toString(36).slice(2, 7);
        return `ENR-${ts}-${rnd}`.toUpperCase();
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const v = validate();
        setErrors(v);
        if (Object.keys(v).length) return;

        setLoading(true);
        setSuccess(null);

        await new Promise((r) => setTimeout(r, 900));

        const enrollmentId = generateEnrollmentId();
        setSuccess({
            enrollmentId,
            payload: { ...form, enrolledAt: new Date().toISOString() },
        });

        setForm(defaultForm);
        setLoading(false);
    };

    const handlePrint = (): void => window.print();

    const handleShare = async (): Promise<void> => {
        if (!navigator.share) {
            alert("আপনার ব্রাউজার শেয়ার সাপোর্ট করে না।");
            return;
        }
        await navigator.share({
            title: "কোর্স রেজিস্ট্রেশন",
            text: `আমি '${sampleCourses.find((c) => c.id === form.courseId)?.title}' কোর্সে ভর্তি হতে আগ্রহী।`,
            url: window.location.href,
        });
    };

    // --- RENDER ---
    return (
        <div className="max-w-3xl mx-auto my-8 p-6 bg-gray-50 rounded-2xl shadow-xl">
            <header className="flex flex-col md:flex-row items-start justify-between mb-6 border-b pb-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">কোর্স এনরোলমেন্ট 📝</h1>
                    <p className="text-base text-slate-500 mt-1">
                        নিচের ফরমটি পূরণ করে আপনার পছন্দের কোর্সে দ্রুত ভর্তির জন্য আবেদন করুন।
                    </p>
                </div>
                <div className="flex gap-2 mt-3 md:mt-0 print:hidden">
                    <button onClick={handlePrint} className={buttonSecondaryClass}>
                        <Printer size={16} /> প্রিন্ট
                    </button>
                    <button onClick={handleShare} className={buttonSecondaryClass}>
                        <Share2 size={16} /> শেয়ার
                    </button>
                </div>
            </header>

            {/* Success Box */}
            <AnimatePresence mode="wait">
                {success && (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mt-5 p-5 border-l-4 border-emerald-500 rounded-lg bg-emerald-50 mb-6 shadow-md"
                    >
                        <h3 className="flex items-center gap-2 text-xl font-bold text-emerald-800">
                            <CheckCircle /> ভর্তি সম্পন্ন!
                        </h3>
                        <p className="mt-2 text-base text-slate-700">
                            আপনার এনরোলমেন্ট আইডি:{" "}
                            <strong className="text-emerald-600">{success.enrollmentId}</strong>
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Form */}
            {!success && (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    {/* name, email, phone, etc */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>
                                <User size={16} /> পূর্ণ নাম
                            </label>
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className={`${inputClass} ${errors.name ? "border-red-500" : "border-slate-300"
                                    }`}
                            />
                            {errors.name && <p className={errorClass}>{errors.name}</p>}
                        </div>
                        <div>
                            <label className={labelClass}>
                                <Mail size={16} /> ইমেইল
                            </label>
                            <input
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                type="email"
                                className={`${inputClass} ${errors.email ? "border-red-500" : "border-slate-300"
                                    }`}
                            />
                            {errors.email && <p className={errorClass}>{errors.email}</p>}
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className={buttonPrimaryClass}
                        >
                            {loading ? "সাবমিট হচ্ছে..." : "এনরোল করুন"}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setForm(defaultForm);
                                setErrors({});
                            }}
                            className={buttonSecondaryClass}
                        >
                            <RefreshCw size={16} /> রিসেট
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
