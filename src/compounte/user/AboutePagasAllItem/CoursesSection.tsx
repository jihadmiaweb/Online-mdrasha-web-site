import { motion } from "framer-motion";
import { FaBookOpen, FaClock, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router";

// Scroll animation variant
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const OnlineMadrasaPage = () => {
    return (
        <div className="bg-gradient-to-b from-emerald-50 via-white to-green-50 text-gray-800">
            {/* 🌙 Banner Section */}
            <section
                className="relative h-[60vh] bg-cover bg-center flex flex-col justify-center items-center text-center text-white"
                style={{ backgroundImage: "url('/imgas/E.jpg')" }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="relative z-10"
                >
                    <h1 className="text-3xl sm:text-5xl font-bold mb-4">
                        অনলাইন ইসলামী মাদ্রাসা
                    </h1>
                    <p className="text-lg sm:text-xl max-w-2xl mx-auto">
                        বেস্ট অনলাইন ইসলামী মাদ্রাসা - নতুনদের জন্য সহজ অনলাইন কুরআন শিক্ষা
                    </p>
                </motion.div>
            </section>

            {/* 📘 About / Features Section */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <motion.h2
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="text-3xl sm:text-4xl font-bold text-green-700 mb-6 text-center"
                >
                    কেন বেছে নেবেন মাদ্রাসাতুন নূরুল ইলম?
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {[
                        {
                            icon: <FaClock className="text-emerald-600 text-4xl mb-3" />,
                            title: "সময় অঞ্চলের সুবিধা",
                            desc: "আপনার ব্যস্ত সময়সূচীর সাথে মিলিয়ে ক্লাস করার সুবিধা। ইউরোপে বসবাসরত শিক্ষার্থীদের জন্য উপযুক্ত সময় নির্ধারণ করা হয়।",
                        },
                        {
                            icon: <FaBookOpen className="text-emerald-600 text-4xl mb-3" />,
                            title: "বাংলাভাষী শিক্ষক",
                            desc: "অভিজ্ঞ বাংলাভাষী শিক্ষক দ্বারা পাঠদান, যা অনলাইন আরবি শিক্ষা ও কুরআন শেখাকে করে আরও সহজ।",
                        },
                        {
                            icon: <FaCheckCircle className="text-emerald-600 text-4xl mb-3" />,
                            title: "ব্যক্তিগতকৃত ফিডব্যাক",
                            desc: "প্রতিটি শিক্ষার্থীকে আলাদা মনোযোগ দিয়ে দুর্বল দিকগুলো ঠিক করতে সাহায্য করা হয়, বিশেষত তাজবীদ ও মাখরাজে।",
                        },
                        {
                            icon: <FaBookOpen className="text-emerald-600 text-4xl mb-3" />,
                            title: "সাশ্রয়ী কোর্স ফি",
                            desc: "সকলের জন্য ইসলামিক শিক্ষা সহজলভ্য করতে আমাদের কোর্স ফি সাশ্রয়ী রাখা হয়েছে।",
                        },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="bg-white shadow-lg rounded-2xl p-6 border hover:shadow-xl transition-all duration-300"
                        >
                            <div className="flex flex-col items-center text-center">
                                {item.icon}
                                <h3 className="text-xl font-bold text-green-700 mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 📚 Courses Section */}
            <section className="bg-emerald-50 py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl font-bold text-center text-emerald-700 mb-10"
                    >
                        আমাদের কিছু জনপ্রিয় কোর্স
                    </motion.h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {[
                            "বেসিক অনলাইন নূরানী কায়দা ক্লাস",
                            "অনলাইন পারফেক্ট সালাহ শিক্ষা",
                            "তাজবীদ সহ কুরআন শিক্ষা",
                            "মৌলিক ১১টি সূরা মুখস্থ কোর্স",
                            "সম্পূর্ণ আমপারা মুখস্থ কোর্স",
                            "আসমা উল হুসনা মুখস্থ ক্লাস",
                            "কুরআন নাজিরা কোর্স",
                            "কুরআন হিফজ কোর্স",
                        ].map((course, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border-l-4 border-emerald-600"
                            >
                                <h3 className="text-lg font-semibold text-green-700 mb-2">
                                    {course}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    বিস্তারিত জানতে আমাদের কোর্স পেজ দেখুন।
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 🌟 Join Section */}
            <section className="bg-gradient-to-b from-emerald-50 to-white py-20 px-6 sm:px-10 md:px-20 text-center">
                <div className="max-w-5xl mx-auto">
                    <motion.h2
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl font-bold text-emerald-700 mb-8"
                    >
                        মাত্র ৩টি সহজ ধাপে আপনার শেখার যাত্রা শুরু করুন!
                    </motion.h2>

                    {/* Steps */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
                        {[
                            { step: "1️⃣", text: "ফর্ম পূরণ করুন।" },
                            { step: "2️⃣", text: "বিনামূল্যে ট্রায়াল ক্লাসের অভিজ্ঞতা নিন!" },
                            { step: "3️⃣", text: "তারপর আপনি আমাদের বেছে নিন।" },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                className="bg-white shadow-lg p-6 rounded-2xl border border-emerald-100 hover:shadow-xl transition-all duration-300"
                            >
                                <h3 className="text-4xl mb-3 text-emerald-600 font-bold">
                                    {item.step}
                                </h3>
                                <p className="text-gray-700 font-medium text-lg">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.a
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        href="#"
                        className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-emerald-700 transition-all duration-300 shadow-md"
                    >
                        <Link to="/FreeTrailPagas">
                            Join The Free Trial Class
                        </Link>
                    </motion.a>

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="mt-12 text-gray-700 leading-relaxed"
                    >
                        <p className="mb-2">
                            আমাদের সম্পর্কে আরও জানতে বা যেকোনো প্রশ্নের জন্য যোগাযোগ করুন।
                        </p>
                        <p>
                            🌐 ওয়েবসাইট:{" "}
                            <a
                                href="https://madrasatunurulilm.com"
                                target="_blank"
                                className="text-emerald-700 font-semibold hover:underline"
                            >
                                madrasatunurulilm.com
                            </a>
                        </p>
                        <p>
                            📧 ইমেইল:{" "}
                            <a
                                href="mailto:madrasatunuurulilm912@gmail.com"
                                className="text-emerald-700 font-semibold hover:underline"
                            >
                                madrasatunuurulilm912@gmail.com
                            </a>
                        </p>
                        <p className="mt-4 font-semibold text-emerald-800">
                            মাদ্রাসাতুন নূরুল ইলম — আপনার দ্বীনি জ্ঞান অর্জনের বিশ্বস্ত সঙ্গী।
                            আজই আমাদের সাথে যুক্ত হন 🌙
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default OnlineMadrasaPage;
