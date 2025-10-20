import { useState } from "react";
import { motion } from "framer-motion";
import { FaBookOpen, FaGraduationCap, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router";

function AboutInstitute() {
    const [formData, setFormData] = useState({
        name: "",
        gender: "",
        whatsapp: "",
        country: "",
        facebook: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic Client-side validation for required fields
        if (!formData.name || !formData.gender || !formData.whatsapp || !formData.country) {
            alert("Please fill out all required fields.");
            return;
        }

        console.log("Form submitted:", formData);
        alert("✅ Thank you for joining! We’ll contact you soon on WhatsApp.");
        // In a real application, you would send formData to a server here.
    };

    return (
        <div className="bg-gradient-to-r from-indigo-50 via-white to-green-50">
            {/* 🕌 Islamic Institute Section (Core Responsive Layout: flex-col -> md:flex-row) */}
            <section className="py-16 px-5 sm:px-10 md:px-20">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">

                    {/* Left: Image Block */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
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
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
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
                                <FaGraduationCap /> BUY COURSE
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- */}

            {/* 📋 Join Free Class Form (Ensures Form is centered and max-width restricted) */}
            <section className="min-h-screen flex items-center justify-center py-16 px-5">
                {/* REMOVED DUPLICATE TEXT HERE (h2 and p) */}
                <div className="bg-white shadow-2xl rounded-2xl w-full max-w-lg p-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-600 mb-6">
                        Join Our Free Class
                    </h2>

                    <p className="text-center text-gray-600 mb-8">
                        To join the free class, please complete the form below.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
                                Your Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>

                        <div>
                            <label htmlFor="gender" className="block text-gray-700 font-semibold mb-1">
                                Gender <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="gender"
                                name="gender"
                                required
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="whatsapp" className="block text-gray-700 font-semibold mb-1">
                                WhatsApp <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                id="whatsapp"
                                name="whatsapp"
                                required
                                value={formData.whatsapp}
                                onChange={handleChange}
                                placeholder="+8801XXXXXXXXX or your local number"
                                pattern="[0-9+ ]{8,20}"
                                title="Please enter a valid phone number (8-20 characters)."
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>

                        <div>
                            <label htmlFor="country" className="block text-gray-700 font-semibold mb-1">
                                Select Country <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                required
                                value={formData.country}
                                onChange={handleChange}
                                placeholder="Enter your country"
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>

                        <div>
                            <label htmlFor="facebook" className="block text-gray-700 font-semibold mb-1">
                                Facebook Link <span className="text-gray-400 text-sm">(Optional)</span>
                            </label>
                            <input
                                type="url"
                                id="facebook"
                                name="facebook"
                                value={formData.facebook}
                                onChange={handleChange}
                                placeholder="https://facebook.com/yourprofile"
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-all"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </section>

            {/* --- */}

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