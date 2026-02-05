import React from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';

interface AbacusHeaderProps {
    totalValue: number;
    onExit?: (won: boolean) => void;
    onReset: () => void;
    onValueChange: (val: number) => void;
}

export const AbacusHeader: React.FC<AbacusHeaderProps> = ({ totalValue, onExit, onReset, onValueChange }) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Remove non-digits
        // Using replace(/\./g, '') to handle potential thousand separators if needed, but 
        // toLocaleString output contains dots. So we need to strip them before parsing.
        const raw = e.target.value.replace(/\D/g, '');
        const val = raw === '' ? 0 : parseInt(raw, 10);

        // Limit max value
        if (val <= 999999999) {
            onValueChange(val);
        }
    };

    return (
        <div
            className="w-full bg-gradient-to-r from-amber-900 to-amber-800 text-amber-50 p-3 sm:p-4 shadow-lg flex justify-between items-center z-50 relative rounded-xl mx-2"
            onPointerDown={(e) => e.stopPropagation()}
        >
            {/* Left side: Back Button */}
            <div className="w-24">
                {onExit && (
                    <button onClick={() => onExit(false)} className="flex items-center gap-2 hover:bg-white/10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-colors font-semibold">
                        <ArrowLeft size={20} /> <span className="hidden sm:inline">Voltar</span>
                    </button>
                )}
            </div>

            {/* Center: Editable Value Display */}
            <div className="flex flex-col items-center bg-black/20 px-6 py-1.5 sm:px-8 sm:py-2 rounded-xl backdrop-blur-sm border border-white/10 mx-2 transition-colors focus-within:bg-black/40 focus-within:border-amber-400/50">
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] opacity-80 mb-0.5 sm:mb-1 text-amber-200">Valor Total</span>
                <input
                    type="text"
                    // Display 0 as empty string for cleaner typing? No, placeholder covers it.
                    // But if user deletes everything, we want input to be empty visual but value 0.
                    // Actually let's just keep '0' if 0.
                    value={totalValue === 0 ? '' : totalValue.toLocaleString('pt-BR')}
                    placeholder="0"
                    onChange={handleInputChange}
                    className="bg-transparent border-none text-center text-xl sm:text-3xl font-mono font-bold tracking-widest text-amber-100 drop-shadow-md focus:outline-none w-48 sm:w-64 placeholder-white/20"
                />
            </div>

            {/* Right side: Reset Button */}
            <div className="w-24 flex justify-end">
                <button onClick={onReset} className="flex items-center gap-2 hover:bg-white/10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-colors font-semibold text-amber-100/90 hover:text-white">
                    <RotateCcw size={20} /> <span className="hidden sm:inline">Limpar</span>
                </button>
            </div>
        </div>
    );
};
