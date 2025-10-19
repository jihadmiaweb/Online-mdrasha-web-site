import React from "react";
import { Link } from "react-router-dom";

// --- কোর্স টাইপ ডেফিনেশন ---
export interface Course {
    title: string;
    description: string;
    image: string;
    link?: string;
    to: string;
}

// --- উদাহরণ ডেটা ---
const defaultCourses: Course[] = [
    {
        title: "তাজওয়ীদ কোর্স (Tajweed)",
        to: "/TajweedFullPage",
        description:
            "কোরআনের সঠিক উচ্চারণ ও নিয়মাবলী শিখুন। মাখরাজ এবং সিফাতের বিস্তারিত আলোচনা।",
        image: "https://placehold.co/400x250/10B981/FFFFFF?text=Tajweed+Course",
    },
    {
        title: "হিফজ কোর্স (Hifz)",
        to: "/HifzCourse",
        description:
            "পূর্ণ কোরআন মুখস্থ করার জন্য একটি কাঠামোবদ্ধ এবং কার্যকর গাইডলাইন।",
        image: "https://placehold.co/400x250/059669/FFFFFF?text=Hifz+Course",
    },
    {
        title: "কোরআন রিসাইটেশন (Recitation)",
        to: "/Recitation",
        description:
            "সুন্দর ও শ্রুতিমধুর তেলাওয়াতের জন্য অনুশীলনী এবং ভুল সংশোধন।",
        image: "https://placehold.co/400x250/065F46/FFFFFF?text=Recitation",
    },
    {
        title: "ইসলামিক ফিকহ (Fiqh)",
        to: "/FiqhSection",
        description:
            "দৈনন্দিন জীবনে প্রয়োজনীয় ইসলামিক আইন ও বিধিবিধান সম্পর্কে মৌলিক জ্ঞান।",
        image: "https://placehold.co/400x250/047857/FFFFFF?text=Fiqh+Studies",
    },
];

// --- কম্পোনেন্ট প্রপ টাইপ (Prop Type) ---
// FIX: The 'courses' prop is made optional with '?' to allow using the default value.
interface CoursesTabProps {
    courses?: Course[];
}

// --- প্রধান কম্পোনেন্ট ---
const CoursesTab: React.FC<CoursesTabProps> = ({ courses = defaultCourses }) => {

    // Course Card Sub-Component (No changes needed, already responsive)
    const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
        <div className="bg-white rounded-2xl shadow-xl px-2 hover:shadow-2xl transition duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100 flex flex-col">
            <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                        "https://placehold.co/400x250/CCCCCC/333333?text=ছবি+পাওয়া+যায়নি";
                }}
            />
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-teal-800 mb-2">
                    {course.title}
                </h3>
                <p className="text-gray-700 flex-grow mb-4 text-sm leading-relaxed">
                    {course.description}
                </p>
                <Link
                    to={course.to}
                    className="mt-auto inline-block px-5 py-2 text-sm bg-teal-600 text-white rounded-full text-center font-semibold hover:bg-teal-700 transition focus:outline-none focus:ring-4 focus:ring-teal-200 shadow-lg shadow-teal-500/30"
                >
                    কোর্সটি দেখুন
                </Link>
            </div>
        </div>
    );

    return (
        <div
            id="courses-content"
            role="tabpanel"
            aria-labelledby="courses-tab"
            className="py-8"
        >
            <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold text-teal-800 mb-4">
                    আমাদের কোরআন ও ইসলামিক কোর্সসমূহ
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    আমরা বয়স ও দক্ষতার ভিত্তিতে বিভিন্ন ধরনের কোর্স অফার করি, যাতে
                    প্রত্যেকেই শিখতে পারে।
                </p>
            </div>

            {/* ⭐️ RESPONSIVE GRID LAYOUT ⭐️
            - Mobile (Default): grid-cols-1
            - Small screens (sm): sm:grid-cols-2 (2 columns)
            - Large screens (lg): lg:grid-cols-4 (4 columns)
            */}
            <div className="grid grid-cols-1  sm:grid-cols-2 md:px-5 md:grid-cols-4 gap-8">
                {courses.map((course) => (
                    // Refinement: Using course.title as key for better stability
                    <CourseCard key={course.title} course={course} />
                ))}
            </div>
        </div>
    );
};

export default CoursesTab;