import React from 'react';
import { AbacusBead } from './AbacusBead';
import { COLUMNS } from './types';

interface DraggedItem {
    colIndex: number;
    origin: 'supply' | number;
    count: number;
}

interface AbacusDragOverlayProps {
    draggedItem: DraggedItem | null;
    dragPosition: { x: number, y: number };
}

export const AbacusDragOverlay: React.FC<AbacusDragOverlayProps> = ({ draggedItem, dragPosition }) => {
    if (!draggedItem) return null;

    return (
        <div
            className="fixed pointer-events-none z-[100] drop-shadow-2xl opacity-90 scale-110"
            style={{
                left: dragPosition.x,
                top: dragPosition.y,
                transform: 'translate(-50%, -50%)'
            }}
        >
            <div className="relative">
                <AbacusBead column={COLUMNS[draggedItem.colIndex]} />
                {draggedItem.count > 1 && (
                    <>
                        <div className="absolute -top-3 -right-3 bg-red-600 text-white font-bold rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md border border-white z-20">
                            {draggedItem.count}
                        </div>
                        <div className="absolute top-1 left-0 w-full h-full opacity-50 translate-y-2">
                            <AbacusBead column={COLUMNS[draggedItem.colIndex]} />
                        </div>
                        {draggedItem.count > 5 && (
                            <div className="absolute top-2 left-0 w-full h-full opacity-30 translate-y-4">
                                <AbacusBead column={COLUMNS[draggedItem.colIndex]} />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
