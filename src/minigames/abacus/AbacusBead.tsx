import React from 'react';
import { AbacusColumn } from './types';

interface AbacusBeadProps {
    column: AbacusColumn;
    isDraggable?: boolean;
    onStartDrag?: (e: React.PointerEvent) => void;
    className?: string;
    style?: React.CSSProperties;
}

export const AbacusBead: React.FC<AbacusBeadProps> = ({
    column,
    isDraggable = false,
    onStartDrag,
    className = '',
    style = {}
}) => {
    return (
        <div
            onPointerDown={isDraggable ? onStartDrag : undefined}
            className={`
                w-12 h-6 sm:w-16 sm:h-8 rounded-[50%]
                ${column.ringColor} ${column.ringBorder} border-y-2 sm:border-y-4
                shadow-[0_2px_1px_rgba(0,0,0,0.3)]
                flex items-center justify-center
                relative
                ${isDraggable ? 'cursor-grab active:cursor-grabbing hover:scale-105' : ''}
                transition-transform
                ${className}
            `}
            style={{
                // Add a gradient overlay for 3D effect
                backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 40%, rgba(0,0,0,0.1) 100%)',
                ...style
            }}
        >
            {/* Inner highlight/hole hint to look like a ring */}
            <div className="w-4 h-1.5 sm:w-6 sm:h-2 bg-black/20 rounded-[50%] blur-[1px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]"></div>
        </div>
    );
};
