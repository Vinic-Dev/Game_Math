import { GameConfig, GameModule, GameProps } from './GameContract';

// Auto-import all .tsx files in the minigames directory
// @ts-ignore
const gameModules = import.meta.glob('../minigames/*.tsx', { eager: true });

// Map<ModuleId, GameModule>
const gamesByModule = new Map<string, GameModule>();

// Parse the modules
for (const path in gameModules) {
    const mod = gameModules[path] as GameModule;
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
