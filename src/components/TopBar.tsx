import React from 'react';
import { Map as MapIcon, Crown, Flame, Heart } from 'lucide-react';

interface TopBarProps {
    unlockedCount: number;
    totalSkills: number;
}

export const TopBar: React.FC<TopBarProps> = ({ unlockedCount, totalSkills }) => {
    return (
        <header className="fixed top-0 left-0 right-0 h-20 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 z-50 flex items-center justify-between px-5 shadow-2xl">
            <div className="flex items-center gap-2">
                <MapIcon className="text-emerald-500 w-7 h-7" />
                <h1 className="text-lg font-black text-white tracking-tight">MATH QUEST</h1>
            </div>

            <div className="flex items-center gap-4">

                {/* Crown / Level */}
                <div className="flex items-center gap-1.5 min-w-[44px] justify-center">
                    <Crown className="text-yellow-500 w-6 h-6" fill="currentColor" />
                    <span className="font-bold text-yellow-500 text-base">{Math.floor(unlockedCount / 5)}</span>
                </div>

                {/* Flame / Streak */}
                <div className="flex items-center gap-1.5 min-w-[44px] justify-center">
                    <Flame className="text-orange-500 w-6 h-6" fill="currentColor" />
                    <span className="font-bold text-orange-500 text-base">7</span>
                </div>

                {/* Hearts / Lives */}
                <div className="flex items-center gap-1.5 min-w-[44px] justify-center">
                    <Heart className="text-red-500 w-6 h-6" fill="currentColor" />
                    <span className="font-bold text-red-500 text-base">5</span>
                </div>

                {/* Progress Circle (Simplified) */}
                <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">
                    <div className="w-16 h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-emerald-500 transition-all duration-1000"
                            style={{ width: `${(unlockedCount / totalSkills) * 100}%` }}
                        ></div>
                    </div>
                    <span className="text-xs font-bold text-zinc-400">{unlockedCount}/{totalSkills}</span>
                </div>

            </div>
        </header>
    );
};
