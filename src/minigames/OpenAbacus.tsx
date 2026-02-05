import React from 'react';
import { GameConfig, GameProps } from '../core/GameContract';
import { AbacusBoard } from './abacus/AbacusBoard';

export const config: GameConfig = {
    id: 'open-abacus',
    name: 'Dois Ábacos', // Updated title
    // Attach to Skill 02 (Module 1, Skill 2)
    attachToSkillId: '02'
};

const OpenAbacus = ({ onExit }: GameProps) => {
    return (
        <div className="fixed inset-0 z-[9999] bg-[#f0e6d2] text-zinc-900 font-sans flex flex-col items-center overflow-y-auto overflow-x-hidden">
            <div className="w-full max-w-[1600px] flex flex-col xl:flex-row justify-center items-start gap-4 p-4 min-h-screen">

                {/* Board 1 */}
                <div className="w-full xl:w-1/2 flex justify-center">
                    <AbacusBoard id="board-1" onExit={onExit} />
                </div>

                {/* Divider for mobile/desktop visualization */}
                <div className="hidden xl:block w-[2px] bg-amber-900/10 self-stretch my-8"></div>

                {/* Board 2 */}
                <div className="w-full xl:w-1/2 flex justify-center">
                    <AbacusBoard id="board-2" />
                </div>
            </div>
        </div>
    );
};

export default OpenAbacus;