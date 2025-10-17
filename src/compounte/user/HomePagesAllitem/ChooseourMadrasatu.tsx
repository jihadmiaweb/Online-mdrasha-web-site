import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

function ChooseMadrasatu() {
    return (
        <section className="py-16 px-4 sm:px-6 md:px-12 bg-gradient-to-r from-indigo-50 via-white to-pink-50">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Image - scrolls from top */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8 }}
                    className="flex justify-center lg:justify-start"
                >
                    <img
                        src="/imgas/2n.jpg"
                        alt="Online Islamic Learning"
                        className="rounded-xl shadow-2xl w-full max-w-md object-cover"
                    />
                </motion.div>

                {/* Right Content - scrolls from bottom */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8 }}
                    className="text-center lg:text-left"
                >
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
                        Why Choose <span className="text-green-600">Madrasatu Nuurul 'Ilm</span> for Online Islamic Education?
                    </h2>
                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                        Online Islamic education with Madrasatu Nuurul ‘Ilm offers unmatched
                        convenience, flexibility, and accessibility, perfect for busy
                        professionals, families, and expatriates. Our courses are designed for
                        all ages, from children to seniors, providing affordable online Islamic
                        courses with certified instructors. Study Islam at home, regardless of
                        your timezone or location. We address common challenges like language
                        barriers and inconsistent internet connectivity with engaging,
                        interactive sessions. Our platform is recognized as the best online
                        Quran and Islamic studies institute, ensuring authentic, accredited
                        education that fits your lifestyle and learning pace.
                    </p>
                    <Link
                        to="/FreeTrailPagas"
                        className="mt-6 inline-block bg-blue-900 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
                    >
                        Join The Free Trial Class
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

export default ChooseMadrasatu;
