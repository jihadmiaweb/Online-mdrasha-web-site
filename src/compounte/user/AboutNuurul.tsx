import React from "react";
import { FaRegLightbulb, FaBookOpen, FaHandsHelping, FaDollarSign, FaClock, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
    { id: "01", icon: <FaRegLightbulb />, title: "1-Day Free Trial Class", description: "Start with a 1-day Free Trial Class and Discover the Difference with Us!" },
    { id: "02", icon: <FaBookOpen />, title: "Inspiring Curriculum & Study Plans", description: "The best teachers conduct the Quran, Hadis, and all Islamic classes." },
    { id: "03", icon: <FaHandsHelping />, title: "Enlighten Minds of All Ages", description: "We provide Islamic Knowledge for All Ages, From Children to Adults, with Care and Dedication." },
    { id: "04", icon: <FaDollarSign />, title: "Affordable Payments Method", description: "Flexible Pricing Plans with Easy and Secure, Payment Methods." },
    { id: "05", icon: <FaClock />, title: "24/7 Support & Scheduling", description: "Round-the-clock Online Classes for Students – Flexible Scheduling & Personalized Learning." },
    { id: "06", icon: <FaShieldAlt />, title: "100% Money-Back Guarantee", description: "Your Satisfaction is Our Commitment. If our courses don't meet your expectations, we'll gladly refund your payment." },
];

// Animation Variants for Cards
const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
};

const WhyChooseUs = () => {
    return (
        <section className="py-20 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
                    Why <span className="text-green-600">Madrasatu Nuurul 'Ilm</span>
                </h2>
                <p className="text-lg text-gray-600 mb-12">
                    Experience the ease and quality of authentic online Islamic education.
                </p>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.id}
                            custom={index}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={cardVariants}
                            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200
                         group transform transition-all duration-500 hover:-translate-y-2 hover:scale-105
                         hover:shadow-2xl hover:shadow-green-400/40 hover:border-green-500 cursor-pointer overflow-hidden"
                        >
                            <motion.div
                                className="flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-6 mx-auto"
                                whileHover={{ scale: 1.3, rotate: [0, 15, -15, 0], y: -5 }}
                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            >
                                {React.cloneElement(feature.icon, {
                                    className: "text-green-600 w-8 h-8 group-hover:text-green-700 transition-colors duration-300",
                                })}
                            </motion.div>

                            <h3 className="text-xl font-bold text-gray-800 mb-3 transition-colors duration-500 group-hover:text-green-700">
                                <span className="text-green-600 mr-1">{feature.id}.</span> {feature.title}
                            </h3>

                            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
