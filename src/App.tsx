import { useState } from 'react';
import { Trophy } from 'lucide-react';

import { ModuleSection } from './components/ModuleSection';
import { SKILLS_DATA, Skill } from './data/skills';
import { TopBar } from './components/TopBar';
import { SkillModal } from './components/SkillModal';
import { getGameForModule } from './core/GameRegistry';

function App() {
    const [selectedSkill, setSelectedSkill] = useState<(Skill & { moduleId: string }) | null>(null);
    const [unlockedSkills, setUnlockedSkills] = useState(['01']);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeGameSkillId, setActiveGameSkillId] = useState<string | null>(null);

    // Flatten all skills to find the next one easily
    const allSkills = SKILLS_DATA.flatMap(m => m.skills);
    const totalSkills = allSkills.length;

    const handleGameStart = () => {
        if (selectedSkill) {
            setActiveGameSkillId(selectedSkill.id);
            setIsPlaying(true);
            setSelectedSkill(null); // Close modal
        }
    };

    const handleGameEnd = (won: boolean) => {
        setIsPlaying(false);
        if (won && activeGameSkillId) {
            const currentIndex = allSkills.findIndex(s => s.id === activeGameSkillId);
            if (currentIndex >= 0 && currentIndex < allSkills.length - 1) {
                const nextSkill = allSkills[currentIndex + 1];
                if (!unlockedSkills.includes(nextSkill.id)) {
                    setUnlockedSkills(prev => [...prev, nextSkill.id]);
                }
            }
        }
        setActiveGameSkillId(null);
    };

    const selectedModuleColor = selectedSkill
        ? SKILLS_DATA.find(m => m.id === selectedSkill.moduleId)?.color || 'slate'
        : 'slate';

    // Resolve Game Component
    // Find which module activeGameSkillId belongs to
    const activeModule = activeGameSkillId
        ? SKILLS_DATA.find(m => m.skills.some(s => s.id === activeGameSkillId))
        : null;

    // Inversion of Control: We ask the registry "Who wants to play with this module?"
    const ActiveGameComponent = activeModule ? getGameForModule(activeModule.id) : null;

    return (
        <div className="h-screen bg-[#050505] text-zinc-100 font-mono flex flex-col">

            {/* Game Mode Overlay - Renders when playing */}
            {isPlaying && ActiveGameComponent && activeGameSkillId && (
                <ActiveGameComponent
                    difficultyLevel={allSkills.findIndex(s => s.id === activeGameSkillId) + 1}
                    onExit={handleGameEnd}
                />
            )}

            <TopBar unlockedCount={unlockedSkills.length} totalSkills={totalSkills} />

            {/* Main Area with Dungeon Background */}
            <main className="flex-1 overflow-y-auto relative scrollbar-hide touch-scroll flex flex-col items-center pt-28 pb-20 bg-dungeon overflow-x-hidden">

                {/* Global Connection Line (Visual Only) */}
                <div className="absolute top-0 bottom-0 w-2.5 bg-zinc-800/60 left-[50%] -translate-x-1/2 -z-0 border-x border-zinc-950/50"></div>

                {SKILLS_DATA.map((module, index) => {
                    const isModuleLocked = index > 0;

                    return (
                        <ModuleSection
                            key={module.id}
                            module={module}
                            unlockedSkills={unlockedSkills}
                            selectedSkillId={selectedSkill?.id}
                            onSelectSkill={setSelectedSkill}
                            isLocked={isModuleLocked}
                        />
                    );
                })}

                {/* Trono Final */}
                <div className="relative z-10 w-36 h-36 mt-12 bg-gradient-to-t from-yellow-600 to-yellow-400 rounded-3xl transform rotate-45 flex items-center justify-center shadow-[0_0_60px_rgba(234,179,8,0.3)] border-4 border-yellow-200 mb-32 grayscale opacity-50">
                    <div className="transform -rotate-45">
                        <Trophy size={64} className="text-yellow-950 drop-shadow-md" />
                    </div>
                </div>
                <p className="font-black text-zinc-600 uppercase tracking-widest text-xl relative z-10 mb-12 -mt-20">
                    Trono do Mestre
                </p>

            </main>

            {/* Skill Modal */}
            {selectedSkill && !isPlaying && (
                <SkillModal
                    skill={selectedSkill}
                    moduleColor={selectedModuleColor}
                    isUnlocked={true}
                    onClose={() => setSelectedSkill(null)}
                    onAction={handleGameStart}
                />
            )}
        </div>
    );
}

export default App;
