import React from 'react';
import { Star, Lock, Crown } from 'lucide-react';
import { Skill, colorMap } from '../data/skills';

interface SkillNodeProps {
    skill: Skill;
    moduleId: string;
    moduleColor: string;
    isUnlocked: boolean;
    isSelected: boolean;
    onSelect: (skill: Skill & { moduleId: string }) => void;
}

export const SkillNode: React.FC<SkillNodeProps> = ({
    skill,
    moduleId,
    moduleColor,
    isUnlocked,
    isSelected,
    onSelect,
}) => {
    return (
        <div className="relative group flex flex-col items-center z-10">

            {/* Botão de Skill */}
            <div className="relative z-10">
                <button
                    onClick={() => isUnlocked && onSelect({ ...skill, moduleId })}
                    disabled={!isUnlocked}
                    className={`
            w-[110px] h-[110px] flex items-center justify-center relative
            transition-all duration-200 active:scale-95
            ${isSelected ? 'scale-110 z-20 brightness-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]' : ''}
            ${!isUnlocked ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}
          `}
                >
                    {/* Circle Shape */}
                    <div className={`
             absolute inset-0 rounded-full border-4 
             shadow-[0_8px_0_rgba(0,0,0,0.5)] transition-all
             ${isUnlocked
                            ? `bg-gradient-to-br ${colorMap[moduleColor]} border-zinc-900`
                            : 'bg-zinc-800 border-zinc-700'
                        }
             ${isSelected ? 'border-white' : ''}
          `}></div>

                    <div className="relative z-10">
                        {isUnlocked ? (
                            <Star size={44} fill="white" className="text-white drop-shadow-md animate-pulse" />
                        ) : (
                            <Lock size={28} className="text-zinc-500" />
                        )}
                    </div>

                    {/* Coroa de Maestria */}
                    {isUnlocked && (
                        <div className="absolute -top-2 -right-2 z-20 bg-yellow-400 text-yellow-900 p-2 rounded-full shadow-lg border-2 border-yellow-200">
                            <Crown size={16} fill="currentColor" />
                        </div>
                    )}
                </button>
            </div>

            {/* Label da Skill - Only show if unlocked? Or show dimmed? User said "cannot be opened", implies can be seen. */}
            {/* Keeping visual but dimmed for locked */}
            <div className="mt-5 bg-black/80 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10 shadow-lg relative z-20">
                <span
                    className={`text-xs font-black uppercase tracking-widest ${isUnlocked ? 'text-zinc-200' : 'text-zinc-600'
                        }`}
                >
                    {skill.name}
                </span>
            </div>

        </div>
    );
};
