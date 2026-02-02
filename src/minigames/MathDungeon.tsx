import React, { useState, useEffect } from 'react';
import { GameConfig, GameProps } from '../core/GameContract';
import { generateMathProblem, MathProblem } from './MathEngine';

// Assets
import bgImage from '../modulos/assets/background_mod1.png';
import playerImage from '../modulos/assets/personagem.png';
import enemyImage from '../modulos/assets/zumbi.png';

export const config: GameConfig = {
    id: 'math-dungeon',
    name: 'Masmorra da Matemática',
    attachToModuleId: 'm1' // <--- Inversion of Control: I bind myself to Module 1
};

const MathDungeon: React.FC<GameProps> = ({ onExit, difficultyLevel }) => {
    const [playerHP, setPlayerHP] = useState(100);
    const [enemyHP, setEnemyHP] = useState(100);
    const [problem, setProblem] = useState<MathProblem | null>(null);
    const [message, setMessage] = useState('');
    const [shake, setShake] = useState(false);
    const [playerAttackAnim, setPlayerAttackAnim] = useState(false);
    const [enemyHitAnim, setEnemyHitAnim] = useState(false); // New state for recoil
    const [enemyAttackAnim, setEnemyAttackAnim] = useState(false); // New state for enemy attack

    useEffect(() => {
        nextTurn();
    }, []);

    const nextTurn = () => {
        setProblem(generateMathProblem(difficultyLevel));
        setMessage('Escolha seu feitiço!');
    };

    const handleAnswer = (selected: number) => {
        if (!problem) return;

        if (selected === problem.answer) {
            setMessage('ACERTO CRÍTICO!');
            setPlayerAttackAnim(true);
            const damage = 34; // 3 hits

            // Trigger enemy recoil slightly after player dash starts
            setTimeout(() => {
                setEnemyHitAnim(true);
            }, 300);

            setTimeout(() => {
                setEnemyHP(prev => {
                    const newHP = prev - damage;
                    if (newHP <= 0) {
                        setTimeout(() => onExit(true), 1500);
                        return 0;
                    }
                    return newHP;
                });

                // Reset animations
                setPlayerAttackAnim(false);
                setEnemyHitAnim(false);

                if (enemyHP - damage > 0) nextTurn();
            }, 600); // Slightly longer to accommodate full animation cycle

        } else {
            setMessage('Você errou o feitiço!');
            setShake(true);
            setEnemyAttackAnim(true); // Trigger enemy attack
            const damage = 20;

            setTimeout(() => {
                setPlayerHP(prev => {
                    const newHP = prev - damage;
                    if (newHP <= 0) {
                        setTimeout(() => onExit(false), 1500);
                        return 0;
                    }
                    return newHP;
                });
                setShake(false);
                setEnemyAttackAnim(false); // Reset enemy attack
                nextTurn();
            }, 800);
        }
    };

    return (
        <div className={`fixed inset-0 z-[60] bg-black flex items-center justify-center font-pixel`}>

            <div className="relative w-full max-w-4xl aspect-[4/3] bg-zinc-900 border-4 border-zinc-500 shadow-2xl overflow-hidden rounded-xl">

                <div
                    className="absolute inset-0 bg-cover bg-center pixelated opacity-50"
                    style={{ backgroundImage: `url(${bgImage})` }}
                ></div>

                <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-10 text-white shadow-gradient">
                    <div className="flex flex-col gap-2 w-1/3">
                        <div className="flex items-center gap-2">
                            <span className="text-yellow-400 text-xs">MAGO</span>
                        </div>
                        <div className="h-6 bg-zinc-800 border-2 border-white relative">
                            <div
                                className="h-full bg-green-500 transition-all duration-500"
                                style={{ width: `${playerHP}%` }}
                            ></div>
                            <span className="absolute inset-0 flex items-center justify-center text-[10px] shadow-sm">{playerHP}/100</span>
                        </div>
                    </div>

                    <div className="mt-2 bg-red-600 px-3 py-1 border-2 border-white rotate-3">
                        <span className="text-xs font-bold">VS</span>
                    </div>

                    <div className="flex flex-col gap-2 w-1/3 items-end">
                        <div className="flex items-center gap-2">
                            <span className="text-red-400 text-xs">MONSTRO</span>
                        </div>
                        <div className="h-6 bg-zinc-800 border-2 border-white relative w-full">
                            <div
                                className="h-full bg-red-600 transition-all duration-500"
                                style={{ width: `${enemyHP}%` }}
                            ></div>
                            <span className="absolute inset-0 flex items-center justify-center text-[10px] shadow-sm">{enemyHP}/100</span>
                        </div>
                    </div>
                </div>

                {/* Game Area - Center Content */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-20">
                    <div className="flex items-end justify-center gap-12 sm:gap-24 w-full max-w-2xl px-4">
                        <img
                            src={playerImage}
                            alt="Player"
                            className={`
                                w-48 h-48 sm:w-64 sm:h-64 pixelated transition-all duration-300 ease-out
                                ${playerAttackAnim ? 'translate-x-32 sm:translate-x-48 scale-110' : ''}
                            `}
                        />

                        <img
                            src={enemyImage}
                            alt="Enemy"
                            className={`
                                w-56 h-56 sm:w-72 sm:h-72 pixelated transition-all duration-200
                                ${shake ? '-translate-x-2' : ''}
                                ${enemyHitAnim ? 'translate-x-8 opacity-80 brightness-150 rotate-6' : ''}
                                ${enemyAttackAnim ? '-translate-x-32 sm:-translate-x-48 scale-110' : ''}
                            `}
                        />
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-zinc-950 border-t-4 border-zinc-600 p-6 flex flex-col items-center justify-center z-20">

                    <div className="mb-4 text-center">
                        <p className="text-zinc-400 text-xs mb-2 uppercase tracking-widest">{message}</p>
                        <h2 className="text-3xl text-white drop-shadow-md">{problem?.question}</h2>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full px-8">
                        {problem?.options.map((option, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(option)}
                                className="bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 border-2 border-zinc-600 text-white py-4 rounded shadow-[0_4px_0_rgba(0,0,0,0.5)] active:shadow-none active:translate-y-1 transition-all text-lg"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MathDungeon;
