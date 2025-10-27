import React, { useState } from "react";
import { motion } from "framer-motion";

// --- মক কোর্স স্টেপস (Mock Course Steps) ---
interface HifzStep {
    id: number;
    title: string;
    description: string;
}

const quranHifzSteps: HifzStep[] = [
    { id: 1, title: "সতর্কতার সাথে শুরু", description: "হিফজ প্রোগ্রাম শুরু করার আগে নিয়মিত সময় নির্ধারণ ও পরিকল্পনা করা।" },
    { id: 2, title: "ছোট আয়াত থেকে শুরু", description: "প্রথমে ছোট আয়াত মুখস্থ করে সঠিক উচ্চারণে চর্চা।" },
    { id: 3, title: "আয়াত সংযুক্তি", description: "প্রতিদিন নতুন আয়াত শেখা এবং পূর্ববর্তী আয়াতের পুনরাবৃত্তি।" },
    { id: 4, title: "তাজওয়ীদ অনুযায়ী অনুশীলন", description: "তাজওয়ীদ নিয়ম মেনে আয়াত পড়ার অভ্যাস।" },
    { id: 5, title: "পর্যায়ক্রমিক হিফজ", description: "পর্বক্রমে সূরা মুখস্থ করা এবং সময়মতো রিভিশন।" },
    { id: 6, title: "পরীক্ষা ও মূল্যায়ন", description: "শিখিত আয়াত পরীক্ষা ও সঠিক উচ্চারণ যাচাই।" },
];

// --- ফ্রেমার মোশন ভ্যারিয়েন্ট (Framer Motion Variants) ---

// টাইপ ত্রুটি এড়াতে transition type-এ 'as const' যোগ করা হলো।
const itemVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.95 },
    show: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            type: "spring" as const, // ✅ টাইপ ফিক্স: 'as const' যোগ করা হয়েছে
            stiffness: 120,
            damping: 15
        }
    },
};

const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};


// --- একক স্টেপ কার্ড কম্পোনেন্ট (Single Step Card Component) ---
interface HifzStepCardProps {
    step: HifzStep;
}

const HifzStepCard: React.FC<HifzStepCardProps> = ({ step }) => {
    return (
        <motion.div
            className="relative bg-white border border-indigo-100 rounded-3xl shadow-xl p-6 md:p-8 
                       hover:shadow-2xl hover:border-indigo-300 transition-all duration-300 ease-in-out
                       flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6"
            variants={itemVariants}
            whileHover={{ y: -5 }}
        // এখানে ভুল করে যোগ করা কোড ব্লকটি (const itemVariants={...}) মুছে ফেলা হয়েছে।
        >
            {/* Step Badge */}
            <div className="flex-shrink-0">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-600 text-white font-extrabold text-xl shadow-lg">
                    {step.id}
                </div>
            </div>

            {/* Content */}
            <div className="flex-grow">
                <h2 className="text-xl md:text-2xl font-bold text-indigo-800 mb-2 mt-0 md:mt-1">
                    {step.title}
                </h2>
                <p className="text-gray-600 text-sm md:text-base">{step.description}</p>
            </div>
        </motion.div>
    );
};

// --- মূল কম্পোনেন্ট (Main Component) ---
const CompleteQuranHifz: React.FC = () => {
    const [clickMessage, setClickMessage] = useState("");

    const handleStartClick = () => {
        setClickMessage("অভিনন্দন! আপনি যাত্রা শুরু করার জন্য প্রস্তুত।");
        console.log("Hifz Start Clicked!");
        setTimeout(() => setClickMessage(""), 5000);
    };

    return (
        <div className="min-h-screen font-sans bg-gray-50 p-4 md:p-12">
            {/* Header */}
            <div className="max-w-4xl mx-auto text-center mb-10 md:mb-16">
                <h1 className="text-4xl md:text-6xl font-extrabold text-indigo-900 leading-tight">
                    সম্পূর্ণ কুরআন হিফজ প্রোগ্রাম
                </h1>
                <p className="mt-4 text-lg text-indigo-600">
                    আপনার পবিত্র কুরআন মুখস্থ করার সুসংগঠিত এবং কার্যকরী পথ।
                </p>
            </div>

            {/* Steps Grid */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                // 'whileInView' ব্যবহার করে স্ক্রোল করার সময় অ্যানিমেশন শুরু হবে
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
            >
                {quranHifzSteps.map((step) => (
                    <HifzStepCard key={step.id} step={step} />
                ))}
            </motion.div>

            {/* Call To Action */}
            <div className="text-center mt-12 max-w-4xl mx-auto">
                {clickMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded-lg font-medium shadow-md"
                    >
                        {clickMessage}
                    </motion.div>
                )}

                <button
                    onClick={handleStartClick}
                    className="px-8 py-3 bg-indigo-600 text-white font-semibold text-lg rounded-full shadow-lg
                             hover:bg-indigo-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300
                             focus:outline-none focus:ring-4 focus:ring-indigo-300"
                >
                    আজ থেকে আপনার যাত্রা শুরু করুন
                </button>
            </div>
        </div>
    );
};

export default CompleteQuranHifz;