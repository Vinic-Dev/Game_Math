import React from 'react';

interface SelectionBox {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}

interface AbacusSelectionOverlayProps {
    selectionBox: SelectionBox | null;
    isSelecting: boolean;
}

export const AbacusSelectionOverlay: React.FC<AbacusSelectionOverlayProps> = ({ selectionBox, isSelecting }) => {
    if (!selectionBox || !isSelecting) return null;

    return (
        <div
            className="fixed border-2 border-blue-500 bg-blue-400/30 z-[9999] pointer-events-none"
            style={{
                left: Math.min(selectionBox.startX, selectionBox.endX),
                top: Math.min(selectionBox.startY, selectionBox.endY),
                width: Math.abs(selectionBox.endX - selectionBox.startX),
                height: Math.abs(selectionBox.endY - selectionBox.startY)
            }}
        />
    );
};
