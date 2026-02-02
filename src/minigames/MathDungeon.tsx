import React, { useState, useEffect } from 'react';
import { GameConfig, GameProps } from '../core/GameContract';
import { generateMathProblem, MathProblem } from './MathEngine';

// Assets - Backgrounds
import bg1 from '../modulos/assets/bg1.png';
import bg2 from '../modulos/assets/bg2.png';
import bg3 from '../modulos/assets/bg3.png';
import bg4 from '../modulos/assets/bg4.png';
import bg5 from '../modulos/assets/bg5.png';
import bg6 from '../modulos/assets/bg6.png';

// Assets - Monsters
import nv1 from '../modulos/assets/nv1.png';
import nv2 from '../modulos/assets/nv2.png';
import nv3 from '../modulos/assets/nv3.png';
import nv4 from '../modulos/assets/nv4.png';
import nv5 from '../modulos/assets/nv5.png';
import nv6 from '../modulos/assets/nv6.png';

// Assets - Player
import playerImage from '../modulos/assets/personagem.png';

export const config: GameConfig = {
    id: 'math-dungeon',
    name: 'Masmorra da Matemática',
    attachToModuleId: 'm1'
};

const LEVELS = [
    { bg: bg1, monsterImg: nv1, name: 'Zumbi Fraco' },
    { bg: bg2, monsterImg: nv2, name: 'Esqueleto' },
    { bg: bg3, monsterImg: nv3, name: 'Orc' },
    { bg: bg4, monsterImg: nv4, name: 'Múmia' },
    { bg: bg5, monsterImg: nv5, name: 'Guerreiro Sombrio' },
    { bg: bg6, monsterImg: nv6, name: 'Rei dos Monstros' },
];

const MathDungeon: React.FC<GameProps> = ({ onExit, difficultyLevel }) => {
    const [levelIndex, setLevelIndex] = useState(0);
    const [playerHP, setPlayerHP] = useState(100);
    const [enemyHP, setEnemyHP] = useState(100);
    const [problem, setProblem] = useState<MathProblem | null>(null);
    const [message, setMessage] = useState('');
    const [shake, setShake] = useState(false);

    // Animation States
    const [playerAttackAnim, setPlayerAttackAnim] = useState(false);
    const [enemyHitAnim, setEnemyHitAnim] = useState(false);
    const [enemyAttackAnim, setEnemyAttackAnim] = useState(false);
    const [isLevelTransitioning, setIsLevelTransitioning] = useState(false);

    useEffect(() => {
        startLevel();
    }, [levelIndex]);

    const startLevel = () => {
        setEnemyHP(100);
        setIsLevelTransitioning(false);
        nextTurn();
    };

    const nextTurn = () => {
        setProblem(generateMathProblem(difficultyLevel + levelIndex)); // Increase difficulty slightly per level
        setMessage(`Nível ${levelIndex + 1}: ${LEVELS[levelIndex].name}`);
    };

    const handleAnswer = (selected: number) => {
        if (!problem || isLevelTransitioning) return;

        if (selected === problem.answer) {
            setMessage('ACERTO CRÍTICO!');
            setPlayerAttackAnim(true);
            const damage = 34; // 3 hits to kill

            // Recoil
            setTimeout(() => setEnemyHitAnim(true), 300);

            setTimeout(() => {
                const newEnemyHP = enemyHP - damage;

                if (newEnemyHP <= 0) {
                    setEnemyHP(0);
                    handleVictory();
                } else {
                    setEnemyHP(newEnemyHP);
                    setPlayerAttackAnim(false);
                    setEnemyHitAnim(false);
                    nextTurn();
                }
            }, 600);

        } else {
            setMessage('Você errou o feitiço!');
            setShake(true);
            setEnemyAttackAnim(true);
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
                setEnemyAttackAnim(false);
                nextTurn();
            }, 800);
        }
    };

    const handleVictory = () => {
        setPlayerAttackAnim(false);
        setEnemyHitAnim(false);

        if (levelIndex < LEVELS.length - 1) {
            setMessage('VITÓRIA! Avançando...');
            setIsLevelTransitioning(true);

            // Wait a bit to show dead enemy or victory state
            setTimeout(() => {
                setLevelIndex(prev => prev + 1);
            }, 2000);
        } else {
            setMessage('VOCÊ VENCEU A MASMORRA!');
            setTimeout(() => onExit(true), 2000);
        }
    };

    const currentLevelConfig = LEVELS[levelIndex];

    return (
        <div className={`fixed inset-0 z-[60] bg-black flex items-center justify-center font-pixel`}>

            <div className="relative w-full max-w-4xl aspect-[4/3] bg-zinc-900 border-4 border-zinc-500 shadow-2xl overflow-hidden rounded-xl">

                <div
                    className={`absolute inset-0 bg-cover bg-center pixelated transition-all duration-1000 ${isLevelTransitioning ? 'opacity-0' : 'opacity-100'}`}
                    style={{ backgroundImage: `url(${currentLevelConfig.bg})` }}
                ></div>

                {/* HUD */}
                <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-10 text-white shadow-gradient">
                    <div className="flex flex-col gap-2 w-1/3">
                        <div className="flex items-center gap-2">
                            <span className="text-yellow-400 text-xs">MAGO (Nvl {levelIndex + 1})</span>
                        </div>
                        <div className="h-6 bg-zinc-800 border-2 border-white relative">
                            <div
                                className="h-full bg-green-500 transition-all duration-500"
                                style={{ width: `${playerHP}%` }}
                            ></div>
                            <span className="absolute inset-0 flex items-center justify-center text-[10px] shadow-sm">{playerHP}/100</span>
                        </div>
                    </div>

                    <div className="mt-2 bg-zinc-800 px-3 py-1 border-2 border-white rotate-3">
                        <span className="text-xs font-bold text-yellow-500">VS</span>
                    </div>

                    <div className="flex flex-col gap-2 w-1/3 items-end">
                        <div className="flex items-center gap-2">
                            <span className="text-red-400 text-xs">{currentLevelConfig.name}</span>
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

                {/* Game Area */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-20">
                    <div className="flex items-end justify-center gap-12 sm:gap-24 w-full max-w-2xl px-4">
                        {/* Player */}
                        <img
                            src={playerImage}
                            alt="Player"
                            className={`
                                w-48 h-48 sm:w-64 sm:h-64 pixelated transition-all duration-500 ease-in-out
                                ${playerAttackAnim ? 'translate-x-32 sm:translate-x-48 scale-110' : ''}
                                ${isLevelTransitioning ? 'translate-x-[200%] opacity-0' : 'translate-x-0 opacity-100'}
                            `}
                        />

                        {/* Enemy */}
                        <img
                            src={currentLevelConfig.monsterImg}
                            alt="Enemy"
                            className={`
                                w-56 h-56 sm:w-72 sm:h-72 pixelated transition-all duration-200
                                ${shake ? '-translate-x-2' : ''}
                                ${enemyHitAnim ? 'translate-x-8 opacity-80 brightness-150 rotate-6' : ''}
                                ${enemyAttackAnim ? '-translate-x-32 sm:-translate-x-48 scale-110' : ''}
                                ${enemyHP <= 0 ? 'opacity-0 scale-90 blur-sm' : ''}
                            `}
                        />
                    </div>
                </div>

                {/* Interface Logic */}
                <div className={`absolute bottom-0 left-0 right-0 h-1/3 bg-zinc-950 border-t-4 border-zinc-600 p-6 flex flex-col items-center justify-center z-20 transition-transform duration-500 ${isLevelTransitioning ? 'translate-y-full' : 'translate-y-0'}`}>

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
