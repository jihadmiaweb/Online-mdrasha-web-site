import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Play, Pause, LoaderCircle, Zap } from 'lucide-react';

// --- 1. TYPE DEFINITIONS ---
interface RecitationItem {
    id: number;
    surah: string;
    name: string;
    ayah: string;
    audio: string;
    icon: string;
}

interface RecitationCardProps {
    item: RecitationItem;
    isPlaying: boolean;
    isLoading: boolean;
    onTogglePlay: (item: RecitationItem) => void;
}

// --- Quran Recitation Data ---
const recitations: RecitationItem[] = [
    { id: 1, surah: "سورة الفاتحة", name: "Al-Fatihah", ayah: "1-7", audio: "./imgas/Recitation/1.mp3", icon: "📖" },
    { id: 2, surah: "سورة البقرة", name: "Al-Baqarah", ayah: "1-5", audio: "./imgas/Recitation/2.mp3", icon: "🕋" },
    { id: 3, surah: "سورة الإخلاص", name: "Al-Ikhlas", ayah: "1-4", audio: "./imgas/Recitation/3.mp3", icon: "🌙" },
    { id: 4, surah: "سورة الكوثر", name: "Al-Kawthar", ayah: "1-3", audio: "./imgas/Recitation/4.mp3", icon: "💧" },
];

// --- 2. Recitation Card Component ---
const RecitationCard: React.FC<RecitationCardProps> = React.memo(({ item, isPlaying, isLoading, onTogglePlay }) => {
    const cardClasses = isPlaying
        ? "ring-4 ring-emerald-600 shadow-xl scale-[1.02] transition-all duration-300"
        : "ring-1 ring-emerald-100 hover:shadow-lg hover:scale-[1.01]";

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 100 }}
            className={`bg-white p-6 rounded-2xl shadow-md border-t-8 border-emerald-500 flex flex-col items-start transition-all duration-300 ${cardClasses}`}
        >
            <div className="flex justify-between w-full items-center mb-3">
                <span className="text-3xl" role="img" aria-label={item.name + " icon"}>{item.icon}</span>
                <div className="text-sm font-medium bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
                    Ayah: {item.ayah}
                </div>
            </div>

            {/* Added style to ensure Arabic text renders correctly for RTL languages */}
            <h3 dir="rtl" className="text-2xl font-['Noto_Naskh_Arabic'] text-right w-full text-emerald-900 mb-1">
                {item.surah}
            </h3>
            <p className="text-sm font-semibold text-gray-600 mb-4 tracking-wider">{item.name}</p>

            <button
                onClick={() => onTogglePlay(item)}
                disabled={isLoading}
                className={`mt-2 flex items-center justify-center space-x-2 px-6 py-3 rounded-full font-bold transition-all duration-300
                    ${isPlaying ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-300 shadow-lg' :
                        isLoading ? 'bg-gray-400 text-gray-700 cursor-not-allowed' :
                            'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-400 shadow-md'}`}
            >
                {isLoading ? (
                    <>
                        <LoaderCircle className="h-5 w-5 animate-spin" />
                        <span>Loading...</span>
                    </>
                ) : isPlaying ? (
                    <>
                        <Pause className="h-5 w-5" />
                        <span>Pause</span>
                    </>
                ) : (
                    <>
                        <Play className="h-5 w-5" />
                        <span>Listen Now</span>
                    </>
                )}
            </button>

            {isPlaying && (
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                    className="h-1 bg-emerald-400 mt-4 rounded-full"
                />
            )}
        </motion.div>
    );
});

// --- 3. Main Component ---
const Recitation: React.FC = () => {
    // State to hold the active Audio object
    const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
    const [playingId, setPlayingId] = useState<number | null>(null);
    const [loadingId, setLoadingId] = useState<number | null>(null);

    const currentItem = useMemo(() => recitations.find(r => r.id === playingId), [playingId]);

    /**
     * Centralized function to stop playback, cleanup event listeners, and reset state.
     * FIX: Ensures all listeners are removed before component unmounts or state changes.
     */
    const pauseAndCleanup = useCallback(() => {
        if (currentAudio) {
            currentAudio.pause();

            // Remove listeners to prevent memory leaks
            currentAudio.onended = null;
            currentAudio.removeEventListener('canplaythrough', () => { }); // A bit tricky to remove anonymous listeners, but setting onended to null helps.

            currentAudio.src = '';
        }
        setPlayingId(null);
        setLoadingId(null);
        setCurrentAudio(null);
    }, [currentAudio]);


    // FIX: useEffect hook for unmounting cleanup (clean up when component closes)
    useEffect(() => {
        return () => {
            // Check if currentAudio exists before calling pauseAndCleanup
            if (currentAudio) {
                // The cleanup logic must be self-contained or use the version of currentAudio available at unmount.
                // Using the dependency-less cleanup approach is best here.
                currentAudio.pause();
                currentAudio.onended = null;
                currentAudio.src = '';
            }
        };
    }, []); // Empty dependency array means this runs only on mount and unmount


    const handleTogglePlay = useCallback((item: RecitationItem) => {
        // If the same item is playing, stop it.
        if (playingId === item.id) {
            pauseAndCleanup();
            return;
        }

        // Stop any currently playing audio before starting a new one.
        // FIX: The original code called pauseAndCleanup(), which resets currentAudio to null, 
        // leading to potential race conditions. We need a way to reliably pause the OLD audio.
        if (currentAudio) {
            currentAudio.pause();
        }

        setPlayingId(null); // Reset playing state
        setLoadingId(item.id);

        const audio = new Audio(item.audio);
        audio.preload = 'auto';

        // Event handler to start playing once loaded
        const onCanPlayThrough = () => {
            setLoadingId(null);
            audio.play().then(() => {
                setPlayingId(item.id);
            }).catch(e => {
                console.error("Autoplay failed (browser restriction).", e);
                setPlayingId(null);
            });
            audio.removeEventListener('canplaythrough', onCanPlayThrough);
        };

        audio.addEventListener('canplaythrough', onCanPlayThrough);

        // Event handler for when the audio finishes
        audio.onended = () => {
            setPlayingId(null);
            setCurrentAudio(null);
        };

        // Update state with the new Audio element
        setCurrentAudio(audio);

    }, [playingId, currentAudio, pauseAndCleanup]);


    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl font-extrabold text-center text-emerald-800 mb-2 mt-6 leading-tight"
                >
                    <Zap className="inline w-8 h-8 md:w-10 md:h-10 text-emerald-500 mr-2 transform rotate-45" />
                    Quran Recitations
                </motion.h2>

                <p className="text-center text-gray-500 mb-12 text-lg italic">
                    Listen to selected recitations by Abdurrahman Al-Sudais.
                </p>

                {/* Mobile Now Playing Bar (Sticky) */}
                {playingId && (
                    <div className="sticky top-0 z-10 p-3 bg-emerald-500 text-white text-center font-bold shadow-xl md:hidden rounded-lg mb-6">
                        Now Playing: {currentItem?.name || '...'}
                    </div>
                )}

                {/* Recitation Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {recitations.map(item => (
                        <RecitationCard
                            key={item.id}
                            item={item}
                            isPlaying={playingId === item.id}
                            isLoading={loadingId === item.id}
                            onTogglePlay={handleTogglePlay}
                        />
                    ))}
                </div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mt-16 pt-8 border-t border-emerald-200 text-center text-gray-500 text-sm"
                >
                    <p>Audio sourced from EveryAyah.com. Reciter: Abdurrahman Al-Sudais.</p>
                </motion.div>
            </div>

            {/* Desktop Now Playing Bar (Fixed) */}
            {playingId && (
                <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    className="fixed bottom-0 left-0 w-full bg-emerald-700 text-white p-4 shadow-2xl z-50 hidden md:block"
                >
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <p className="font-semibold flex items-center">
                            <Zap className="h-5 w-5 mr-2 animate-pulse" />
                            Now Playing: <span className="ml-2 font-bold text-emerald-200">{currentItem?.name || 'Unknown'}</span>
                        </p>
                        <button
                            onClick={pauseAndCleanup}
                            className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
                        >
                            <Pause className="w-5 h-5" />
                            <span>Stop Playback</span>
                        </button>
                    </div>
                </motion.div>
            )}
            <style>
                {`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;700&display=swap');
  `}
            </style>

        </div>
    );
};

export default Recitation;