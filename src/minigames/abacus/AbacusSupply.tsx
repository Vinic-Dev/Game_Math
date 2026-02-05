import React from 'react';
import { COLUMNS } from './types';
import { AbacusBead } from './AbacusBead';

interface AbacusSupplyProps {
    onBeadDragStart: (e: React.PointerEvent, colIndex: number) => void;
}

export const AbacusSupply: React.FC<AbacusSupplyProps> = ({ onBeadDragStart }) => {
    return (
        <div className="mt-8 bg-white/60 backdrop-blur-sm p-3 rounded-3xl shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)] flex flex-nowrap justify-center gap-2 items-center border border-white/80 max-w-full overflow-x-visible">
            <span className="font-bold text-amber-900 uppercase text-xs sm:text-sm tracking-widest mr-2 whitespace-nowrap">
                Pratinhos:
            </span>
            {COLUMNS.map((col, idx) => ({ col, idx })).reverse().map(({ col, idx }) => (
                <div
                    key={`supply-${col.id}`}
                    className="relative group flex flex-col items-center gap-1 sm:gap-2 px-1"
                >
                    {/* The "Plate" visual */}
                    <div className="absolute bottom-1 w-16 sm:w-24 h-4 sm:h-6 bg-zinc-300/50 rounded-[50%] blur-sm scale-x-110"></div>

                    <div className="relative transform transition-transform group-hover:-translate-y-2">
                        <AbacusBead
                            column={col}
                            isDraggable={true}
                            onStartDrag={(e) => onBeadDragStart(e, idx)}
                            className="shadow-xl scale-75 sm:scale-100"
                        />
                    </div>

                    <div className="text-[9px] sm:text-[10px] font-bold text-amber-800 opacity-60 uppercase tracking-wider whitespace-nowrap">
                        {col.name.split(' ').map(w => w[0]).join('')}
                    </div>
                </div>
            ))}
        </div>
    );
};
