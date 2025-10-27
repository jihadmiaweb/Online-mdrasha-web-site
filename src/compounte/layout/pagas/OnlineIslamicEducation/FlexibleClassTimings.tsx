import React, { useState, useEffect, useCallback } from "react";
import { Clock, CalendarCheck, Zap, Loader2, Send } from "lucide-react";
import { motion } from "framer-motion";

const apiKey = "";
const MODEL_NAME = "imagen-3.0-generate-002";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:predict?key=${apiKey}`;

// === Exponential Backoff ===
interface FetchOptions extends RequestInit {
    method: string;
    headers: {
        'Content-Type': string;
    };
    body: string;
}

interface ApiResponse {
    predictions?: Array<{
        bytesBase64Encoded?: string;
    }>;
}

const fetchWithExponentialBackoff = async (
    url: string,
    options: FetchOptions,
    retries: number = 5,
    delay: number = 1000
): Promise<ApiResponse> => {
    for (let i = 0; i < retries; i++) {
        try {
            const response: Response = await fetch(url, options);
            if (!response.ok) {
                if (response.status === 429 && i < retries - 1) {
                    await new Promise(resolve => setTimeout(resolve, delay));
                    delay *= 2;
                    continue;
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            if (i === retries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, delay));
            delay *= 2;
        }
    }
    throw new Error('Maximum retries reached');
};

// === Timing Card ===
const TimingCard = ({ title, time, details, icon: Icon, delay }: { title: string; time: string; details: string; icon: React.ElementType; delay: number }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col items-center p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all border border-indigo-100/50 hover:-translate-y-1"
    >
        <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-50 text-indigo-600">
            <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">{title}</h3>
        <div className="flex items-center mb-3 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium">
            <Clock className="w-4 h-4 mr-1" />
            {time}
        </div>
        <p className="text-gray-600 text-center text-sm leading-relaxed">{details}</p>
    </motion.div>
);

const timingsData = [
    {
        id: 1,
        title: "সকালের ব্যাচ",
        time: "7:00 AM – 9:00 AM",
        details: "কাজের আগে সহজে ক্লাস করার সুযোগ। দিনের শুরুতেই জ্ঞান অর্জন করুন।",
        icon: CalendarCheck,
    },
    {
        id: 2,
        title: "দুপুরের ব্যাচ",
        time: "2:00 PM – 4:00 PM",
        details: "অফিস বা বিশ্ববিদ্যালয়ের পরে বিশ্রাম নিয়ে দুপুরের ক্লাস করুন।",
        icon: Zap,
    },
    {
        id: 3,
        title: "সন্ধ্যার ব্যাচ",
        time: "8:00 PM – 10:00 PM",
        details: "কর্মজীবী ও ব্যস্তদের জন্য বিশেষভাবে সাজানো। দিনের শেষে শান্তভাবে শিখুন।",
        icon: Clock,
    },
];

// === Main Component ===
export default function FlexibleClassTimings() {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({ name: "", phone: "", batch: "" });
    const [submitted, setSubmitted] = useState(false);

    const generateImage = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        const userPrompt =
            "Abstract illustration of a flowing clock and book pages, symbolizing flexible learning and time management, in a modern, digital art style. Pastel theme.";

        const payload = {
            instances: [{ prompt: userPrompt }],
            parameters: { sampleCount: 1, aspect_ratio: "16:9" },
        };

        try {
            const response = await fetchWithExponentialBackoff(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (response.predictions?.[0]?.bytesBase64Encoded) {
                const base64Data = response.predictions[0].bytesBase64Encoded;
                setImageUrl(`data:image/png;base64,${base64Data}`);
            } else {
                setError("Image generation failed.");
            }
        } catch (err) {
            console.error(err);
            setError("ইমেজ জেনারেট করার সময় ত্রুটি হয়েছে।");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        generateImage();
    }, [generateImage]);

    interface FormEvent {
        target: {
            name: string;
            value: string;
        }
    }

    const handleChange = (e: FormEvent): void => setFormData({ ...formData, [e.target.name]: e.target.value });
    interface FormSubmitEvent extends React.FormEvent<HTMLFormElement> {
        preventDefault: () => void;
    }

    const handleSubmit = (e: FormSubmitEvent): void => {
        e.preventDefault();
        if (!formData.name || !formData.phone || !formData.batch) return;
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
        setFormData({ name: "", phone: "", batch: "" });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-['Inter'] transition-all duration-700">
            <div className="max-w-7xl w-full">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm font-semibold text-indigo-600 uppercase mb-2"
                    >
                        আপনার সুবিধা, আমাদের প্রাধান্য
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4"
                    >
                        Flexible Class Timings
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-lg text-gray-600 max-w-2xl mx-auto"
                    >
                        সুবিধামতো ক্লাসের সময়সূচি — নিজের জীবনধারার সাথে মিলিয়ে সঠিক ব্যাচ বেছে নিন।
                    </motion.p>
                </div>

                {/* Image Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full mb-12 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-r from-indigo-100 to-blue-100 min-h-[250px] flex items-center justify-center border-4 border-indigo-200"
                >
                    {isLoading && (
                        <div className="flex flex-col items-center p-8">
                            <Loader2 className="w-8 h-8 animate-spin text-indigo-700" />
                            <p className="mt-3 text-indigo-700 font-medium">ইমেজ তৈরি হচ্ছে...</p>
                        </div>
                    )}
                    {error && (
                        <div className="text-center p-8 text-red-700">
                            <p className="font-semibold">ত্রুটি: {error}</p>
                            <button
                                onClick={generateImage}
                                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                            >
                                আবার চেষ্টা করুন
                            </button>
                        </div>
                    )}
                    {imageUrl && !isLoading && (
                        <img src={imageUrl} alt="Flexible Learning" className="w-full h-full object-cover" />
                    )}
                </motion.div>

                {/* Timing Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {timingsData.map((slot, i) => (
                        <TimingCard key={slot.id} {...slot} delay={i * 0.15} />
                    ))}
                </motion.div>

                {/* Join Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-16 max-w-2xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-indigo-100"
                >
                    <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        ব্যাচে যোগ দিন
                    </h3>
                    <div className="grid grid-cols-1 gap-5">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="আপনার নাম"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="মোবাইল নাম্বার"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                        <select
                            name="batch"
                            value={formData.batch}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        >
                            <option value="">ব্যাচ নির্বাচন করুন</option>
                            <option value="morning">সকালের ব্যাচ</option>
                            <option value="noon">দুপুরের ব্যাচ</option>
                            <option value="evening">সন্ধ্যার ব্যাচ</option>
                        </select>
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all"
                        >
                            <Send className="w-4 h-4" /> এখনই নিবন্ধন করুন
                        </button>
                        {submitted && (
                            <p className="text-center text-green-600 font-medium mt-2">
                                ✅ আপনার আবেদন সফলভাবে জমা হয়েছে!
                            </p>
                        )}
                    </div>
                </motion.form>
            </div>
        </section>
    );
}
