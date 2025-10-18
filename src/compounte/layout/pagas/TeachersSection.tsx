import React, { useState, useRef } from "react";
// Assuming the environment uses React Router for 'Link'
// If using Next.js, this would be 'next/link'
import { Link } from "react-router-dom"; // Changed from "react-router" to "react-router-dom" for standard usage

// --- TYPE DEFINITIONS ---
type TabOption = "teachers" | "courses"; // Renamed "quran" to "courses" for clarity
// Union type for dynamic styling
type TeacherColor = 'blue' | 'purple' | 'emerald';

interface Teacher {
    name: string;
    qualification: string;
    photo: string;
    bio: string;
    audio: string;
    color: TeacherColor; // Added color property for dynamic styling
}

interface Course {
    title: string;
    description: string;
    image: string;
    link?: string;
    to: string;
}
// -------------------------------------------

const InfoTabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabOption>("teachers");

    // Using a Ref to manage currently playing audio element for better control
    const currentAudioRef = useRef<HTMLAudioElement | null>(null);

    // NOTE: External placeholder URLs used as local paths do not work in this environment.
    // Updated Teacher Data with colors
    const teachers: Teacher[] = [
        {
            name: "মোঃ তৌহিদুল ইসলাম",
            qualification: "Certified Quran Tutor",
            photo: "/imgas/3s.jpg",
            bio: "১০+ বছর অভিজ্ঞতা কোরআন তাজওয়ীদ শেখানোর ক্ষেত্রে।",
            audio: "/imgas/Aodou/055.mp3",
            color: "blue",
        },
        {
            name: "ফাতিমা খানম",
            qualification: "Senior Islamic Studies Teacher",
            photo: "/imgas/2s.jpg",
            bio: "শিশু ও বড়দের জন্য তাজওয়ীদ এবং হিফজের বিশেষজ্ঞ।",
            audio: "/imgas/Aodou/067.mp3",
            color: "purple",
        },
        {
            name: "মোঃ আব্দুল্লাহ",
            qualification: "Hifz Teacher",
            photo: "/imgas/1s.jpg",
            bio: "পূর্ণ কোরআন মুখস্থ করানোর বিশেষজ্ঞ।",
            audio: "/imgas/Aodou/059.mp3",
            color: "emerald",
        },
    ];

    // --- Course Data (using external placeholders) ---
    const courses: Course[] = [
        {
            title: "তাজওয়ীদ কোর্স (Tajweed)",
            to: "/TajweedFullPage",
            description: "কোরআনের সঠিক উচ্চারণ ও নিয়মাবলী শিখুন। মাখরাজ এবং সিফাতের বিস্তারিত আলোচনা।",
            image: "https://placehold.co/400x250/10B981/FFFFFF?text=Tajweed+Course",
            link: "#tajweed-details",
        },
        {
            title: "হিফজ কোর্স (Hifz)",
            to: "/HifzCourse",
            description: "পূর্ণ কোরআন মুখস্থ করার জন্য একটি কাঠামোবদ্ধ এবং কার্যকর গাইডলাইন।",
            image: "https://placehold.co/400x250/059669/FFFFFF?text=Hifz+Course",
            link: "#hifz-details",
        },
        {
            title: "কোরআন রিসাইটেশন (Recitation)",
            to: "/Recitation",
            description: "সুন্দর ও শ্রুতিমধুর তেলাওয়াতের জন্য অনুশীলনী এবং ভুল সংশোধন।",
            image: "https://placehold.co/400x250/065F46/FFFFFF?text=Recitation",
            link: "#recitation-details",
        },
        {
            title: "ইসলামিক ফিকহ (Fiqh)",
            to: "/FiqhSection",
            description: "দৈনন্দিন জীবনে প্রয়োজনীয় ইসলামিক আইন ও বিধিবিধান সম্পর্কে মৌলিক জ্ঞান।",
            image: "https://placehold.co/400x250/047857/FFFFFF?text=Fiqh+Studies",
            link: "#fiqh-details",
        },
    ];

    /**
     * Handles audio playback, pausing any previously playing audio using Ref.
     * @param audioEl The currently playing HTMLAudioElement.
     */
    const handleAudioPlay = (audioEl: HTMLAudioElement) => {
        // Pause and reset the previous audio if it exists and is different from the current one
        if (currentAudioRef.current && currentAudioRef.current !== audioEl) {
            currentAudioRef.current.pause();
            currentAudioRef.current.currentTime = 0;
        }
        // Set the new audio element as the current one
        currentAudioRef.current = audioEl;
    };

    /**
     * Helper function to generate dynamic classes for the active tab.
     * @param tabName The name of the tab button.
     * @returns A string of Tailwind CSS classes.
     */
    const getTabClasses = (tabName: TabOption) =>
        `flex-1 px-4 py-3 text-sm md:text-base font-semibold transition-colors duration-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-200 
         ${activeTab === tabName
            ? "bg-teal-600 text-white shadow-xl shadow-teal-300/50"
            : "text-gray-700 hover:bg-teal-100 hover:text-teal-800"
        }`;

    // Helper function for teacher card background
    const getTeacherBgClasses = (color: TeacherColor) => {
        switch (color) {
            case 'blue': return 'from-blue-50 to-indigo-50 border-blue-100 shadow-blue-500/10';
            case 'purple': return 'from-purple-50 to-pink-50 border-purple-100 shadow-purple-500/10';
            case 'emerald': return 'from-emerald-50 to-green-50 border-emerald-100 shadow-emerald-500/10';
        }
    };


    // --- Helper Component for Course Card ---
    const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
        <div
            className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100 flex flex-col"
        >
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
                <h3 className="text-xl font-bold text-teal-800 mb-2">{course.title}</h3>
                <p className="text-gray-700 flex-grow mb-4 text-sm leading-relaxed">{course.description}</p>

                {/* Use the full Link component for consistent routing */}
                <Link
                    to={course.to}
                    // Added flex-shrink-0 to prevent button from collapsing
                    className="mt-auto flex-shrink-0 inline-block px-5 py-2 text-sm bg-teal-600 text-white rounded-full text-center font-semibold hover:bg-teal-700 transition focus:outline-none focus:ring-4 focus:ring-teal-200 shadow-lg shadow-teal-500/30"
                >
                    কোর্সটি দেখুন
                </Link>
            </div>
        </div>
    );

    // Function to render content for the "courses" tab
    const renderCoursesContent = () => (
        <div id="courses-content" role="tabpanel" aria-labelledby="courses-tab" className="py-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold text-teal-800 mb-4">আমাদের কোরআন ও ইসলামিক কোর্সসমূহ</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    আমরা বয়স ও দক্ষতার ভিত্তিতে বিভিন্ন ধরনের কোর্স অফার করি, যাতে প্রত্যেকেই শিখতে পারে।
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {courses.map((course, idx) => (
                    <CourseCard key={idx} course={course} />
                ))}
            </div>
        </div>
    );

    return (
        <div className="p-4 sm:p-6 md:p-12 max-w-7xl mx-auto font-sans bg-gray-50 min-h-screen">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-teal-800 mb-12">
                আমাদের সম্মানিত শিক্ষকবৃন্দ ও পাঠ্যক্রম
            </h1>

            {/* Tabs UI - Responsive Flex Layout with A11y roles */}
            <div role="tablist" aria-label="Information Categories" className="flex flex-col sm:flex-row justify-center mb-16 p-2 bg-white rounded-2xl shadow-xl max-w-xl mx-auto border border-gray-200">
                <button
                    id="teachers-tab"
                    role="tab"
                    aria-selected={activeTab === "teachers"}
                    aria-controls="teachers-content"
                    className={getTabClasses("teachers")}
                    onClick={() => setActiveTab("teachers")}
                >
                    আমাদের শিক্ষকগণ
                </button>
                <button
                    id="courses-tab"
                    role="tab"
                    aria-selected={activeTab === "courses"}
                    aria-controls="courses-content"
                    className={getTabClasses("courses")}
                    onClick={() => setActiveTab("courses")}
                >
                    কোরআন ক্লাস ও কোর্স
                </button>
            </div>

            {/* Content Area */}
            {activeTab === "teachers" && (
                <div id="teachers-content" role="tabpanel" aria-labelledby="teachers-tab" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
                    {teachers.map((teacher) => (
                        <div
                            key={teacher.name}
                            className={`bg-gradient-to-br p-6 rounded-3xl shadow-2xl transition duration-500 flex flex-col items-start transform hover:scale-[1.03] active:scale-100 ${getTeacherBgClasses(teacher.color)}`}
                        >
                            {/* Teacher Photo */}
                            <img
                                src={teacher.photo}
                                alt={`${teacher.name} এর ছবি`}
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = 'https://placehold.co/224x224/CCCCCC/333333?text=ছবি+পাওয়া+যায়নি';
                                }}
                                className="w-full h-64 object-cover object-top rounded-2xl mb-6 border-4 border-white shadow-lg"
                            />

                            {/* Text Content */}
                            <h3 className="text-2xl font-bold text-gray-900 mt-2">{teacher.name}</h3>
                            <p className="text-teal-700 font-semibold mb-4 text-lg">{teacher.qualification}</p>

                            {/* Bio section */}
                            <p className="text-gray-700 text-base flex-grow leading-relaxed">
                                {teacher.bio}
                            </p>

                            {/* Audio Player */}
                            <div className="mt-8 w-full pt-4 border-t border-gray-200">
                                <p className="text-sm text-gray-600 mb-2 font-medium">শিক্ষকের অডিও বার্তা:</p>
                                <audio
                                    controls
                                    className="w-full bg-teal-200 rounded-full h-10 border border-teal-500"
                                    onPlay={(e) => handleAudioPlay(e.currentTarget)}
                                >
                                    <source src={teacher.audio} type="audio/mpeg" />
                                    আপনার ব্রাউজার অডিও প্লে সমর্থন করছে না।
                                </audio>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === "courses" && renderCoursesContent()}
        </div>
    );
};

export default InfoTabs;

