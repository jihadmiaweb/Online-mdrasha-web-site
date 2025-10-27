import React, { useMemo, useState, useCallback } from "react";

// --- SVG Icons (Type-Safe & Reusable) ---
interface IconProps extends React.SVGAttributes<SVGSVGElement> {
    size?: number;
    color?: string;
}

const SearchIcon: React.FC<IconProps> = ({
    size = 20,
    color = "currentColor",
    ...props
}) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

const CloseIcon: React.FC<IconProps> = ({
    size = 24,
    color = "currentColor",
    ...props
}) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

// --- Type Definitions ---
export interface Scholar {
    id: string;
    name_en: string;
    name_bn?: string;
    title?: string;
    qualification?: string;
    specialties?: string[];
    bio?: string;
    photo?: string;
    contact?: string;
}

// --- Sample Data ---
const SAMPLE_SCHOLARS: Scholar[] = [
    {
        id: "s1",
        name_en: "Ahmad Hasan",
        name_bn: "মুফতি আহমদ হাসান",
        title: "Mufti",
        qualification: "B.A. (Hons), M.A. Islamic Studies",
        specialties: ["Fiqh", "Fatwa", "Aqeedah"],
        bio: "মুফতি আহমদ হাসান দীর্ঘদিন ইসলামী রাজনীতি ও ফিকহ বিষয়ে গবেষণা করে আসছেন। Mufti Ahmad Hasan has researched Islamic politics and Fiqh for a long time.",
        photo: "/imgas/Qualified-Islamic-Scholars/download(2).jpeg",
        contact: "ahmad.h@example.com",
    },
    {
        id: "s2",
        name_en: "Ibrahim Al-Tayyib",
        name_bn: "শায়খ ইব্রাহীম আল-ট্টাইয়্যিব",
        title: "Shaykh",
        qualification: "Dars-e-Nizami",
        specialties: ["Tafsir", "Hadith", "Seerah"],
        bio: "শায়খ ইব্রাহীম সারা জীবন কোরআন ও হাদিসের অনুবাদ ও তাফসীর অধ্যয়ন করেছেন এবং ছাত্র-ছাত্রীদের গাইড করেন।",
        photo: "/imgas/Qualified-Islamic-Scholars/download.jpeg",
        contact: "i.tayyib@example.com",
    },
    {
        id: "s3",
        name_en: "Ayesha Karim",
        name_bn: "ডঃ আয়েশা করিম",
        title: "Dr.",
        qualification: "PhD Islamic Studies",
        specialties: ["Islamic History", "Women in Islam", "Tarbiya"],
        bio: "ডঃ আয়েশা ইসলামী ইতিহাস ও নারীর সমাজে ইসলামের ভূমিকা নিয়ে লিখেছেন।",
        photo: "/imgas/Qualified-Islamic-Scholars/download (1).jpeg",
        contact: "ayesha.k@example.com",
    },
    {
        id: "s4",
        name_en: "Junaid Khan",
        name_bn: "উস্তাদ জুনায়েদ খান",
        title: "Ustad",
        qualification: "Ijaza in Quran Recitation",
        specialties: ["Tajweed", "Quran Recitation", "Hifz"],
        bio: "উস্তাদ জুনায়েদ কিরাত ও তাজবীদের ক্ষেত্রে বিশেষ ভূমিকা পালন করেছেন।",
        photo: "/imgas/Qualified-Islamic-Scholars/download(3).jpeg",
        contact: "junaid.k@example.com",
    },
];

// --- Scholar Modal ---
interface ScholarModalProps {
    scholar: Scholar;
    onClose: () => void;
}

const ScholarModal: React.FC<ScholarModalProps> = ({ scholar, onClose }) => {
    const [contactStatus, setContactStatus] = useState<"idle" | "logging">("idle");

    const handleContact = useCallback(() => {
        setContactStatus("logging");
        console.log(`[CONTACT INITIATED] Scholar ID: ${scholar.id}, Contact: ${scholar.contact}`);
        setTimeout(() => setContactStatus("idle"), 3000);
    }, [scholar]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative max-w-2xl w-full bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-6 md:p-8 text-gray-900 dark:text-gray-100"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 dark:hover:text-white transition p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                    <CloseIcon />
                </button>

                <div className="flex flex-col md:flex-row items-center gap-6">
                    <img
                        src={scholar.photo}
                        alt={scholar.name_en}
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = `https://placehold.co/400x400/4F46E5/FFFFFF?text=${scholar.title}`;
                        }}
                        className="w-24 h-24 rounded-full object-cover border-4 border-indigo-100 dark:border-indigo-800"
                    />
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-2xl font-bold">{scholar.name_bn}</h2>
                        <p className="text-lg text-indigo-600 dark:text-indigo-400 font-semibold">
                            {scholar.title} {scholar.name_en}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {scholar.qualification}
                        </p>
                    </div>
                </div>

                <hr className="my-5 border-gray-200 dark:border-gray-700" />

                <div className="text-sm space-y-4">
                    <p className="leading-relaxed">{scholar.bio}</p>

                    <div>
                        <h3 className="font-semibold mb-1">Areas of Expertise</h3>
                        <div className="flex flex-wrap gap-2">
                            {scholar.specialties?.map((sp) => (
                                <span
                                    key={sp}
                                    className="text-xs px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-800/40 text-indigo-700 dark:text-indigo-300 font-medium border border-indigo-200 dark:border-indigo-700"
                                >
                                    {sp}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={handleContact}
                            disabled={contactStatus === "logging"}
                            className={`flex-1 px-4 py-2 rounded-lg text-white font-semibold transition ${contactStatus === "logging"
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-teal-600 hover:bg-teal-700 active:bg-teal-800"
                                }`}
                        >
                            {contactStatus === "logging"
                                ? "Contact Logged (Check Console)"
                                : "Contact Scholar"}
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                        >
                            Back to Directory
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Main Component ---
const QualifiedScholars: React.FC = () => {
    const [query, setQuery] = useState("");
    const [specialtyFilter, setSpecialtyFilter] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<"name" | "qualification">("name");
    const [selected, setSelected] = useState<Scholar | null>(null);

    const scholars = SAMPLE_SCHOLARS;

    const allSpecialties = useMemo(() => {
        const s = new Set<string>();
        scholars.forEach((sch) => sch.specialties?.forEach((sp) => s.add(sp)));
        return Array.from(s).sort();
    }, [scholars]);

    const filtered = useMemo(() => {
        const q = query.toLowerCase().trim();
        const list = scholars.filter((sch) => {
            const matchesQuery =
                [sch.name_en, sch.name_bn, sch.qualification, sch.title, ...(sch.specialties ?? [])]
                    .filter(Boolean)
                    .some((field) => field!.toLowerCase().includes(q));
            const matchesSpecialty =
                !specialtyFilter || sch.specialties?.includes(specialtyFilter);
            return matchesQuery && matchesSpecialty;
        });

        return list.sort((a, b) =>
            sortBy === "name"
                ? a.name_en.localeCompare(b.name_en)
                : (a.qualification || "").localeCompare(b.qualification || "")
        );
    }, [scholars, query, specialtyFilter, sortBy]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
            <div className="max-w-7xl mx-auto p-6">
                <header className="mb-8 border-b border-indigo-200 dark:border-indigo-700 pb-4">
                    <h1 className="text-3xl font-extrabold text-indigo-700 dark:text-indigo-400">
                        Qualified Islamic Scholars
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Meet our qualified Ustadz, Muftis, and Shaykhs.
                    </p>
                </header>

                {/* Filters */}
                <div className="bg-white dark:bg-gray-900 border border-indigo-200 dark:border-indigo-700 rounded-xl p-4 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="relative flex-1">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search scholars..."
                                className="w-full border border-gray-300 dark:border-gray-700 rounded-xl pl-10 pr-4 py-3 text-sm bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div className="flex gap-3">
                            <select
                                value={specialtyFilter ?? ""}
                                onChange={(e) => setSpecialtyFilter(e.target.value || null)}
                                className="border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 text-sm bg-white dark:bg-gray-800"
                            >
                                <option value="">All Specialties</option>
                                {allSpecialties.map((sp) => (
                                    <option key={sp} value={sp}>
                                        {sp}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={sortBy}
                                onChange={(e) =>
                                    setSortBy(e.target.value as "name" | "qualification")
                                }
                                className="border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 text-sm bg-white dark:bg-gray-800"
                            >
                                <option value="name">Sort: Name</option>
                                <option value="qualification">Sort: Qualification</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Scholar Cards */}
                <main>
                    {filtered.length === 0 ? (
                        <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-xl shadow-inner text-gray-500 dark:text-gray-400">
                            No scholars found.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filtered.map((sch) => (
                                <article
                                    key={sch.id}
                                    onClick={() => setSelected(sch)}
                                    className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-md border-t-4 border-indigo-500 hover:scale-[1.01] transition cursor-pointer"
                                >
                                    <div className="flex gap-4 items-center">
                                        <img
                                            src={sch.photo}
                                            alt={sch.name_en}
                                            onError={(e) => {
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.src = `https://placehold.co/100x100/4F46E5/FFFFFF?text=${sch.title}`;
                                            }}
                                            className="w-14 h-14 rounded-full object-cover border-2 border-indigo-300"
                                        />
                                        <div>
                                            <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-400">
                                                {sch.title} {sch.name_en}
                                            </h3>
                                            {sch.name_bn && (
                                                <p className="text-sm text-gray-500">{sch.name_bn}</p>
                                            )}
                                            <p className="text-xs text-teal-600 font-semibold">
                                                {sch.qualification}
                                            </p>
                                        </div>
                                    </div>

                                    <p className="mt-4 text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                                        {sch.bio}
                                    </p>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {sch.specialties?.map((sp) => (
                                            <span
                                                key={sp}
                                                className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-800/40 text-indigo-800 dark:text-indigo-300 font-medium"
                                            >
                                                {sp}
                                            </span>
                                        ))}
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </main>

                {selected && <ScholarModal scholar={selected} onClose={() => setSelected(null)} />}

                <footer className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
                    Tip: Click on a scholar to view the full profile.
                </footer>
            </div>
        </div>
    );
};

export default QualifiedScholars;
