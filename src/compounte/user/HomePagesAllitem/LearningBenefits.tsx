import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const LearningBenefits = () => {
    return (
        <section className="py-16 px-4 sm:px-6 md:px-12 bg-gradient-to-r from-indigo-50 via-white to-pink-50">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                {/* Left Content - scroll from top */}
                <motion.div
                    className="text-center lg:text-left"
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                        What Are the Benefits of Learning with{" "}
                        <span className="text-green-600">Madrasatu Nuurul 'Ilm</span>?
                    </h2>

                    {/* Table */}
                    <div className="overflow-x-auto mb-8">
                        <table className="min-w-full border border-gray-200 text-left shadow-lg rounded-lg overflow-hidden">
                            <thead className="bg-teal-400 text-white">
                                <tr>
                                    <th className="px-4 py-2">COMPREHENSIVE ISLAMIC EDUCATION</th>
                                    <th className="px-4 py-2">ACCESSIBLE TO ALL GENDERS</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                <tr className="border-b border-gray-200">
                                    <td className="px-4 py-2">1-Day Free Trial Classes</td>
                                    <td className="px-4 py-2">Qualified Instructors</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="px-4 py-2">Interactive Learning Environment</td>
                                    <td className="px-4 py-2">Flexible Learning Schedule</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2">Personalized And Group Learning Pathways</td>
                                    <td className="px-4 py-2">Classes are conducted with great patience</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <Link
                        to="/FreeTrailPagas"
                        className="inline-block bg-blue-900 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
                    >
                        JOIN THE FREE TRIAL CLASS
                    </Link>
                </motion.div>

                {/* Right Image - scroll from bottom */}
                <motion.div
                    className="relative flex justify-center lg:justify-end py-12 lg:py-0"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="w-full relative h-96 sm:h-[28rem] md:h-[32rem] lg:h-[36rem]">
                        <motion.img
                            src="/imgas/design-1.jpg"
                            alt="Child Learning"
                            className="rounded-xl w-full h-full object-cover shadow-2xl"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.5 }}
                            style={{ willChange: "transform" }}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default LearningBenefits;
