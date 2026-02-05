import { useState, useMemo } from 'react';
import { COLUMNS } from './types';

export const useAbacusState = () => {
    // 7 Columns
    const [rodCounts, setRodCounts] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
    const [feedbackMessage, setFeedbackMessage] = useState<string>('Arraste as peças para o ábaco!');

    const totalValue = useMemo(() => {
        return rodCounts.reduce((acc, count, idx) => {
            return acc + (count * COLUMNS[idx].value);
        }, 0);
    }, [rodCounts]);

    const addBead = (colIndex: number) => {
        setRodCounts(prev => {
            const next = [...prev];
            // Increased limit to 60
            if (next[colIndex] < 60) {
                next[colIndex]++;
            }
            return next;
        });
        setFeedbackMessage(`Adicionou 1 ${COLUMNS[colIndex].name}`);
    };

    const addBeads = (colIndex: number, amount: number) => {
        setRodCounts(prev => {
            const next = [...prev];
            if (next[colIndex] + amount <= 60) {
                next[colIndex] += amount;
            } else {
                next[colIndex] = 60; // Hard Cap
            }
            return next;
        });
    };

    const removeBead = (colIndex: number) => {
        setRodCounts(prev => {
            const next = [...prev];
            if (next[colIndex] > 0) {
                next[colIndex]--;
            }
            return next;
        });
        setFeedbackMessage('Peça removida.');
    };

    const removeBeads = (colIndex: number, amount: number) => {
        setRodCounts(prev => {
            const next = [...prev];
            if (next[colIndex] >= amount) {
                next[colIndex] -= amount;
            } else {
                next[colIndex] = 0;
            }
            return next;
        });
    };

    const clearRod = (colIndex: number) => {
        setRodCounts(prev => {
            const next = [...prev];
            next[colIndex] = 0;
            return next;
        });
        setFeedbackMessage(`Limpou a haste ${COLUMNS[colIndex].label}.`);
    };

    const reset = () => {
        setRodCounts([0, 0, 0, 0, 0, 0, 0]);
        setFeedbackMessage('Ábaco limpo.');
    };

    // Exchange 10 of current for 1 of next (left)
    const exchangeUp = (colIndex: number) => {
        if (colIndex <= 0) return; // Cannot exchange max value
        if (rodCounts[colIndex] >= 10) {
            setRodCounts(prev => {
                const next = [...prev];
                next[colIndex] -= 10;
                next[colIndex - 1] += 1;
                return next;
            });
            setFeedbackMessage(`Trocou 10 ${COLUMNS[colIndex].label} por 1 ${COLUMNS[colIndex - 1].label}!`);
        }
    };

    // Decompose 1 of current for 10 of next (right)
    const exchangeDown = (colIndex: number) => {
        if (colIndex >= COLUMNS.length - 1) return; // Cannot decompose Units
        if (rodCounts[colIndex] >= 1) {
            setRodCounts(prev => {
                const next = [...prev];
                next[colIndex] -= 1;
                next[colIndex + 1] += 10;
                return next;
            });
            setFeedbackMessage(`Trocou 1 ${COLUMNS[colIndex].label} por 10 ${COLUMNS[colIndex + 1].label}!`);
        }
    };

    const setRodsFromValue = (value: number) => {
        let remaining = value;
        const newCounts = new Array(COLUMNS.length).fill(0);

        COLUMNS.forEach((col, idx) => {
            if (remaining >= col.value) {
                const count = Math.floor(remaining / col.value);
                // Limit to max 60 to prevent crash, though decimal logic usually yields < 10
                newCounts[idx] = Math.min(count, 60);
                remaining = remaining % col.value;
            }
        });

        setRodCounts(newCounts);
        setFeedbackMessage(`Valor definido para ${value.toLocaleString('pt-BR')}`);
    };

    return {
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
    };
};
