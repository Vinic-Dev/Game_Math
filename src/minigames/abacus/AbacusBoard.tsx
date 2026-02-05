import React from 'react';
import { COLUMNS } from './types';
import { useAbacusState } from './useAbacusState';
import { useAbacusInteraction } from './useAbacusInteraction';
import { AbacusRod } from './AbacusRod';
import { AbacusSupply } from './AbacusSupply';
import { AbacusHeader } from './AbacusHeader';
import { AbacusSelectionOverlay } from './AbacusSelectionOverlay';
import { AbacusDragOverlay } from './AbacusDragOverlay';

interface AbacusBoardProps {
    id: string;
    onExit?: (won: boolean) => void;
}

export const AbacusBoard: React.FC<AbacusBoardProps> = ({ id, onExit }) => {
    // 1. Business Logic State (Isolated per board)
    const {
        rodCounts,
        totalValue,
        feedbackMessage,
        setFeedbackMessage,
        addBead,
        addBeads,
        removeBead,
        removeBeads,
        clearRod,
        reset,
        exchangeUp,
        exchangeDown,
        setRodsFromValue
    } = useAbacusState();

    // 2. Interaction State (Drag & Selection)
    const {
        draggedItem,
        dragPosition,
        selectionBox,
        selectedGroup,
        isSelecting,
        rodRefs,
        handlePointerDown,
        startDrag
    } = useAbacusInteraction({
        rodCounts,
        addBead,
        addBeads,
        removeBead,
        removeBeads,
        setFeedbackMessage
    });

    // Check for overflow (10 or more beads)
    const hasOverflow = rodCounts.some(count => count >= 10);

    return (
        <div
            className="relative flex flex-col items-center select-none w-full max-w-4xl mx-auto p-4"
            onPointerDown={handlePointerDown}
        // PointerMove and Up are now global window listeners in the hook
        >
            {/* Selection Overlay (Scoped to this board visually, though coords are global page coords, 
                but since we only render if `isSelecting` is true for THIS hook instance, it works) */}
            <AbacusSelectionOverlay
                selectionBox={selectionBox}
                isSelecting={isSelecting}
            />

            {/* Header (Exit only on first board?) - Let's make it flexible props */}
            <AbacusHeader
                totalValue={totalValue}
                onExit={onExit}
                onReset={reset}
                onValueChange={setRodsFromValue}
            />

            {/* Feedback Message (Floating above board) */}
            <div className="absolute top-16 left-1/2 -translate-x-1/2 pointer-events-none z-40 w-full flex justify-center">
                <p className="font-bold text-amber-900/90 text-sm sm:text-base animate-pulse bg-white/60 px-4 py-1 rounded-full backdrop-blur-sm shadow-sm border border-amber-900/10 text-center mx-2">
                    {feedbackMessage}
                </p>
            </div>

            {/* Overflow Warning (Fixed? No, relative to board now to avoid stacking on screen edge) */}
            {hasOverflow && (
                <div className="absolute top-24 right-0 z-50 animate-bounce pointer-events-none max-w-[150px] md:max-w-[200px]">
                    <div className="bg-red-600 text-white font-bold p-2 md:p-3 rounded-xl shadow-xl border-4 border-white transform rotate-6">
                        <p className="text-xs md:text-sm leading-tight text-center">
                            ⚠️ Não pode haver 10 peças numa mesma haste!
                        </p>
                    </div>
                </div>
            )}

            {/* Wood Frame Background */}
            <div
                className="relative bg-amber-100/80 p-4 md:p-6 pb-8 md:pb-12 rounded-2xl border-[8px] md:border-[10px] border-amber-800 shadow-[0_10px_20px_rgba(0,0,0,0.3)] mt-8 ring-1 ring-white/20 w-full"
            >
                {/* Horizontal Crossbar (Visual) */}
                <div className="absolute top-1/2 left-0 right-0 h-3 md:h-4 bg-amber-900/10 z-0 pointer-events-none"></div>

                {/* Columns Container */}
                <div className="flex justify-between w-full items-end relative z-10 px-2 md:px-8 gap-1 md:gap-2">
                    {COLUMNS.map((col, idx) => (
                        <div key={`${id}-col-${col.id}`} className="relative">
                            {/* Selection Highlight Indicator */}
                            {selectedGroup?.colIndex === idx && (
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg z-50 animate-bounce whitespace-nowrap">
                                    {selectedGroup.count} Selec.
                                </div>
                            )}

                            <AbacusRod
                                ref={el => rodRefs.current[idx] = el}
                                column={col}
                                count={rodCounts[idx]}
                                colIndex={idx}
                                isOverflow={rodCounts[idx] >= 10}
                                onBeadDragStart={(e, i) => startDrag(e, i, idx)}
                                onExchangeUp={() => exchangeUp(idx)}
                                onExchangeDown={() => exchangeDown(idx)}
                                onClear={() => clearRod(idx)}
                                canExchangeUp={idx > 0 && rodCounts[idx] >= 10}
                                canExchangeDown={idx < COLUMNS.length - 1 && rodCounts[idx] > 0}
                            />
                        </div>
                    ))}
                </div>

                {/* Base of Abacus (Visual) */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#5c3a21] rounded-b-lg shadow-lg"></div>
            </div>

            {/* Supply Area */}
            <div
                className="scale-90 md:scale-100 origin-top mt-2 w-full flex justify-center"
                onPointerDown={(e) => e.stopPropagation()}
            >
                <AbacusSupply onBeadDragStart={(e, idx) => startDrag(e, idx, 'supply')} />
            </div>

            <AbacusDragOverlay draggedItem={draggedItem} dragPosition={dragPosition} />
        </div>
    );
};
