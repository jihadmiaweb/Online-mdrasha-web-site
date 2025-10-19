import React, { useState, useEffect } from "react";
import { Clock, CalendarCheck, BookOpen, HeartHandshake, Footprints, ChevronRight, Home } from 'lucide-react';

// Icon mapping for dynamic rendering
// এখানে ব্যবহৃত Lucide আইকনগুলো কার্ডের বিষয়বস্তু ফুটিয়ে তুলতে সাহায্য করবে।
const IconMap = {
    Clock: Clock,
    CalendarCheck: CalendarCheck,
    BookOpen: BookOpen,
    HeartHandshake: HeartHandshake,
    Footprints: Footprints
};

// Course Step Interface
interface SalahStep {
    id: number;
    title: string;
    description: string;
    icon: keyof typeof IconMap;
}

// Mock Course Content (Bangla)
const salahSteps: SalahStep[] = [
    {
        id: 1,
        title: "নিয়মিত নামাজ পড়ার গুরুত্ব",
        description: "নিয়মিত নামাজ মুসলিম জীবনের ভিত্তি। এর মাধ্যমে আমরা আল্লাহর সাথে সম্পর্ক দৃঢ় করি এবং আত্মিক শান্তি লাভ করি।",
        icon: "Clock",
    },
    {
        id: 2,
        title: "নামাজের সময় ও নিয়মাবলী",
        description: "নামাজের সঠিক সময় (ওয়াক্ত) এবং তা আদায়ের শরীয়তসম্মত নিয়মাবলী জানলে তা শুদ্ধভাবে আদায় করা যায়।",
        icon: "CalendarCheck",
    },
    {
        id: 3,
        title: "ফরজ ও সুন্নত নামাজ",
        description: "ফরজ (বাধ্যতামূলক) এবং সুন্নত (নিয়মিত অনুসরণীয়) নামাজের পার্থক্য এবং তার পালন পদ্ধতি সম্পর্কে বিস্তারিত জ্ঞান।",
        icon: "BookOpen",
    },
    {
        id: 4,
        title: "ওয়াজিব ও নফল নামাজ",
        description: "ওয়াজিব এবং নফল (ঐচ্ছিক) নামাজের গুরুত্ব ও তার বিধি। বিশেষ নফল নামাজের নিয়ম ও ফযীলত।",
        icon: "HeartHandshake",
    },
    {
        id: 5,
        title: "নামাজের রুকনসমূহ অনুসরণ",
        description: "সঠিকভাবে রুকু, সিজদা এবং তাশাহুদসহ নামাজের প্রতিটি রুকন ও ওয়াজিব (পদক্ষেপ) সঠিকভাবে শেখা ও অনুশীলন।",
        icon: "Footprints",
    },
];

// Single Step Card Component with Staggered Entrance Simulation
const StepCard: React.FC<{ step: SalahStep, index: number }> = ({ step, index }) => {
    const IconComponent = IconMap[step.icon];
    const [isVisible, setIsVisible] = useState(false);

    // Intersection Observer to simulate Framer Motion's whileInView and staggered effect
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Staggered effect using index and setTimeout
                    setTimeout(() => {
                        setIsVisible(true);
                    }, index * 150); // 150ms delay per item
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1, // Trigger when 10% of the card is visible
            }
        );

        const target = document.getElementById(`step-${step.id}`);
        if (target) {
            observer.observe(target);
        }

        return () => {
            if (target) observer.unobserve(target);
        };
    }, [index, step.id]);

    // CSS class to control visibility and transformation
    const transitionClasses = isVisible
        ? 'opacity-100 translate-y-0 scale-100'
        : 'opacity-0 translate-y-10 scale-95';

    return (
        <div
            id={`step-${step.id}`}
            className={`bg-white rounded-2xl shadow-xl p-6 transition-all duration-700 ease-out 
                        hover:shadow-2xl hover:border-yellow-500 border-b-4 border-white cursor-pointer 
                        ${transitionClasses} 
                        hover:scale-[1.02]`}
        >
            <div className="flex items-start space-x-4 mb-3">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-700 flex-shrink-0">
                    {IconComponent && <IconComponent className="w-6 h-6" />}
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 pt-1 leading-snug">{step.title}</h2>
            </div>
            {/* Description starts below the icon/title line, aligned with the title text */}
            <p className="text-gray-600 pl-0 sm:pl-[52px] text-base leading-relaxed">{step.description}</p>
        </div>
    );
};


const PerfectSalahCourse: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Header Section */}
            <div className="bg-yellow-50 pt-8 pb-16 shadow-inner border-b-4 border-yellow-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="flex text-sm text-yellow-600 mb-6" aria-label="Breadcrumb">
                        <a href="#" className="hover:text-yellow-800 flex items-center transition">
                            <Home className="w-4 h-4 mr-1" /> হোম
                        </a>
                        <ChevronRight className="w-4 h-4 mx-1.5 text-gray-400" />
                        <a href="#" className="hover:text-yellow-800 transition">কোর্সসমূহ</a>
                        <ChevronRight className="w-4 h-4 mx-1.5 text-gray-400" />
                        <span className="font-medium text-gray-500">সালাহ কোর্স</span>
                    </nav>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-yellow-800 text-center mb-4 leading-tight">
                        অনলাইন পারফেক্ট সালাহ শিক্ষা কোর্স
                    </h1>
                    <p className="text-center text-lg md:text-xl text-yellow-700 font-medium max-w-3xl mx-auto">
                        সহজ ও সঠিক পদ্ধতিতে নামাজ বা সালাহ আদায়ের প্রতিটি ধাপ ধাপে ধাপে শিখুন।
                    </p>
                </div>
            </div>

            {/* Main Content (Course Modules) */}
            <div className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-10 text-center border-b-2 border-yellow-300 pb-3">
                        কোর্স মডিউলসমূহ
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                        {salahSteps.map((step, index) => (
                            <StepCard key={step.id} step={step} index={index} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Call to Action Section */}
            <div className="bg-yellow-800 py-12">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h3 className="text-3xl font-extrabold text-white mb-4">আজই আপনার যাত্রা শুরু করুন</h3>
                    <p className="text-yellow-100 mb-6 text-lg">
                        বিশুদ্ধভাবে নামাজ শেখার এই সুযোগ হাতছাড়া করবেন না। এখনই আমাদের কোর্সে ভর্তি হোন।
                    </p>
                    <button className="bg-white text-yellow-800 font-bold py-3 px-8 rounded-full shadow-lg 
                                       hover:bg-yellow-100 transition duration-300 transform hover:scale-105 ring-4 ring-yellow-300/50">
                        কোর্সে এনরোল করুন
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PerfectSalahCourse;
