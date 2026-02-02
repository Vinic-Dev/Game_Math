export interface GameProps {
    onExit: (won: boolean) => void;
    difficultyLevel: number;
}

export interface GameConfig {
    id: string;
    name: string;
    description?: string;
    /**
     * The ID of the module this game should be attached to.
     * Example: 'm1'
     */
    attachToModuleId: string;
}

export interface GameModule {
    default: React.ComponentType<GameProps>;
    config: GameConfig;
}
