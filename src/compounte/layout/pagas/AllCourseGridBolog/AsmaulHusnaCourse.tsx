import React from "react";
import { motion, type TargetAndTransition, } from "framer-motion";
import { BookOpenText, Target } from "lucide-react";

// --- INTERFACE AND DATA ---

interface HusnaItem {
    id: number;
    name: string;
    meaning: string;
}

// --- FRAMER MOTION VARIANTS ---
const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i: number): TargetAndTransition => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            delay: i * 0.03,
            type: "spring",
            stiffness: 80,
            damping: 15,
        },
    }),
};

// --- DATA ---
const asmaulHusna: HusnaItem[] = [
    { id: 1, name: "الرَّحْمَنُ", meaning: "The Most Gracious" },
    { id: 2, name: "الرَّحِيمُ", meaning: "The Most Merciful" },
    { id: 3, name: "الْمَلِكُ", meaning: "The King" },
    { id: 4, name: "الْقُدُّوسُ", meaning: "The Most Holy" },
    { id: 5, name: "السَّلَامُ", meaning: "The Source of Peace" },
    { id: 6, name: "الْمُؤْمِنُ", meaning: "The Giver of Faith" },
    { id: 7, name: "الْمُهَيْمِنُ", meaning: "The Overseer, The Guardian" },
    { id: 8, name: "الْعَزِيزُ", meaning: "The Almighty, The Invincible" },
    { id: 9, name: "الْجَبَّارُ", meaning: "The Compeller, The Restorer" },
    { id: 10, name: "الْمُتَكَبِّرُ", meaning: "The Supreme, The Majestic" },
    { id: 11, name: "الْخَالِقُ", meaning: "The Creator" },
    { id: 12, name: "الْبَارِئُ", meaning: "The Maker of Order" },
    { id: 13, name: "الْمُصَوِّرُ", meaning: "The Shaper of Beauty" },
    { id: 14, name: "الْغَفَّارُ", meaning: "The Forgiving" },
    { id: 15, name: "الْقَهَّارُ", meaning: "The Subduer" },
    { id: 16, name: "الْوَهَّابُ", meaning: "The Giver" },
    { id: 17, name: "الرَّزَّاقُ", meaning: "The Provider" },
    { id: 18, name: "الْفَتَّاحُ", meaning: "The Opener, The Victor" },
    { id: 19, name: "الْعَلِيمُ", meaning: "The All-Knowing" },
    { id: 20, name: "الْقَابِضُ", meaning: "The Restrainer" },
    { id: 21, name: "الْبَاسِطُ", meaning: "The Extender" },
    { id: 22, name: "الْخَافِضُ", meaning: "The Abaser" },
    { id: 23, name: "الرَّافِعُ", meaning: "The Exalter" },
    { id: 24, name: "الْمُعِزُّ", meaning: "The Giver of Honor" },
    { id: 25, name: "الْمُذِلُّ", meaning: "The Giver of Dishonor" },
    { id: 26, name: "السَّمِيعُ", meaning: "The All-Hearing" },
    { id: 27, name: "الْبَصِيرُ", meaning: "The All-Seeing" },
    { id: 28, name: "الْحَكَمُ", meaning: "The Judge" },
    { id: 29, name: "الْعَدْلُ", meaning: "The Just" },
    { id: 30, name: "اللَّطِيفُ", meaning: "The Subtle One" },
    { id: 31, name: "الْخَبِيرُ", meaning: "The All-Aware" },
    { id: 32, name: "الْحَلِيمُ", meaning: "The Forbearing" },
    { id: 33, name: "الْعَظِيمُ", meaning: "The Great One" },
    { id: 34, name: "الْغَفُورُ", meaning: "The All-Forgiving" },
    { id: 35, name: "الشَّكُورُ", meaning: "The Appreciative" },
    { id: 36, name: "الْعَلِيُّ", meaning: "The Most High" },
    { id: 37, name: "الْكَبِيرُ", meaning: "The Most Great" },
    { id: 38, name: "الْحَفِيظُ", meaning: "The Preserver" },
    { id: 39, name: "الْمُقِيتُ", meaning: "The Maintainer" },
    { id: 40, name: "الْحَسِيبُ", meaning: "The Reckoner" },
    { id: 41, name: "الْجَلِيلُ", meaning: "The Majestic" },
    { id: 42, name: "الْكَرِيمُ", meaning: "The Most Generous" },
    { id: 43, name: "الرَّقِيبُ", meaning: "The Watchful One" },
    { id: 44, name: "الْمُجِيبُ", meaning: "The Responder" },
    { id: 45, name: "الْوَاسِعُ", meaning: "The All-Encompassing" },
    { id: 46, name: "الْحَكِيمُ", meaning: "The All-Wise" },
    { id: 47, name: "الْوَدُودُ", meaning: "The Loving One" },
    { id: 48, name: "الْمَجِيدُ", meaning: "The Glorious One" },
    { id: 49, name: "الْبَاعِثُ", meaning: "The Resurrector" },
    { id: 50, name: "الشَّهِيدُ", meaning: "The Witness" },
    { id: 51, name: "الْحَقُّ", meaning: "The Truth" },
    { id: 52, name: "الْوَكِيلُ", meaning: "The Trustee" },
    { id: 53, name: "الْقَوِيُّ", meaning: "The All-Strong" },
    { id: 54, name: "الْمَتِينُ", meaning: "The Firm One" },
    { id: 55, name: "الْوَلِيُّ", meaning: "The Protecting Friend" },
    { id: 56, name: "الْحَمِيدُ", meaning: "The Praiseworthy" },
    { id: 57, name: "الْمُحْصِي", meaning: "The Appraiser" },
    { id: 58, name: "الْمُبْدِئُ", meaning: "The Originator" },
    { id: 59, name: "الْمُعِيدُ", meaning: "The Restorer" },
    { id: 60, name: "الْمُحْيِي", meaning: "The Giver of Life" },
    { id: 61, name: "الْمُمِيتُ", meaning: "The Giver of Death" },
    { id: 62, name: "الْحَيُّ", meaning: "The Ever-Living" },
    { id: 63, name: "الْقَيُّومُ", meaning: "The Sustainer" },
    { id: 64, name: "الْوَاجِدُ", meaning: "The Finder" },
    { id: 65, name: "الْمَاجِدُ", meaning: "The Noble One" },
    { id: 66, name: "الْوَاحِدُ", meaning: "The Unique One" },
    { id: 67, name: "الْأَحَدُ", meaning: "The One" },
    { id: 68, name: "الصَّمَدُ", meaning: "The Eternal" },
    { id: 69, name: "الْقَادِرُ", meaning: "The All-Powerful" },
    { id: 70, name: "الْمُقْتَدِرُ", meaning: "The Omnipotent" },
    { id: 71, name: "الْمُقَدِّمُ", meaning: "The Expediter" },
    { id: 72, name: "الْمُؤَخِّرُ", meaning: "The Delayer" },
    { id: 73, name: "الْأَوَّلُ", meaning: "The First" },
    { id: 74, name: "الْآخِرُ", meaning: "The Last" },
    { id: 75, name: "الظَّاهِرُ", meaning: "The Manifest" },
    { id: 76, name: "الْبَاطِنُ", meaning: "The Hidden One" },
    { id: 77, name: "الْوَالِي", meaning: "The Governor" },
    { id: 78, name: "الْمُتَعَالِي", meaning: "The Most Exalted" },
    { id: 79, name: "الْبَرُّ", meaning: "The Source of Goodness" },
    { id: 80, name: "التَّوَّابُ", meaning: "The Acceptor of Repentance" },
    { id: 81, name: "الْمُنْتَقِمُ", meaning: "The Avenger" },
    { id: 82, name: "الْعَفُوُّ", meaning: "The Pardoner" },
    { id: 83, name: "الرَّؤُوفُ", meaning: "The Kind" },
    { id: 84, name: "مَالِكُ الْمُلْكِ", meaning: "The Owner of All Sovereignty" },
    { id: 85, name: "ذُو الْجَلَالِ وَالْإِكْرَامِ", meaning: "The Lord of Majesty and Honor" },
    { id: 86, name: "الْمُقْسِطُ", meaning: "The Equitable" },
    { id: 87, name: "الْجَامِعُ", meaning: "The Gatherer" },
    { id: 88, name: "الْغَنِيُّ", meaning: "The Self-Sufficient" },
    { id: 89, name: "الْمُغْنِي", meaning: "The Enricher" },
    { id: 90, name: "الْمَانِعُ", meaning: "The Preventer" },
    { id: 91, name: "الضَّارُّ", meaning: "The Distresser" },
    { id: 92, name: "النَّافِعُ", meaning: "The Benefiter" },
    { id: 93, name: "النُّورُ", meaning: "The Light" },
    { id: 94, name: "الْهَادِي", meaning: "The Guide" },
    { id: 95, name: "الْبَدِيعُ", meaning: "The Incomparable" },
    { id: 96, name: "الْبَاقِي", meaning: "The Everlasting" },
    { id: 97, name: "الْوَارِثُ", meaning: "The Inheritor" },
    { id: 98, name: "الرَّشِيدُ", meaning: "The Righteous Guide" },
    { id: 99, name: "الصَّبُورُ", meaning: "The Patient One" },
    // ... বাকিগুলো একইভাবে রাখো
];

// --- COMPONENT ---
const AsmaulHusnaCourse: React.FC = () => {
    return (
        <div className="px-4 md:px-8 py-12 bg-gray-50 min-h-screen font-sans">
            <div className="max-w-6xl mx-auto">

                {/* Header Section */}
                <div className="text-center mb-12 p-6 bg-indigo-50 rounded-2xl shadow-xl">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-900 mb-3">
                        সম্পূর্ণ আসমাউল হুসনা মুখস্থ কোর্স
                    </h1>
                    <p className="text-lg text-indigo-700 max-w-xl mx-auto px-2">
                        আল্লাহর সুন্দর নামসমূহ (আসমাউল হুসনা) অর্থ, উচ্চারণ ও ফজিলত সহকারে মুখস্থ করার সহজ পদ্ধতি।
                    </p>
                </div>

                {/* Course Objectives */}
                <div className="flex justify-center mb-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
                        <div className="flex items-start p-4 bg-white rounded-xl shadow-lg border-l-4 border-indigo-500">
                            <BookOpenText className="w-6 h-6 text-indigo-500 mr-3 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-bold text-gray-800">কোর্সের বিবরণ</h3>
                                <p className="text-sm text-gray-600">
                                    প্রতিটি নামের গভীর অর্থ ও কুরআনে তার প্রয়োগ নিয়ে বিস্তারিত আলোচনা।
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start p-4 bg-white rounded-xl shadow-lg border-l-4 border-green-500">
                            <Target className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-bold text-gray-800">মুখস্থ করার লক্ষ্য</h3>
                                <p className="text-sm text-gray-600">
                                    কোর্সের শেষে ৯৯টি নাম শুদ্ধভাবে স্মরণ করার কৌশল শেখানো।
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Asmaul Husna Grid */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    initial="hidden"
                    animate="visible"
                >
                    {asmaulHusna.map((item, index) => (
                        <motion.div
                            key={item.id}
                            custom={index}
                            variants={itemVariants}
                            className="bg-white rounded-xl shadow-xl p-6 flex flex-col items-center text-center
                         border-b-4 border-indigo-400 
                         transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] 
                         hover:border-indigo-600"
                        >
                            <h2 className="text-4xl sm:text-5xl font-bold text-indigo-700 mb-3 p-2 bg-indigo-50 rounded-lg w-full">
                                {item.name}
                            </h2>
                            <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
                                Name {item.id}
                            </p>
                            <p className="text-lg text-gray-700 mt-2 font-semibold">
                                {item.meaning}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default AsmaulHusnaCourse;








