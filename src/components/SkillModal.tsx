import React from 'react';
import { X, Lock, Star } from 'lucide-react';
import { Skill, colorMap } from '../data/skills';

interface SkillModalProps {
    skill: Skill & { moduleId: string };
    moduleColor: string;
    isUnlocked: boolean;
    onClose: () => void;
    onAction: () => void;
}

export const SkillModal: React.FC<SkillModalProps> = ({
    skill,
    moduleColor,
    isUnlocked,
    onClose,
    onAction
}) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">

            {/* Modal Content */}
            <div className="w-full max-w-md bg-zinc-900 border-2 border-zinc-800 rounded-3xl shadow-2xl p-6 relative animate-in zoom-in-95 duration-200">

                {/* Header Color Stripe */}
                <div className={`absolute top-0 left-0 right-0 h-2 rounded-t-3xl bg-gradient-to-r ${colorMap[moduleColor]}`}></div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-full transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="flex flex-col items-center text-center mt-4">
                    {/* Icon */}
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-xl bg-gradient-to-br ${isUnlocked ? colorMap[moduleColor] : 'from-zinc-800 to-zinc-900'}`}>
                        {isUnlocked ? <Star size={40} className="text-white fill-white/20" /> : <Lock size={40} className="text-zinc-500" />}
                    </div>

                    <h2 className="text-2xl font-black text-white uppercase mb-2">{skill.name}</h2>

                    <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800 w-full mb-6">
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            {skill.desc}
                        </p>
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={() => {
                            onAction();
                            onClose();
                        }}
                        className={`
                w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm shadow-lg transform transition-all active:scale-95
                bg-gradient-to-r ${colorMap[moduleColor]} text-white hover:brightness-110 shadow-[0_4px_0_rgba(0,0,0,0.3)]
              `}
                    >
                        COMPLETAR FASE
                    </button>
                </div>

            </div>
        </div>
    );
};
