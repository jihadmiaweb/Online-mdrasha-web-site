import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Clock, DollarSign, BookOpen, X } from "lucide-react";

// === ইসলামিক কোর্স ডেটা (বাংলায়) ===
const coursesData = [
    {
        id: 1,
        name: "কোরআন হিফজ কোর্স",
        price: "৳500",
        duration: "12 সপ্তাহ",
        certificate: true,
        details: "কোরআনের বিশুদ্ধ মুখস্থকরণ ও তাজবীদের সঠিক প্রয়োগ শিখুন। প্রফেশনাল হাফেজ দ্বারা পরিচালিত।"
    },
    {
        id: 2,
        name: "নবীজির জীবনী (সীরাহ) কোর্স",
        price: "৳400",
        duration: "8 সপ্তাহ",
        certificate: true,
        details: "মহানবী (সাঃ)-এর জীবনের প্রতিটি গুরুত্বপূর্ণ অধ্যায় বিস্তারিতভাবে জানুন। জীবন বদলে দেওয়া শিক্ষা।"
    },
    {
        id: 3,
        name: "ফিকহ মৌলিক ধারণা কোর্স",
        price: "৳350",
        duration: "6 সপ্তাহ",
        certificate: true,
        details: "ইবাদত ও মু'আমালাতের শরীয়তসম্মত বিধি-বিধানের প্রাথমিক ধারণা। দৈনন্দিন জীবনের জন্য অপরিহার্য।"
    },
    {
        id: 4,
        name: "তাজওয়ীদ কোর্স",
        price: "৳450",
        duration: "5 সপ্তাহ",
        certificate: true,
        details: "কোরআন তিলাওয়াতের সৌন্দর্য ও নিয়মাবলী সহকারে শিখুন। প্রতিটি হরফের সঠিক উচ্চারণ।"
    },
    {
        id: 5,
        name: "নামাজ শিক্ষা কোর্স",
        price: "৳300",
        duration: "4 সপ্তাহ",
        certificate: true,
        details: "নামাজের প্রতিটি রোকন ও ওয়াজিবের সঠিক পদ্ধতি জানুন। নির্ভুল নামাজ আদায়ের প্রশিক্ষণ।"
    },
    {
        id: 6,
        name: "ইসলামিক ইতিহাস ও সভ্যতা",
        price: "৳400",
        duration: "6 সপ্তাহ",
        certificate: true,
        details: "ইসলামের সোনালী যুগ থেকে আধুনিক কাল পর্যন্ত ইতিহাসের পর্যালোচনা। জ্ঞান ও প্রজ্ঞা অর্জন করুন।"
    },
    {
        id: 7,
        name: "দৈনন্দিন ইসলামিক আচার-ব্যবহার",
        price: "৳250",
        duration: "3 সপ্তাহ",
        certificate: true,
        details: "ঘুম থেকে ওঠা থেকে শুরু করে দৈনন্দিন জীবনের মাসনূন দু'আ ও আমল। নিজেকে ইসলামিক জীবনাচারে অভ্যস্ত করুন।"
    },
    {
        id: 8,
        name: "সহীহ হাদিস অধ্যয়ন কোর্স",
        price: "৳550",
        duration: "7 সপ্তাহ",
        certificate: true,
        details: "বুখারী ও মুসলিম শরীফের নির্বাচিত হাদীস নিয়ে গভীর বিশ্লেষণ। প্রামাণিক জ্ঞান অর্জন।"
    },
];


// === টোস্ট কম্পোনেন্ট (এনরোলমেন্ট মেসেজ দেখানোর জন্য) ===
type EnrollmentToastProps = {
    toast: { message: string; type: 'success' | 'error' } | null;
    clearToast: () => void;
};

const EnrollmentToast = ({ toast, clearToast }: EnrollmentToastProps) => {
    if (!toast) return null;
    const { message, type } = toast;

    const bgColor = type === 'success' ? 'bg-green-600 border-green-800' : 'bg-red-600 border-red-800';
    const Icon = type === 'success' ? CheckCircle : X;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-50 p-4 rounded-xl shadow-2xl border-b-4 text-white flex items-center space-x-3 max-w-sm w-full ${bgColor}`}
            >
                <Icon className="w-6 h-6" />
                <span className="font-semibold text-sm flex-grow">{message}</span>
                <button onClick={clearToast} className={`p-1 rounded-full transition ${type === 'success' ? 'hover:bg-green-700' : 'hover:bg-red-700'}`}>
                    <X className="w-4 h-4" />
                </button>
            </motion.div>
        </AnimatePresence>
    );
};


// === কোর্স কার্ড কম্পোনেন্ট ===
type EnrollmentStates = { [key: number]: 'loading' | 'success' | 'error' | undefined };

type CourseCardProps = {
    course: typeof coursesData[number];
    delay: number;
    handleEnrollment: (courseId: number, courseName: string) => void;
    enrollmentStates: EnrollmentStates;
};

const CourseCard = ({ course, delay, handleEnrollment, enrollmentStates }: CourseCardProps) => {
    // এই কোর্সের বর্তমান স্টেট (loading, success, error)
    const status = enrollmentStates[course.id];
    const isEnrolling = status === 'loading';
    const isSuccessful = status === 'success';
    const isError = status === 'error';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-2xl transition-all border border-emerald-100/70 hover:scale-[1.03] hover:shadow-emerald-300/50 flex flex-col h-full transform"
        >
            <h3 className="text-xl font-extrabold mb-2 text-gray-900 leading-tight">{course.name}</h3>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow">{course.details}</p>

            <div className="flex justify-between items-center mb-4 border-t pt-4 border-gray-100">
                {/* মূল্য ব্যাজ */}
                <div className="flex items-center gap-1 px-3 py-1 bg-emerald-600 text-white rounded-full font-bold text-lg shadow-md shadow-emerald-500/30">
                    <DollarSign className="w-4 h-4 text-white" />
                    {course.price}
                </div>

                {/* সময়কাল */}
                <p className="text-gray-600 text-sm flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-teal-500" />
                    <span className="font-medium text-gray-700">{course.duration}</span>
                </p>
            </div>

            {/* সার্টিফিকেট এবং বাটন - নিচে আটকে রাখা হয়েছে */}
            <div className="mt-auto">
                {course.certificate && (
                    <div className="flex items-center text-green-700 font-semibold mb-4 text-sm">
                        <CheckCircle className="w-4 h-4 mr-1 fill-green-100" /> সার্টিফিকেট প্রদান
                    </div>
                )}
                <button
                    onClick={() => handleEnrollment(course.id, course.name)}
                    disabled={isEnrolling || isSuccessful}
                    className={`mt-2 w-full py-3 text-white rounded-xl font-bold shadow-lg transition transform flex items-center justify-center ${isEnrolling
                        ? 'bg-gray-400 cursor-not-allowed shadow-gray-300/50'
                        : isSuccessful
                            ? 'bg-green-600 cursor-default shadow-green-500/50'
                            : isError
                                ? 'bg-red-500 hover:bg-red-600 shadow-red-500/50'
                                : 'bg-gradient-to-r from-emerald-600 to-teal-700 shadow-emerald-500/50 hover:from-emerald-700 hover:to-teal-800 hover:-translate-y-0.5'
                        }`}
                >
                    {isEnrolling ? (
                        <>
                            {/* লোডিং স্পিনার */}
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            ভর্তি প্রক্রিয়া চলছে...
                        </>
                    ) : isSuccessful ? (
                        <>
                            <CheckCircle className="w-5 h-5 mr-2" />
                            ভর্তি সম্পন্ন
                        </>
                    ) : isError ? (
                        'আবার চেষ্টা করুন'
                    ) : (
                        'এখনই ভর্তি হোন'
                    )}
                </button>
            </div>
        </motion.div>
    );
};

// === মূল কম্পোনেন্ট ===
export default function App() {
    // প্রতিটি কোর্সের আইডি ধরে তার স্টেট ট্র্যাক করার জন্য অবজেক্ট
    // যেমন: { 1: 'loading', 2: 'success', 3: 'error' }
    const [enrollmentStates, setEnrollmentStates] = useState({});

    // টোস্ট মেসেজের জন্য স্টেট: { message: string, type: 'success' | 'error' }
    interface EnrollmentToastType {
        message: string;
        type: 'success' | 'error';
    }
    const [enrollmentToast, setEnrollmentToast] = useState<EnrollmentToastType | null>(null);

    // টোস্ট মেসেজ বন্ধ করার ফাংশন
    const clearEnrollmentMessage = useCallback(() => setEnrollmentToast(null), []);

    // এনরোলমেন্ট হ্যান্ডলার ফাংশন
    interface EnrollmentToastType {
        message: string;
        type: 'success' | 'error';
    }

    interface EnrollmentStates {
        [key: number]: 'loading' | 'success' | 'error' | undefined;
    }

    const handleEnrollment = (courseId: number, courseName: string): void => {
        // যদি এটি ইতিমধ্যেই লোডিং অবস্থায় থাকে, তবে আর কাজ করবে না
        if ((enrollmentStates as EnrollmentStates)[courseId] === 'loading') return;

        setEnrollmentStates((prev: EnrollmentStates) => ({ ...prev, [courseId]: 'loading' }));
        setEnrollmentToast(null);

        // API কল বা ফর্ম সাবমিশনের সিমুলেশন (১.৫ সেকেন্ডের লোডিং)
        setTimeout(() => {
            // ২০% ক্ষেত্রে ত্রুটি সিমুলেশন
            const isSuccess: boolean = Math.random() > 0.2;

            setEnrollmentStates((prev: EnrollmentStates) => ({ ...prev, [courseId]: isSuccess ? 'success' : 'error' }));

            if (isSuccess) {
                const message: string = `${courseName} কোর্সে আপনার ভর্তি নিশ্চিত করা হয়েছে! বিস্তারিত ইমেলের মাধ্যমে পাঠানো হবে।`;
                setEnrollmentToast({ message, type: 'success' } as EnrollmentToastType);
            } else {
                const message: string = `দুঃখিত! ${courseName} কোর্সে ভর্তির সময় একটি ত্রুটি হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।`;
                setEnrollmentToast({ message, type: 'error' } as EnrollmentToastType);
            }

            // ৫ সেকেন্ড পর টোস্ট মেসেজ এবং কোর্সের স্টেট পরিষ্কার হবে
            setTimeout(() => {
                setEnrollmentToast(null);
                setEnrollmentStates((prev: EnrollmentStates) => {
                    const newState: EnrollmentStates = { ...prev };
                    // সফল হলে বাটনটি 'ভর্তি সম্পন্ন' অবস্থায় থাকবে। ত্রুটি হলে বাটনটি পুনরায় সক্রিয় হবে।
                    if (newState[courseId] === 'error') {
                        delete newState[courseId];
                    }
                    return newState;
                });
            }, 5000);

        }, 1500); // ১.৫ সেকেন্ডের ডিলের মাধ্যমে লোডিং সিমুলেশন 
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-teal-100 flex flex-col items-center py-16 px-4 sm:px-8 lg:px-12 font-['Inter']">
            {/* এনরোলমেন্ট টোস্ট মেসেজ */}
            <EnrollmentToast
                toast={enrollmentToast}
                clearToast={clearEnrollmentMessage}
            />
            <div className="max-w-7xl w-full">
                {/* হেডার */}
                <div className="text-center mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-sm font-bold text-teal-600 uppercase mb-3 tracking-widest flex items-center justify-center">
                        <BookOpen className="w-4 h-4 mr-1" />
                        দ্বীনি শিক্ষা হোক সবার জন্য
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight"
                    >
                        সাশ্রয়ী ইসলামিক কোর্সসমূহ
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-lg text-gray-600 max-w-3xl mx-auto"
                    >
                        অল্প খরচে মানসম্পন্ন দ্বীনি শিক্ষা নিয়ে আপনার জ্ঞানকে সমৃদ্ধ করুন। নিজস্ব সময়ে শিখুন এবং সনদ লাভ করুন।
                    </motion.p>
                </div>

                {/* কোর্স গ্রিড */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                >
                    {coursesData.map((course, i) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            delay={i * 0.1}
                            handleEnrollment={handleEnrollment}
                            enrollmentStates={enrollmentStates}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}