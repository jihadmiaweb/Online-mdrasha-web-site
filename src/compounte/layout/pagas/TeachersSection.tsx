import React, { useState } from "react";

// --- TYPE DEFINITIONS ---
type TabOption = "teachers" | "quran";

interface Teacher {
    name: string;
    qualification: string;
    photo: string;
    bio: string;
    audio: string;
}

interface Course {
    title: string;
    description: string;
    image: string;
    link?: string;
}
// -------------------------------------------

const InfoTabs: React.FC = () => {
    // State is typed as TabOption, which is the union "teachers" | "quran"
    const [activeTab, setActiveTab] = useState<TabOption>("teachers");
    const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

    // NOTE: Local file paths like "/imgas/3s.jpg" do not work in this environment.
    // Reverting to external placeholder URLs for functional image and audio display.

    const teachers: Teacher[] = [
        {
            name: "মোঃ তৌহিদুল ইসলাম",
            qualification: "Certified Quran Tutor",
            photo: "/imgas/3s.jpg",
            bio: "১০+ বছর অভিজ্ঞতা কোরআন তাজওয়ীদ শেখানোর ক্ষেত্রে।",
            audio: "/imgas/Aodou/055.mp3",
        },
        {
            name: "ফাতিমা খানম",
            qualification: "Senior Islamic Studies Teacher",
            photo: "/imgas/2s.jpg",
            bio: "শিশু ও বড়দের জন্য তাজওয়ীদ এবং হিফজের বিশেষজ্ঞ।",
            audio: "/imgas/Aodou/067.mp3",
        },
        {
            name: "মোঃ আব্দুল্লাহ",
            qualification: "Hifz Teacher",
            photo: "/imgas/1s.jpg",
            bio: "পূর্ণ কোরআন মুখস্থ করানোর বিশেষজ্ঞ।",
            audio: "/imgas/Aodou/059.mp3",
        },
    ];

    // --- Course Data (using external placeholders) ---
    const courses: Course[] = [
        {
            title: "তাজওয়ীদ কোর্স (Tajweed)",
            description: "কোরআনের সঠিক উচ্চারণ ও নিয়মাবলী শিখুন। মাখরাজ এবং সিফাতের বিস্তারিত আলোচনা।",
            image: "https://placehold.co/400x250/10B981/FFFFFF?text=Tajweed+Course",
            link: "#tajweed-details",
        },
        {
            title: "হিফজ কোর্স (Hifz)",
            description: "পূর্ণ কোরআন মুখস্থ করার জন্য একটি কাঠামোবদ্ধ এবং কার্যকর গাইডলাইন।",
            image: "https://placehold.co/400x250/059669/FFFFFF?text=Hifz+Course",
            link: "#hifz-details",
        },
        {
            title: "কোরআন রিসাইটেশন (Recitation)",
            description: "সুন্দর ও শ্রুতিমধুর তেলাওয়াতের জন্য অনুশীলনী এবং ভুল সংশোধন।",
            image: "https://placehold.co/400x250/065F46/FFFFFF?text=Recitation",
            link: "#recitation-details",
        },
        {
            title: "ইসলামিক ফিকহ (Fiqh)",
            description: "দৈনন্দিন জীবনে প্রয়োজনীয় ইসলামিক আইন ও বিধিবিধান সম্পর্কে মৌলিক জ্ঞান।",
            image: "https://placehold.co/400x250/047857/FFFFFF?text=Fiqh+Studies",
            link: "#fiqh-details",
        },
    ];

    /**
     * Handles audio playback, pausing any previously playing audio.
     * @param audioEl The currently playing HTMLAudioElement.
     */
    const handleAudioPlay = (audioEl: HTMLAudioElement) => {
        // Pause and reset the previous audio if it's different from the current one
        if (currentAudio && currentAudio !== audioEl) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        setCurrentAudio(audioEl);
    };

    /**
     * Helper function to generate dynamic classes for the active tab.
     * @param tabName The name of the tab button.
     * @returns A string of Tailwind CSS classes.
     */
    const getTabClasses = (tabName: TabOption) =>
        `flex-1 px-4 py-3 text-sm md:text-base font-semibold transition-colors duration-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-200 
         ${activeTab === tabName
            ? "bg-teal-600 text-white shadow-xl"
            : "text-gray-700 hover:bg-teal-100 hover:text-teal-800"
        }`;

    // --- Helper Component for Course Card ---
    const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
        <div
            className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100 flex flex-col"
        >
            <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                        "https://placehold.co/300x200/CCCCCC/333333?text=ছবি+পাওয়া+যায়নি";
                }}
            />
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-teal-800 mb-2">{course.title}</h3>
                <p className="text-gray-700 flex-grow mb-4">{course.description}</p>
                {course.link && (
                    <a
                        href={course.link}
                        className="mt-auto inline-block px-5 py-2 text-sm bg-teal-600 text-white rounded-xl text-center font-semibold hover:bg-teal-700 transition focus:outline-none focus:ring-4 focus:ring-teal-200 shadow-md"
                    >
                        কোর্সটি দেখুন
                    </a>
                )}
            </div>
        </div>
    );

    // Function to render content for the "quran" tab (now showing courses)
    const renderQuranContent = () => (
        <div id="quran-content" role="tabpanel" aria-labelledby="quran-tab" className="py-8">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-extrabold text-teal-800 mb-3">আমাদের কোরআন ও ইসলামিক কোর্সসমূহ</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    আমরা বয়স ও দক্ষতার ভিত্তিতে বিভিন্ন ধরনের কোর্স অফার করি, যাতে প্রত্যেকেই শিখতে পারে।
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {courses.map((course, idx) => (
                    <CourseCard key={idx} course={course} />
                ))}
            </div>
        </div>
    );

    return (
        <div className="p-4 sm:p-6 md:p-10 max-w-7xl mx-auto font-sans bg-gray-50 min-h-screen">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-teal-800 mb-12 border-b-2 border-teal-200 pb-4">
                আমাদের সম্মানিত শিক্ষকবৃন্দ ও পাঠ্যক্রম
            </h1>

            {/* Tabs UI - Responsive Flex Layout with A11y roles */}
            <div role="tablist" aria-label="Information Categories" className="flex justify-center mb-12 p-1 bg-white rounded-xl shadow-lg max-w-lg mx-auto border border-gray-200">
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
                    id="quran-tab"
                    role="tab"
                    aria-selected={activeTab === "quran"}
                    aria-controls="quran-content"
                    className={getTabClasses("quran")}
                    onClick={() => setActiveTab("quran")}
                >
                    কোরআন ক্লাস
                </button>
            </div>

            {/* Content Area */}
            {activeTab === "teachers" && (
                <div id="teachers-content" role="tabpanel" aria-labelledby="teachers-tab" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teachers.map((teacher) => (
                        <div
                            key={teacher.name}
                            className="bg-white border border-gray-200 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition duration-500 flex flex-col items-start transform hover:scale-[1.02] active:scale-100"
                        >
                            <img
                                src={teacher.photo}
                                alt={`${teacher.name} এর ছবি`}
                                // Fallback for image loading error
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = 'https://placehold.co/224x224/CCCCCC/333333?text=ছবি+পাওয়া+যায়নি';
                                }}
                                className="w-full h-56 object-cover rounded-2xl mb-6 border-4 border-teal-300 shadow-md"
                            />
                            <h3 className="text-2xl font-bold text-gray-900 mt-2">{teacher.name}</h3>
                            <p className="text-teal-600 font-semibold mb-4 text-lg">{teacher.qualification}</p>

                            {/* Bio section */}
                            <p className="text-gray-700 mt-2 text-base flex-grow leading-relaxed">
                                {teacher.bio}
                            </p>

                            {/* Audio Player */}
                            <div className="mt-6 w-full pt-4 border-t border-gray-100">
                                <p className="text-sm text-gray-500 mb-2">শুনুন শিক্ষকের বার্তা:</p>
                                <audio
                                    controls
                                    className="w-full bg-teal-100 rounded-full h-10 border border-teal-400"
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

            {activeTab === "quran" && renderQuranContent()}
        </div>
    );
};

export default InfoTabs;

