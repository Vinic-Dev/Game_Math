import { GameConfig, GameModule, GameProps } from './GameContract';

// Explicit imports to prevent tree-shaking
import * as MathDungeon from '../minigames/MathDungeon';

// Collect all game modules
const gameModules: GameModule[] = [
    MathDungeon as GameModule,
];

// Map<ModuleId, GameModule>
const gamesByModule = new Map<string, GameModule>();

// Register the modules
for (const mod of gameModules) {
    if (mod && mod.config && mod.config.attachToModuleId) {
        console.log(`[GameRegistry] Registered '${mod.config.name}' for module '${mod.config.attachToModuleId}'`);
        gamesByModule.set(mod.config.attachToModuleId, mod);
    }
}

export const getGameForModule = (moduleId: string): React.ComponentType<GameProps> | null => {
    return gamesByModule.get(moduleId)?.default || null;
};

export const getAllGames = (): GameConfig[] => {
    return Array.from(gamesByModule.values()).map(g => g.config);
};
