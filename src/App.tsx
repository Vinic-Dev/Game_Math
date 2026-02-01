import { useState } from 'react';
import { Trophy } from 'lucide-react';

import { ModuleSection } from './components/ModuleSection';
import { SKILLS_DATA, Skill } from './data/skills';
import { TopBar } from './components/TopBar';
import { SkillModal } from './components/SkillModal';

function App() {
    const [selectedSkill, setSelectedSkill] = useState<(Skill & { moduleId: string }) | null>(null);
    const [unlockedSkills, setUnlockedSkills] = useState(['01']);

    // Flatten all skills to find the next one easily
    const allSkills = SKILLS_DATA.flatMap(m => m.skills);

    const completeSkill = (currentId: string) => {
        const currentIndex = allSkills.findIndex(s => s.id === currentId);
        if (currentIndex >= 0 && currentIndex < allSkills.length - 1) {
            const nextSkill = allSkills[currentIndex + 1];
            if (!unlockedSkills.includes(nextSkill.id)) {
                setUnlockedSkills(prev => [...prev, nextSkill.id]);
            }
        }
    };

    const totalSkills = allSkills.length;

    // Determine modal color based on selected skill
    const selectedModuleColor = selectedSkill
        ? SKILLS_DATA.find(m => m.id === selectedSkill.moduleId)?.color || 'slate'
        : 'slate';

    return (
        <div className="min-h-screen bg-[#050505] text-zinc-100 font-mono flex flex-col overflow-hidden">

            <TopBar unlockedCount={unlockedSkills.length} totalSkills={totalSkills} />

            {/* Main Area with Dungeon Background */}
            <main className="flex-1 overflow-y-auto relative scrollbar-hide flex flex-col items-center pt-24 pb-20 bg-dungeon overflow-x-hidden">

                {/* Global Connection Line (Visual Only) */}
                <div className="absolute top-0 bottom-0 w-2.5 bg-zinc-800/60 left-[50%] -translate-x-1/2 -z-0 border-x border-zinc-950/50"></div>

                {SKILLS_DATA.map((module, index) => {
                    // LOCK LOGIC: All modules except the first one (index 0) are visually locked
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
                <div className="relative z-10 w-32 h-32 mt-12 bg-gradient-to-t from-yellow-600 to-yellow-400 rounded-3xl transform rotate-45 flex items-center justify-center shadow-[0_0_60px_rgba(234,179,8,0.3)] border-4 border-yellow-200 mb-32 grayscale opacity-50">
                    <div className="transform -rotate-45">
                        <Trophy size={56} className="text-yellow-950 drop-shadow-md" />
                    </div>
                </div>
                <p className="font-black text-zinc-600 uppercase tracking-widest text-xl relative z-10 mb-12 -mt-20">
                    Trono do Mestre
                </p>

            </main>

            {/* Skill Modal */}
            {selectedSkill && (
                <SkillModal
                    skill={selectedSkill}
                    moduleColor={selectedModuleColor}
                    isUnlocked={true} // Modal only opens for unlocked skills now
                    onClose={() => setSelectedSkill(null)}
                    onAction={() => completeSkill(selectedSkill.id)}
                />
            )}
        </div>
    );
}

export default App;
