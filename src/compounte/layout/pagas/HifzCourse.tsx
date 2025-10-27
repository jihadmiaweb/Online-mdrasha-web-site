"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, type Variants, } from "framer-motion";


// Firebase Imports (Assumes these are available in the runtime environment)
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged, type User, } from 'firebase/auth';
import { getFirestore, doc, setDoc, collection, Firestore } from 'firebase/firestore';
import { setLogLevel } from 'firebase/app'; // For debugging
interface IconProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
}
declare const __app_id: string | undefined;
declare const __firebase_config: string | undefined;
declare const __initial_auth_token: string | undefined;


// Custom SVG Icons (Replacing react-icons/fa)
const IconGraduationCap: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M512 32c0 20.3-17.7 36.6-38.1 36.6l-25.1 8.4-152.1 50.7-50.5 16.8c-20.2 6.7-41.9 6.7-62.1 0L154.5 90.7 75.6 64 38.1 76.2C17.7 76.2 0 92.5 0 112.8v223c0 14.5 8.1 27.6 20.9 34.4l25.1 13.6 152.1 82.2 50.5 27.3c20.2 10.9 41.9 10.9 62.1 0l50.5-27.3 152.1-82.2 25.1-13.6c12.8-6.9 20.9-20 20.9-34.4V32zM256 320L100 240l156-80 156 80-156 80z" /></svg>
);
const IconRedoAlt: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M496 48a16 16 0 0 1 16 16v160a16 16 0 0 1-16 16H336a16 16 0 0 1 0-32h104.9c-27.6-39.7-68.6-67.6-116.8-77.8C289 123.9 253.9 128 224 128c-41.3 0-81.2 12-113.8 34.3c-23.5 16.1-42.3 35.8-55.6 57.5-12.2 19.9-18.6 42-18.6 64.2V288c0 10.9 8.2 20.2 19.1 21.6 10.9 1.4 21.3-4.8 24.6-15.5l1.6-4.9c0 0 0-16 0-16s-1.8-19.4 6.7-36.4c11.1-22.3 29.5-40.8 52.8-56.1C167.7 181.9 203.2 176 240 176c24.6 0 49.3 4.2 73.1 12.5C384.8 206.1 433 250 456 312H336a16 16 0 0 1 0-32h160a16 16 0 0 1 16 16v160a16 16 0 0 1-32 0V408.8c-27.6 39.7-68.6 67.6-116.8 77.8C289 488.1 253.9 480 224 480c-41.3 0-81.2-12-113.8-34.3-23.5-16.1-42.3-35.8-55.6-57.5-12.2-19.9-18.6-42-18.6-64.2V224a16 16 0 0 1 32 0v59.8c0 13.9 4.3 27.7 12.8 39.5 11.1 15.6 25.7 28.5 43 38.8C167.7 416.1 203.2 424 240 424c24.6 0 49.3-4.2 73.1-12.5C384.8 383.9 433 340 456 272H496a16 16 0 0 1 16 16V464a16 16 0 0 1-16 16h-48v32a16 16 0 0 1-32 0v-32H16a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h48v-32a16 16 0 0 1 32 0v32h160a16 16 0 0 1 0 32H80v16z" /></svg>
);
const IconUserCheck: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M624 208a32 32 0 1 0-64 0 32 32 0 1 0 64 0zM368 256a144 144 0 1 0-288 0 144 144 0 1 0 288 0zm192 64h-32v32h32a32 32 0 0 1 0 64h-32v32h32a32 32 0 0 1 0 64H336a32 32 0 0 1 0-64h32v-32h-32a32 32 0 0 1 0-64h32v-32zm-384 0a16 16 0 0 1 16-16h224a16 16 0 0 1 16 16v160a16 16 0 0 1-16 16H192a16 16 0 0 1-16-16V320zM320 64a96 96 0 1 1-192 0 96 96 0 1 1 192 0z" /></svg>
);
const IconGlobe: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M336 288c0-70.7-57.3-128-128-128s-128 57.3-128 128 57.3 128 128 128 128-57.3 128-128zM496 288c0 141.4-114.6 256-256 256S0 429.4 0 288 114.6 32 256 32s240 114.6 240 256zm-176 0c0-9.6-7.8-17.4-17.4-17.4H33.4c-9.6 0-17.4 7.8-17.4 17.4s7.8 17.4 17.4 17.4h261.2c9.6 0 17.4-7.8 17.4-17.4z" /></svg>
);
const IconCertificate: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M512 48c0-10.7-9.3-19-19-19H19c-9.7 0-19 8.3-19 19v416c0 10.7 9.3 19 19 19h474c9.7 0 19-8.3 19-19V48zM48 48h416v32H48V48zm0 416h416V192H48v272zm432-64c0 35.3-28.7 64-64 64H128c-35.3 0-64-28.7-64-64V128c0-35.3 28.7-64 64-64h288c35.3 0 64 28.7 64 64v272zM384 192a48 48 0 1 0-96 0 48 48 0 1 0 96 0zM128 384h256c8.8 0 16-7.2 16-16s-7.2-16-16-16H128c-8.8 0-16 7.2-16 16s7.2 16 16 16z" /></svg>
);

const IconSpinner: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="animate-spin"><path fill="currentColor" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48z" /></svg>
);
const IconCheckCircle: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm139.7-331.7c6.2-6.2 6.2-16.4 0-22.6l-22.6-22.6c-6.2-6.2-16.4-6.2-22.6 0L224 294.5l-58.4-58.4c-6.2-6.2-16.4-6.2-22.6 0l-22.6 22.6c-6.2 6.2-6.2 16.4 0 22.6l96 96c6.2 6.2 16.4 6.2 22.6 0l160-160z" /></svg>
);
const IconExclamationTriangle: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 32c142.7 0 256 114.6 256 256s-114.6 256-256 256S0 427.4 0 288 114.6 32 256 32zm0 416c109.9 0 192-82.1 192-192S365.9 96 256 96 64 210.1 64 320s82.1 192 192 192zm-32-144h64V160h-64v128zm32 80a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" /></svg>
);


// Set Firebase Log Level for debugging
setLogLevel('debug');

// --- Framer Motion Variants for Staggered Animation ---
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// --- Helper Component: Feature Card ---
interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    desc: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, desc }) => (
    <motion.div
        variants={itemVariants}
        className="bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-transform transform hover:-translate-y-2 border-t-4 border-emerald-400 flex flex-col items-start h-full"
    >
        <div className="text-3xl text-emerald-600 mb-3 p-2 bg-white rounded-lg shadow-md w-12 h-12 flex items-center justify-center">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-emerald-800 mb-2">
            {title}
        </h3>
        <p className="text-gray-700 leading-relaxed text-sm flex-grow">{desc}</p>
    </motion.div>
);

// --- Custom Alert/Message Box Component ---
interface MessageBoxProps {
    type: 'success' | 'error' | 'loading';
    message: string;
}
const MessageBox: React.FC<MessageBoxProps> = ({ type, message }) => {
    const baseClasses = "p-4 rounded-xl text-center font-semibold flex items-center justify-center space-x-3";
    let colorClasses = "";
    let Icon = IconExclamationTriangle;

    if (type === 'success') {
        colorClasses = "bg-green-100 text-green-800 border-2 border-green-300";
        Icon = IconCheckCircle;
    } else if (type === 'error') {
        colorClasses = "bg-red-100 text-red-800 border-2 border-red-300";
        Icon = IconExclamationTriangle;
    } else if (type === 'loading') {
        colorClasses = "bg-blue-100 text-blue-800 border-2 border-blue-300";
        Icon = IconSpinner;
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`${baseClasses} ${colorClasses}`}
        >
            <Icon className={`text-xl w-6 h-6 ${type === 'loading' ? 'animate-spin' : ''}`} />
            <p>{message}</p>
        </motion.div>
    );
};


const HifzCourse: React.FC = () => {
    // --- Firebase/Auth State ---
    const [db, setDb] = useState<Firestore | null>(null);
    const [authReady, setAuthReady] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);

    // --- Form State ---
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error' | 'loading', text: string } | null>(null);

    // --- Core Data ---
    // Safe typed appId


    const appId: string = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';


    // 1. Firebase Initialization and Authentication
    useEffect(() => {
        try {
            const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
            const app = initializeApp(firebaseConfig);
            const firestoreDb = getFirestore(app);
            const auth = getAuth(app);

            setDb(firestoreDb);

            const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
                if (user) {
                    setUserId(user.uid);
                    setAuthReady(true);
                } else {
                    const token = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
                    try {
                        if (token) {
                            const userCredential = await signInWithCustomToken(auth, token);
                            setUserId(userCredential.user.uid);
                        } else {
                            const userCredential = await signInAnonymously(auth);
                            setUserId(userCredential.user.uid);
                        }
                    } catch (error) {
                        console.error("Firebase Sign-In Error:", error);
                        // Fallback to anonymous ID if sign-in fails
                        setUserId(crypto.randomUUID());
                    } finally {
                        setAuthReady(true);
                    }
                }
            });

            return () => unsubscribe();
        } catch (e) {
            console.error("Failed to initialize Firebase:", e);
            setAuthReady(true); // Allow UI to load even if Firebase fails
        }
    }, []);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 2. Registration Logic (Saving to Firestore)
    const handleRegistration = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name || !formData.email || !formData.phone) {
            setMessage({ type: 'error', text: 'অনুগ্রহ করে সমস্ত ফিল্ড পূরণ করুন।' });
            return;
        }

        if (!db || !authReady) {
            setMessage({ type: 'error', text: 'ডাটাবেস প্রস্তুত নয়। অনুগ্রহ করে কিছুক্ষণ অপেক্ষা করুন।' });
            return;
        }

        setLoading(true);
        setMessage({ type: 'loading', text: 'রেজিস্ট্রেশন প্রক্রিয়াকরণ করা হচ্ছে...' });

        try {
            // Firestore path: /artifacts/{appId}/public/data/hifz_registrations/{documentId}
            const registrationRef = doc(collection(db, `artifacts/${appId}/public/data/hifz_registrations`));

            await setDoc(registrationRef, {
                ...formData,
                timestamp: new Date().toISOString(),
                registeredBy: userId || 'anonymous',
                status: 'New'
            });

            setFormData({ name: '', email: '', phone: '' });
            setMessage({ type: 'success', text: 'অভিনন্দন! আপনার রেজিস্ট্রেশন সফলভাবে সম্পন্ন হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।' });
            console.log("Registration successful for user:", userId);

        } catch (error) {
            console.error("Error saving registration:", error);
            setMessage({ type: 'error', text: 'রেজিস্ট্রেশন ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।' });
        } finally {
            setLoading(false);
            // Auto-hide success/error message after a delay
            setTimeout(() => setMessage(null), 8000);
        }
    }, [formData, db, userId, appId, authReady]);

    // 3. Inline Registration Form Component
    const RegistrationForm: React.FC = () => (
        <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 md:p-10 rounded-xl shadow-2xl max-w-lg mx-auto mt-8 border-t-4 border-emerald-500"
        >
            <h3 className="text-2xl font-bold text-emerald-700 mb-6 text-center">ভর্তির জন্য তথ্য দিন</h3>

            {message && <div className="mb-6"><MessageBox type={message.type} message={message.text} /></div>}

            <form onSubmit={handleRegistration} className="space-y-4">
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="আপনার পূর্ণ নাম"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition duration-150"
                        required
                    />
                </div>
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="আপনার ইমেইল অ্যাড্রেস"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition duration-150"
                        required
                    />
                </div>
                <div>
                    <input
                        type="tel"
                        name="phone"
                        placeholder="যোগাযোগের ফোন নম্বর"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition duration-150"
                        required
                    />
                </div>

                <div className="flex justify-between items-center pt-2">
                    <button
                        type="submit"
                        disabled={loading || !authReady}
                        className={`font-bold text-lg px-6 py-3 rounded-full shadow-md transition w-full ${loading || !authReady ? 'bg-emerald-400 text-white cursor-not-allowed' : 'bg-emerald-600 text-white hover:bg-emerald-700'
                            }`}
                    >
                        {loading ? <IconSpinner className="inline mr-2 w-5 h-5" /> : 'সাবমিট করুন'}
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsFormVisible(false)}
                        className="ml-4 text-gray-500 hover:text-red-500 text-sm p-3 transition"
                    >
                        বন্ধ করুন
                    </button>
                </div>
                {!authReady && (
                    <p className="text-xs text-red-500 text-center mt-2">
                        ডাটাবেস সংযোগ স্থাপন হচ্ছে...
                    </p>
                )}
            </form>
        </motion.div>
    );


    const features = [
        { icon: <IconGraduationCap />, title: "অভিজ্ঞ হাফেজ শিক্ষক", desc: "প্রত্যেক ছাত্রের তিলাওয়াত ও মুখস্থ করার অগ্রগতি মনোযোগ সহকারে পর্যবেক্ষণ করা হয় অভিজ্ঞ হাফেজ শিক্ষক দ্বারা।" },
        { icon: <IconRedoAlt />, title: "দৈনিক মুরাজা সেশন", desc: "আগের মুখস্থ অংশ নিয়মিত পুনরায় পাঠ করা হয় (মুরাজা), যাতে ভুলে যাওয়া রোধ হয় এবং হিফজ মজবুত হয়।" },
        { icon: <IconUserCheck />, title: "ব্যক্তিগত মনোযোগ", desc: "ছাত্রদের সক্ষমতা ও শেখার গতির উপর ভিত্তি করে ব্যক্তিগত ও নমনীয় পরিকল্পনা তৈরি করা হয়।" },
        { icon: <IconGlobe />, title: "অনলাইন ও অফলাইন ক্লাস", desc: "যেখানেই থাকুন, আমাদের অনলাইন প্ল্যাটফর্মের মাধ্যমে বা ইন-পার্সন ক্লাসের মাধ্যমে শেখার সুযোগ রয়েছে।" },
        { icon: <span className="text-yellow-500">⭐</span>, title: "ইসলামিক পরিবেশ", desc: "আদব, আখলাক ও ইসলামী শৃঙ্খলার উপর বিশেষ গুরুত্ব প্রদান করা হয়, যা একজন আদর্শ মুসলিম তৈরি করে।" },
        { icon: <IconCertificate />, title: "সার্টিফিকেট প্রদান", desc: "সফলভাবে সম্পূর্ণ কুরআন হিফজ কোর্স সম্পন্নের পর অফিসিয়াল সনদ প্রদান করা হয়।" },
    ];

    return (
        <div className="bg-gradient-to-b from-emerald-50 to-white min-h-screen font-sans text-gray-800">
            {/* Header Section */}
            <section className="text-center py-16 md:py-24 px-4 max-w-7xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-emerald-700 mb-4 tracking-tight"
                >
                    হিফজ কোর্স (Hifz Program) 🕌
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-600 border-b-2 border-emerald-200 pb-4"
                >
                    কোরআনের সম্পূর্ণ মুখস্থ করার জন্য আমাদের ধাপে ধাপে সাজানো হিফজ প্রোগ্রামে যোগ দিন।
                    <br className="hidden md:inline" />অভিজ্ঞ হাফেজ শিক্ষকের তত্ত্বাবধানে আপনি আত্মবিশ্বাসের সাথে হিফজ সম্পন্ন করতে পারবেন।
                </motion.p>
            </section>

            <hr className="h-0.5 bg-emerald-200 border-0 max-w-4xl mx-auto" />

            {/* Key Features Section */}
            <section className="py-12 md:py-20 px-4 md:px-16 bg-white">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl md:text-4xl font-bold text-center text-emerald-700 mb-12"
                >
                    কোর্সের মূল বৈশিষ্ট্য ✨
                </motion.h2>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
                >
                    {features.map((item, index) => (
                        <FeatureCard
                            key={index}
                            {...item}
                        />
                    ))}
                </motion.div>
            </section>

            {/* Course Outline */}
            <section className="py-16 md:py-24 px-6 md:px-16 bg-emerald-50">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl md:text-4xl font-bold text-center text-emerald-700 mb-12"
                >
                    কোর্স সিলেবাস ও কাঠামো 📚
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="max-w-3xl mx-auto p-8 bg-white rounded-3xl shadow-2xl border border-emerald-100"
                >
                    <ul className="text-lg space-y-5 text-gray-700 list-inside font-medium">
                        <li className="flex items-start">
                            <span className="text-emerald-500 mr-3 mt-1">&#10003;</span>
                            <span className="text-gray-800">প্রতিদিন নতুন আয়াত মুখস্থ করার নির্দিষ্ট পরিমাণ নির্ধারণ (সবক)।</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-emerald-500 mr-3 mt-1">&#10003;</span>
                            <span className="text-gray-800">দৈনিক তাজওয়ীদ অনুশীলন ও সংশোধন: মাখরাজ, সিফাত এবং ওয়াকফ-ইবতিদার প্রশিক্ষণ।</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-emerald-500 mr-3 mt-1">&#10003;</span>
                            <span className="text-gray-800">সাপ্তাহিক ও মাসিক মুরাজা পরীক্ষা (পুরাতন সবকের পুনরাবৃত্তি) - নির্ভুলতার উপর গুরুত্ব।</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-emerald-500 mr-3 mt-1">&#10003;</span>
                            <span className="text-gray-800">প্রতি মাসে অগ্রগতি রিপোর্ট ও অভিভাবক সভা, যাতে শেখার প্রক্রিয়া সম্পর্কে অবগত থাকতে পারেন।</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-emerald-500 mr-3 mt-1">&#10003;</span>
                            <span className="text-gray-800">ফাইনাল হিফজ সম্পন্নের সার্টিফিকেট টেস্ট ও দস্তারবন্দী (সমাবর্তন)।</span>
                        </li>
                    </ul>
                </motion.div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24 text-center bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl md:text-4xl font-bold mb-4"
                >
                    আল্লাহর বাণী হৃদয়ে ধারণের যাত্রা শুরু করুন!
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="max-w-2xl mx-auto mb-10 text-lg sm:text-xl text-emerald-100"
                >
                    আজই আপনার হিফজ কোর্সে ভর্তি নিশ্চিত করুন এবং সম্মানিত হাফেজ হওয়ার পথ ধরুন।
                </motion.p>

                {!isFormVisible && (
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(16, 185, 129, 0.5)" }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-white text-emerald-700 font-extrabold text-lg px-10 py-4 rounded-full shadow-2xl hover:bg-emerald-100 transition focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                        onClick={() => {
                            setIsFormVisible(true);
                            setMessage(null); // Clear previous messages
                        }}
                    >
                        📝 এখনই যোগ দিন
                    </motion.button>
                )}

                {/* Registration Form Display */}
                {isFormVisible && <RegistrationForm />}

            </section>
        </div>
    );
};

export default HifzCourse;
