import React from 'react';
import { ModuleData, colorMap, Skill } from '../data/skills';
import { SkillNode } from './SkillNode';
import { Lock } from 'lucide-react';

interface ModuleSectionProps {
    module: ModuleData;
    unlockedSkills: string[];
    selectedSkillId: string | undefined;
    onSelectSkill: (skill: Skill & { moduleId: string }) => void;
    isLocked?: boolean;
}

export const ModuleSection: React.FC<ModuleSectionProps> = ({
    module,
    unlockedSkills,
    selectedSkillId,
    onSelectSkill,
    isLocked = false,
}) => {
    // Helper to chunk skills into the 1-2-1-2 pattern
    const getSkillRows = (skills: Skill[]) => {
        const rows: Skill[][] = [];
        let i = 0;
        let patternIndex = 0;
        const pattern = [1, 2];

        while (i < skills.length) {
            const count = pattern[patternIndex % pattern.length];
            rows.push(skills.slice(i, i + count));
            i += count;
            patternIndex++;
        }
        return rows;
    };

    const skillRows = getSkillRows(module.skills);

    return (
        <div className={`w-full max-w-lg flex flex-col items-center mb-24 relative transition-all duration-500 ${isLocked ? 'opacity-50 grayscale pointer-events-none select-none' : ''}`}>

            {/* Lock Overlay for Whole Module */}
            {isLocked && (
                <div className="absolute inset-0 z-50 flex items-center justify-center">
                    <div className="bg-zinc-950/80 p-6 rounded-full border-4 border-zinc-800 shadow-2xl backdrop-blur-sm">
                        <Lock size={48} className="text-zinc-500" />
                    </div>
                </div>
            )}

            {/* Header do Módulo */}
            <div
                className={`w-11/12 p-1 mb-16 rounded-3xl bg-zinc-900 border-4 border-zinc-800 shadow-2xl relative overflow-hidden`}
            >
                <div className={`absolute inset-0 bg-gradient-to-br ${colorMap[module.color]} opacity-20`}></div>
                <div className="relative bg-zinc-950/80 rounded-[20px] p-5 flex items-center justify-between backdrop-blur-sm border border-white/5">
                    <div>
                        <h3 className="text-zinc-100 font-extrabold text-lg uppercase tracking-wider drop-shadow-md">
                            {module.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700 uppercase">
                                Nível {module.id.replace('m', '')}
                            </span>
                        </div>
                    </div>
                    <div className="p-3 bg-zinc-900 rounded-xl border-2 border-zinc-800 shadow-inner text-zinc-200">
                        {module.icon}
                    </div>
                </div>
            </div>

            {/* Caminho de Skills */}
            <div className="flex flex-col gap-8 relative w-full px-4">
                {skillRows.map((row, rowIndex) => (
                    <div
                        key={rowIndex}
                        className={`flex w-full ${row.length === 1 ? 'justify-center' : 'justify-around px-8'}`}
                    >
                        {row.map((skill) => (
                            <SkillNode
                                key={skill.id}
                                skill={skill}
                                moduleId={module.id}
                                moduleColor={module.color}
                                isUnlocked={unlockedSkills.includes(skill.id)}
                                isSelected={selectedSkillId === skill.id}
                                onSelect={onSelectSkill}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
