import React, { useState, useCallback } from "react";
import { motion, AnimatePresence, } from "framer-motion";
import { CalendarCheck, Clock, User, CheckCircle, X } from "lucide-react";

// === TypeScript Types ===

// সেশন ডেটার জন্য টাইপ
type Session = {
    id: number;
    name: string;
    surah: string;
    time: string;
    teacher: string;
};

// নোটিফিকেশনের জন্য টাইপ
type NotificationToast = {
    message: string;
    type: 'success' | 'error';
} | null;

// যোগদান স্ট্যাটাসের জন্য টাইপ
type JoiningStatus = 'loading' | 'joined' | 'error';
type JoiningStates = {
    [key: number]: JoiningStatus | undefined;
};

// SessionToast কম্পোনেন্টের প্রপস টাইপ
type SessionToastProps = {
    toast: NotificationToast;
    clearToast: () => void;
};

// SessionCard কম্পোনেন্টের প্রপস টাইপ
type SessionCardProps = {
    session: Session;
    delay: number;
    handleJoinSession: (sessionId: number, sessionName: string) => void;
    joiningStates: JoiningStates;
};

// === কোরআন সেশন ডেটা (বাংলায়) ===
const sessionsData: Session[] = [
    {
        id: 1,
        name: "তাজওয়ীদ মূল সেশন",
        surah: "সূরা আল-ফাতিহা",
        time: "সকাল ৭:০০ – সকাল ৮:০০",
        teacher: "মোঃ তৌহিদুল ইসলাম",
    },
    {
        id: 2,
        name: "কোরআন হিফজ ইন্টারঅ্যাক্টিভ",
        surah: "সূরা আল-বাকারা",
        time: "সকাল ৯:০০ – সকাল ১০:৩০",
        teacher: "মোঃ আজিজুল হক",
    },
    {
        id: 3,
        name: "সীরাহ ও তাজওয়ীদ সেশন",
        surah: "সূরা আল-ইমরান",
        time: "সন্ধ্যা ৫:০০ – সন্ধ্যা ৬:০০",
        teacher: "মোঃ জিয়াউর রহমান",
    },
];

// === টোস্ট কম্পোনেন্ট (নোটিফিকেশন দেখানোর জন্য) ===
const SessionToast: React.FC<SessionToastProps> = ({ toast, clearToast }) => {
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

// === সেশন কার্ড কম্পোনেন্ট ===
const SessionCard: React.FC<SessionCardProps> = ({ session, delay, handleJoinSession, joiningStates }) => {
    const status: JoiningStatus | undefined = joiningStates[session.id];
    const isJoining = status === 'loading';
    const isJoined = status === 'joined';
    const isError = status === 'error';

    // বাটন স্টাইল নির্ভর করবে বর্তমান স্ট্যাটাসের ওপর
    const buttonClass = isJoining
        ? 'bg-gray-400 cursor-not-allowed shadow-gray-300/50'
        : isJoined
            ? 'bg-green-600 cursor-default shadow-green-500/50'
            : isError
                ? 'bg-red-500 hover:bg-red-600 shadow-red-500/50'
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/50 hover:-translate-y-0.5';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true }}
            className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all border-t-4 border-indigo-600 flex flex-col justify-between"
        >
            <div>
                <h3 className="text-2xl font-bold mb-2 text-indigo-700 leading-tight">{session.name}</h3>
                <div className="border-b border-indigo-100 mb-4 pb-3">
                    <p className="text-gray-600 mb-1 flex items-center text-sm font-medium">
                        <Clock className="w-4 h-4 mr-2 text-indigo-500" /> সময়: <span className="font-semibold ml-1 text-gray-800">{session.time}</span>
                    </p>
                    <p className="text-gray-600 mb-1 flex items-center text-sm font-medium">
                        <CalendarCheck className="w-4 h-4 mr-2 text-indigo-500" /> সূরা: <span className="font-semibold ml-1 text-gray-800">{session.surah}</span>
                    </p>
                    <p className="text-gray-600 flex items-center text-sm font-medium">
                        <User className="w-4 h-4 mr-2 text-indigo-500" /> শিক্ষক: <span className="font-semibold ml-1 text-gray-800">{session.teacher}</span>
                    </p>
                </div>
            </div>

            <button
                onClick={() => handleJoinSession(session.id, session.name)}
                disabled={isJoining || isJoined}
                className={`w-full py-3 text-white rounded-xl font-semibold transition-all transform flex items-center justify-center shadow-lg ${buttonClass}`}
            >
                {isJoining ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        যোগদান প্রক্রিয়া চলছে...
                    </>
                ) : isJoined ? (
                    <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        সফলভাবে যুক্ত হয়েছেন
                    </>
                ) : isError ? (
                    'পুনরায় চেষ্টা করুন'
                ) : (
                    'সেশনে যোগ দিন'
                )}
            </button>
        </motion.div>
    );
};

// === মূল কম্পোনেন্ট ===
const InteractiveQuranSessions: React.FC = () => {
    // Type added to useState
    const [joiningStates, setJoiningStates] = useState<JoiningStates>({});
    const [notification, setNotification] = useState<NotificationToast>(null);

    // টোস্ট মেসেজ বন্ধ করার ফাংশন
    const clearNotification = useCallback(() => setNotification(null), []);

    // সেশনে যোগদানের হ্যান্ডলার ফাংশন - Type added to arguments
    const handleJoinSession = (sessionId: number, sessionName: string) => {
        // Use assertion to ensure status is a string if it exists
        const currentStatus = joiningStates[sessionId];

        if (currentStatus === 'loading' || currentStatus === 'joined') return;

        setJoiningStates(prev => ({ ...prev, [sessionId]: 'loading' }));
        setNotification(null);

        // API কলের সিমুলেশন
        setTimeout(() => {
            // ৭০% ক্ষেত্রে সফলতার সিমুলেশন
            const isSuccess = Math.random() > 0.3;

            setJoiningStates(prev => ({ ...prev, [sessionId]: isSuccess ? 'joined' : 'error' }));

            if (isSuccess) {
                const message = `${sessionName} সেশনে আপনার যোগদান নিশ্চিত করা হয়েছে!`;
                setNotification({ message, type: 'success' });
            } else {
                const message = `দুঃখিত! ${sessionName} সেশনে যোগদানের সময় একটি ত্রুটি হয়েছে।`;
                setNotification({ message, type: 'error' });
            }

            // ৫ সেকেন্ড পর টোস্ট মেসেজ বন্ধ হবে
            setTimeout(() => {
                clearNotification();
                // ত্রুটি হলে বাটনটি পুনরায় সক্রিয় হবে
                if (isSuccess === false) { // Check for the actual error status when time runs out
                    setJoiningStates(prev => {
                        const newState = { ...prev };
                        delete newState[sessionId];
                        return newState;
                    });
                }
            }, 5000);

        }, 1800); // ১.৮ সেকেন্ডের ডিলের মাধ্যমে লোডিং সিমুলেশন
    };


    return (
        <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-['Inter']">
            {/* নোটিফিকেশন টোস্ট */}
            <SessionToast
                toast={notification}
                clearToast={clearNotification}
            />

            <div className="max-w-6xl w-full">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-indigo-800 mb-4 tracking-tight"
                    >
                        ইন্টারঅ্যাক্টিভ কোরআন সেশনসমূহ
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-lg text-gray-600 max-w-3xl mx-auto"
                    >
                        আপনার প্রিয় শিক্ষকের সাথে লাইভ তাজওয়ীদ, হিফজ এবং সীরাহ সেশনগুলোতে যোগ দিন।
                    </motion.p>
                </div>

                {/* Session Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {sessionsData.map((session, i) => (
                        <SessionCard
                            key={session.id}
                            session={session}
                            delay={i * 0.15}
                            handleJoinSession={handleJoinSession}
                            joiningStates={joiningStates}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default InteractiveQuranSessions;