import React from "react";
import { motion } from "framer-motion";

function AboutMadrasatu() {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-16 bg-gradient-to-r from-indigo-50 via-white to-pink-50">
            {/* The order of children inside the grid container is crucial for mobile responsiveness */}
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

                {/* Left Image (Moves to the top on small screens) */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8 }}
                    // Use md:order-1 to make the image appear on the left column on medium screens and up
                    className="flex justify-center md:justify-start order-2 md:order-1"
                >
                    <img
                        src="/imgas/korane (1).jpg"
                        alt="Online Islamic Learning"
                        className="rounded-xl shadow-2xl w-full max-w-md object-cover"
                    />
                </motion.div>

                {/* Right Content (Stays below the image on small screens, moves to the right column on medium screens and up) */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8 }}
                    // Use md:order-2 to make the content appear on the right column on medium screens and up
                    className="text-center md:text-left order-1 md:order-2"
                >
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
                        About <span className="text-green-600">Madrasatu Nuurul 'Ilm</span>
                    </h2>
                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
                        Madrasatu Nuurul ‘Ilm is a trusted online Islamic institute committed
                        to delivering high-quality Quranic and Islamic education to learners
                        worldwide, especially Bangladeshi Muslim families living abroad. Our
                        courses include basic online Noorani Qaida classes, perfect
                        Salah/Namaz education, Quran Tajweed, and memorization courses—all
                        taught by experienced Hafiz, Hafiza, Mu’allim, and Mu’allima. We offer
                        interactive, flexible, and affordable Islamic classes tailored to your
                        schedule.
                    </p>
                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
                        Join our free trial today to experience the best online madrasah for
                        global Muslim families. For enrollment or inquiries, visit{" "}
                        <a
                            href="https://madrasatunurulilm.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 underline"
                        >
                            madrasatunurulilm.com
                        </a>{" "}
                        or contact us at <span className="font-semibold">01834-756502</span>.
                        Join our <a href="#" className="text-blue-700 underline">Facebook community</a> to stay connected.
                    </p>

                    <a
                        href="#"
                        className="mt-4 inline-block bg-blue-900 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
                    >
                        Join The Free Trial Class
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

export default AboutMadrasatu;