"use client";

import React, { useState, useEffect, useRef } from "react";
// react-icons/fa ইমপোর্টটি নির্ভরতা এড়ানোর জন্য সরানো হলো।

// --- টাইপ সংজ্ঞা (Type Definition) ---
interface Course {
    id: number;
    to: string; // রুট লিঙ্ক
    image: string; // ইমেজ ইউআরএল বা পাথ
    titleBn: string; // বাংলা টাইটেল
    titleEn: string; // ইংরেজি টাইটেল
    badge: string; // কোর্সের ব্যাজ/লেবেল
}

// --- কোর্স ডেটা (Course Data) ---
// লোকাল পাথ (imgas/1.jpg) অ্যাক্সেসযোগ্য না হওয়ায় প্লেসহোল্ডার URL ব্যবহার করা হলো।
const courses: Course[] = [
    {
        id: 1,
        to: "/AsmaulHusnaCourse",
        image: "imgas/1.jpg",
        titleBn: "সম্পূর্ণ আসমাউল হুসনা মুখস্থ কোর্স",
        titleEn: "Complete Asmaul Husna memorization course",
        badge: "নতুন",
    },
    {
        id: 2,
        to: "/PerfectSalahCourse",
        image: "imgas/2.jpg",
        titleBn: "অনলাইন পারফেক্ট সালাহ/নামাজ শিক্ষা কোর্স",
        titleEn: "Perfect Salah/Namaz Education Course Online",
        badge: "জনপ্রিয়",
    },
    {
        id: 3,
        to: "/TajweedQuranCourse",
        image: "imgas/3.jpg",
        titleBn: "তাজওয়ীদ সহ কুরআন শিক্ষা কোর্স",
        titleEn: "Quran learning Course with Tajweed",
        badge: "অনলাইন",
    },
    {
        id: 4,
        to: "/NooraniQaidaCourse",
        image: "imgas/4.jpg",
        titleBn: "বেসিক অনলাইন নূরানি কায়দা কোর্স",
        titleEn: "Basic Online Noorani Qaida Course",
        badge: "বেসিক",
    },
    {
        id: 5,
        to: "/ArabicGrammarCourse",
        image: "imgas/5.jpg",
        titleBn: "সহজ আরবি ব্যাকরণ কোর্স",
        titleEn: "Easy Arabic Grammar Course",
        badge: "ব্যাকরণ",
    },
    {
        id: 6,
        to: "/CompleteQuranHifz",
        image: "imgas/6.jpg",
        titleBn: "সম্পূর্ণ কুরআন হিফজ প্রোগ্রাম",
        titleEn: "Complete Quran Hifz Program",
        badge: "হিফজ",
    },
    {
        id: 7,
        to: "/SeerahCourse",
        image: "imgas/7.jpg",
        titleBn: "নবীজির জীবনী (সীরাহ) অধ্যয়ন",
        titleEn: "Prophet's Biography (Seerah) Studies",
        badge: "সীরাহ",
    },
    {
        id: 8,
        to: "/FiqhCourse",
        image: "imgas/8.jpg",
        titleBn: "ফিকহ এর মৌলিক ধারণা কোর্স",
        titleEn: "Basic Fiqh Principles Course",
        badge: "ফিকহ",
    },
];

// SVG আইকনগুলির কম্পোনেন্ট তৈরি করা হলো যাতে নির্ভরতা ছাড়া ব্যবহার করা যায়।

// FaGraduationCap এর প্রতিস্থাপন


// FaArrowRight এর প্রতিস্থাপন
const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
        <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.7 224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H338.7L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
    </svg>
);

// FaChevronLeft এর প্রতিস্থাপন
const ChevronLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="currentColor">
        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
    </svg>
);

// FaChevronRight এর প্রতিস্থাপন
const ChevronRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="currentColor">
        <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
    </svg>
);


const CourseCarousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slidesPerView, setSlidesPerView] = useState(1);
    const trackRef = useRef<HTMLDivElement>(null);

    // --- রেসপন্সিভ স্লাইড ভিউ (Responsive slides per view) ---
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

    // --- অটোপ্লে (Autoplay) ---
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prev => {
                const maxIndex = courses.length - slidesPerView;
                if (maxIndex <= 0) return 0;
                return prev < maxIndex ? prev + 1 : 0;
            });
        }, 3500); // 3.5 সেকেন্ডে একবার স্লাইড পরিবর্তন
        return () => clearInterval(interval);
    }, [slidesPerView]);

    // --- নেভিগেশন লজিক (Navigation Logic) ---
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

    // --- পেজিনেশন (Pagination) ---
    const totalPages = Math.ceil(courses.length / slidesPerView);
    const currentPageIndex = Math.floor(currentIndex / slidesPerView);

    return (
        <section className="py-12 bg-white sm:py-16 h-400px md:min-h-screen font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* হেডার (Header) */}
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-10 sm:mb-16 tracking-tight flex justify-center items-center">
                    {/* FaGraduationCap এর প্রতিস্থাপন */}

                    আমাদের জনপ্রিয় কোর্সসমূহ
                </h2>

                <div className="relative">
                    {/* ক্যারোসেল উইন্ডো (Carousel Window) */}
                    <div className="relative overflow-hidden  ">
                        <div
                            ref={trackRef}
                            className="flex transition-transform duration-700 ease-in-out"
                            style={{
                                // স্লাইড ট্র্যাক ট্রান্সফর্ম
                                transform: `translateX(-${(100 / courses.length) * currentIndex}%)`,
                                width: `${(100 / slidesPerView) * courses.length}%`,
                            }}
                        >
                            {courses.map((course, index) => (
                                <div
                                    key={index}
                                    className="p-2"
                                    style={{
                                        // প্রতিটি কার্ডের প্রস্থ নির্ধারণ
                                        width: `${(100 / courses.length) * slidesPerView}%`
                                    }}
                                >
                                    <a
                                        href={course.to}
                                        className="block h-full rounded-xl overflow-hidden shadow-lg transition-all duration-300  group border-2 border-transparent hover:border-green-500 hover:shadow-2xl hover:scale-[1.01]"
                                    >
                                        {/* ইমেজ সেকশন */}
                                        <div className="relative h-48 sm:h-56 overflow-hidden">
                                            <img
                                                src={course.image}
                                                alt={course.titleEn}
                                                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                                                // ইমেজ লোড না হলে প্লেসহোল্ডার দেখানো
                                                onError={e => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/CCCCCC/333333?text=Image+Missing' }}
                                            />
                                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300"></div>

                                            {/* ব্যাজ */}
                                            <div className="absolute top-0 left-0 p-4">
                                                <span className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md inline-block">
                                                    {course.badge}
                                                </span>
                                            </div>

                                            {/* MNI (মক নোটেশন) */}
                                            <div className="absolute bottom-0 right-0 p-4">
                                                <span className="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded-lg">
                                                    MNI
                                                </span>
                                            </div>
                                        </div>

                                        {/* কন্টেন্ট সেকশন */}
                                        <div className="p-4 sm:p-5 relative z-10">
                                            <h3 className="text-lg font-extrabold text-gray-800 transition-colors duration-200 group-hover:text-green-700 mb-1 leading-snug">
                                                {course.titleEn}
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-2 min-h-[40px] flex items-center">
                                                {course.titleBn}
                                            </p>

                                            {/* বিস্তারিত দেখুন বাটন */}
                                            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                                                <span className="flex items-center text-green-600 font-bold text-sm group-hover:text-green-700 transition-all duration-300 transform group-hover:translate-x-1">
                                                    বিস্তারিত দেখুন
                                                    {/* FaArrowRight এর প্রতিস্থাপন */}
                                                    <ArrowRightIcon className="ml-2 text-sm transition-transform duration-300 w-4 h-4" />
                                                </span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* নেভিগেশন বাটন (Navigation Buttons) */}
                    {courses.length > slidesPerView && (
                        <>
                            <button
                                onClick={prevSlide}
                                className="hidden lg:flex absolute top-1/2 -left-6 transform -translate-y-1/2 bg-white text-green-600 border border-gray-300 hover:bg-green-600 hover:text-white transition-all duration-300 p-4 rounded-full shadow-xl z-20 disabled:opacity-50"
                                aria-label="Previous slide"
                                disabled={currentIndex === 0}
                            >
                                {/* FaChevronLeft এর প্রতিস্থাপন */}
                                <ChevronLeftIcon className="w-5 h-5" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="hidden lg:flex absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white text-green-600 border border-gray-300 hover:bg-green-600 hover:text-white transition-all duration-300 p-4 rounded-full shadow-xl z-20 disabled:opacity-50"
                                aria-label="Next slide"
                                disabled={currentIndex >= courses.length - slidesPerView}
                            >
                                {/* FaChevronRight এর প্রতিস্থাপন */}
                                <ChevronRightIcon className="w-5 h-5" />
                            </button>
                        </>
                    )}

                    {/* ডট পেজিনেশন (Dots Pagination) */}
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

// এই কম্পোনেন্টটিকে মূল ফাইলে রপ্তানি করা হলো
export default CourseCarousel;