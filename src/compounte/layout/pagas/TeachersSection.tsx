


import React, { useRef } from "react";

// --- TYPE DEFINITIONS ---
export type TeacherColor = "blue" | "purple" | "emerald";

export interface Teacher {
    name: string;
    qualification: string;
    photo: string;
    bio: string;
    audio: string;
    color: TeacherColor;
}

// Props interface — এখানে কেবল টাইপ থাকবে, ডেটা না
interface TeachersTabProps {
    teachers: Teacher[]; // শিক্ষক তালিকা
}

// --- ডিফল্ট শিক্ষক ডেটা (এখানে ডেটা থাকবে) ---
const defaultTeachers: Teacher[] = [
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

// --- UTILITY FUNCTION ---
const getTeacherBgClasses = (color: TeacherColor): string => {
    switch (color) {
        case "blue":
            return "from-blue-50 to-indigo-50 border-blue-100 shadow-blue-500/10";
        case "purple":
            return "from-purple-50 to-pink-50 border-purple-100 shadow-purple-500/10";
        case "emerald":
            return "from-emerald-50 to-green-50 border-emerald-100 shadow-emerald-500/10";
        default:
            return "";
    }
};

// --- TEACHERS TAB COMPONENT ---
const TeachersTab: React.FC<Partial<TeachersTabProps>> = ({ teachers = defaultTeachers }) => {
    const currentAudioRef = useRef<HTMLAudioElement | null>(null);

    // একসাথে শুধু একটি অডিও চালানোর লজিক
    const handleAudioPlay = (audioEl: HTMLAudioElement) => {
        if (currentAudioRef.current && currentAudioRef.current !== audioEl) {
            currentAudioRef.current.pause();
            currentAudioRef.current.currentTime = 0;
        }
        currentAudioRef.current = audioEl;
    };

    return (
        <div
            id="teachers-content"
            role="tabpanel"
            aria-labelledby="teachers-tab"
            className="grid pb-5 bg-white grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4"
        >
            {teachers.map((teacher) => (
                <div
                    key={teacher.name}
                    className={`bg-gradient-to-br p-6 rounded-3xl shadow-2xl transition duration-500 flex flex-col items-start transform hover:scale-[1.03] active:scale-100 ${getTeacherBgClasses(
                        teacher.color
                    )}`}
                >
                    <img
                        src={teacher.photo}
                        alt={`${teacher.name} এর ছবি`}
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src =
                                "https://placehold.co/224x224/CCCCCC/333333?text=ছবি+পাওয়া+যায়নি";
                        }}
                        className="w-full h-64 object-cover object-top rounded-2xl mb-6 border-4 border-white shadow-lg"
                    />
                    <h3 className="text-2xl font-bold text-gray-900 mt-2">
                        {teacher.name}
                    </h3>
                    <p className="text-teal-700 font-semibold mb-4 text-lg">
                        {teacher.qualification}
                    </p>
                    <p className="text-gray-700 text-base flex-grow leading-relaxed">
                        {teacher.bio}
                    </p>
                    <div className="mt-8 w-full pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600 mb-2 font-medium">
                            শিক্ষকের অডিও বার্তা:
                        </p>
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
    );
};

export default TeachersTab;
