

// ZakatAndDonation.jsx
// Responsive React component about Zakat, Sadaqah, and their social impact.
// Tailwind CSS based clean layout.

import { useState } from "react";

export default function ZakatAndDonation() {
    const [open, setOpen] = useState<string | null>(null);
    const toggle = (key: string) => setOpen(open === key ? null : key);

    const sections = [
        {
            key: "calculation",
            title: "যাকাতের হিসাব",
            content:
                "যাকাত ইসলামিক অর্থব্যবস্থার একটি মৌলিক স্তম্ভ। যাদের সম্পদ নির্দিষ্ট সীমার (নিসাব) উপরে থাকে, তাদের সম্পদের ২.৫% বা প্রতি ৪০ টাকায় ১ টাকা যাকাত হিসেবে দিতে হয়। এটি শুধুমাত্র হালাল উপার্জনের সম্পদের ওপর প্রযোজ্য। নিসাব সাধারণত ৭.৫ তোলা স্বর্ণ বা ৫২.৫ তোলা রৌপ্যের সমমূল্যের সম্পদ হলে হিসাব শুরু হয়।",
        },
        {
            key: "rules",
            title: "দান ও সদকার নিয়ম",
            content:
                "দান (সদকা) হচ্ছে আল্লাহর সন্তুষ্টির জন্য স্বেচ্ছায় সম্পদ ব্যয় করা। এটি ফরজ নয়, তবে এর মাধ্যমে মানুষ আত্মশুদ্ধি অর্জন করে এবং দরিদ্র মানুষের সহায়তা পায়। সদকা ছোট-বড় যেকোনো পরিমাণে করা যায়— খাদ্য, পোশাক, অর্থ বা জ্ঞান দিয়েও সদকা করা যায়। তবে রিয়া (দেখানোর উদ্দেশ্য) থেকে বিরত থাকতে হবে।",
        },
        {
            key: "impact",
            title: "সমাজে যাকাত ও দানের প্রভাব",
            content:
                "যাকাত ও দানের মাধ্যমে সমাজে অর্থনৈতিক ভারসাম্য সৃষ্টি হয়। ধনী ও গরিবের মধ্যে বৈষম্য কমে যায়, দরিদ্র জনগোষ্ঠীর মৌলিক চাহিদা পূরণ হয়, এবং সমাজে সহযোগিতা ও সৌহার্দ্যের পরিবেশ তৈরি হয়। এছাড়া যাকাত মানুষকে স্বচ্ছতা, শৃঙ্খলা ও মানবিক দায়িত্ববোধ শেখায়।",
        },
        {
            key: "exceptions",
            title: "কে কে যাকাত পাবেন না",
            content:
                "যাকাত আত্মীয় বা নির্ভরশীল যাদের উপর দায়িত্ব রয়েছে (যেমন পিতা-মাতা, সন্তান, স্বামী-স্ত্রী) তাদের দেওয়া যায় না। ধনী, অমুসলিম বা মসজিদ নির্মাণে যাকাতের অর্থ ব্যয় করা বৈধ নয়। তবে দান (সদকা) ক্ষেত্রে এই নিয়ম কিছুটা নমনীয়।",
        },
    ];

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6">
            {/* Header Section */}
            <header className="mb-6 text-center">
                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
                    যাকাত ও দান
                </h1>
                <p className="mt-2 text-sm sm:text-base text-slate-600">
                    যাকাতের হিসাব, দান-সদকার নিয়ম এবং সমাজে এর প্রভাব সম্পর্কে সহজবোধ্য ধারণা।
                </p>
            </header>

            {/* Summary Cards */}
            <section className="grid gap-6 md:grid-cols-2">
                <div className="bg-white shadow-sm rounded-lg p-4">
                    <h2 className="text-lg font-medium">যাকাত সম্পর্কে সারসংক্ষেপ</h2>
                    <ul className="mt-3 list-disc list-inside text-sm text-slate-700 space-y-2">
                        <li>নিসাব পূর্ণ হলেই যাকাত ফরজ হয়।</li>
                        <li>সম্পদের ২.৫% হিসাব অনুযায়ী দিতে হয়।</li>
                        <li>যাকাত বছরে একবার দেওয়া উত্তম।</li>
                    </ul>
                </div>

                <div className="bg-white shadow-sm rounded-lg p-4">
                    <h2 className="text-lg font-medium">দান ও সদকা সম্পর্কে</h2>
                    <p className="mt-2 text-sm text-slate-700">
                        সদকা বা দান মানবিক ও ধর্মীয় উভয় দিক থেকেই উত্তম কাজ। ছোট সহানুভূতি, হাসি,
                        বা সহযোগিতাও সদকা হতে পারে।
                    </p>
                </div>
            </section>

            {/* Accordion Sections */}
            <section className="mt-6">
                {sections.map((sec) => (
                    <article key={sec.key} className="bg-white rounded-md shadow-sm mb-3">
                        <button
                            onClick={() => toggle(sec.key)}
                            aria-expanded={open === sec.key}
                            className="w-full text-left p-4 flex items-center justify-between"
                        >
                            <div className="font-semibold text-gray-800">{sec.title}</div>
                            <div className="text-slate-500">{open === sec.key ? "−" : "+"}</div>
                        </button>

                        {open === sec.key && (
                            <div className="px-4 pb-4 text-sm text-slate-700">{sec.content}</div>
                        )}
                    </article>
                ))}
            </section>

            {/* Footer Tips */}
            <footer className="mt-6 text-sm text-slate-600">
                <div className="bg-slate-50 rounded-md p-3">
                    <strong>পরামর্শ:</strong>
                    <ul className="mt-2 list-disc list-inside">
                        <li>যাকাতের সঠিক হিসাবের জন্য ইসলামী আলেম বা বিশেষজ্ঞের পরামর্শ নিন।</li>
                        <li>দান গোপনে করলে নেকি বহুগুণ বৃদ্ধি পায়।</li>
                        <li>যাকাতের অর্থ সঠিক ব্যক্তির কাছে পৌঁছানো নিশ্চিত করুন।</li>
                    </ul>
                </div>
            </footer>
        </div>
    );
}
