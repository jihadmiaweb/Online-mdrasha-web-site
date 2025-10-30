import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaBookReader } from "react-icons/fa"; // Added FaBookReader for the CTA

function BannerCarousel() {
    const slides = [
        {
            image: "/imgas/1.jpg",
            title: "Enhance Your Islamic Knowledge with Madrasatu Nuurul 'Ilm",
            subtitle: "Discover the best online Islamic institute, dedicated to providing accessible and authentic Islamic education for all ages. Join us today to strengthen your faith and knowledge with expert guidance.",
            buttonText: "START FREE CLASS",
        },
        {
            image: "/imgas/2.jpg",
            title: "Learn Quran & Islamic Studies Online from Certified Scholars",
            subtitle: "Our qualified Hafiz, Mu'allim, and Mu'allima instructors offer personalized, interactive classes tailored to your pace. Flexible scheduling fits any busy lifestyle.",
            buttonText: "VIEW COURSES",
        },
        {
            image: "/imgas/korane (2).jpg",
            title: "Accessible Islamic Education for the Global Muslim Community",
            subtitle: "Study from anywhere in the world. We bridge the gap for expatriates and families seeking authentic religious teachings in a modern, engaging environment.",
            buttonText: "CONTACT US",
        },
        {
            image: "/imgas/korane (2).jpg",
            title: "Expert Tutors, Flexible Timings, Affordable Tuition",
            subtitle: "Get high-quality, accredited Islamic education without compromise. Invest in your spiritual growth with our top-rated online programs.",
            buttonText: "ENROLL NOW",
        },
        {
            image: "/imgas/korane (1).jpg",
            title: "Master Tajweed, Hifz, and Arabic Language from Home",
            subtitle: "Our structured curriculum ensures comprehensive learning, whether you're a beginner or seeking advanced specialization in Islamic sciences.",
            buttonText: "LEARN MORE",
        },
    ];

    const [current, setCurrent] = useState(0);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prevSlide = () =>
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    // Auto slide
    useEffect(() => {
        const timer = setInterval(nextSlide, 4000);
        return () => clearInterval(timer);
    }, []);

    // Function to handle CTA click (placeholder)
    const handleCTAClick = () => {
        console.log("CTA clicked for slide:", slides[current].title);
        alert("Redirecting to enrollment page...");
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-gray-900">
            {/* Slides Container */}
            <div
                className="flex transition-transform duration-700 ease-in-out h-full"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className="w-full flex-shrink-0 relative h-screen group overflow-hidden"
                    >
                        {/* Image with Dynamic Zoom Effect on Hover */}
                        <img
                            // Note: Corrected some image paths for consistency, assuming /imgas/ is the correct directory
                            src={slide.image.includes('/') ? slide.image : `/imgas/${slide.image}`}
                            alt={slide.title}
                            // Added filter for better text readability against the image
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 filter brightness-90"
                        />

                        {/* Gradient Overlay for Text Contrast */}
                        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-all duration-500"></div>

                        {/* Text and CTA Content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5 sm:px-10 text-white">
                            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 max-w-4xl tracking-tight leading-tight">
                                {slide.title}
                            </h1>
                            <p className="text-base sm:text-lg md:text-xl max-w-3xl mb-8 font-light">
                                {slide.subtitle}
                            </p>

                            {/* Call to Action Button */}
                            <button
                                onClick={handleCTAClick}
                                className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white font-semibold text-lg rounded-full shadow-lg hover:bg-green-700 hover:shadow-xl transform hover:scale-105 transition duration-300"
                            >
                                <FaBookReader className="text-xl" />
                                {slide.buttonText}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Buttons (Slightly improved styling) */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 p-3 sm:p-4 bg-black/40 hover:bg-black/70 text-white rounded-full z-20 transition-all focus:outline-none"
                aria-label="Previous slide"
            >
                <FaChevronLeft className="text-lg sm:text-xl" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 p-3 sm:p-4 bg-black/40 hover:bg-black/70 text-white rounded-full z-20 transition-all focus:outline-none"
                aria-label="Next slide"
            >
                <FaChevronRight className="text-lg sm:text-xl" />
            </button>

            {/* Dots Pagination (Improved positioning and active indicator) */}
            <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 flex justify-center gap-3 z-20">
                {slides.map((_, index) => (
                    <span
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`h-3 w-3 rounded-full cursor-pointer transition-all duration-300 ${index === current
                            ? "bg-green-500 scale-125 ring-2 ring-white"
                            : "bg-white/70 hover:bg-white ring-1 ring-white/50"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    ></span>
                ))}
            </div>
        </div>
    );
}

export default BannerCarousel;