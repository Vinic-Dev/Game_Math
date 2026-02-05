import { useState, useRef, useEffect } from 'react';
import { COLUMNS } from './types';

interface InteractionProps {
    rodCounts: number[];
    addBead: (colIndex: number) => void;
    addBeads: (colIndex: number, amount: number) => void;
    removeBead: (colIndex: number) => void;
    removeBeads: (colIndex: number, amount: number) => void;
    setFeedbackMessage: (msg: string) => void;
}

interface SelectionGroup {
    colIndex: number;
    count: number;
}

export const useAbacusInteraction = ({
    rodCounts,
    addBead,
    addBeads,
    removeBead,
    removeBeads,
    setFeedbackMessage
}: InteractionProps) => {
    // Drag State
    const [draggedItem, setDraggedItem] = useState<{ colIndex: number, origin: 'supply' | number, count: number } | null>(null);
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

    // Selection State
    const [selectionBox, setSelectionBox] = useState<{ startX: number, startY: number, endX: number, endY: number } | null>(null);
    const [selectedGroup, setSelectedGroup] = useState<SelectionGroup | null>(null);
    const [isSelecting, setIsSelecting] = useState(false);

    const rodRefs = useRef<(HTMLDivElement | null)[]>([]);

    // --- Selection Logic ---

    // Helper to calculate selection based on box
    const calculateSelection = (box: { startX: number, startY: number, endX: number, endY: number }) => {
        const left = Math.min(box.startX, box.endX);
        const right = Math.max(box.startX, box.endX);
        const top = Math.min(box.startY, box.endY);
        const bottom = Math.max(box.startY, box.endY);

        let newSelection: SelectionGroup | null = null;

        rodRefs.current.forEach((ref, idx) => {
            if (ref && !newSelection) {
                const rect = ref.getBoundingClientRect();
                // Horizontal Intersection
                if (right > rect.left && left < rect.right) {
                    const rodBottom = rect.bottom;
                    const beadHeight = 20;

                    let countInSelection = 0;
                    for (let i = 0; i < rodCounts[idx]; i++) {
                        const beadY = rodBottom - (i * beadHeight) - 20;
                        if (beadY >= top && beadY <= bottom) {
                            countInSelection++;
                        }
                    }

                    if (countInSelection > 0) {
                        countInSelection = Math.min(countInSelection, 10);
                        newSelection = { colIndex: idx, count: countInSelection };
                    }
                }
            }
        });
        return newSelection;
    };

    const handlePointerDown = (e: React.PointerEvent) => {
        e.preventDefault(); // Prevent scrolling on touch
        setIsSelecting(true);
        // Don't clear selectedGroup here to allow dragging it
        setSelectionBox({ startX: e.clientX, startY: e.clientY, endX: e.clientX, endY: e.clientY });
    };

    // Internal handler for window move
    const onWindowPointerMove = (e: PointerEvent) => {
        if (draggedItem) {
            setDragPosition({ x: e.clientX, y: e.clientY });
        } else if (isSelecting && selectionBox) {
            const newBox = { ...selectionBox, endX: e.clientX, endY: e.clientY };
            setSelectionBox(newBox);

            const currentSelection = calculateSelection(newBox);
            if (currentSelection) {
                setSelectedGroup(currentSelection);
            } else {
                setSelectedGroup(null);
            }
        }
    };

    const stopSelection = () => {
        if (!selectionBox) return;

        if (selectedGroup) {
            setFeedbackMessage(`${selectedGroup.count} peças selecionadas. Arraste-as!`);
        }

        setSelectionBox(null);
    };

    // --- Drag Logic ---

    const startDrag = (e: React.PointerEvent, colIndex: number, origin: 'supply' | number) => {
        e.preventDefault();
        e.stopPropagation();

        // If multitouch or right click, ignore? Standard left click usually

        let countToDrag = 1;

        if (typeof origin === 'number' && selectedGroup && selectedGroup.colIndex === colIndex) {
            countToDrag = selectedGroup.count;
            setSelectedGroup(null); // Consume
        } else {
            setSelectedGroup(null); // Clear others
        }

        if (typeof origin === 'number') {
            removeBeads(origin, countToDrag);
        }

        setDraggedItem({ colIndex, origin, count: countToDrag });
        setDragPosition({ x: e.clientX, y: e.clientY });

        // Stop selecting if we started dragging
        setIsSelecting(false);
        setSelectionBox(null);
    };

    const stopDrag = (e: PointerEvent) => {
        if (!draggedItem) return;

        let targetRodIndex = -1;
        rodRefs.current.forEach((ref, idx) => {
            if (ref) {
                const rect = ref.getBoundingClientRect();
                if (e.clientX >= rect.left - 30 && e.clientX <= rect.right + 30 &&
                    e.clientY >= rect.top - 50 && e.clientY <= rect.bottom + 50) {
                    targetRodIndex = idx;
                }
            }
        });

        const { colIndex, origin, count } = draggedItem;

        if (targetRodIndex !== -1) {
            if (targetRodIndex === colIndex) {
                addBeads(targetRodIndex, count);
            }
            else if (targetRodIndex === colIndex - 1 && count === 10) {
                // 10 -> 1 Aggregation
                addBead(targetRodIndex);
                setFeedbackMessage(`Agrupou 10 ${COLUMNS[colIndex].name} em 1 ${COLUMNS[targetRodIndex].name}!`);
            }
            else if (targetRodIndex === colIndex + 1 && count === 1) {
                // 1 -> 10 Decomposition
                addBeads(targetRodIndex, 10);
                setFeedbackMessage(`Desagrupou 1 ${COLUMNS[colIndex].name} em 10 ${COLUMNS[targetRodIndex].name}!`);
            }
            else {
                setFeedbackMessage(`Movimento inválido.`);
                if (typeof origin === 'number') {
                    addBeads(origin, count);
                }
            }
        } else {
            if (typeof origin === 'number') {
                setFeedbackMessage(`${count} peça(s) devolvida(s) ao pratinho.`);
            }
        }

        setDraggedItem(null);
    };

    const onWindowPointerUp = (e: PointerEvent) => {
        if (draggedItem) {
            stopDrag(e);
        } else if (isSelecting) {
            stopSelection();
        }
        setIsSelecting(false);
    };

    // Attach/Detach Window Listeners
    useEffect(() => {
        if (isSelecting || draggedItem) {
            window.addEventListener('pointermove', onWindowPointerMove);
            window.addEventListener('pointerup', onWindowPointerUp);
            window.addEventListener('pointercancel', onWindowPointerUp);
        }

        return () => {
            window.removeEventListener('pointermove', onWindowPointerMove);
            window.removeEventListener('pointerup', onWindowPointerUp);
            window.removeEventListener('pointercancel', onWindowPointerUp);
        };
    }, [isSelecting, draggedItem, selectionBox]); // Add dependencies for closure capture

    return {
        // State
        draggedItem,
        dragPosition,
        selectionBox,
        selectedGroup,
        isSelecting,
        rodRefs,

        // Handlers
        handlePointerDown,
        startDrag,
    };
};
