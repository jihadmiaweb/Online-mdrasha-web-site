import React, { useMemo, useState, useCallback } from "react";

// --- SVG Icons (Replacement for external libraries) ---

// Magnifying Glass Icon for Search
const SearchIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

// Close Icon for Modal
const CloseIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);


// --- Type Definitions (kept as is) ---
export type Scholar = {
    id: string;
    name_en: string;
    name_bn?: string;
    title?: string; // e.g. "Mufti", "Shaykh"
    qualification?: string; // e.g. "Hadith, Fiqh"
    specialties?: string[];
    bio?: string;
    photo?: string; // url or base64
    contact?: string;
};

// --- Sample Data (kept as is) ---
const SAMPLE_SCHOLARS: Scholar[] = [
    {
        id: "s1",
        name_en: "Ahmad Hasan",
        name_bn: "মুফতি আহমদ হাসান",
        title: "Mufti",
        qualification: "B.A. (Hons), M.A. Islamic Studies",
        specialties: ["Fiqh", "Fatwa", "Aqeedah"],
        bio:
            "মুফতি আহমদ হাসান দীর্ঘদিন ইসলামী রাজনীতি ও ফিকহ বিষয়ে গবেষণা করে আসছেন। তিনি ফতোয়া ও শিক্ষা প্রদান করেছেন। Mufti Ahmad Hasan has researched Islamic politics and Fiqh for a long time. He has taught and issued fatwas.",

        photo: "/imgas/Qualified-Islamic-Scholars/download(2).jpeg",
        // Placeholder
        contact: "ahmad.h@example.com"
    },
    {
        id: "s2",
        name_en: "Ibrahim Al-Tayyib",
        name_bn: "শায়খ ইব্রাহীম আল-ট্টাইয়্যিব",
        title: "Shaykh",
        qualification: "Dars-e-Nizami",
        specialties: ["Tafsir", "Hadith", "Seerah"],
        bio:
            "সারা জীবন কোরআন ও হাদিসের অনুবাদ ও তাফসীর অধ্যয়ন করে গেছেন এবং ছাত্র-ছাত্রীদের গাইড করেন। Throughout his life, he has studied the translation and exegesis of the Quran and Hadith, and guides students globally.",
        photo: "/imgas/Qualified-Islamic-Scholars/download.jpeg",
        contact: "i.tayyib@example.com"
    },
    {
        id: "s3",
        name_en: "Ayesha Karim",
        name_bn: "ডঃ আয়েশা করিম",
        title: "Dr.",
        qualification: "PhD Islamic Studies",
        specialties: ["Islamic History", "Women in Islam", "Tarbiya"],
        bio:
            "ডঃ আয়েশা ইসলামী ইতিহাস ও নারীর সমাজে ইসলামের ভূমিকা নিয়ে লিখেছেন। Dr. Ayesha has published extensive research on Islamic history and the role of women in society.",
        photo: "/imgas/Qualified-Islamic-Scholars/download (1).jpeg",// Placeholder
        contact: "ayesha.k@example.com"
    },
    {
        id: "s4",
        name_en: "Junaid Khan",
        name_bn: "উস্তাদ জুনায়েদ খান",
        title: "Ustad",
        qualification: "Ijaza in Quran Recitation",
        specialties: ["Tajweed", "Quran Recitation", "Hifz"],
        bio:
            "উস্তাদ জুনায়েদ কিরাত ও তাজবীদের ক্ষেত্রে বিশেষ ভূমিকা পালন করেছেন। He is a certified teacher of Quranic Recitation and Hifz, specializing in various Qira'at.",
        photo: "/imgas/Qualified-Islamic-Scholars/download(3).jpeg",
        contact: "junaid.k@example.com"
    },
];

// Custom Modal Component for Scholar Profile (kept as is)
const ScholarModal = ({ scholar, onClose }: { scholar: Scholar, onClose: () => void }) => {
    const [contactStatus, setContactStatus] = useState<'idle' | 'logging'>('idle');

    const handleContact = useCallback(() => {
        setContactStatus('logging');
        console.log(`[CONTACT INITIATED] Scholar ID: ${scholar.id}, Contact: ${scholar.contact || 'No contact provided'}`);

        // Set status back to idle after a brief pause
        setTimeout(() => {
            setContactStatus('idle');
        }, 3000);
    }, [scholar.id, scholar.contact]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            role="dialog"
            aria-modal="true"
            onClick={onClose}
        >
            <div
                className="relative max-w-2xl w-full bg-white rounded-xl shadow-2xl p-6 md:p-8 transform transition-transform duration-300 scale-100 opacity-100"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition"
                    aria-label="Close Profile"
                >
                    <CloseIcon className="w-6 h-6" />
                </button>

                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <img
                        src={scholar.photo}
                        alt={scholar.name_en}
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `https://placehold.co/400x400/4F46E5/FFFFFF?text=${scholar.title}`; }}
                        className="w-24 h-24 rounded-full object-cover shadow-lg flex-shrink-0 border-4 border-indigo-100"
                    />
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {scholar.name_bn ? <span className="block">{scholar.name_bn}</span> : null}
                            <span className="block text-indigo-700 text-lg font-medium">{scholar.title} {scholar.name_en}</span>
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {scholar.qualification}
                        </p>
                    </div>
                </div>

                <hr className="my-5 border-gray-200" />

                <div className="text-sm text-gray-700 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-1">Biography</h3>
                    <p className="whitespace-pre-wrap">{scholar.bio}</p>

                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-1 pt-2">Areas of Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                        {(scholar.specialties || []).map((sp) => (
                            <span
                                key={sp}
                                className="text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-medium border border-indigo-200"
                            >
                                {sp}
                            </span>
                        ))}
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={handleContact}
                            disabled={contactStatus === 'logging'}
                            className={`flex-1 w-full sm:w-auto justify-center px-4 py-2 rounded-lg text-white font-semibold shadow-md transition
                                ${contactStatus === 'logging' ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'}
                            `}
                        >
                            {contactStatus === 'logging' ? 'Contact Logged (Check Console)' : 'Contact Scholar'}
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 w-full sm:w-auto justify-center px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                        >
                            Back to Directory
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- Main App Component (Renamed to App and includes all logic) ---
const QualifiedScholars = () => {
    const scholars = SAMPLE_SCHOLARS;
    const [query, setQuery] = useState("");
    const [specialtyFilter, setSpecialtyFilter] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<"name" | "qualification">("name");
    const [selected, setSelected] = useState<Scholar | null>(null);

    // Get all unique specialties for the filter dropdown
    const allSpecialties = useMemo(() => {
        const s = new Set<string>();
        scholars.forEach((sch) => sch.specialties?.forEach((sp) => s.add(sp)));
        return Array.from(s).sort();
    }, [scholars]);

    // Filter and Sort Logic
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        let list = scholars.filter((sch) => {
            const searchFields = [
                sch.name_en,
                sch.name_bn,
                sch.qualification,
                sch.specialties ? sch.specialties.join(" ") : null
            ].map(s => s ? s.toLowerCase() : "");

            const matchesQuery = searchFields.some(field => field.includes(q));

            const matchesSpecialty =
                !specialtyFilter || (sch.specialties || []).includes(specialtyFilter);

            return matchesQuery && matchesSpecialty;
        });

        // Sort the list
        list.sort((a, b) => {
            if (sortBy === "name") return a.name_en.localeCompare(b.name_en);
            // Default to sorting by qualification if set, otherwise fallback to name comparison if qualifications are identical.
            return (a.qualification || "").localeCompare(b.qualification || "") || a.name_en.localeCompare(b.name_en);
        });

        return list;
    }, [scholars, query, specialtyFilter, sortBy]);

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-800">
                        Qualified Islamic Scholars
                    </h1>
                    <p className="text-base text-gray-600 mt-2">
                        Meet our highly qualified Ustadz, Muftis, and Shaykhs.
                        <span className="block text-sm text-gray-500 mt-1">
                            যোগ্যতাসম্পন্ন ইসলামী আলেমদের তালিকা ও প্রোফাইল
                        </span>
                    </p>
                </header>

                {/* --- Filter & Search Bar (Improved Responsiveness) --- */}
                <div className="bg-white p-4 rounded-xl shadow-lg mb-8 border border-indigo-100">
                    <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">

                        {/* Search Input (Takes up most width) */}
                        <div className="relative flex-1 min-w-0">
                            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search by name, qualification, or specialty..."
                                className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 shadow-inner text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Filters (Stack on mobile, side-by-side on desktop) */}
                        <div className="flex flex-row gap-3 items-center w-full md:w-auto">
                            <select
                                value={specialtyFilter ?? ""}
                                onChange={(e) => setSpecialtyFilter(e.target.value || null)}
                                className="border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 bg-white shadow-sm appearance-none cursor-pointer"
                                aria-label="Filter by specialty"
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
                                onChange={(e) => setSortBy(e.target.value as "name" | "qualification")}
                                className="border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 bg-white shadow-sm appearance-none cursor-pointer"
                                aria-label="Sort by"
                            >
                                <option value="name">Sort: Name</option>
                                <option value="qualification">Sort: Qualification</option>
                            </select>
                        </div>
                    </div>
                </div>

                <main>
                    {filtered.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-xl shadow-inner text-gray-500 text-lg">
                            No scholars found matching your criteria.
                            <div className="text-sm mt-1">কোনো আলেম পাওয়া যায়নি — অনুগ্রহ করে অনুসন্ধান বা ফিল্টার পরিবর্তন করুন।</div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filtered.map((sch) => (
                                <article
                                    key={sch.id}
                                    className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-t-4 border-indigo-500 transform hover:scale-[1.01]"
                                    onClick={() => setSelected(sch)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") setSelected(sch);
                                    }}
                                >
                                    <div className="flex gap-4 items-center">
                                        <img
                                            src={sch.photo}
                                            alt={sch.name_en}
                                            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `https://placehold.co/100x100/4F46E5/FFFFFF?text=${sch.title}`; }}
                                            className="w-14 h-14 rounded-full object-cover flex-shrink-0 border-2 border-indigo-300"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="text-lg font-bold leading-snug text-indigo-700">
                                                {sch.title} {sch.name_en}
                                            </div>
                                            {sch.name_bn && <span className="block text-sm text-gray-500">{sch.name_bn}</span>}
                                            <div className="mt-1 text-xs text-teal-600 font-semibold truncate">
                                                {sch.qualification}
                                            </div>
                                        </div>
                                    </div>

                                    <p className="mt-4 text-sm text-gray-700 line-clamp-3 h-[60px]">{sch.bio}</p>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {(sch.specialties || []).map((sp) => (
                                            <span
                                                key={sp}
                                                className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-medium"
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

                {/* Render Modal if a scholar is selected */}
                {selected ? (
                    <ScholarModal scholar={selected} onClose={() => setSelected(null)} />
                ) : null}

                <footer className="mt-10 text-center text-sm text-gray-500">
                    Tip: ক্লিক করে প্রতিটি আলেমের সম্পূর্ণ প্রোফাইল দেখুন। (Click to view the full profile of each scholar.)
                </footer>
            </div>
        </div>
    );
}

export default QualifiedScholars;
