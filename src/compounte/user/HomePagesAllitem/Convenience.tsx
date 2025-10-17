import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

function Convenience() {
    return (
        <section
            className="relative flex items-center justify-center text-center px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen"
            style={{
                backgroundImage: `url('/imgas/korane (1).jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed", // Parallax effect
            }}
        >
            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

            {/* Animated Content */}
            <motion.div
                className="relative z-10 max-w-4xl text-white p-6 sm:p-12 rounded-xl shadow-2xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1 }}
            >
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                    Online Islamic Learning at Your Convenience
                </h1>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-8">
                    Madrasatu Nuurul ‘Ilm offers a comprehensive virtual Islamic learning
                    platform specializing in Quran memorization courses online, Tajweed with
                    Quranic studies, and essential Islamic teachings such as Tashahud,
                    Darood Sharif, and Doa Kunut. Our affordable and authentic online
                    Islamic institute features Bengali-speaking qualified teachers who guide
                    you step-by-step, making online madrasah learning accessible from home.
                    Whether you are a beginner or seeking advanced studies, our top Islamic
                    institute online delivers personalized, interactive lessons for all ages.
                </p>
                <Link
                    to="/FreeTrailPagas"
                    className="inline-block border-white border-1 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                    Join The Free Trial Class
                </Link>
            </motion.div>

            {/* Optional decorative floating effect */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/70 to-transparent pointer-events-none"></div>
        </section>
    );
}

export default Convenience;
