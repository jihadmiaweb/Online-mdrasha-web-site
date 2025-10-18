"use client";
import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { Clock, DollarSign, Calendar } from 'lucide-react';

// --- Type Definitions ---
interface FeeRow {
    details: string;
    fee: string;
}

interface FeeSchedule {
    duration: string;
    themeColor: 'teal' | 'blue' | 'green';
    data: FeeRow[];
}

// --- Data ---
const feeData: FeeSchedule[] = [
    {
        duration: "30 মিনিট ক্লাস (30 Min Class)",
        themeColor: "teal",
        data: [
            { details: "(সপ্তাহে ১ দিন মাসে ৪ টি ক্লাস মাসে ২ ঘণ্টা)", fee: "1000 TK monthly" },
            { details: "(সপ্তাহে ২ দিন মাসে ৮ টি ক্লাস মাসে ৪ ঘণ্টা)", fee: "2000 TK monthly" },
            { details: "(সপ্তাহে ৩ দিন মাসে ১২ টি ক্লাস মাসে ৬ ঘণ্টা)", fee: "3000 TK monthly" },
            { details: "(সপ্তাহে ৪ দিন মাসে ১৬ টি ক্লাস মাসে ৮ ঘণ্টা)", fee: "4000 TK monthly" },
            { details: "(সপ্তাহে ৫ দিন মাসে ২০ টি ক্লাস মাসে ১০ ঘণ্টা)", fee: "5000 TK monthly" },
            { details: "(সপ্তাহে ৬ দিন মাসে ২৪ টি ক্লাস মাসে ১২ ঘণ্টা)", fee: "6000 TK monthly" },
        ],
    },
    {
        duration: "45 মিনিট ক্লাস (45 Min Class)",
        themeColor: "blue",
        data: [
            { details: "(সপ্তাহে ১ দিন মাসে ৪ টি ক্লাস মাসে ২ ঘণ্টা)", fee: "2000 TK monthly" },
            { details: "(সপ্তাহে ২ দিন মাসে ৮ টি ক্লাস মাসে ৬ ঘণ্টা)", fee: "3000 TK monthly" },
            { details: "(সপ্তাহে ৩ দিন মাসে ১২ টি ক্লাস মাসে ৯ ঘণ্টা)", fee: "4000 TK monthly" },
            { details: "(সপ্তাহে ৫ দিন মাসে ২০ টি ক্লাস মাসে ১৫ ঘণ্টা)", fee: "6000 TK monthly" },
            { details: "(সপ্তাহে ৬ দিন মাসে ২৪ টি ক্লাস মাসে ১৮ ঘণ্টা)", fee: "7000 TK monthly" },
        ],
    },
    {
        duration: "60 মিনিট ক্লাস (60 Min Class)",
        themeColor: "green",
        data: [
            { details: "(সপ্তাহে ১ দিন মাসে ৪ টি ক্লাস মাসে ৪ ঘণ্টা)", fee: "3000 TK monthly" },
            { details: "(সপ্তাহে ২ দিন মাসে ৮ টি ক্লাস মাসে ৮ ঘণ্টা)", fee: "4000 TK monthly" },
            { details: "(সপ্তাহে ৩ দিন মাসে ১২ টি ক্লাস মাসে ১২ ঘণ্টা)", fee: "5000 TK monthly" },
            { details: "(সপ্তাহে ৪ দিন মাসে ১৬ টি ক্লাস মাসে ১৬ ঘণ্টা)", fee: "6000 TK monthly" },
            { details: "(সপ্তাহে ৫ দিন মাসে ২০ টি ক্লাস মাসে ২০ ঘণ্টা)", fee: "7000 TK monthly" },
            { details: "(সপ্তাহে ৬ দিন মাসে ২৪ টি ক্লাস মাসে ২৪ ঘণ্টা)", fee: "8000 TK monthly" },
        ],
    },
];

// --- Framer Motion Variants ---
const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({ opacity: 1, x: 0, transition: { delay: i * 0.05, duration: 0.4 } }),
};

// --- Fee Table/Card Component ---
const FeeScheduleTable: FC<{ schedule: FeeSchedule }> = ({ schedule }) => {
    const { duration, themeColor, data } = schedule;

    // Tailwind-safe classes
    const themeClasses = {
        teal: { bg: 'bg-teal-600', text: 'text-teal-700', border: 'border-teal-500' },
        blue: { bg: 'bg-blue-600', text: 'text-blue-700', border: 'border-blue-500' },
        green: { bg: 'bg-green-600', text: 'text-green-700', border: 'border-green-500' },
    };

    const { bg, text, border } = themeClasses[themeColor];

    return (
        <motion.div
            className={`bg-white rounded-xl shadow-xl overflow-hidden border-t-4 ${border}`}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            {/* Header */}
            <div className={`${bg} text-white text-center p-4 sm:p-5`}>
                <h3 className="text-xl sm:text-2xl font-bold flex items-center justify-center">
                    <Clock className="w-6 h-6 mr-2" /> {duration}
                </h3>
            </div>

            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Course Details</th>
                            <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Course Fee</th>
                        </tr>
                    </thead>
                    <motion.tbody initial="hidden" animate="visible" variants={sectionVariants}>
                        {data.map((row, index) => (
                            <motion.tr key={index} className="hover:bg-gray-50 transition-colors" custom={index} variants={rowVariants}>
                                <td className="px-6 py-4 whitespace-normal text-sm font-medium text-gray-800">{row.details}</td>
                                <td className={`px-6 py-4 whitespace-nowrap text-right font-bold ${text}`}>{row.fee}</td>
                            </motion.tr>
                        ))}
                    </motion.tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="sm:hidden p-4 space-y-3">
                {data.map((row, index) => (
                    <motion.div
                        key={index}
                        className="p-3 border border-gray-200 rounded-lg shadow-sm bg-gray-50"
                        custom={index}
                        variants={rowVariants}
                    >
                        <p className="text-sm font-medium text-gray-600 mb-1 flex items-center">
                            <Calendar className="w-4 h-4 mr-2" /> Details:
                        </p>
                        <p className="text-base font-semibold text-gray-800 mb-2 pl-6">{row.details}</p>
                        <p className={`text-base font-bold ${text} text-right border-t border-dashed pt-2 mt-2 flex items-center justify-end`}>
                            <DollarSign className="w-4 h-4 mr-1" /> {row.fee}
                        </p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

// --- Main Component ---
const CourseFeeStructures: FC = () => (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="text-center mb-10">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">আমাদের সকল ক্লাসের ফি কাঠামো</h2>
                <p className="text-lg text-gray-600">
                    আপনার প্রয়োজন অনুযায়ী <strong>৩০, ৪৫, এবং ৬০ মিনিটের</strong> ক্লাস থেকে বেছে নিন।
                </p>
            </div>

            <motion.section className="grid grid-cols-1 lg:grid-cols-3 gap-8" initial="hidden" animate="visible" variants={sectionVariants}>
                {feeData.map((schedule, index) => (
                    <FeeScheduleTable key={index} schedule={schedule} />
                ))}
            </motion.section>

            <motion.section className="mt-12 text-center bg-white p-8 rounded-xl shadow-xl border-b-4 border-green-600"
                variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">💡 বিশেষ দ্রষ্টব্য (**Note**)</h2>
                <p className="text-lg text-gray-600 mb-6">
                    সমস্ত ফি <strong>TK (বাংলাদেশি টাকা)</strong>-তে <strong>মাসিক ভিত্তিতে</strong> ধার্য করা হয়েছে। ভর্তির বিবরণ বা অন্যান্য সহায়তার জন্য অনুগ্রহ করে সরাসরি ইনস্টিটিউটের সাথে যোগাযোগ করুন।
                </p>
                <a href="#" className="inline-block bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-green-700 transition duration-300">
                    ফ্রি ট্রায়ালের জন্য যোগাযোগ করুন
                </a>
            </motion.section>
        </div>
    </div>
);

export default CourseFeeStructures;