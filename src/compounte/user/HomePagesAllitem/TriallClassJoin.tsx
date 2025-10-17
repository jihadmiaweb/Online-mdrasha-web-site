import { motion } from "framer-motion";
import { Link } from "react-router";

function TriallClassJoin() {
    return (
        <section className="py-20 px-5 sm:px-10 md:px-20 bg-gradient-to-r from-indigo-50 via-white to-green-50">
            <div className="max-w-6xl mx-auto text-center">
                {/* 🌙 Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-3xl sm:text-4xl font-bold text-green-700 mb-4"
                >
                    Begin Your Learning Journey in Just 3 Easy Steps!
                </motion.h2>

                {/* 🕌 Description */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="text-gray-700 text-base md:text-lg max-w-3xl mx-auto mb-12"
                >
                    Join{" "}
                    <span className="font-semibold text-green-600">
                        Madrasatul Nurul ‘Ilm
                    </span>{" "}
                    to deepen your understanding of Islam through comprehensive courses,
                    engaging resources, and a supportive community that spans across the
                    globe.
                </motion.p>

                {/* 📖 Steps Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[
                        {
                            step: "1",
                            title: "Fill Out the Free Trial Class Form",
                            text: "Complete our simple registration form to request your free trial session and start your Islamic education journey.",
                        },
                        {
                            step: "2",
                            title: "Attend Your Free Trial Class",
                            text: "Experience our live, interactive online Islamic classes with qualified teachers to see how engaging and easy learning can be.",
                        },
                        {
                            step: "3",
                            title: "Choose Your Desired Course",
                            text: "Select the course that best fits your goals — from Quran recitation and memorization to Arabic and Islamic studies.",
                        },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: i * 0.2 }}
                            viewport={{ once: true }}
                            className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-xl transition"
                        >
                            <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4 bg-green-600 text-white text-xl font-bold rounded-full">
                                {item.step}
                            </div>
                            <h3 className="text-lg font-bold text-green-700 mb-2">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                                {item.text}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* 🌟 Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-12 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg transition-all"
                >
                    <Link to={"/FreeTrailPagas"} className="cursor-pointer">
                        Join The Free Trial Class
                    </Link>
                </motion.button>
            </div>
        </section>
    );
}

export default TriallClassJoin;
