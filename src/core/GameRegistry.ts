import { GameConfig, GameModule, GameProps } from './GameContract';

// Explicit imports to prevent tree-shaking
import * as MathDungeon from '../minigames/MathDungeon';
import * as OpenAbacus from '../minigames/OpenAbacus';

// Collect all game modules
const gameModules: GameModule[] = [
    MathDungeon as GameModule,
    OpenAbacus as GameModule,
];

// Map<ModuleId, GameModule>
const gamesByModule = new Map<string, GameModule>();
// Map<SkillId, GameModule>
const gamesBySkill = new Map<string, GameModule>();

// Register the modules
for (const mod of gameModules) {
    if (mod && mod.config) {
        if (mod.config.attachToSkillId) {
            console.log(`[GameRegistry] Registered '${mod.config.name}' for skill '${mod.config.attachToSkillId}'`);
            gamesBySkill.set(mod.config.attachToSkillId, mod);
        }
        if (mod.config.attachToModuleId) {
            console.log(`[GameRegistry] Registered '${mod.config.name}' for module '${mod.config.attachToModuleId}'`);
            gamesByModule.set(mod.config.attachToModuleId, mod);
        }
    }
}

export const getGameForSkill = (skillId: string, moduleId: string): React.ComponentType<GameProps> | null => {
    // 1. Try specific skill
    if (gamesBySkill.has(skillId)) {
        return gamesBySkill.get(skillId)?.default || null;
    }
    // 2. Fallback to module
    if (gamesByModule.has(moduleId)) {
        return gamesByModule.get(moduleId)?.default || null;
    }
    return null;
};

export const getAllGames = (): GameConfig[] => {
    return Array.from(gamesByModule.values()).map(g => g.config);
};
