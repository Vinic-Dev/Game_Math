export interface GameProps {
    onExit: (won: boolean) => void;
    difficultyLevel: number;
    debugMode?: boolean;
}

export interface GameConfig {
    id: string;
    name: string;
    description?: string;
    /**
     * The ID of the module this game should be attached to.
     * Example: 'm1'
     */
    attachToModuleId?: string;

    /**
     * The ID of the skill this game should be attached to.
     * Takes precedence over attachToModuleId.
     * Example: '02'
     */
    attachToSkillId?: string;
}

export interface GameModule {
    default: React.ComponentType<GameProps>;
    config: GameConfig;
}
