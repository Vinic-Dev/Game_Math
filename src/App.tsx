import { useState } from 'react';
import { Trophy, Settings } from 'lucide-react';

import { ModuleSection } from './components/ModuleSection';
import { SKILLS_DATA, Skill } from './data/skills';
import { TopBar } from './components/TopBar';
import { SkillModal } from './components/SkillModal';
import { SettingsModal } from './components/SettingsModal';
import { getGameForSkill } from './core/GameRegistry';

function App() {
    const [selectedSkill, setSelectedSkill] = useState<(Skill & { moduleId: string }) | null>(null);
    // Initialize with only the first skill of M1 ('01') and second skill of M1 ('02') unlocked
    const [unlockedSkills, setUnlockedSkills] = useState(['01', '02']);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeGameSkillId, setActiveGameSkillId] = useState<string | null>(null);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [debugMode, setDebugMode] = useState(() => {
        const saved = localStorage.getItem('debugMode');
        return saved === 'true';
    });

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

    const handleDebugModeChange = (enabled: boolean) => {
        setDebugMode(enabled);
        localStorage.setItem('debugMode', enabled.toString());
    };

    const selectedModuleColor = selectedSkill
        ? SKILLS_DATA.find(m => m.id === selectedSkill.moduleId)?.color || 'slate'
        : 'slate';

    // Resolve Game Component
    // Find which module activeGameSkillId belongs to
    const activeModule = activeGameSkillId
        ? SKILLS_DATA.find(m => m.skills.some(s => s.id === activeGameSkillId))
        : null;

    // Inversion of Control: We ask the registry "Who wants to play with this skill or module?"
    const ActiveGameComponent = activeModule && activeGameSkillId
        ? getGameForSkill(activeGameSkillId, activeModule.id)
        : null;

    return (
        <div className="h-screen bg-[#050505] text-zinc-100 font-mono flex flex-col">

            {/* Game Mode Overlay - Renders when playing */}
            {isPlaying && ActiveGameComponent && activeGameSkillId && (
                <ActiveGameComponent
                    difficultyLevel={allSkills.findIndex(s => s.id === activeGameSkillId) + 1}
                    onExit={handleGameEnd}
                    debugMode={debugMode}
                />
            )}

            <TopBar unlockedCount={unlockedSkills.length} totalSkills={totalSkills} />

            {/* Settings Button */}
            <button
                onClick={() => setIsSettingsOpen(true)}
                className="fixed top-4 right-4 z-50 p-2 bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-600 rounded-lg transition-colors shadow-lg backdrop-blur-sm"
                title="Configurações"
            >
                <Settings className="text-zinc-400" size={20} />
            </button>

            {/* Main Area with Dungeon Background */}
            <main className="flex-1 overflow-y-auto relative scrollbar-hide touch-scroll flex flex-col items-center pt-28 pb-20 bg-dungeon overflow-x-hidden">

                {/* Global Connection Line (Visual Only) */}
                <div className="absolute top-0 bottom-0 w-2.5 bg-zinc-800/60 left-[50%] -translate-x-1/2 -z-0 border-x border-zinc-950/50"></div>

                {SKILLS_DATA.map((module, index) => {
                    // Unlock only Module 1 (index 0) and Module 2 (index 1)
                    // Lock everything else (> 1)
                    const isModuleLocked = index > 1;

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

            {/* Settings Modal */}
            <SettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                debugMode={debugMode}
                onDebugModeChange={handleDebugModeChange}
            />
        </div>
    );
}

export default App;
