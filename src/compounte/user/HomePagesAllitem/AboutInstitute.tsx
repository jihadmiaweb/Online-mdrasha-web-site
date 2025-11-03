
import { motion } from "framer-motion";
import { FaBookOpen, FaGraduationCap, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router";

function AboutInstitute() {


    return (
        <div className="bg-gradient-to-r from-indigo-50 via-white to-green-50">
            {/* 🕌 Islamic Institute Section (Core Responsive Layout: flex-col -> md:flex-row) */}
            <section className="py-16 px-5 sm:px-10 md:px-20">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">

                    {/* Left: Image Block */}
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="w-full md:w-1/2"
                    >
                        {/* Added p-4 to the image container to ensure the absolute image is contained on all screens */}
                        <div className="relative w-full max-w-lg mx-auto md:max-w-none md:mx-0 mt-5 md:mt-0 p-4">
                            <img
                                src="/imgas/korane (2).jpg"
                                alt="Student reading the Quran online"
                                className="w-full h-auto rounded-xl shadow-lg max-w-sm sm:max-w-md mx-auto md:max-w-full"
                            />
                            {/* Adjusted positioning to be less aggressive on the edge for better mobile safety */}
                            <img
                                src="/imgas/korane (1).jpg"
                                alt="Student working on a laptop for online class"
                                className="absolute bottom-[-10px] right-4 w-40 sm:w-56 md:w-64 h-auto rounded-xl shadow-xl border-4 border-white"
                            />
                        </div>
                    </motion.div>

                    {/* Right: Text Block */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="w-full md:w-1/2 text-center md:text-left pt-10 md:pt-0"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-700 mb-4">
                            The Best Islamic Institute Online
                        </h2>

                        <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed mb-6">
                            At <span className="font-semibold text-green-600">Madrasatu Nuurul ‘Ilm</span>, we proudly
                            stand as the best online Islamic institute... we provide interactive and
                            personalized online Islamic classes for adults, children, and beginners alike.
                        </p>

                        {/* Buttons: Stacked on mobile (w-full), side-by-side on tablet/desktop (sm:w-auto) */}
                        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                            <button className="flex items-center w-full sm:w-auto justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-all">
                                <FaBookOpen /> VIEW MORE
                            </button>

                            <button className="flex items-center w-full sm:w-auto justify-center gap-2 border border-green-600 text-green-700 hover:bg-green-600 hover:text-white font-semibold px-6 py-3 rounded-lg transition-all">
                                <FaGraduationCap />
                                <Link to={"/Pricing"}>
                                    BUY COURSE
                                </Link>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- */}

            {/* 📋 Join Free Class Form (Ensures Form is centered and max-width restricted) */}


            {/* 🌙 Why Choose Section (Improved Grid Stacking) */}
            <section className="py-20 px-5 sm:px-10 md:px-20 bg-gradient-to-r from-green-50 via-white to-indigo-50">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl font-bold text-green-700 mb-6"
                    >
                        Why Choose Madrasatu Nuurul 'Ilm for Online Islamic Education?
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="text-gray-700 text-base md:text-lg leading-relaxed max-w-4xl mx-auto mb-10"
                    >
                        Online Islamic education with <span className="font-semibold text-green-600">Madrasatu Nuurul ‘Ilm</span> offers unmatched convenience, flexibility, and accessibility...
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        // Explicitly using grid-cols-1 for smallest screens, sm:grid-cols-2, md:grid-cols-3
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
                    >
                        {[
                            {
                                id: 1,
                                to: "/QualifiedScholars",
                                title: "Qualified Islamic Scholars",
                            },
                            {
                                id: 1,
                                to: "/FlexibleClassTimings",
                                title: "Flexible Class Timings",
                            },
                            {
                                id: 1,
                                to: "/AffordableCourses",
                                title: "Affordable Online Courses",
                            },
                            {
                                id: 1,
                                to: "/InteractiveQuranSessions",
                                title: "Interactive Quran Sessions",
                            },
                            {
                                id: 1,
                                to: "/IslamicAccessibility",
                                title: "Global Accessibility",
                            },
                            {
                                id: 1,
                                to: "/AuthenticEducation",
                                title: "Authentic & Accredited Education",
                            }






                        ].map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition text-left" // Explicit text-left for multi-line items
                            >
                                <FaCheckCircle className="text-green-500 text-xl flex-shrink-0" />
                                <Link to={item.to}>
                                    <span className="text-gray-800 font-semibold">{item.title}</span>
                                </Link>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

export default AboutInstitute;