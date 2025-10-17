import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import OnlineBestInstude from "@/compounte/user/AboutePagasAllItem/onlineBestInstude";
import CoursesSection from "@/compounte/user/AboutePagasAllItem/CoursesSection";

const AboutPagase = () => {
    const bgStyle = {
        width: "100%",
        height: "50vh",
        backgroundImage: "url('/imgas/E.jpg')", // public/imgas/E.jpg
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    };

    return (
        <div>
            <div style={bgStyle} className="flex flex-col items-center justify-center relative">
                {/* Gradient overlay effect */}
                <div className="absolute inset-0 bg-black/50"></div>

                {/* Animated content */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }} // শুরুতে নিচ থেকে আসবে
                    whileInView={{ opacity: 1, y: 0 }} // স্ক্রলে দেখা গেলে উঠবে
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }} // একবারই animate হবে
                    className="relative z-10 text-center"
                >
                    <h1 className="text-5xl font-bold text-white drop-shadow-lg">About Us</h1>
                    <span className="pt-2 text-white text-center font-bold block">
                        <Link to="/" className="hover:underline text-blue-100">
                            Home
                        </Link>{" "}
                        » About Us
                    </span>
                </motion.div>
            </div>
            <OnlineBestInstude />
            <CoursesSection />
        </div>
    );
};

export default AboutPagase;
