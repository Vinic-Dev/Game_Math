import React, { forwardRef } from 'react';
import { RefreshCw, Trash2 } from 'lucide-react';
import { AbacusColumn } from './types';
import { AbacusBead } from './AbacusBead';

interface AbacusRodProps {
    column: AbacusColumn;
    count: number;
    colIndex: number;
    onExchangeUp?: () => void;
    onExchangeDown?: () => void;
    onClear?: () => void;
    canExchangeUp: boolean;
    canExchangeDown: boolean;
    isOverflow?: boolean; // New prop
    onBeadDragStart: (e: React.PointerEvent, colIndex: number) => void;
}

export const AbacusRod = forwardRef<HTMLDivElement, AbacusRodProps>(({
    column,
    count,
    colIndex,
    onExchangeUp,
    onExchangeDown,
    onClear,
    canExchangeUp,
    canExchangeDown,
    isOverflow,
    onBeadDragStart
}, ref) => {
    return (
        <div className="flex flex-col items-center group relative z-10 w-fit">
            {/* Exchange Controls */}
            <div className="h-12 flex flex-col gap-1 mb-1 opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full pb-2 z-50 pointer-events-none group-hover:pointer-events-auto">
                {canExchangeUp && (
                    <button
                        onClick={onExchangeUp}
                        className="bg-yellow-500 hover:bg-yellow-400 text-white rounded-full p-1.5 shadow-lg animate-bounce"
                        title="Agrupar 10 em 1"
                    >
                        <RefreshCw size={14} />
                    </button>
                )}
                {canExchangeDown && (
                    <button
                        onClick={onExchangeDown}
                        className="bg-orange-500 hover:bg-orange-400 text-white rounded-full p-1.5 shadow-lg"
                        title="Desagrupar 1 em 10"
                    >
                        <RefreshCw size={14} className="rotate-180" />
                    </button>
                )}
            </div>

            {/* The Rod Structure */}
            <div
                ref={ref}
                className={`relative w-6 h-80 md:h-96 rounded-t-full border-x shadow-inner flex flex-col-reverse justify-start items-center transition-colors duration-300 ${isOverflow
                        ? 'bg-gradient-to-b from-red-400 to-red-600 border-red-700'
                        : 'bg-gradient-to-b from-amber-100 to-amber-200 border-amber-300'
                    }`}
            >
                {/* Visual Stick Center */}
                <div className="absolute inset-x-2 top-2 bottom-0 bg-yellow-900/10 rounded-full pointer-events-none"></div>

                {/* Beads Stack */}
                {Array.from({ length: count }).map((_, i) => (
                    <div key={i} className="mb-[-10px] sm:mb-[-12px] z-10" style={{ zIndex: i }}>
                        <AbacusBead
                            column={column}
                            isDraggable={true}
                            onStartDrag={(e) => onBeadDragStart(e, colIndex)}
                        />
                    </div>
                ))}
            </div>

            {/* Label Base & Tools */}
            <div className="mt-2 flex flex-col items-center gap-1 z-20">
                <div className={`${column.color} text-white font-bold px-2 py-0.5 rounded shadow-sm border-b-2 border-black/20 text-xs sm:text-sm whitespace-nowrap`}>
                    {column.label}
                </div>
                <div className={`font-mono text-lg font-bold drop-shadow-sm leading-none ${isOverflow ? 'text-red-700 animate-pulse' : 'text-amber-900'}`}>
                    {count}
                </div>

                {/* Clear Button */}
                {count > 0 && (
                    <button
                        onClick={onClear}
                        className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-100 hover:bg-red-200 text-red-600 p-1 rounded-full mt-1"
                        title="Limpar haste"
                    >
                        <Trash2 size={12} />
                    </button>
                )}
            </div>
        </div>
    );
});

AbacusRod.displayName = 'AbacusRod';
