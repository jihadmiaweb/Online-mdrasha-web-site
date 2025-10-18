import React from "react";

// --- About Us Component ---
const AboutUs: React.FC = () => {
    return (
        <section className="bg-gray-50 py-12 px-4 sm:px-6 md:px-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Image Section */}
                <div className="flex justify-center lg:justify-end">
                    <img
                        src="/imgas/3.jpg"
                        alt="আমাদের সম্পর্কে"
                        className="w-full max-w-md rounded-2xl shadow-lg object-cover"
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "https://placehold.co/400x400/CCCCCC/333333?text=No+Image";
                        }}
                    />
                </div>

                {/* Text Section */}
                <div>
                    <h2 className="text-3xl font-extrabold text-teal-800 mb-6 text-center lg:text-left">
                        আমাদের সম্পর্কে
                    </h2>
                    <p className="text-gray-700 text-base sm:text-lg mb-4 leading-relaxed">
                        মাদরাসাতু নূরুল ইলম একটি স্বনামধন্য ইসলামিক শিক্ষাপ্রতিষ্ঠান যেখানে শিশু ও প্রাপ্তবয়স্কদের জন্য উচ্চমানের কোরআন শিক্ষা প্রদান করা হয়। আমাদের লক্ষ্য শিক্ষার্থীদের নৈতিক ও আধ্যাত্মিক দিক দিয়ে সঠিক পথে গড়ে তোলা।
                    </p>
                    <p className="text-gray-700 text-base sm:text-lg mb-6 leading-relaxed">
                        আমাদের কোর্সে শিক্ষার্থীরা তাজওয়ীদ, হিফজ, কোরআন রিসাইটেশন এবং ইসলামিক স্টাডিজ শিখতে পারে, সকল বয়সের জন্য উপযোগী।
                    </p>

                    {/* Mission & Vision */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
                            <h3 className="text-teal-700 font-bold mb-2">আমাদের লক্ষ্য</h3>
                            <p className="text-gray-700 text-sm">
                                শিক্ষার্থীদের কোরআন ও ইসলামিক জ্ঞান অর্জনে সমৃদ্ধ করা এবং নৈতিকভাবে গড়ে তোলা।
                            </p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
                            <h3 className="text-teal-700 font-bold mb-2">আমাদের ভিশন</h3>
                            <p className="text-gray-700 text-sm">
                                বিশ্বমানের ইসলামিক শিক্ষা প্রদান করে একটি সুসংগঠিত, নৈতিক সমাজ গঠন করা।
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
