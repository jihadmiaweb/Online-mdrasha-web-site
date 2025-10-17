import { motion } from "framer-motion";
import { FaMosque, FaBookOpen, FaQuran } from "react-icons/fa";

const OnlineIslamicMadrasa = () => {
    return (
        // * RESPONSIVE: Dynamic padding and gradient background
        <section className="bg-gradient-to-r from-green-50 via-white to-emerald-50 py-16 px-5 sm:px-10 md:px-20">
            <div className="max-w-6xl mx-auto flex 
                flex-col md:flex-row                  /* * RESPONSIVE: Stack vertically on mobile, side-by-side from md screen */
                items-center gap-10">

                {/* Left Side: Images */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="w-full md:w-1/2"       /* * RESPONSIVE: Full width on mobile, half width from md screen */
                >
                    <div className="relative w-full max-w-lg mx-auto md:max-w-none md:mx-0 mt-5 md:mt-0 p-4">
                        <img
                            src="/imgas/Untitled-design-1.jpg"
                            alt="Online Quran Study"
                            className="w-full h-auto rounded-xl shadow-lg"
                        />
                        {/* Overlapping Image - Uses responsive width classes */}

                    </div>
                </motion.div>

                {/* Right Side: Text and Buttons */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="w-full md:w-1/2 
                        text-center md:text-left"        /* * RESPONSIVE: Center text on mobile, left-align from md screen */
                >
                    <h2 className="
                        text-3xl sm:text-4xl md:text-5xl /* * RESPONSIVE: Adjusts text size based on screen width */
                        font-bold text-green-700 mb-4 flex items-center 
                        justify-center md:justify-start  /* * RESPONSIVE: Center icon/text on mobile, left-align from md screen */
                        gap-2">
                        <FaMosque /> অনলাইন ইসলামী মাদ্রাসা
                    </h2>

                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
                        <span className="font-semibold text-green-700">বেস্ট অনলাইন ইসলামী মাদ্রাসা</span> - নতুনদের জন্য সহজ
                        অনলাইন কুরআন শিক্ষা। দ্বীনি জ্ঞান অর্জন প্রতিটি মুসলমানের জন্য অপরিহার্য। সময় এবং দূরত্বের বাধা পেরিয়ে,
                        এখন ঘরে বসেই আপনার এবং আপনার সন্তানদের জন্য অনলাইন কুরআন শিক্ষা সম্ভব।{" "}
                        <span className="font-semibold text-green-700">মাদ্রাসাতুন নূরুল ইলম</span> আপনাদের জন্য নিয়ে এসেছে সেরা
                        অনলাইন ইসলামিক মাদ্রাসা প্ল্যাটফর্ম, যেখানে নতুনদের জন্য সহজ এবং কার্যকর পদ্ধতিতে কুরআন শেখার সুব্যবস্থা
                        রয়েছে।
                    </p>

                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
                        বাহিরে বসবাসরত বাংলাদেশি ভাই-বোনদের জন্য ধর্মীয় জ্ঞান অর্জন প্রায়শই একটি চ্যালেঞ্জ হয়ে দাঁড়ায়।
                        সময় অঞ্চলের পার্থক্য, ভাষার বাধা, এবং নির্ভরযোগ্য ইসলামিক প্রতিষ্ঠানের অভাব এক্ষেত্রে প্রধান সমস্যা।
                        <span className="font-semibold text-green-700"> মাদ্রাসাতুন নূরুল ইলম </span> এই সকল বাধা অতিক্রম করে
                        আপনাদের জন্য একটি আদর্শ ইসলামিক অনলাইন স্কুল হিসেবে কাজ করছে। এখানে অনলাইন হিফজ মাদ্রাসা এবং শিশুদের
                        জন্য ইসলামিক শিক্ষা অনলাইনের বিশেষ ব্যবস্থা রয়েছে।
                    </p>

                    {/* Buttons - Use responsive flex for layout change */}
                    <div className="flex 
                        flex-col sm:flex-row              /* * RESPONSIVE: Stack buttons vertically on mobile, side-by-side from sm screen */
                        gap-4 
                        justify-center md:justify-start">
                        <button className="flex items-center gap-2 cursor-pointer bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-all">
                            <FaBookOpen /> আরও জানুন
                        </button>
                        <button className="flex items-center cursor-pointer gap-2 border border-green-600 text-green-700 hover:bg-green-600 hover:text-white font-semibold px-6 py-3 rounded-lg transition-all">
                            <FaQuran /> কোর্সে ভর্তি হন
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default OnlineIslamicMadrasa;