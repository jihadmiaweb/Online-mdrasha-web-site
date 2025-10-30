import { useState, type ChangeEvent, type FormEvent } from "react";
import { User, Mail, MessageSquare, Send, Check, Zap, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

interface FreeTrialFormData {
    name: string;
    phoneOrEmail: string;
    message: string;
}

export default function FreeTrialContact() {
    const [formData, setFormData] = useState<FreeTrialFormData>({
        name: "",
        phoneOrEmail: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const supportEmail: string = "support@example.com";
    const supportPhoneNumber: string = "8801700000000";

    const subject: string = encodeURIComponent("ফ্রি ট্রায়াল অনুরোধ (Free Trial Request)");

    const prefilledMessage: string = encodeURIComponent(
        `নাম: ${formData.name || "[আপনার নাম]"}\nযোগাযোগ: ${formData.phoneOrEmail || "[মোবাইল/ইমেইল]"}\n\nমেসেজ: ${formData.message || "[আপনার বার্তা]"}`
    );

    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            // Simulate network request
            console.log("Submitting form data:", formData);
            await new Promise(resolve => setTimeout(resolve, 1500));

            if (formData.name.trim() === "" || formData.phoneOrEmail.trim() === "") {
                throw new Error("অনুগ্রহ করে নাম ও যোগাযোগের তথ্য পূরণ করুন।");
            }

            setSubmitted(true);

        } catch (err: unknown) {
            if (err instanceof Error) setError(err.message);
            else setError("ফর্ম জমা দিতে ব্যর্থ। অনুগ্রহ করে সরাসরি যোগাযোগ করুন।");
        } finally {
            setLoading(false);
        }
    }

    const labelClasses: string = "block text-sm font-medium text-gray-700 mb-1";

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-6 sm:p-8 transform transition-all duration-300 hover:shadow-3xl">

                <header className="mb-6 text-center">
                    <Zap className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">ফ্রি ট্রায়ালের জন্য যোগাযোগ</h1>
                    <p className="mt-2 text-base text-gray-600">
                        আপনার সেরা অভিজ্ঞতা শুরু করতে নীচের ফর্ম পূরণ করুন। অথবা সরাসরি WhatsApp/ইমেইলে যোগাযোগ করুন।
                    </p>
                </header>

                <AnimatePresence mode="wait">
                    {submitted ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 0.5 }}
                            className="p-6 sm:p-8 bg-green-50 rounded-xl border border-green-200 text-center shadow-lg"
                        >
                            <Check className="w-10 h-10 text-green-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-green-800">ধন্যবাদ! আপনার অনুরোধ জমা দেওয়া হয়েছে।</h3>
                            <p className="mt-2 text-base text-gray-700">
                                আমরা আপনার তথ্য পেয়েছি এবং যত দ্রুত সম্ভব আপনার সাথে যোগাযোগ করব। আমাদের সাথে থাকার জন্য ধন্যবাদ।
                            </p>
                            <button
                                onClick={() => {
                                    setSubmitted(false);
                                    setFormData({ name: "", phoneOrEmail: "", message: "" });
                                }}
                                className="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition duration-150"
                            >
                                <ExternalLink className="w-4 h-4 mr-1" /> নতুন অনুরোধ পাঠান
                            </button>
                        </motion.div>
                    ) : (
                        <motion.form
                            key="form"
                            onSubmit={handleSubmit}
                            className="space-y-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {error && (
                                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Name Input */}
                            <div>
                                <label htmlFor="name" className={labelClasses}>নাম (Name)</label>
                                <div className="relative mt-1">
                                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 pl-12"
                                        placeholder="আপনার সম্পূর্ণ নাম"
                                        type="text"
                                    />
                                </div>
                            </div>

                            {/* Phone or Email Input */}
                            <div>
                                <label htmlFor="contact" className={labelClasses}>মোবাইল বা ইমেইল (Mobile or Email)</label>
                                <div className="relative mt-1">
                                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <input
                                        id="contact"
                                        name="phoneOrEmail"
                                        value={formData.phoneOrEmail}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 pl-12"
                                        placeholder="01xxxxxxxxx অথবা someone@mail.com"
                                        type="text"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">যোগাযোগের জন্য এই তথ্যটি গুরুত্বপূর্ণ।</p>
                            </div>

                            {/* Message Textarea */}
                            <div>
                                <label htmlFor="message" className={labelClasses}>সংক্ষিপ্ত বার্তা (Message) (ঐচ্ছিক)</label>
                                <div className="relative mt-1">
                                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 pl-12 pt-3"
                                        placeholder="আপনি কোন সার্ভিস/প্যাকেজে ফ্রি ট্রায়াল চান — সংক্ষিপ্ত বর্ণনা দিন"
                                    />
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col gap-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full inline-flex justify-center items-center bg-indigo-600 text-white font-semibold px-4 py-3 rounded-xl shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5 mr-2" />
                                            ফর্ম পাঠান (Submit Form)
                                        </>
                                    )}
                                </button>

                                {/* WhatsApp & Mail Links */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <a
                                        href={`https://wa.me/${supportPhoneNumber}?text=${prefilledMessage}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-full inline-flex justify-center items-center bg-green-500 text-white font-semibold px-4 py-3 rounded-xl shadow-md hover:bg-green-600 transition duration-300"
                                    >
                                        WhatsApp এ যোগাযোগ
                                    </a>
                                    <a
                                        href={`mailto:${supportEmail}?subject=${subject}&body=${prefilledMessage}`}
                                        className="w-full inline-flex justify-center items-center bg-gray-700 text-white font-semibold px-4 py-3 rounded-xl shadow-md hover:bg-gray-800 transition duration-300"
                                    >
                                        ইমেইল করুন
                                    </a>
                                </div>
                            </div>

                            <p className="text-xs text-gray-500 mt-4 text-center">
                                আপনার তথ্য আমরা গোপন রাখব — শুধুমাত্র ফ্রি ট্রায়াল সম্পর্কিত যোগাযোগের জন্য ব্যবহার করা হবে।
                            </p>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
