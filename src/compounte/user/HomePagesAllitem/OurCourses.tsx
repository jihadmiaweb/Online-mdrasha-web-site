import React, { useState, useEffect, useRef } from "react";
import { FaGraduationCap, FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// --- Course Data ---
const courses = [
    {
        image: "/imgas/1.jpg",
        title_en: "Perfect Salah & Namaz Education Course Online",
        title_bn: "অনলাইন পারফেক্ট সালাহ/নামাজ শিক্ষা কোর্স",
        badge: "Namaz Education",
        link: "#",
    },
    {
        image: "/imgas/2.jpg",
        title_en: "Advanced Quran Learning with Tajweed Mastery",
        title_bn: "তাজবীদ সহ কুরআন শিক্ষা ও তেলাওয়াত দক্ষতা কোর্স",
        badge: "Quran & Tajweed",
        link: "#",
    },
    {
        image: "/imgas/3.jpg",
        title_en: "Basic Online Noorani Qaida (Foundation)",
        title_bn: "বেসিক অনলাইন নূরানী কায়েদা (প্রাথমিক স্তর)",
        badge: "Noorani Qaida",
        link: "#",
    },
    {
        image: "/imgas/4.jpg",
        title_en: "Hifz Class: Basic 11 Sura Memorization",
        title_bn: "হিফজ ক্লাস: মৌলিক ১১টি সুরা মুখস্থ ও তেলাওয়াত অনলাইন",
        badge: "Sura Memorization",
        link: "#",
    },
    {
        image: "/imgas/5.jpg",
        title_en: "Arabic Language & Grammar (Beginner Level)",
        title_bn: "আরবি ভাষা ও ব্যাকরণ শিক্ষা (প্রাথমিক পর্যায়)",
        badge: "Arabic Language",
        link: "#",
    },
    {
        image: "/imgas/6.jpg",
        title_en: "Fiqh & Islamic Jurisprudence Essentials",
        title_bn: "ইসলামী ফিকহ ও শরীয়াহ মূলনীতি কোর্স",
        badge: "Fiqh & Shariah",
        link: "#",
    },

    {
        image: "/imgas/7.jpg",
        title_en: "Arabic Language & Grammar (Beginner Level)",
        title_bn: "আরবি ভাষা ও ব্যাকরণ শিক্ষা (প্রাথমিক পর্যায়)",
        badge: "Arabic Language",
        link: "#",
    },
    {
        image: "/imgas/8.jpg",
        title_en: "Fiqh & Islamic Jurisprudence Essentials",
        title_bn: "ইসলামী ফিকহ ও শরীয়াহ মূলনীতি কোর্স",
        badge: "Fiqh & Shariah",
        link: "#",
    },
];

function CourseCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slidesPerView, setSlidesPerView] = useState(1);
    const trackRef = useRef(null);

    // --- Responsive slides per view ---
    const updateSlidesPerView = () => {
        const width = window.innerWidth;
        if (width >= 1280) setSlidesPerView(4);
        else if (width >= 1024) setSlidesPerView(3);
        else if (width >= 640) setSlidesPerView(2);
        else setSlidesPerView(1);
    };

    useEffect(() => {
        updateSlidesPerView();
        window.addEventListener("resize", updateSlidesPerView);
        return () => window.removeEventListener("resize", updateSlidesPerView);
    }, []);

    // --- Autoplay ---
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prev => {
                const maxIndex = courses.length - slidesPerView;
                if (maxIndex <= 0) return 0;
                return prev < maxIndex ? prev + 1 : 0;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, [slidesPerView]);

    // --- Navigation ---
    const nextSlide = () => {
        const maxIndex = courses.length - slidesPerView;
        if (maxIndex <= 0) return;
        setCurrentIndex(prev => (prev < maxIndex ? prev + 1 : 0));
    };

    const prevSlide = () => {
        const maxIndex = courses.length - slidesPerView;
        if (maxIndex <= 0) return;
        setCurrentIndex(prev => (prev > 0 ? prev - 1 : maxIndex));
    };

    // --- Pagination helpers ---
    const totalPages = Math.ceil(courses.length / slidesPerView);
    const currentPageIndex = Math.floor(currentIndex / slidesPerView);

    return (
        <section className="py-12 sm:py-16 min-h-screen font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Header */}
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-10 sm:mb-16 tracking-tight flex justify-center items-center">
                    <FaGraduationCap className="text-green-600 mr-3 text-4xl" />
                    আমাদের কোর্সসমূহ
                </h2>

                <div className="relative">
                    {/* Carousel */}
                    <div className="relative overflow-hidden rounded-2xl shadow-xl border border-gray-200">
                        <div
                            ref={trackRef}
                            className="flex transition-transform duration-700 ease-in-out"
                            style={{
                                transform: `translateX(-${(100 / courses.length) * currentIndex}%)`,
                                width: `${(100 / slidesPerView) * courses.length}%`,
                            }}
                        >
                            {courses.map((course, index) => (
                                <div
                                    key={index}
                                    className="p-2"
                                    style={{ width: `${(100 / courses.length) * slidesPerView}%` }}
                                >
                                    <a
                                        href={course.link}
                                        className="block h-full rounded-xl overflow-hidden shadow-lg transition-all duration-300 bg-white group border-2 border-transparent hover:border-green-500 hover:shadow-2xl hover:scale-[1.01]"
                                    >
                                        <div className="relative h-48 sm:h-56 overflow-hidden">
                                            <img
                                                src={course.image}
                                                alt={course.title_en}
                                                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                                                onError={e => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/CCCCCC/333333?text=Image+Missing' }}
                                            />
                                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300"></div>
                                            <div className="absolute top-0 left-0 p-4">
                                                <span className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md inline-block">
                                                    {course.badge}
                                                </span>
                                            </div>
                                            <div className="absolute bottom-0 right-0 p-4">
                                                <span className="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded-lg">
                                                    MNI
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-4 sm:p-5 relative z-10">
                                            <h3 className="text-lg font-extrabold text-gray-800 transition-colors duration-200 group-hover:text-green-700 mb-1 leading-snug">
                                                {course.title_en}
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-2 min-h-[40px] flex items-center">
                                                {course.title_bn}
                                            </p>
                                            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                                                <span className="flex items-center text-green-600 font-bold text-sm group-hover:text-green-700 transition-all duration-300 transform group-hover:translate-x-1">
                                                    বিস্তারিত দেখুন
                                                    <FaArrowRight className="ml-2 text-sm transition-transform duration-300" />
                                                </span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    {courses.length > slidesPerView && (
                        <>
                            <button
                                onClick={prevSlide}
                                className="hidden lg:flex absolute top-1/2 -left-6 transform -translate-y-1/2 bg-white text-green-600 border border-gray-300 hover:bg-green-600 hover:text-white transition-all duration-300 p-4 rounded-full shadow-xl z-20"
                                aria-label="Previous slide"
                            >
                                <FaChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="hidden lg:flex absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white text-green-600 border border-gray-300 hover:bg-green-600 hover:text-white transition-all duration-300 p-4 rounded-full shadow-xl z-20"
                                aria-label="Next slide"
                            >
                                <FaChevronRight className="w-5 h-5" />
                            </button>
                        </>
                    )}

                    {/* Dots Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-8 space-x-2">
                            {Array.from({ length: totalPages }).map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx * slidesPerView)}
                                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${idx === currentPageIndex ? "bg-green-600 scale-110" : "bg-gray-300 hover:bg-gray-400"}`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default CourseCarousel;
